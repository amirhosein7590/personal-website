import { ShieldCheck, Layers, LifeBuoy, TrendingUp } from "lucide-react";
type FeatureKey = "CRO" | "PhasedDelivery" | "FreeSupport" | "BusinessFocus";

export interface FeatureItem {
    featureKey: FeatureKey;
    icon: React.ReactNode;
    iconBg: string;
}

export const features: FeatureItem[] = [
    {
        featureKey: "CRO",
        icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
        iconBg: "bg-blue-500/10 border-blue-500/20",
    },
    {
        featureKey: "PhasedDelivery",
        icon: <Layers className="w-5 h-5 text-purple-400" />,
        iconBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
        featureKey: "FreeSupport",
        icon: <LifeBuoy className="w-5 h-5 text-emerald-400" />,
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        featureKey: "BusinessFocus",
        icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
        iconBg: "bg-amber-500/10 border-amber-500/20",
    },
];