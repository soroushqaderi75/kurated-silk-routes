import { ProductForm } from "@/components/admin/product-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/products/new")({
  component: NewProduct,
});

function NewProduct() {
  return (
    <div>
      <h1 className="text-3xl italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
        New product
      </h1>
      <ProductForm />
    </div>
  );
}
