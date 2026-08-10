-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "customDomainVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "publishedSnapshot" JSONB;
