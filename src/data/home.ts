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
  description: string;
};

export const productSections: ProductSectionData[] = [
  {
    title: "منتخب MIWANI",
    description: "انتخاب‌های ویژه و دست‌چین‌شده میوانی",
  },
  {
    title: "زنانه",
    description: "مجموعه‌ای منتخب از پوشاک زنانه",
  },
  {
    title: "مردانه",
    description: "مجموعه‌ای منتخب از پوشاک مردانه",
  },
  {
    title: "تازه رسیده‌ها",
    description: "جدیدترین محصولاتی که به میوانی اضافه شده‌اند",
  },
  {
    title: "پربازدیدترین‌ها",
    description: "محصولاتی که بیشترین توجه را دریافت کرده‌اند",
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

export const brands = [
  "ZARA",
  "MANGO",
  "H&M",
  "NIKE",
  "ADIDAS",
  "LEVI’S",
  "PULL&BEAR",
  "BERSHKA",
];