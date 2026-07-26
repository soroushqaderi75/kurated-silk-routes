"use client";

import { motion } from "framer-motion";
import { brands } from "@/data/home";

export default function BrandsSection() {
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
        amount: 0.18,
      }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
      }}
      dir="rtl"
      className="
        bg-[#ece8df]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-14
        lg:py-24
      "
    >
      <div className="mx-auto max-w-[1600px]">
        <h2
          className="
            text-[21px]
            font-normal
            text-neutral-950
            sm:text-[25px]
            lg:text-[28px]
          "
        >
          برندها
        </h2>

        <p
          className="
            mt-2
            text-[11px]
            leading-6
            text-neutral-500
            sm:text-xs
          "
        >
          جست‌وجوی محصولات بر اساس برند
        </p>

        <div
          className="
            mt-8
            grid
            grid-cols-2
            border-r
            border-t
            border-black/15
            sm:grid-cols-4
            lg:mt-10
          "
        >
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              dir="ltr"
              className="
                flex
                min-h-[85px]
                items-center
                justify-center
                border-b
                border-l
                border-black/15
                px-4
                font-sans
                text-xs
                tracking-[0.12em]
                text-neutral-800
                transition-colors
                duration-300
                hover:bg-black
                hover:text-white
                sm:min-h-[105px]
                sm:text-sm
                lg:min-h-[120px]
                lg:text-base
              "
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}