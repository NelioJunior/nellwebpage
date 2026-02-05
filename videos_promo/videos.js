const API_KEY = "AIzaSyCEaKyQwvP5mrJwLlNaM9mnFyI3FIWDZOk";
const CHANNEL_ID = "UCRF5UoygXtvNBEQdOfs2ATA";
const PLAYLIST_ID = "PLCUrEz4V2g4KZRH3dKskXczAeqTdui_Hu";

const grid = document.getElementById("videosGrid");
let msnry;

/**
 * Detecta se é um Short verificando se o título contém a palavra "short" ou "shorts"
 */
function isShort(title) {
  const titleLower = title.toLowerCase();
  return titleLower.includes('short') || titleLower.includes('shorts');
}

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
        
        // Detectar se é Short pelo título
        const isVideoShort = isShort(title);
        
        // Pegar thumbnail
        const thumbnails = video.snippet.thumbnails;
        const thumb = thumbnails.maxres?.url || 
                      thumbnails.standard?.url || 
                      thumbnails.high?.url || 
                      thumbnails.medium?.url ||
                      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        const card = document.createElement("div");
        card.className = "video-card";
        
        // Definir apenas largura para desktop (CSS mobile sobrescreverá)
        if (isVideoShort) {
          card.style.width = '180px';
          card.setAttribute('data-type', 'short');
        } else {
          card.style.width = '360px';
          card.setAttribute('data-type', 'video');
        }

        // Criar estrutura do card de forma segura
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumb';
        
        const img = document.createElement('img');
        img.src = thumb;
        img.alt = '';
        img.loading = 'lazy';
        
        // REMOVIDO: definições de width/height inline
        // Deixa o CSS controlar as dimensões via media queries
        
        const playOverlay = document.createElement('div');
        playOverlay.className = 'play-overlay';
        playOverlay.textContent = '▶';
        
        thumbDiv.appendChild(img);
        thumbDiv.appendChild(playOverlay);
        
        const titleElement = document.createElement('p');
        titleElement.className = 'video-title';
        titleElement.textContent = title; // XSS seguro
        
        const dateElement = document.createElement('small');
        dateElement.className = 'video-date';
        dateElement.textContent = date.toLocaleDateString("pt-BR");
        
        card.appendChild(thumbDiv);
        card.appendChild(titleElement);
        card.appendChild(dateElement);

        card.addEventListener("click", () => {
          // Criar iframe
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
          iframe.allowFullscreen = true;
          iframe.style.border = 'none';
          iframe.style.borderRadius = '14px';
          
          // REMOVIDO: definições de width/height inline
          // CSS vai controlar via aspect-ratio e media queries
          
          card.innerHTML = '';
          card.appendChild(iframe);
          
          if (msnry) {
            msnry.layout();
          }
        });

        grid.appendChild(card);
      });

    // 5. Inicializar Masonry após imagens carregarem
    imagesLoaded(grid, () => {
      msnry = new Masonry(grid, {
        itemSelector: ".video-card",
        percentPosition: false,
        gutter: 16
      });
    });

  } catch (err) {
    console.error("Erro ao carregar vídeos:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
