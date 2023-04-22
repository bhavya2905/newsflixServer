import https from 'https';

const API_KEY = "AIzaSyCj0jEIcrvD2ieo7m30tV-N3D9bEUBqlyk";
// const channelID = "UCBi2mrWuNuyYy4gbM6fU18Q";

const channelIDs = {
    ABC_NEWS: 'UCYfdidRxbB8Qhf0Nx7ioOYw',
    BBC_NEWS: 'UCupvZG-5ko_eiXAupbDfxWw',
    CNN: 'UCBi2mrWuNuyYy4gbM6fU18Q',
    FOX_NEWS: 'UC5Y5DEyzvbp2kb2Qx6ZcKQw',
    NBC_NEWS: 'UCeY0bbntWzzVIaj2z3QigXg',
  };
const indian = {
    NDTV:'UCZFMm1mMw0F81Z37aaEzTUA',
    Aaj_Tak: 'UCt4t-jeY85JegMlZ-E5UWtA',
    India_Today: 'UCYPvAwZP8pZhSMW8qs7cVCw',
    Tv9_Kannada: 'UC8dnBi4WUErqYQHZ4PfsLTg',
    News18_Kannada: 'UCa-vioGhe2btBcZneaPonKA',
    BBC_News: 'UC16niRr50-MSBwiO3YDb3RA',
    NBC_NEWS: 'UCeY0bbntWzzVIaj2z3QigXg',
}
// UCYfdidRxbB8Qhf0Nx7ioOYw - ABC News
// UCupvZG-5ko_eiXAupbDfxWw - BBC News
// UCBi2mrWuNuyYy4gbM6fU18Q - CNN
// UC5Y5DEyzvbp2kb2Qx6ZcKQw - Fox News
// UCaXkIU1QidjPwiAYu6GcHjg - NBC News

const YOUTUBE_PLAYLIST_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";


let youtubeData = null;
let previd= null;

export const fetchYoutubeData = async (id) => {
    const channelID = indian[id];
    const YOUTUBE_SEARCH = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelID}&part=snippet,id&order=date&maxResults=10`;

  if (id==previd && youtubeData) return youtubeData;
  console.log("fetching youtube data");
  previd = id;
  youtubeData = await new Promise((resolve, reject) => {
    https
      .get(YOUTUBE_SEARCH, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          data = JSON.parse(data);
          resolve(
            data.items.map((doc) => ({
              ...doc,
              VideoLink: "https://www.youtube.com/embed/" + doc.id.videoId,
            }))
          );
        });
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

  return youtubeData;
};
