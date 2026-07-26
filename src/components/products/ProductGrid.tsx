import ProductCard from "@/components/products/ProductCard";


const products = [
  {
    id: 1,
    brand: "ZARA",
    name: "کت زنانه کلاسیک",
    size: "M",
    condition: "استوک",
    price: "2,900,000 تومان",
  },

  {
    id: 2,
    brand: "H&M",
    name: "پیراهن سفید مینیمال",
    size: "L",
    condition: "نو",
    price: "1,800,000 تومان",
  },

  {
    id: 3,
    brand: "NIKE",
    name: "کتانی اسپرت",
    size: "42",
    condition: "دست دوم",
    price: "3,200,000 تومان",
  },

  {
    id: 4,
    brand: "MANGO",
    name: "کت پاییزی",
    size: "S",
    condition: "استوک",
    price: "2,400,000 تومان",
  },


  {
    id: 5,
    brand: "LEVI'S",
    name: "شلوار جین کلاسیک",
    size: "32",
    condition: "نو",
    price: "2,100,000 تومان",
  },


  {
    id: 6,
    brand: "ADIDAS",
    name: "هودی اسپرت",
    size: "M",
    condition: "استوک",
    price: "1,900,000 تومان",
  },

];


export default function ProductGrid() {

  return (

    <div
      className="
        grid
        grid-cols-2
        gap-x-5
        gap-y-10
        sm:grid-cols-3
        xl:grid-cols-4
      "
    >

      {products.map((product)=>(

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>

  );
}