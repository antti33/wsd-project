const addSong = async (songData) => {
  const kv = await Deno.openKv();
  await kv.set(["songs", songData.song], songData);
};

const listSongs = async () => {
    const kv = await Deno.openKv();
    const songData = kv.list({ prefix: ["songs"] });
    const songs = [];
    for await (const song of songData) {
        if (song != null && song.value != null) {
        songs.push(song.value);
    }
  }
  return songs;
};

export {addSong, listSongs};