"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { brands } from "@/data/home";

export default function BrandsSection() {
  const firstRowBrands = brands.slice(0, 4);
  const secondRowBrands = brands.slice(4);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      dir="rtl"
      className="
        bg-white
        px-5
        py-10
        sm:px-8
        sm:py-12
        lg:px-14
        lg:py-14
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

        <div
          className="
            mt-7
            grid
            grid-cols-2
            border-r
            border-t
            border-black/15
            sm:grid-cols-4
            lg:mt-8
          "
        >
          {firstRowBrands.map((brand) => (
            <BrandCard
              key={brand.slug}
              brand={brand}
            />
          ))}

          <Link
            href="/brands"
            aria-label="مشاهده همه برندها"
            className="
              group
              relative
              flex
              min-h-[145px]
              items-center
              justify-center
              overflow-hidden
              border-b
              border-l
              border-black/15
              bg-white
              px-5
              transition-all
              duration-300
              hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.65)]
              sm:min-h-[165px]
              lg:min-h-[185px]
            "
          >
            <div
  className="
    flex
    items-center
    justify-center
    text-center
  "
>
  <span
    className="
      text-[17px]
      font-light
      text-black
      transition-colors
      duration-300
      group-hover:text-black
      sm:text-[18px]
      lg:text-[20px]
    "
  >
    مشاهده همه 
  </span>
</div>
          </Link>

          {secondRowBrands.map((brand) => (
            <BrandCard
              key={brand.slug}
              brand={brand}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

type BrandCardProps = {
  brand: {
    name: string;
    slug: string;
    logo: string;
  };
};

function BrandCard({
  brand,
}: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      aria-label={`مشاهده محصولات برند ${brand.name}`}
      className="
        group
        relative
        flex
        min-h-[145px]
        items-center
        justify-center
        overflow-hidden
        border-b
        border-l
        border-black/15
        bg-white
        px-5
        transition-all
        duration-300
        hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.65)]
        sm:min-h-[165px]
        lg:min-h-[185px]
      "
    >
      <Image
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={260}
        height={120}
        className="
          h-auto
          max-h-[76px]
          w-auto
          max-w-[175px]
          object-contain
          grayscale
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:grayscale-0
          sm:max-h-[84px]
          sm:max-w-[195px]
          lg:max-h-[92px]
          lg:max-w-[220px]
        "
      />
    </Link>
  );
}