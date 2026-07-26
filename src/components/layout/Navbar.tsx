import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import MegaMenu from "@/components/layout/MegaMenu";
import HeaderActions from "@/components/layout/HeaderActions";


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
            px-5
            text-[11px]
            text-black/70
            lg:gap-9
          "
        >



          <MegaMenu
            title="زنانه"
            items={[
              {
                label:"تیشرت",
                href:"/products?category=women-tshirt",
              },
              {
                label:"پیراهن",
                href:"/products?category=women-dress",
              },
              {
                label:"شومیز و بلوز",
                href:"/products?category=women-blouse",
              },
              {
                label:"شلوار",
                href:"/products?category=women-pants",
              },
              {
                label:"دامن",
                href:"/products?category=women-skirt",
              },
              {
                label:"کت و ژاکت",
                href:"/products?category=women-jacket",
              },
              {
                label:"مانتو و پالتو",
                href:"/products?category=women-coat",
              },
              {
                label:"لباس مجلسی",
                href:"/products?category=women-party",
              },
            ]}
          />




          <MegaMenu
            title="مردانه"
            items={[
              {
                label:"تیشرت",
                href:"/products?category=men-tshirt",
              },
              {
                label:"پیراهن",
                href:"/products?category=men-shirt",
              },
              {
                label:"پولوشرت",
                href:"/products?category=men-polo",
              },
              {
                label:"هودی و سویشرت",
                href:"/products?category=men-hoodie",
              },
              {
                label:"شلوار",
                href:"/products?category=men-pants",
              },
              {
                label:"کت و ژاکت",
                href:"/products?category=men-jacket",
              },
              {
                label:"کاپشن",
                href:"/products?category=men-coat",
              },
            ]}
          />





          <MegaMenu
            title="کیف"
            items={[
              {
                label:"کیف دستی",
                href:"/products?category=handbag",
              },
              {
                label:"کیف دوشی",
                href:"/products?category=shoulder-bag",
              },
              {
                label:"کیف پول",
                href:"/products?category=wallet",
              },
              {
                label:"کوله پشتی",
                href:"/products?category=backpack",
              },
              {
                label:"کیف لپ‌تاپ",
                href:"/products?category=laptop-bag",
              },
            ]}
          />





          <MegaMenu
            title="کفش"
            items={[
              {
                label:"کتانی",
                href:"/products?category=sneakers",
              },
              {
                label:"کفش رسمی",
                href:"/products?category=formal-shoes",
              },
              {
                label:"بوت",
                href:"/products?category=boots",
              },
              {
                label:"نیم‌بوت",
                href:"/products?category=ankle-boots",
              },
              {
                label:"صندل",
                href:"/products?category=sandals",
              },
            ]}
          />





          <MegaMenu
            title="اکسسوری"
            items={[
              {
                label:"عینک",
                href:"/products?category=glasses",
              },
              {
                label:"ساعت",
                href:"/products?category=watches",
              },
              {
                label:"کمربند",
                href:"/products?category=belts",
              },
              {
                label:"کلاه",
                href:"/products?category=hats",
              },
              {
                label:"شال و روسری",
                href:"/products?category=scarves",
              },
              {
                label:"زیورآلات",
                href:"/products?category=jewelry",
              },
            ]}
          />





          <Link
            href="/new-arrivals"
            className="
              transition-colors
              hover:text-black
            "
          >
            تازه رسیده‌ها
          </Link>



          <Link
            href="/offers"
            className="
              transition-colors
              hover:text-black
            "
          >
            پیشنهادهای ویژه
          </Link>



          <Link
            href="/brands"
            className="
              transition-colors
              hover:text-black
            "
          >
            برندها
          </Link>



        </div>

      </nav>


    </header>

  );
}