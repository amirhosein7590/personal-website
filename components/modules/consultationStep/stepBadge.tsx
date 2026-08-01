'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const StepBadge = memo(() => {
    const t = useTranslations('HomePage');

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 text-center"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-white/5">
                <span className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">
                    {t('Consultation.stepper.free_badge')}
                </span>
                <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-accent-purple/50" />
                <span className="text-[10px] sm:text-xs text-accent-blue font-medium whitespace-nowrap">
                    {t('Consultation.stepper.duration')}
                </span>
            </div>
        </motion.div>
    );
})