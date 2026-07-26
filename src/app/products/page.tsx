import ProductGrid from "@/components/products/ProductGrid";
import Filters from "@/components/products/Filters";
import SortBar from "@/components/products/SortBar";


export default function ProductsPage(){

  return(

    <main
      dir="rtl"
      className="
        min-h-screen
        bg-white
        px-5
        py-10
        sm:px-8
        lg:px-14
      "
    >

      {/* Breadcrumb */}

      <div
        className="
          mb-6
          text-[12px]
          text-black/50
        "
      >
        فروشگاه
        <span className="mx-2">
          /
        </span>
        محصولات
      </div>


      <h1
        className="
          mb-8
          text-[22px]
          font-medium
        "
      >
        محصولات
      </h1>



      <div
        className="
          grid
          items-start
          gap-6
          lg:grid-cols-[240px_1fr]
        "
      >


        {/* Filters */}

        <Filters />



        {/* Products Area */}

        <div>

          <SortBar />


          <div
            className="
              mt-6
            "
          >

            <ProductGrid />

          </div>


        </div>


      </div>


    </main>

  );

}