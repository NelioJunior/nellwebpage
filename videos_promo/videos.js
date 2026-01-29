const API_KEY = "AIzaSyCEaKyQwvP5mrJwLlNaM9mnFyI3FIWDZOk";
const CHANNEL_ID = "UCRF5UoygXtvNBEQdOfs2ATA";

const grid = document.getElementById("videoGrid")

async function loadVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=30&type=video`

  try {
    const res = await fetch(url)
    const data = await res.json()

    console.log("YouTube API Response:", data)

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Nenhum vídeo encontrado ou erro na API.")
      return
    }

    data.items.forEach(item => {
      if (!item.id || !item.id.videoId) return

      const videoId = item.id.videoId
      const title = item.snippet.title
      const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

      const card = document.createElement("div")
      card.className = "video-card"

      card.innerHTML = `
        <div class="thumb">
          <img src="${thumb}" alt="${title}">
          <div class="play-overlay">▶</div>
        </div>
        <p class="video-title">${title}</p>
      `

      card.addEventListener("click", () => {
        card.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1"
            frameborder="0"
            allowfullscreen>
          </iframe>
        `
      })

      grid.appendChild(card)
    })

  } catch (err) {
    console.error("Erro ao carregar vídeos:", err)
  }
}

document.addEventListener("DOMContentLoaded", loadVideos)
