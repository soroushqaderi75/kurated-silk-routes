"use client";

import type { PointerEvent } from "react";
import type { ProductData } from "@/data/home";

type ProductCardProps = {
  product: ProductData;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const stopDrag = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
  };

  return (
    <article
      dir="rtl"
      className="
        group
        w-[58vw]
        max-w-[220px]
        flex-none
        select-none
        sm:w-[210px]
        lg:w-[225px]
      "
    >
      <div
        className="
          relative
          aspect-[3/4]
          w-full
          overflow-hidden
          bg-[#dedbd4]
        "
      >
        {/* تصویر موقت محصول */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-[#dedbd4]
            text-[10px]
            tracking-[0.08em]
            text-neutral-500
            transition-all
            duration-500
            ease-out
            group-hover:scale-[1.01]
            group-hover:blur-[0.5px]
          "
        >
          تصویر محصول
        </div>

        {/* لایه روشن روی تصویر هنگام Hover */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-white/0
            transition-colors
            duration-500
            group-hover:bg-white/35
          "
        />

        {/* دکمه علاقه‌مندی */}
        <div
          className="
            absolute
            left-3
            top-3
            z-30
            opacity-0
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <div className="group/favourite relative">
            <button
              type="button"
              aria-label="افزودن به علاقه‌مندی‌ها"
              onPointerDown={stopDrag}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/95
                text-neutral-900
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-105
                hover:bg-black
                hover:text-white
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-[15px] w-[15px]"
              >
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className="
                pointer-events-none
                absolute
                left-[calc(100%+8px)]
                top-1/2
                z-40
                -translate-y-1/2
                translate-x-1
                whitespace-nowrap
                rounded-sm
                bg-black
                px-2.5
                py-1.5
                text-[9px]
                text-white
                opacity-0
                shadow-md
                transition-all
                duration-200
                group-hover/favourite:translate-x-0
                group-hover/favourite:opacity-100
              "
            >
              افزودن به علاقه‌مندی‌ها

              <span
                className="
                  absolute
                  right-full
                  top-1/2
                  -translate-y-1/2
                  border-y-[4px]
                  border-r-[5px]
                  border-y-transparent
                  border-r-black
                "
              />
            </div>
          </div>
        </div>

        {/* دکمه سبد خرید */}
        <div
          className="
            absolute
            right-3
            top-3
            z-30
            opacity-0
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <div className="group/cart relative">
            <button
              type="button"
              aria-label="افزودن به سبد خرید"
              onPointerDown={stopDrag}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/95
                text-neutral-900
                shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-105
                hover:bg-black
                hover:text-white
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-[16px] w-[16px]"
              >
                <path
                  d="M3 4h2l2.1 9.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M10 19.5a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM18 19.5a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div
              className="
                pointer-events-none
                absolute
                right-[calc(100%+8px)]
                top-1/2
                z-40
                -translate-y-1/2
                -translate-x-1
                whitespace-nowrap
                rounded-sm
                bg-black
                px-2.5
                py-1.5
                text-[9px]
                text-white
                opacity-0
                shadow-md
                transition-all
                duration-200
                group-hover/cart:translate-x-0
                group-hover/cart:opacity-100
              "
            >
              افزودن به سبد خرید

              <span
                className="
                  absolute
                  left-full
                  top-1/2
                  -translate-y-1/2
                  border-y-[4px]
                  border-l-[5px]
                  border-y-transparent
                  border-l-black
                "
              />
            </div>
          </div>
        </div>

        {/* اطلاعات محصول بدون کادر */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-10
            translate-y-3
            px-4
            pb-4
            pt-16
            text-black
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <div
            className="
              space-y-2.5
              text-[11.5px]
              text-black
              drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]
              sm:text-[12px]
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-black/65">
                برند
              </span>

              <span
                dir="ltr"
                className="font-medium text-black"
              >
                {product.brand}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-black/65">
                سایز
              </span>

              <span className="font-medium text-black">
                {product.size}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-black/65">
                وضعیت
              </span>

              <span className="font-medium text-black">
                {product.condition}
              </span>
            </div>
          </div>

          <span
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-black/20
              pt-3
              text-[11.5px]
              font-medium
              text-black
              sm:text-[12px]
            "
          >
            مشاهده محصول

            <span aria-hidden="true">
              ←
            </span>
          </span>
        </div>
      </div>

      {/* اطلاعات زیر کارت */}
      <div className="pt-3 text-right">
        <h3
          className="
            text-[12px]
            font-normal
            text-neutral-900
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-1
            text-[11px]
            text-neutral-700
          "
        >
          {product.price}
        </p>
      </div>
    </article>
  );
}