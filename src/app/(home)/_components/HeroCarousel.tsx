"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

function HeroCarousel() {
    return (
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
            className="w-full "
        >
            <CarouselContent className="-ml-0 ">
                {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className="h-[350px] pl-0">
                        <Image
                            className="h-full w-full object-fill"
                            alt={`Carousel banner ${index + 1}`}
                            src={`/assets/carousel-${index + 1}.png`}
                            width={1000}
                            height={300}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default HeroCarousel
