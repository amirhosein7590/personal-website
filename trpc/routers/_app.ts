import { router } from "../init"
import reservationRouter from "./reservation"

export const appRouter = router({
    reservation : reservationRouter
})

export type AppRouter = typeof appRouter