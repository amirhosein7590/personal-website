"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "../trpc/client";
import { useState } from "react";
import { makeQueryClient } from "@/trpc/queryClient";

let browserQueryClient: ReturnType<typeof makeQueryClient>

function getQueryClient() {
    if (typeof window == "undefined") {
        return makeQueryClient();
    }

    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient
}

export function TrpcProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                    transformer: superjson,
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}