"use client";


type Product = {
  brand: string;
  name: string;
  size: string;
  condition: string;
  price: string;
};


export default function ProductCard({
  product,
}: {
  product: Product;
}) {

  return (

    <article
      className="
        group
        relative
      "
    >


      {/* Product Image */}

      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          bg-[#eeeeee]
        "
      >


{/* Hover Actions */}

{/* Wishlist */}
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


{/* Cart */}

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
        className="h-[18px] w-[18px] -scale-x-100"
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
        {/* Hover Information */}

        <div
          className="
            absolute
            bottom-0
            right-0
            left-0
            z-10
            bg-gradient-to-t
            from-black/45
            to-transparent
            px-5
            pb-5
            pt-14
            text-white
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >

          <p
            className="
              text-[13px]
              font-medium
            "
          >
            {product.brand}
          </p>


          <p
            className="
              mt-2
              text-[12px]
            "
          >
            سایز: {product.size}
          </p>


          <p
            className="
              mt-1
              text-[12px]
            "
          >
            {product.condition}
          </p>


        </div>


      </div>



      {/* Product Info */}

      <div
        className="
          mt-4
          text-right
        "
      >

        <p
          className="
            text-[11px]
            text-black/45
          "
        >
          {product.brand}
        </p>


        <h3
          className="
            mt-1
            text-[13px]
            text-black
          "
        >
          {product.name}
        </h3>


        <p
          className="
            mt-3
            text-[13px]
            font-medium
          "
        >
          {product.price}
        </p>


      </div>


    </article>

  );
}




function HeartIcon(){

  return (

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >

      <path
        d="
          M20.8 4.6
          C18.5 2.3 14.8 3 12 6
          C9.2 3 5.5 2.3 3.2 4.6
          C0.8 7 1.4 10.7 4 13.3
          L12 21
          L20 13.3
          C22.6 10.7 23.2 7 20.8 4.6
          Z
        "
        stroke="currentColor"
        strokeWidth="1.5"
      />

    </svg>

  );

}




function CartIcon(){

  return (

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >

      <path
        d="
          M3 5H5L7 15
          C7.2 16 8 16.5 9 16.5
          H18
          C19 16.5 19.5 15.8 20 14
          L21 10H6
        "
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />


      <circle
        cx="9"
        cy="20"
        r="1"
        fill="currentColor"
      />


      <circle
        cx="18"
        cy="20"
        r="1"
        fill="currentColor"
      />


    </svg>

  );

}