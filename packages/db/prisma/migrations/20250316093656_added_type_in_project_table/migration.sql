/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - Added the required column `promptType` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Made the column `projectId` on table `Prompt` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('NEXT_JS', 'REACT_NATIVE', 'REACT');

-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('USER', 'SYSTEM');

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
ADD COLUMN     "type" "ProjectType" NOT NULL DEFAULT 'NEXT_JS';

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "promptType" "PromptType" NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
