export type Icon = "MonitorSmartphone" | "Tangent" | "Server" | "ChartLine"
export type TServiceCard = {
    key: string,
    icon: Icon
    color: string
}



export const servicesCard: TServiceCard[] = [
    {
        key: "ApplicationDevelopment",
        icon: "MonitorSmartphone",
        color: "text-blue-500"
    },
    {
        key: "UserInterfaceDesign",
        icon: "Tangent",
        color: "text-purple-500"
    },
    {
        key: "BackendDevelopment",
        icon: "Server",
        color: "text-emerald-500"
    },
    {
        key: "OptimizationConsulting",
        icon: "ChartLine",
        color: "text-amber-500"
    }
]