-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('DRAFT', 'PENDING', 'SIGNED', 'TERMINATED');

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "lawyer_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "terms" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "signed_at" TIMESTAMP(3),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_case_id_key" ON "Contract"("case_id");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_lawyer_id_fkey" FOREIGN KEY ("lawyer_id") REFERENCES "lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
