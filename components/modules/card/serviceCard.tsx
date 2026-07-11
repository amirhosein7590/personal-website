type ServiceCardProps = {
    color: string,
    title: string,
    description: string,
    children: React.ReactNode,
}

function ServiceCard({ color, title, description, children }: ServiceCardProps) {
    const getHoverColorClass = (color: string) => {
        const colorMap: Record<string, string> = {
            'text-blue-500': 'group-hover:text-blue-500',
            'text-purple-500': 'group-hover:text-purple-500',
            'text-emerald-500': 'group-hover:text-emerald-500',
            'text-amber-500': 'group-hover:text-amber-500',
        };
        return colorMap[color] || 'group-hover:text-blue-500';
    };


    return (
        <div className="group bg-[rgba(17,23,38,0.7)] border-[rgba(255,255,255,0.05)] border backdrop-blur[12px] hover:bg-slate-800/60 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between min-h-70 border border-slate-800">
            <div className="space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-amber-500/10 ${color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {children}
                </div>
                <h3 className={`text-xl font-bold ${getHoverColorClass(color)} transition-colors`}>{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed" data-key="srv4Desc">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard