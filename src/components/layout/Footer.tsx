"use client";

import Link from "next/link";

import {
  Truck,
  RotateCcw,
  BadgeCheck,
  Headphones,
} from "lucide-react";


const columns = [
  {
    title: "MIWANI",
    links: [
      "درباره MIWANI",
      "همکاری با ما",
      "تماس با ما",
    ],
  },

  {
    title: "راهنمای خرید",
    links: [
      "نحوه ثبت سفارش",
      "روش‌های ارسال",
      "شیوه‌های پرداخت",
      "پیگیری سفارش",
    ],
  },

  {
    title: "خدمات مشتریان",
    links: [
      "سوالات متداول",
      "قوانین و شرایط",
      "حریم خصوصی",
      "بازگشت کالا",
      "ضمانت اصالت",
    ],
  },

  {
    title: "دسته‌بندی‌ها",
    links: [
      "زنانه",
      "مردانه",
      "کفش",
      "کیف",
      "اکسسوری",
      "برندها",
    ],
  },
];


const trustItems = [
  {
    title: "ارسال سریع",
    text: "ارسال سفارش به سراسر ایران",
    icon: Truck,
  },

  {
    title: "ضمانت بازگشت",
    text: "بازگشت کالا طبق قوانین فروشگاه",
    icon: RotateCcw,
  },

  {
    title: "تضمین اصالت",
    text: "انتخاب دقیق محصولات برند",
    icon: BadgeCheck,
  },

  {
    title: "پشتیبانی مشتریان",
    text: "همراهی قبل و بعد از خرید",
    icon: Headphones,
  },
];


export default function Footer() {

  return (

    <footer
      dir="rtl"
      className="
        bg-white
        text-black
      "
    >
{/* Back To Top */}

<div
  className="
    mx-auto
    max-w-[1600px]
    flex
    justify-end
    px-5
    py-12
    sm:px-8
    lg:px-14
  "
>
  <button
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    className="
      flex
      items-center
      gap-3
      rounded-xl
      border
      border-black/15
      bg-white
      px-5
      py-3
      text-[11px]
      text-black/60
      transition-all
      duration-300
      hover:border-black
      hover:text-black
    "
  >
    <span>
      بازگشت به بالا
    </span>

    <span>
      ↑
    </span>

  </button>

</div>
      {/* Trust Cards */}

      <section
        className="
          mx-auto
          grid
          max-w-[1600px]
          grid-cols-2
          lg:grid-cols-4
        "
      >

        {trustItems.map((item)=>{

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="
                group
                flex
                min-h-[190px]
                flex-col
                items-center
                justify-center
                border
                border-black/10
                px-5
                text-center
                transition-all
                duration-300
                hover:bg-neutral-50
              "
            >

              <Icon
                size={44}
                strokeWidth={1.3}
                className="
                  mb-5
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                "
              />

              <h3
                className="
                  text-[14px]
                  font-medium
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  mt-3
                  text-[11px]
                  leading-5
                  text-black/50
                "
              >
                {item.text}
              </p>

            </div>

          );

        })}

      </section>


      {/* Support Bar */}
<section>

  <div
    className="
      mx-auto
      flex
      max-w-[1600px]
      items-center
      justify-start
      gap-3
      px-5
      py-4
      text-[11px]
      text-black/60
      sm:px-8
      lg:px-14
    "
  >

    <span>
      تلفن پشتیبانی:
    </span>

    <span dir="ltr">
      021-61930000
    </span>

    <span className="text-black/30">
      |
    </span>

    <span dir="ltr">
      021-91000100
    </span>

    <span className="text-black/30">
      |
    </span>

    <span>
      ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
    </span>

  </div>
</section>
{/* Divider */}

<div
  className="
    mx-auto
    max-w-[1600px]
    px-5
    sm:px-8
    lg:px-14
  "
>
  <div
    className="
      border-t
      border-black/10
    "
  />
</div>

            {/* Main Footer */}

      <section
        className="
          mx-auto
          grid
          max-w-[1600px]
          gap-12
          px-5
          py-16
          sm:px-8
          lg:grid-cols-[2fr_1fr]
          lg:px-14
        "
      >


        {/* Links Columns */}

        <div
          className="
            grid
            grid-cols-2
            gap-10
            sm:grid-cols-4
          "
        >

          {columns.map((column)=>(

            <div
              key={column.title}
            >

              <h3
                className="
                  text-[13px]
                  font-medium
                  text-black
                "
              >
                {column.title}
              </h3>


              <ul
                className="
                  mt-5
                  space-y-3
                "
              >

                {column.links.map((link)=>(

                  <li
                    key={link}
                  >

                    <Link
                      href="#"
                      className="
                        text-[12px]
                        text-black/55
                        transition-colors
                        duration-200
                        hover:text-black
                      "
                    >
                      {link}
                    </Link>

                  </li>

                ))}

              </ul>

            </div>

          ))}


        </div>





        {/* Brand */}

        <div
          className="
            text-right
          "
        >

        <div
  dir="ltr"
  className="
    text-left
  "
>

  <h2
    className="
      font-serif
      text-[42px]
      tracking-[0.15em]
    "
  >
    MIWANI
  </h2>


  <p
    className="
      mt-3
      text-[11px]
      tracking-[0.15em]
      text-black/40
    "
  >
    Fashion is an invitation.
  </p>

</div>

          <p
            className="
              mt-8
              text-[13px]
              leading-8
              text-black/55
            "
          >
            MIWANI مجموعه‌ای منتخب از پوشاک نو، استوک و
            دست‌دوم از برندهای معتبر است. ما با انتخاب
            دقیق محصولات، کیفیت، اصالت و قیمت مناسب را
            در اولویت قرار می‌دهیم تا تجربه‌ای متفاوت
            از خرید پوشاک برند ایجاد کنیم.
          </p>


        </div>


      </section>




      {/* Social + Trust */}

      <section
        className="
          border-t
          border-black/10
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1600px]
            flex-col
            gap-10
            px-5
            py-10
            sm:px-8
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-14
          "
        >


          {/* Social Media */}

          <div>

            <h3
              className="
                text-[13px]
                font-medium
              "
            >
              ما را در شبکه‌های اجتماعی دنبال کنید.
            </h3>


            <div
              className="
                mt-5
                flex
                gap-4
              "
            >

              <SocialIcon>
                <InstagramIcon />
              </SocialIcon>


              <SocialIcon>
                <TelegramIcon />
              </SocialIcon>


              <SocialIcon>
                <YoutubeIcon />
              </SocialIcon>


            </div>


          </div>



          {/* Trust */}

          <div
            className="
              flex
              gap-3
            "
          >

            <TrustBox text="نماد اعتماد" />

            <TrustBox text="ساماندهی" />

            <TrustBox text="پرداخت امن" />

          </div>


        </div>


      </section>
            {/* Bottom */}

      <div
        className="
          border-t
          border-black/10
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1600px]
            flex-col
            gap-3
            px-5
            py-6
            text-[11px]
            text-black/45
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
            lg:px-14
          "
        >

          <span>
            © 2026 MIWANI
          </span>


          <span dir="ltr">
            All Rights Reserved.
          </span>


        </div>

      </div>


    </footer>

  );

}





