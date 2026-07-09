import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { prisma } from "@/lib/prisma";

export async function createTRPCContext() {
    return {
        prisma
    }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
    transformer: superjson
})

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware