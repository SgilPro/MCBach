/*
  Warnings:

  - You are about to drop the column `description` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `albums` table. All the data in the column will be lost.
  - Added the required column `releaseAt` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('ALBUM', 'SINGLE', 'COMPILATION');

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "description",
DROP COLUMN "link",
ADD COLUMN     "albumType" "AlbumType" NOT NULL DEFAULT 'ALBUM',
ADD COLUMN     "artist" TEXT,
ADD COLUMN     "releaseAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "spotifyAlbumId" TEXT,
ADD COLUMN     "tracks" TEXT[];

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "albumId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
