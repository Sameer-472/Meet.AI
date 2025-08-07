import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter , protectedProcedure } from "@/trpc/init";
import z from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import { TRPCError } from "@trpc/server";
import { meetingInsertSchema, meetingUpdateSchema } from "../schemas";


export const meetingRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingMeeting] = await db.select({
            ...getTableColumns(meetings),
        }).from(meetings).where(eq(meetings.id, input.id));
        return existingMeeting;
    }),
    getMany: protectedProcedure.input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish()
    })).query(async ({ ctx, input }) => {
        const { search, page, pageSize } = input;
        const data = await db.select({
            ...getTableColumns(meetings),
            agents: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as('duration')
        }).from(meetings).innerJoin(agents , eq(agents.id, meetings.agentId))
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id), search ?
                ilike(meetings.name, `%${search}`) : undefined),
        ).orderBy(desc(meetings.createdAt), desc(meetings.id)).limit(pageSize).offset((page - 1) * pageSize);

        const [total] = await db.select({ count: count() }).from(meetings).where(and(
            eq(meetings.userId, ctx.auth.user.id), search ?
            ilike(meetings.name, `%${search}`) : undefined
        ))

        const totalPages = Math.ceil(total.count / pageSize);
        return {
            items: data,
            total: total.count,
            totalPages
        };
    }),
    create: protectedProcedure.input(meetingInsertSchema).mutation(async ({ input, ctx }) => {
        // const {name , instructions} = input;
        // const {auth} = ctx;
        const [createdMeeting] = await db.insert(meetings).values({
            ...input,
            userId: ctx.auth.user.id
        }).returning();
        return createdMeeting;
    }),

    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const [removeMeeting] = await db.delete(meetings).where(
            and(
                eq(meetings.id, input.id),
                eq(meetings.userId, ctx.auth.user.id),

            )
        ).returning();

        if (!removeMeeting) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Meeting not found'
            })
        }
    }),
    updateMeeting: protectedProcedure
        .input(meetingUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const updatedMeeting = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id)
                    )
                ).returning()
            if (!updatedMeeting) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Meeting not found'
                })
            }
            return updatedMeeting;
        })
})