function SocialIcon({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <Link
      href="#"
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        border
        border-black/10
        transition-all
        duration-300
        hover:bg-black
        hover:text-white
      "
    >

      {children}

    </Link>

  );

}





function TrustBox({
  text,
}: {
  text:string;
}) {

  return (

    <div
      className="
        flex
        h-[80px]
        w-[80px]
        items-center
        justify-center
        border
        border-black/10
        text-center
        text-[10px]
        text-black/50
      "
    >

      {text}

    </div>

  );

}





function InstagramIcon(){

  return (

    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >

      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />


      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />


      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />

    </svg>

  );

}





function TelegramIcon(){

  return (

    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="currentColor"
    >

      <path
        d="
          M21.7 3.7
          L18.5 19.8
          C18.3 20.8 17.7 21
          16.9 20.5
          L12.2 17
          L10 19.1
          C9.7 19.4 9.5 19.6 9 19.6
          L9.4 14.7
          L18.2 7
          C18.6 6.7 18.2 6.5
          17.7 6.8
          L6.8 13.5
          L2.1 12
          C1.1 11.7 1.1 11
          2.3 10.5
          L20.7 3.4
          C21.5 3.1 22 3.4 21.7 3.7
          Z
        "
      />

    </svg>

  );

}





function YoutubeIcon(){

  return (

    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >

      <path
        d="
          M23 7
          C22.8 5.8 21.9 4.9 20.7 4.7
          C18.5 4.3 12 4.3 12 4.3
          S5.5 4.3 3.3 4.7
          C2.1 4.9 1.2 5.8 .9 7
          C.5 9.2 .5 12 .5 12
          S.5 14.8 .9 17
          C1.2 18.2 2.1 19.1 3.3 19.3
          C5.5 19.7 12 19.7 12 19.7
          S18.5 19.7 20.7 19.3
          C21.9 19.1 22.8 18.2 23 17
          C23.5 14.8 23.5 12 23.5 12
          S23.5 9.2 23 7
          Z
        "
      />


      <path
        d="
          M10 15.5
          L16 12
          L10 8.5
          V15.5
          Z
        "
        fill="white"
      />

    </svg>

  );

}
