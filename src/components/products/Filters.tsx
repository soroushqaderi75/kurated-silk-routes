"use client";

import { useState } from "react";


const filters = [
  {
    title: "دسته‌بندی",
    items: [
      "لباس زنانه",
      "لباس مردانه",
      "کفش",
      "کیف",
      "اکسسوری",
    ],
  },

  {
    title: "برند",
    items: [
      "ZARA",
      "H&M",
      "MANGO",
      "NIKE",
      "ADIDAS",
    ],
  },

  {
    title: "وضعیت کالا",
    items: [
      "نو",
      "استوک",
      "دست دوم",
    ],
  },
];


export default function Filters() {

  return (

    <aside
      className="
        hidden
        lg:block
        text-right
      "
    >

      <div
        className="
          sticky
          top-24
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            pb-5
          "
        >

          <h2
            className="
              text-[15px]
              font-medium
            "
          >
            فیلترها
          </h2>


          <button
            className="
              text-[11px]
              text-black/40
              hover:text-black
            "
          >
            حذف همه
          </button>

        </div>



        <div>

          {filters.map((filter)=>(
            <FilterGroup
              key={filter.title}
              title={filter.title}
              items={filter.items}
            />
          ))}



          {/* سایز */}

          <div
            className="
              border-t
              border-black/10
              py-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  text-[12px]
                  font-medium
                "
              >
                سایز
              </span>


              <span className="text-black/40">
                ⌄
              </span>

            </div>


            <div
              className="
                mt-4
                flex
                gap-2
              "
            >

              {
                ["XS","S","M","L","XL"].map(size=>(
                  <button
                    key={size}
                    className="
                      h-8
                      w-8
                      border
                      border-black/15
                      text-[11px]
                      transition
                      hover:border-black
                    "
                  >
                    {size}
                  </button>
                ))
              }

            </div>

          </div>



          {/* رنگ */}

          <div
            className="
              border-t
              border-black/10
              py-5
            "
          >

            <div
              className="
                flex
                justify-between
                text-[12px]
                font-medium
              "
            >

              <span>
                رنگ
              </span>

              <span className="text-black/40">
                ⌄
              </span>

            </div>


            <div
              className="
                mt-4
                flex
                gap-3
              "
            >

              {[
                "مشکی",
                "سفید",
                "کرم",
                "آبی"
              ].map(color=>(

                <button
                  key={color}
                  title={color}
                  className="
                    h-5
                    w-5
                    rounded-full
                    border
                    border-black/20
                    bg-neutral-200
                  "
                />

              ))}

            </div>

          </div>



          {/* قیمت */}

          <div
            className="
              border-t
              border-black/10
              py-5
            "
          >

            <span
              className="
                text-[12px]
                font-medium
              "
            >
              قیمت
            </span>


            <div
              className="
                mt-4
                flex
                gap-2
              "
            >

              <input
                placeholder="از"
                className="
                  h-9
                  w-full
                  border
                  border-black/15
                  px-2
                  text-[11px]
                  outline-none
                "
              />


              <input
                placeholder="تا"
                className="
                  h-9
                  w-full
                  border
                  border-black/15
                  px-2
                  text-[11px]
                  outline-none
                "
              />

            </div>

          </div>


        </div>


      </div>


    </aside>

  );
}




function FilterGroup({
  title,
  items,
}:{
  title:string;
  items:string[];
}){

  const [open,setOpen] = useState(false);


  return (

    <div
      className="
        border-t
        border-black/10
        py-5
      "
    >

      <button
        onClick={()=>setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
        "
      >

        <span
          className="
            text-[12px]
            font-medium
          "
        >
          {title}
        </span>


        <span
          className="
            text-black/40
          "
        >
          {open ? "⌃" : "⌄"}
        </span>


      </button>



      {
        open && (

          <div
            className="
              mt-4
              space-y-3
              text-[12px]
              text-black/60
            "
          >

            {items.map(item=>(

              <label
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <input
                  type="checkbox"
                  className="
                    h-3.5
                    w-3.5
                  "
                />

                <span>
                  {item}
                </span>

              </label>

            ))}

          </div>

        )
      }


    </div>

  );
}