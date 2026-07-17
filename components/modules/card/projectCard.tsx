'use client';

import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '../button';
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface ProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt?: string;
    technologies: string[];
    type: string
    link?: string;
    className?: string;
    cardHeight?: number;
    locale: string,
    viewProjectBtnText: string
}

function ProjectCard({
    title,
    description,
    imageSrc,
    imageAlt = '',
    technologies,
    type,
    link,
    className = '',
    cardHeight = 320,
    locale,
    viewProjectBtnText
}: ProjectCardProps) {
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const controls = useAnimation();

    const [dimensions, setDimensions] = useState({
        containerHeight: cardHeight,
        imageHeight: 0,
    });

    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;
        console.log(img.clientHeight);

        const updateDimensions = () => {
            if (imageContainerRef.current && img) {
                const containerHeight = imageContainerRef.current.clientHeight || cardHeight;
                const imageHeight = img.clientHeight || 0;
                setDimensions({ containerHeight, imageHeight });
            }
        };

        if (img.complete) {
            updateDimensions();
        } else {
            img.addEventListener('load', updateDimensions);
            return () => img.removeEventListener('load', updateDimensions);
        }
    }, [cardHeight, imageSrc]);

    const handleImageMouseEnter = useCallback(() => {
        const { containerHeight, imageHeight } = dimensions;
        if (imageHeight > containerHeight) {
            const scrollDistance = imageHeight - containerHeight;
            controls.start({
                y: -scrollDistance,
                transition: {
                    duration: 2.5,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            });
        }
    }, [dimensions, controls]);

    const handleImageMouseLeave = useCallback(() => {
        controls.start({
            y: 0,
            transition: {
                duration: 2.0,
                ease: [0.25, 0.1, 0.25, 1],
            },
        });
    }, [controls]);
    return (
        <div
            className={`
        flex
        flex-col
        bg-[#111726]
        rounded-2xl
        overflow-hidden
        border border-slate-800
        hover:border-slate-700
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        ${className}
    `}
        >
            <div
                style={{ maxHeight: `${cardHeight}px` }}
                ref={imageContainerRef}
                className="relative overflow-hidden"
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
            >
                <motion.img
                    ref={imageRef}
                    src={imageSrc}
                    alt={imageAlt || title}
                    animate={controls}
                    initial={{ y: 0 }}
                    className="w-full h-auto block"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#111726] to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">

                <div className="flex items-start justify-between gap-4">

                    <h3 className="text-2xl font-bold text-white">
                        {title}
                    </h3>

                    <span
                        className="
                        shrink-0
                        rounded-full
                        border
                        border-blue-500/30
                        bg-blue-500/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-blue-300
                    "
                    >
                        {type}
                    </span>

                </div>


                <p className="
                mt-5
                text-sm
                leading-7
                text-slate-400
                line-clamp-3
            ">
                    {description}
                </p>


                <div className="mt-6">

                    <span className="text-xs uppercase tracking-wider text-slate-500">
                        Tech Stack
                    </span>

                    <div className="mt-3 flex flex-wrap gap-2">

                        {technologies.map((tech, idx) => (

                            <span
                                key={idx}
                                className="
                                rounded-full
                                border
                                border-slate-700
                                bg-slate-800/50
                                px-3
                                py-1
                                text-xs
                                text-slate-300
                            "
                            >
                                {tech}
                            </span>

                        ))}

                    </div>

                </div>


                {link && (

                    <div className="mt-auto pt-7">

                        <Button
                            href={link}
                            target="_blank"
                            className="
                            inline-flex
                            items-center
                            text-blue-400
                            hover:text-blue-300
                            transition-colors
                        "
                        >
                            {viewProjectBtnText}

                            {locale === "fa" ? (
                                <ArrowLeft className="w-4 h-4 mr-2" />
                            ) : (
                                <ArrowRight className="w-4 h-4 ml-2" />
                            )}

                        </Button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default memo(ProjectCard)