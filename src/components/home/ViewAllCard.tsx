type ViewAllCardProps = {
  title: string;
};

export default function ViewAllCard({
  title,
}: ViewAllCardProps) {
  return (
    <div
      dir="rtl"
      className="
        flex
        w-[150px]
        flex-none
        items-center
        justify-center
        self-stretch
        sm:w-[170px]
      "
    >
      <button
        type="button"
        aria-label={`مشاهده همه محصولات ${title}`}
        className="
          flex
          h-28
          w-28
          flex-col
          items-center
          justify-center
          gap-2
          rounded-full
          border
          border-neutral-900
          bg-transparent
          text-center
          text-[11px]
          text-neutral-900
          transition-all
          duration-300
          hover:scale-105
          hover:bg-black
          hover:text-white
          sm:h-32
          sm:w-32
        "
      >
        <span>مشاهده همه</span>

        <span
          aria-hidden="true"
          className="text-base"
        >
          ←
        </span>
      </button>
    </div>
  );
}