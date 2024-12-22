import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});
const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;
    //db

    return {
      id: "1",
      title,
      description,
    };
  }),
});
const server = createHTTPServer({
  router: appRouter,
  createContext: (opts) => {
    const authToken = opts.req.headers["authorization"];
    //jwt
    return {
      userId: "1",
    };
  },
});
server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
