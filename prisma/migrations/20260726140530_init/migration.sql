-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "baleSource" TEXT,
    "baleCode" TEXT,
    "productQuality" TEXT,
    "condition" TEXT NOT NULL,
    "sizeLabel" TEXT,
    "measurements" JSONB,
    "color" TEXT,
    "price" INTEGER NOT NULL,
    "images" TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
