// import { createTRPCRouter } from "@/trpc/init";
// import { agentsRouter } from "./server/procedure";
// AppRouter

// export const appRouter = createTRPCRouter({
    //     agents: agentsRouter
    // })
    
    // // export type defination of API 
// export type AppRouter = typeof appRouter;

import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
 
export type MeetingGetOne = inferRouterOutputs<AppRouter>['meetings']['getOne'];