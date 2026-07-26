import Image from "next/image";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

export default function Navbar() {
  return (
    <header
      dir="rtl"
      className="
        w-full
        border-b
        border-black/10
        bg-white
      "
    >
      {/* Top Header */}
      <div
        className="
          flex
          h-16
          items-center
          justify-between
          px-5
          md:px-8
          lg:px-10
        "
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Image
            src="/brand/miwani.svg"
            alt="MIWANI"
            width={170}
            height={55}
            priority
            className="
              h-auto
              w-[135px]
              md:w-[155px]
              lg:w-[170px]
            "
          />
        </div>

        {/* Search */}
        <div
          className="
            hidden
            h-9
            w-[320px]
            items-center
            rounded-full
            bg-[#f5f5f5]
            px-4
            text-gray-500
            md:flex
            lg:w-[420px]
          "
        >
          <Search size={17} strokeWidth={1.7} />

          <span className="mr-2.5 text-[12px]">
            جستجو در MIWANI
          </span>
        </div>

        {/* Actions */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-4
            lg:gap-5
          "
        >
          {/* Login */}
          <button
            type="button"
            className="
              flex
              items-center
              gap-1.5
              text-[12px]
              transition
              hover:opacity-60
            "
          >
            <UserRound size={17} strokeWidth={1.7} />

            <span className="hidden sm:inline">
              ورود | ثبت نام
            </span>

            <ArrowLeft
              className="hidden sm:block"
              size={14}
              strokeWidth={1.7}
            />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            aria-label="علاقه‌مندی‌ها"
            className="
              transition
              hover:opacity-60
            "
          >
            <Heart size={20} strokeWidth={1.7} />
          </button>

          {/* Shopping Bag */}
          <button
            type="button"
            aria-label="سبد خرید"
            className="
              transition
              hover:opacity-60
            "
          >
            <ShoppingBag size={20} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* Category Menu */}
      <nav
        className="
          flex
          h-9
          items-center
          justify-start
          gap-7
          overflow-x-auto
          whitespace-nowrap
          border-t
          border-black/10
          px-5
          text-[12px]
          scrollbar-none
          md:justify-center
          md:px-8
          lg:gap-9
        "
      >
        <span className="cursor-pointer transition hover:opacity-60">
          زنانه
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          مردانه
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          کیف
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          کفش
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          اکسسوری
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          تازه رسیده‌ها
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          پیشنهادهای ویژه
        </span>

        <span className="cursor-pointer transition hover:opacity-60">
          برندها
        </span>
      </nav>
    </header>
  );
}