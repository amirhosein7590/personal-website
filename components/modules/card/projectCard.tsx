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
    viewProjectBtnText : string
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
        flex flex-col md:flex-row 
        bg-[#111726] rounded-2xl overflow-hidden 
        shadow-lg hover:shadow-2xl transition-shadow duration-300
        ${className}
      `}
        >
            <div
                ref={imageContainerRef}
                className="md:w-2/5 lg:w-2/5 relative overflow-hidden shrink-0"
                style={{ height: `${cardHeight}px` }}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
            >
                <motion.img
                    ref={imageRef}
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="w-full h-auto block"
                    animate={controls}
                    initial={{ y: 0 }}
                />
            </div>

            <div className="flex-1 -mt-30 lg:mt-0 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
                    <span className='inline-block text-sm mt-2'>{type}</span>
                    <p className="text-gray-400 text-sm leading-relaxed my-5 md:mb-4">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-700/40 text-gray-300 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-gray-700/30"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    {link && (
                        <Button
                            href={link}
                            target="_blank"
                            className="text-blue-500 cursor-pointer text-sm flex items-center"
                        >
                            {locale == "fa" ? <ArrowLeft className='w-4 h-4 mr-3 mt-0.5 order-2' /> : <ArrowRight className='w-4 h-4 ml-3 mt-0.5 order-2' />} {viewProjectBtnText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(ProjectCard)