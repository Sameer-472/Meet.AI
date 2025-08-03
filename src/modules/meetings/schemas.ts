import z from "zod";

export const meetingInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instructions: z.string().min(1, { message: "Instructions is required" })
})

export const meetingUpdateSchema = meetingInsertSchema.extend({
    id: z.string().min(1 , {message: "Id is required"})
})