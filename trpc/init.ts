import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function createTRPCContext() {
    const cookieStore = cookies();
    const locale = (await cookieStore).get("NEXT_LOCALE")?.value || "fa";

    return {
        prisma,
        locale
    }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
    transformer: superjson
})

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware