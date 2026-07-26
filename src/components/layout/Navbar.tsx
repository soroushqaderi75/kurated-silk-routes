import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import HeaderActions from "@/components/layout/HeaderActions";

const categories = [
  {
    label: "زنانه",
    href: "/women",
  },
  {
    label: "مردانه",
    href: "/men",
  },
  {
    label: "کیف",
    href: "/categories/bags",
  },
  {
    label: "کفش",
    href: "/categories/shoes",
  },
  {
    label: "اکسسوری",
    href: "/categories/accessories",
  },
  {
    label: "تازه رسیده‌ها",
    href: "/new-arrivals",
  },
  {
    label: "پیشنهادهای ویژه",
    href: "/offers",
  },
  {
    label: "برندها",
    href: "/brands",
  },
];

export default function Navbar() {
  return (
    <header
  dir="rtl"
  className="
    sticky
    top-0
    z-50
    w-full
    bg-white
    text-black
  "
>
      {/* Main Header */}
      <div
        className="
          mx-auto
          flex
          h-14
          max-w-[1600px]
          items-center
          justify-between
          gap-4
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="MIWANI"
          className="
            flex
            shrink-0
            items-center
          "
        >
          <Image
            src="/brand/miwani.svg"
            alt="MIWANI"
            width={180}
            height={60}
            priority
            className="
              h-auto
              w-[130px]
              sm:w-[145px]
              lg:w-[165px]
            "
          />
        </Link>


        {/* Search */}
        <form
          action="/search"
          role="search"
          className="
            hidden
            flex-1
            md:flex
            md:max-w-[430px]
            lg:max-w-[520px]
          "
        >
          <div
            className="
              flex
              h-9
              w-full
              items-center
              rounded-full
              border
              border-black/10
              bg-neutral-50
              px-4
              transition-all
              duration-300
              focus-within:border-black/40
              focus-within:bg-white
            "
          >
            <Search
              size={16}
              strokeWidth={1.5}
              className="text-black/50"
            />

            <input
              name="q"
              type="search"
              placeholder="جستجو در MIWANI"
              className="
                mr-3
                h-full
                flex-1
                bg-transparent
                text-[12px]
                text-black
                outline-none
                placeholder:text-black/40
              "
            />
          </div>
        </form>


        {/* Actions */}
        <HeaderActions />
      </div>


      {/* Mobile Search */}
      <div
        className="
          px-5
          pb-3
          md:hidden
        "
      >
        <form action="/search">
          <div
            className="
              flex
              h-9
              w-full
              items-center
              rounded-full
              border
              border-black/10
              bg-neutral-50
              px-4
            "
          >
            <Search
              size={15}
              strokeWidth={1.5}
              className="text-black/50"
            />

            <input
              name="q"
              type="search"
              placeholder="جستجو در MIWANI"
              className="
                mr-3
                h-full
                flex-1
                bg-transparent
                text-[12px]
                outline-none
                placeholder:text-black/40
              "
            />
          </div>
        </form>
      </div>


      {/* Categories */}
      <nav
        aria-label="دسته بندی"
        className="
          border-y
          border-black/10
          bg-white
        "
      >
        <div
          className="
            mx-auto
            flex
            h-9
            max-w-[1600px]
            items-center
            justify-center
            gap-7
            overflow-x-auto
            px-5
            text-[11px]
            text-black/70
            scrollbar-none
            lg:gap-9
          "
        >
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="
                relative
                flex
                h-full
                shrink-0
                items-center
                transition-colors
                duration-200
                hover:text-black
                after:absolute
                after:bottom-0
                after:right-0
                after:h-px
                after:w-0
                after:bg-black
                after:transition-all
                duration-300
                hover:after:w-full
              "
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>

    </header>
  );
}