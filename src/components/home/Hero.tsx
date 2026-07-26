"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/hero/hero-new.jpg"
        alt="MIWANI fashion campaign"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/90
          via-black/55
          via-35%
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.28)_100%)]
        "
      />

      <div className="absolute left-0 top-0 z-30 w-full">
        <Navbar />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          x: -40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="
          absolute
          right-0
          top-0
          z-20
          flex
          min-h-screen
          w-full
          items-center
          justify-end
          px-6
          pt-20
          sm:px-10
          md:px-16
          lg:pr-28
          lg:pl-20
        "
      >
        <div
          dir="ltr"
          className="
            w-full
            max-w-[520px]
            text-left
            text-white
          "
        >
          <Image
            src="/brand/miwani.svg"
            alt="MIWANI"
            width={440}
            height={140}
            priority
            className="
              block
              h-auto
              w-[250px]
              brightness-0
              invert
              drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]
              sm:w-[320px]
              lg:w-[420px]
            "
          />

          <h1
            className="
              miwani-fashion
              mt-8
              text-left
              text-[38px]
              leading-[1.08]
              tracking-[0.035em]
              text-white
              drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]
              sm:text-[48px]
              lg:text-[58px]
            "
          >
            Fashion
            <br />
            is an invitation.
          </h1>

          <div
            className="
              mt-10
              border-t
              border-white/40
              pt-6
              text-white/90
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-baseline
                justify-start
                gap-x-2
                gap-y-2
                text-left
                text-[15px]
                tracking-[0.025em]
                sm:text-[17px]
              "
            >
              <span className="italic">Mîwanî</span>

              <span>:</span>

              <span className="text-white/80">
                / mî-wɑː-ni /
              </span>

              <span
                dir="rtl"
                className="
                  font-[var(--font-persian)]
                  text-[16px]
                  tracking-normal
                  text-white
                  sm:text-[18px]
                "
              >
                مهمانی، میزبانی، پذیرایی از مهمان
              </span>
            </div>

            <p
              className="
                mt-4
                text-left
                text-[13px]
                uppercase
                tracking-[0.18em]
                text-white/80
                sm:text-[14px]
              "
            >
              Hospitality · Gathering · Feast
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="
          absolute
          bottom-8
          right-6
          z-20
          flex
          items-center
          gap-3
          text-[10px]
          uppercase
          tracking-[0.3em]
          text-white/80
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
          sm:right-10
          lg:right-16
        "
      >
        <span>Scroll</span>

        <motion.span
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}