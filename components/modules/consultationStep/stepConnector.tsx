'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface StepConnectorProps {
    index: number;
    isMobile?: boolean;
}

export const StepConnector = memo(({ index, isMobile = false }: StepConnectorProps) => {
    const height = isMobile ? 'h-[1.5px]' : 'h-[2px]';
    const dotSize = isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5';

    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: index * 0.12 + 0.08 }}
            className={`flex-1 mx-1 md:mx-3 relative ${height}`}
        >
            <div className={`absolute inset-0 border-t-2 border-dashed border-white/10 ${isMobile ? 'border-t' : ''}`} />
            
            {!isMobile && (
                <>
                    <div className={`absolute -top-1.5 left-1/4 ${dotSize} rounded-full bg-white/5`} />
                    <div className={`absolute -top-1.5 left-2/4 ${dotSize} rounded-full bg-white/5`} />
                    <div className={`absolute -top-1.5 left-3/4 ${dotSize} rounded-full bg-white/5`} />
                </>
            )}

            <motion.div
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: isMobile ? 2 : 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className={`absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent ${isMobile ? 'via-accent-blue/20' : ''}`}
            />
        </motion.div>
    );
})