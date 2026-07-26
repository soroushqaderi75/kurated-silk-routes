import Link from "next/link";

export default function HeaderActions() {
  return (
    <div
      dir="rtl"
      className="
        flex
        items-center
        gap-1
      "
    >

      {/* Login */}
      <Link
        href="/login"
        className="
          flex
          h-9
          items-center
          gap-1.5
          px-2
          text-[12px]
          text-black
          transition-opacity
          hover:opacity-50
        "
      >
        <LoginIcon />

        <span>
          ورود
          <span className="mx-1 text-black/30">
            |
          </span>
          ثبت نام
        </span>

      </Link>


      {/* Wishlist */}
      <Link
        href="/wishlist"
        className="
          group
          relative
          flex
          h-9
          w-9
          items-center
          justify-center
          text-black
          hover:opacity-50
        "
      >
        <HeartIcon />

        <Tooltip text="علاقه‌مندی‌ها" />
      </Link>



      {/* Cart */}
      <Link
        href="/cart"
        className="
          group
          relative
          flex
          h-9
          w-9
          items-center
          justify-center
          text-black
          hover:opacity-50
        "
      >
        <CartIcon />

        <Tooltip text="سبد خرید" />
      </Link>


    </div>
  );
}



function Tooltip({
  text,
}: {
  text: string;
}) {
  return (
    <span
      className="
        pointer-events-none
        absolute
        top-[calc(100%+6px)]
        left-1/2
        -translate-x-1/2
        whitespace-nowrap
        bg-black
        px-2
        py-1
        text-[9px]
        text-white
        opacity-0
        transition-opacity
        group-hover:opacity-100
      "
    >
      {text}
    </span>
  );
}



function LoginIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="-scale-x-100"
    >
      <path
        d="M15 3H5.8C4.8 3 4 3.8 4 4.8V19.2C4 20.2 4.8 21 5.8 21H15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M10 12H21M21 12L17.5 8.5M21 12L17.5 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.8 4.6C18.5 2.3 14.8 3 12 6C9.2 3 5.5 2.3 3.2 4.6C0.8 7 1.4 10.7 4 13.3L12 21L20 13.3C22.6 10.7 23.2 7 20.8 4.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}



function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="-scale-x-100"
    >
      <path
        d="M3 4H5L7 15C7.2 16 8 16.5 9 16.5H18C19 16.5 19.5 15.8 20 14L21 10H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="9"
        cy="20"
        r="1"
        fill="currentColor"
      />

      <circle
        cx="18"
        cy="20"
        r="1"
        fill="currentColor"
      />

    </svg>
  );
}