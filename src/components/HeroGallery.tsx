"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const images = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
];


export default function HeroGallery() {

  const [index, setIndex] = useState(0);

  const [transitionSpeed, setTransitionSpeed] = useState(0.65);

  const lastTime = useRef(0);

  const wheelAmount = useRef(0);



  useEffect(() => {


    const handleWheel = (e: WheelEvent) => {


      // فقط اسکرول پایین

      if (e.deltaY <= 0) return;



      const now = performance.now();

      const time = now - lastTime.current;

      lastTime.current = now;



      const velocity =
        Math.abs(e.deltaY) / Math.max(time, 1);



      /*
        اسکرول آرام:
        انیمیشن نرم

        اسکرول سریع:
        transition تقریباً قطع می‌شود
      */


      if (velocity > 1.8) {

        setTransitionSpeed(0.08);

      } 

      else if (velocity > 0.8) {

        setTransitionSpeed(0.25);

      }

      else {

        setTransitionSpeed(0.7);

      }




      wheelAmount.current += e.deltaY;




      // هر اسکرول یک عکس جلو برود

      if (wheelAmount.current > 40) {


        wheelAmount.current = 0;


        setIndex(prev =>

          prev === images.length - 1
            ? 0
            : prev + 1

        );


      }



    };



    const hero =
      document.getElementById("hero-scroll");



    hero?.addEventListener(
      "wheel",
      handleWheel,
      {
        passive:true
      }
    );



    return()=>{

      hero?.removeEventListener(
        "wheel",
        handleWheel
      );

    };


  },[]);






  return (

    <div

      id="hero-scroll"

      className="
      relative
      h-full
      w-full
      overflow-hidden
      rounded-[50px]
      "

    >


      <AnimatePresence mode="sync">


        <motion.div

          key={index}


          initial={{

            opacity:0,

            scale:1.05,

            filter:"blur(15px)"

          }}


          animate={{

            opacity:1,

            scale:1,

            filter:"blur(0px)"

          }}


          exit={{

            opacity:0,

            scale:.98,

            filter:"blur(10px)"

          }}


          transition={{

            duration:transitionSpeed,

            ease:"easeOut"

          }}


          className="
          absolute
          inset-0
          "

        >


          <Image

            src={images[index]}

            alt="MIWANI fashion"

            fill

            priority

            sizes="
            (max-width:1024px) 100vw,
            50vw
            "

            className="
            object-cover
            "

          />


        </motion.div>


      </AnimatePresence>


    </div>

  );

}