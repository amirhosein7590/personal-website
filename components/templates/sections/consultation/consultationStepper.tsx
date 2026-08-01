'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    User,
    Calendar,
    MessageCircle,
    ShieldCheck,
    CheckCircle
} from 'lucide-react';
import { Step } from '@/types/ui/step';
import { StepCircle } from '../../../modules/consultationStep/stepCircle';
import { StepConnector } from '../../../modules/consultationStep/stepConnector';
import { StepBadge } from '../../../modules/consultationStep/stepBadge';
import { memo } from 'react';

export const ConsultationStepper = memo(() => {
    const t = useTranslations('HomePage');

    const steps: Step[] = [
        {
            id: 0,
            icon: User,
            label: t('Consultation.stepper.step1.label'),
            description: t('Consultation.stepper.step1.description'),
        },
        {
            id: 1,
            icon: Calendar,
            label: t('Consultation.stepper.step2.label'),
            description: t('Consultation.stepper.step2.description'),
        },
        {
            id: 2,
            icon: MessageCircle,
            label: t('Consultation.stepper.step3.label'),
            description: t('Consultation.stepper.step3.description'),
        },
        {
            id: 3,
            icon: ShieldCheck,
            label: t('Consultation.stepper.step4.label'),
            description: t('Consultation.stepper.step4.description'),
        },
        {
            id: 4,
            icon: CheckCircle,
            label: t('Consultation.stepper.step5.label'),
            description: t('Consultation.stepper.step5.description'),
        },
    ];

    return (
        <div className="w-full py-4 px-2 sm:px-4 md:px-8">
            <div className="relative max-w-5xl mx-auto">
                <div className="hidden sm:flex items-start justify-between">
                    {steps.map((step, index) => {
                        const isLast = index === steps.length - 1;

                        return (
                            <div key={step.id} className="flex items-start flex-1 min-w-0">
                                <StepCircle step={step} index={index} />
                                {!isLast && <StepConnector index={index} />}
                            </div>
                        );
                    })}
                </div>

                <div className="sm:hidden overflow-x-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="flex items-center gap-3 min-w-max">
                        {steps.map((step, index) => {
                            const isLast = index === steps.length - 1;

                            return (
                                <div key={step.id} className="flex items-center flex-shrink-0">
                                    <StepCircle step={step} index={index} isMobile={true} />
                                    {!isLast && (
                                        <div className="w-8 mx-1">
                                            <StepConnector index={index} isMobile={true} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <StepBadge />
            </div>
        </div>
    );
});