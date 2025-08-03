import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/agents/server/procedure';
import { meetingRouter } from '@/modules/meetings/servers/procedures';
export const AppRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingRouter
});
// export type definition of API
export type AppRouter = typeof AppRouter;