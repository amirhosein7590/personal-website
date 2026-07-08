import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type User = {
    fullName : "amirhosein",
    phone : "09975448596",
}

export async function POST(req: NextRequest) {
    try {
        const newUser = await req.json()

        if (!newUser?.username || !newUser?.password || !newUser?.fullName) {
            return Response.json({ error: "some inputs is not seneded" }, { status: 422 })
        }

        const user = await prisma.user.create({
            data: newUser
        })
        return Response.json({ message: "user created successfully", user }, { status: 201 })
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 400 })
    }
}