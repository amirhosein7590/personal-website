"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { testimonials } from "@/constants/testimonials";
import TestimonialCard from "../../modules/card/TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

const swiperConfig = {
    modules: [Autoplay, Navigation],
    spaceBetween: 24,
    slidesPerView: 1,
    breakpoints: {
        640: { spaceBetween: 20 },
        768: { spaceBetween: 24 },
        1024: { spaceBetween: 28 },
        1280: { spaceBetween: 30 },
    },
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: ".testimonial-next",
        prevEl: ".testimonial-prev",
    }
};


function TestimonialsSlider() {
    return (
        <div className="relative w-full mt-auto">
            <Swiper {...swiperConfig} className="w-full rounded-2xl">
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide className="rounded-2xl" key={index}>
                        <TestimonialCard {...testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="testimonial-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 cursor-pointer bg-slate-900/80 p-2 rounded-full border border-slate-700 hidden md:flex items-center justify-center hover:bg-slate-800 transition">
                <ChevronLeft className="text-accent-purple" size={24} />
            </div>
            <div className="testimonial-next absolute top-1/2 right-0 -translate-y-1/2 z-10 cursor-pointer bg-slate-900/80 p-2 rounded-full border border-slate-700 hidden md:flex items-center justify-center hover:bg-slate-800 transition">
                <ChevronRight className="text-accent-purple" size={24} />
            </div>
        </div>
    );
}

export default memo(TestimonialsSlider);