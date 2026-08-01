'use client';

import { motion } from 'framer-motion';
import { Step } from '@/types/ui/step';

interface StepCircleProps {
    step: Step;
    index: number;
    isMobile?: boolean;
}

export function StepCircle({ step, index, isMobile = false }: StepCircleProps) {
    const Icon = step.icon;
    const size = isMobile ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16';
    const iconSize = isMobile ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6';
    const numberSize = isMobile ? 'w-4 h-4 text-[8px] -top-0.5 -right-0.5' : 'w-5 h-5 text-[10px] -top-1 -right-1';

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: index * 0.12,
                type: 'spring',
                stiffness: 200,
                damping: 20,
            }}
            className="flex flex-col items-center relative z-10 group"
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                className={`relative ${size} rounded-full flex items-center justify-center bg-gradient-to-br from-bg-card to-bg-dark border-2 border-white/10 group-hover:border-accent-blue/50 transition-all duration-300 shadow-lg shadow-black/20`}
            >
                <Icon className={`${iconSize} text-slate-400 group-hover:text-white transition-colors duration-300`} />
                
                <span className={`absolute ${numberSize} rounded-full bg-bg-dark border border-white/10 font-medium text-slate-500 flex items-center justify-center`}>
                    {index + 1}
                </span>
            </motion.div>

            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 + 0.15 }}
                    className="mt-3 text-center"
                >
                    <p className="text-xs md:text-sm font-semibold text-white/90 whitespace-nowrap">
                        {step.label}
                    </p>
                    <p className="text-[10px] mt-1.5 md:text-xs text-slate-500 hidden md:block">
                        {step.description}
                    </p>
                </motion.div>
            )}

            {isMobile && (
                <span className="mt-1.5 text-[8px] font-medium text-white/70 whitespace-nowrap">
                    {step.label}
                </span>
            )}
        </motion.div>
    );
}