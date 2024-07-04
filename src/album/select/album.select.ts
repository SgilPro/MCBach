export const AlbumSelect = {
  id: true,
  title: true,
  albumType: true,
  releaseAt: true,
  spotifyAlbumId: true,
  artist: {
    select: {
      name: true,
      spotifyArtistId: true,
    },
  },
};
