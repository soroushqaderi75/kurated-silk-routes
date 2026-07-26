"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  if (!visible) return null;


  return (
    <button
      onClick={scrollTop}
      className="
        fixed
        bottom-8
        left-8
        z-50
        flex
        h-10
        items-center
        gap-2
        border
        border-black/15
        bg-white
        px-4
        text-[11px]
        text-black
        transition-all
        duration-300
        hover:bg-black
        hover:text-white
      "
    >

      <span>
        ↑
      </span>

      <span>
        بازگشت به بالا
      </span>

    </button>
  );
}