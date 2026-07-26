"use client";

const sortOptions = [
  "پر بازدیدترین",
  "مرتبط‌ترین",
  "جدیدترین",
  "ارزان‌ترین",
  "گران‌ترین",
];


export default function SortBar() {
  return (
    <div
      dir="rtl"
      className="
        flex
        items-center
        gap-5
        py-4
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          whitespace-nowrap
          text-[12px]
          font-medium
          text-black
        "
      >

        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 7h16M4 12h10M4 17h6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        مرتب سازی:

      </div>


      <div
        className="
          flex
          items-center
          gap-6
          whitespace-nowrap
          text-[11px]
          text-black/50
        "
      >

        {sortOptions.map((item,index)=>(
          <button
            key={item}
            className={`
              transition-colors
              hover:text-black
              ${
                index === 0
                ? "text-red-500"
                : ""
              }
            `}
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
}