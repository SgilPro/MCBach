export const ArtistSelect = {
  id: true,
  name: true,
  spotifyArtistId: true,
  album: {
    select: {
      title: true,
      spotifyAlbumId: true,
    },
  },
};
