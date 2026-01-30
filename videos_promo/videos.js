const API_KEY = "AIzaSyCEaKyQwvP5mrJwLlNaM9mnFyI3FIWDZOk";
const CHANNEL_ID = "UCRF5UoygXtvNBEQdOfs2ATA";
const PLAYLIST_ID = "PLCUrEz4V2g4KZRH3dKskXczAeqTdui_Hu";

const grid = document.getElementById("videosGrid");
let msnry;

async function loadVideos() {
  try {
    // 1. Buscar vídeos da playlist
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50`;
    const playlistRes = await fetch(playlistUrl);
    const playlistData = await playlistRes.json();

    if (!playlistData.items) {
      console.error("Nenhum vídeo encontrado na playlist");
      return;
    }

    // 2. Extrair IDs dos vídeos
    const videoIds = playlistData.items
      .map(item => item.snippet.resourceId.videoId)
      .filter(Boolean);

    if (!videoIds.length) return;

    // 3. Buscar detalhes reais dos vídeos
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(",")}&part=snippet,contentDetails`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();

    if (!videosData.items) return;

    // 4. Ordenar por data real de publicação
    videosData.items
      .sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt))
      .forEach(video => {
        const videoId = video.id;
        const title = video.snippet.title;
        const date = new Date(video.snippet.publishedAt);
        const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
          <div class="thumb">
            <img src="${thumb}" alt="${title}">
            <div class="play-overlay">▶</div>
          </div>
          <p class="video-title">${title}</p>
          <small class="video-date">${date.toLocaleDateString("pt-BR")}</small>
        `;

        card.addEventListener("click", () => {
          card.innerHTML = `
            <iframe
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
              allowfullscreen>
            </iframe>
          `;
          msnry.layout();
        });

        grid.appendChild(card);
      });

    // 5. Inicializar Masonry após imagens carregarem
    imagesLoaded(grid, () => {
      msnry = new Masonry(grid, {
        itemSelector: ".video-card",
        columnWidth: ".video-card",
        percentPosition: true,
        gutter: 16
      });
    });

  } catch (err) {
    console.error("Erro ao carregar vídeos:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
