import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import BrandsSection from "@/components/home/BrandsSection";
import { productSections } from "@/data/home";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />

      <div className="bg-[#F7F4EE]">
        {productSections.map((section) => (
          <ProductSection
            key={section.title}
            title={section.title}
            description={section.description}
          />
        ))}

        <BrandsSection />
      </div>
    </main>
  );
}