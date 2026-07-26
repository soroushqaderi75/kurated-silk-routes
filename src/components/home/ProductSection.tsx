"use client";

import {
  type PointerEvent,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/home/ProductCard";
import ViewAllCard from "@/components/home/ViewAllCard";
import {
  sampleProducts,
  type ProductSectionData,
} from "@/data/home";

export default function ProductSection({
  title,
  description,
}: ProductSectionData) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const dragData = useRef({
    startX: 0,
    startScrollLeft: 0,
  });

  const [isDragging, setIsDragging] =
    useState(false);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("button, a")) {
      return;
    }

    setIsDragging(true);

    dragData.current = {
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    };

    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const container = scrollRef.current;

    if (!container || !isDragging) {
      return;
    }

    event.preventDefault();

    const distance =
      event.clientX - dragData.current.startX;

    container.scrollLeft =
      dragData.current.startScrollLeft - distance;
  };

  const stopDragging = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const container = scrollRef.current;

    setIsDragging(false);

    if (
      container &&
      container.hasPointerCapture(event.pointerId)
    ) {
      container.releasePointerCapture(
        event.pointerId,
      );
    }
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
      }}
      dir="rtl"
      className="
        border-b
        border-black/10
        bg-[#F7F4EE]
        py-12
        sm:py-14
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[1600px]
          px-5
          sm:px-8
          lg:px-14
        "
      >
        <h2
          className="
            text-[21px]
            font-normal
            text-neutral-950
            sm:text-[25px]
            lg:text-[28px]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            max-w-xl
            text-[11px]
            leading-6
            text-neutral-500
            sm:text-xs
          "
        >
          {description}
        </p>
      </div>

      <div
        ref={scrollRef}
        dir="rtl"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={() =>
          setIsDragging(false)
        }
        className={`
          miwani-product-scroll
          mx-auto
          mt-7
          flex
          max-w-[1600px]
          flex-row
          items-stretch
          gap-4
          overflow-x-auto
          px-5
          pb-1
          sm:mt-9
          sm:gap-5
          sm:px-8
          lg:px-14
          ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
          }
        `}
      >
        {sampleProducts.map((product) => (
          <ProductCard
            key={`${title}-${product.id}`}
            product={product}
          />
        ))}

        <ViewAllCard title={title} />
      </div>
    </motion.section>
  );
}