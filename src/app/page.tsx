import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import BrandsSection from "@/components/home/BrandsSection";
import Footer from "@/components/layout/Footer";

import { productSections } from "@/data/home";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Hero />


      <div className="bg-white">

        {productSections.map((section) => (
          <ProductSection
            key={section.title}
            title={section.title}
            description={section.description}
          />
        ))}


        <BrandsSection />


      </div>


      <Footer />

    </main>
  );
}