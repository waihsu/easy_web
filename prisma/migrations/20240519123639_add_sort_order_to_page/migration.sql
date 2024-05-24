-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('hero', 'about', 'projects');

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "type" "SectionType" NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Unlock the Power of Collaboration',
    "text" TEXT NOT NULL DEFAULT 'Empower your team to innovate faster with our all-in-one platform for building, deploying, and scaling web applications.',
    "image" TEXT DEFAULT '/placeholder-image.svg',
    "description" TEXT,
    "link" TEXT,
    "name" TEXT,
    "page_id" TEXT NOT NULL,
    "customData" JSONB NOT NULL DEFAULT '{}',
    "version" TEXT NOT NULL DEFAULT 'v0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
