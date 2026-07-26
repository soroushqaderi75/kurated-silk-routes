export type ProductData = {
  id: number;
  name: string;
  brand: string;
  size: string;
  condition: string;
  price: string;
};

export type ProductSectionData = {
  title: string;
  description?: string;
};

export const productSections: ProductSectionData[] = [
  {
    title: "منتخب MIWANI",
    description: "انتخاب‌های ویژه و دست‌چین‌شده میوانی",
  },
  {
    title: "زنانه",
  },
  {
    title: "مردانه",
  },
  {
    title: "تازه رسیده‌ها",
  },
  {
    title: "پربازدیدترین‌ها",
  },
];

export const sampleProducts: ProductData[] = [
  {
    id: 1,
    name: "کت جین آبی",
    brand: "ZARA",
    size: "M",
    condition: "در حد نو",
    price: "قیمت محصول",
  },
  {
    id: 2,
    name: "پیراهن کلاسیک",
    brand: "MANGO",
    size: "L",
    condition: "بسیار خوب",
    price: "قیمت محصول",
  },
  {
    id: 3,
    name: "هودی مینیمال",
    brand: "H&M",
    size: "XL",
    condition: "در حد نو",
    price: "قیمت محصول",
  },
  {
    id: 4,
    name: "شلوار راسته",
    brand: "BERSHKA",
    size: "M",
    condition: "بسیار خوب",
    price: "قیمت محصول",
  },
  {
    id: 5,
    name: "کاپشن سبک",
    brand: "PULL&BEAR",
    size: "L",
    condition: "در حد نو",
    price: "قیمت محصول",
  },
  {
    id: 6,
    name: "پلیور بافت",
    brand: "MANGO",
    size: "S",
    condition: "خوب",
    price: "قیمت محصول",
  },
  {
    id: 7,
    name: "تیشرت ساده",
    brand: "NIKE",
    size: "M",
    condition: "بسیار خوب",
    price: "قیمت محصول",
  },
  {
    id: 8,
    name: "شلوار جین",
    brand: "LEVI’S",
    size: "۳۲",
    condition: "در حد نو",
    price: "قیمت محصول",
  },
];

export type BrandData = {
  name: string;
  slug: string;
  logo: string;
};

export const brands: BrandData[] = [
  {
    name: "Nike",
    slug: "nike",
    logo: "/brands/nike.svg",
  },
  {
    name: "Adidas",
    slug: "adidas",
    logo: "/brands/adidas.svg",
  },
  {
    name: "Zara",
    slug: "zara",
    logo: "/brands/zara.svg",
  },

  {
    name: "H&M",
    slug: "hm",
    logo: "/brands/hm.svg",
  },
  {
    name: "Levi’s",
    slug: "levis",
    logo: "/brands/levis.svg",
  },
  {
    name: "Bershka",
    slug: "bershka",
    logo: "/brands/bershka.svg",
  },
    {
    name: "Mango",
    slug: "mango",
    logo: "/brands/mango.svg",
  },
];