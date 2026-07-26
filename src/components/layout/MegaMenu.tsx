"use client";

import { useState } from "react";
import Link from "next/link";


type MegaMenuItem = {
  label: string;
  href: string;
};


type MegaMenuProps = {
  title: string;
  items: MegaMenuItem[];
};


export default function MegaMenu({
  title,
  items,
}: MegaMenuProps) {

  const [open, setOpen] = useState(false);


  return (

    <div
      className="
        relative
        flex
        h-full
        items-center
      "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >


      {/* Category title */}

      <button
        className="
          flex
          h-full
          items-center
          text-[11px]
          text-black/70
          transition-colors
          hover:text-black
        "
      >

        {title}

        <span
          className="
            mr-1
            text-[9px]
            text-black/40
          "
        >
          ⌄
        </span>

      </button>




      {/* Dropdown */}

      <div
        className={`
          absolute
          right-1/2
          top-full
          z-50
          w-[650px]
          translate-x-1/2

          bg-white

          px-10
          py-8

          shadow-[0_10px_35px_rgba(0,0,0,0.06)]

          transition-all
          duration-300
          ease-out

          ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >


        <h3
          className="
            mb-6
            text-right
            text-[14px]
            font-medium
            text-black
          "
        >
          {title}
        </h3>



        <div
          className="
            grid
            grid-cols-3
            gap-x-8
            gap-y-5
            text-right
          "
        >

          {items.map((item)=>(

            <Link
  key={item.href}
  href={item.href}
  onClick={() => setOpen(false)}
  className="
    text-[12px]
    text-black/55
    transition-colors
    hover:text-black
  "
>
  {item.label}
</Link>

          ))}


        </div>


      </div>


    </div>

  );
}