const API_KEY = "AIzaSyCEaKyQwvP5mrJwLlNaM9mnFyI3FIWDZOk";
const CHANNEL_ID = "UCRF5UoygXtvNBEQdOfs2ATA";

const PLAYLIST_ID = "PLCUrEz4V2g4KZRH3dKskXczAeqTdui_Hu"

const grid = document.getElementById("videoGrid")

async function loadVideos() {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50`

  try {
    const res = await fetch(url)
    const data = await res.json()

    console.log("Playlist API Response:", data)

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Nenhum vídeo encontrado na playlist.")
      return
    }

    data.items
      .sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt))
      .forEach(item => {

        const videoId = item.snippet.resourceId.videoId
        if (!videoId) return

        const title = item.snippet.title
        const date = new Date(item.snippet.publishedAt)
        const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

        const card = document.createElement("div")
        card.className = "video-card"

        card.innerHTML = `
          <div class="thumb">
            <img src="${thumb}" alt="${title}">
            <div class="play-overlay">▶</div>
          </div>
          <p class="video-title">${title}</p>
          <small class="video-date">${date.toLocaleDateString("pt-BR")}</small>
        `

        card.addEventListener("click", () => {
          card.innerHTML = `
            <iframe 
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
              allowfullscreen>
            </iframe>
          `
        })

        grid.appendChild(card)
      })

  } catch (err) {
    console.error("Erro ao carregar playlist:", err)
  }
}

document.addEventListener("DOMContentLoaded", loadVideos)
