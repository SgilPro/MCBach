/*
  Warnings:

  - A unique constraint covering the columns `[spotifyAlbumId]` on the table `albums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spotifyArtistId]` on the table `artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spotifyTrackId]` on the table `tracks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "spotifyTrackId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "albums_spotifyAlbumId_key" ON "albums"("spotifyAlbumId");

-- CreateIndex
CREATE UNIQUE INDEX "artists_spotifyArtistId_key" ON "artists"("spotifyArtistId");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_spotifyTrackId_key" ON "tracks"("spotifyTrackId");
