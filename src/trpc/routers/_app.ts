import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/agents/server/procedure';
export const AppRouter = createTRPCRouter({
  agents: agentsRouter
});
// export type definition of API
export type AppRouter = typeof AppRouter;