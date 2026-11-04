/* =========================================================
   English Memory Game — lógica principal
   100% vanilla JS. Sem dependências.
   ========================================================= */
(() => {
  "use strict";

  const PAIRS_COUNT = 6;
  const FLIP_BACK_DELAY = 950;
  const DATA_URL = "dicas_ingles.txt";
  const SOUND_STORAGE_KEY = "emg-sound-enabled";

  const boardEl = document.getElementById("board");
  const statTimeEl = document.getElementById("stat-time");
  const statAttemptsEl = document.getElementById("stat-attempts");
  const statMatchesEl = document.getElementById("stat-matches");
  const newGameBtn = document.getElementById("new-game-btn");
  const hintEl = document.getElementById("hint");

  const soundToggle = document.getElementById("sound-toggle");
  const soundIcon = document.getElementById("sound-icon");

  const overlayEl = document.getElementById("overlay");
  const overlaySpinner = document.getElementById("overlay-spinner");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayMsg = document.getElementById("overlay-msg");
  const overlayRetry = document.getElementById("overlay-retry");

  const winModal = document.getElementById("win-modal");
  const winTime = document.getElementById("win-time");
  const winAttempts = document.getElementById("win-attempts");
  const winMatches = document.getElementById("win-matches");
  const winRestart = document.getElementById("win-restart");

  const state = {
    pool: [],
    deck: [],
    firstCard: null,
    secondCard: null,
    lock: false,
    attempts: 0,
    matches: 0,
    timerId: null,
    seconds: 0,
    started: false,
    soundEnabled: true,
  };

  /* =========================================================
     ÁUDIO — Web Speech API
     ========================================================= */
  const speechSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance === "function";

  let voiceCache = [];
  let currentUtterance = null;

  function loadVoices() {
    if (!speechSupported) return;
    try {
      voiceCache = window.speechSynthesis.getVoices() || [];
    } catch {
      voiceCache = [];
    }
  }

  if (speechSupported) {
    loadVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function pickEnglishVoice() {
    if (!voiceCache.length) loadVoices();
    if (!voiceCache.length) return null;

    // Preferência por vozes conhecidas de boa qualidade
    const preferredNames = [
      "Google US English",
      "Google UK English Female",
      "Microsoft Aria Online (Natural)",
      "Microsoft Jenny Online (Natural)",
      "Samantha",
      "Alex",
      "Daniel",
      "Karen",
    ];
    for (const name of preferredNames) {
      const v = voiceCache.find((voice) => voice.name === name);
      if (v) return v;
    }

    // Depois qualquer voz en-US, então en-GB, então qualquer en-*
    const us = voiceCache.find((v) => /^en[-_]US$/i.test(v.lang));
    if (us) return us;
    const gb = voiceCache.find((v) => /^en[-_]GB$/i.test(v.lang));
    if (gb) return gb;
    const anyEn = voiceCache.find((v) => /^en[-_]/i.test(v.lang));
    return anyEn || null;
  }

  /**
   * Fala um texto em inglês. Retorna true se a fala foi iniciada.
   * cardEl (opcional) recebe a classe .is-speaking enquanto fala.
   */
  function speakEnglish(text, cardEl = null) {
    if (!speechSupported || !state.soundEnabled) {
      if (cardEl) cardEl.classList.remove("is-speaking");
      return false;
    }
    const clean = String(text || "").trim();
    if (!clean) return false;

    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignora */
    }

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "en-US";
    utter.rate = 0.92;
    utter.pitch = 1;
    utter.volume = 1;

    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;

    if (cardEl) {
      cardEl.classList.add("is-speaking");
      utter.onend = () => cardEl.classList.remove("is-speaking");
      utter.onerror = () => cardEl.classList.remove("is-speaking");
    }

    currentUtterance = utter;

    // Alguns navegadores exigem que speak seja chamado num tick
    // após o cancel() para não descartar a fala.
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utter);
      } catch {
        if (cardEl) cardEl.classList.remove("is-speaking");
      }
    }, 30);

    return true;
  }

  /* =========================================================
     ESTADO DE SOM (persistente)
     ========================================================= */
  function readSoundPref() {
    try {
      const raw = localStorage.getItem(SOUND_STORAGE_KEY);
      if (raw === null) return true;
      return raw === "true";
    } catch {
      return true;
    }
  }

  function saveSoundPref(value) {
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, value ? "true" : "false");
    } catch {
      /* ignora */
    }
  }

  function applySoundUI() {
    const on = state.soundEnabled && speechSupported;
    soundToggle.setAttribute("aria-pressed", String(on));
    soundToggle.setAttribute(
      "aria-label",
      on ? "Desativar som das cartas" : "Ativar som das cartas"
    );
    soundToggle.title = speechSupported
      ? on
        ? "Som das cartas de inglês: ligado"
        : "Som das cartas de inglês: desligado"
      : "Seu navegador não suporta fala";
    soundIcon.textContent = on ? "🔊" : "🔇";
    if (!speechSupported) {
      soundToggle.disabled = true;
      soundToggle.style.opacity = "0.4";
    }
  }

  function toggleSound() {
    if (!speechSupported) return;
    state.soundEnabled = !state.soundEnabled;
    saveSoundPref(state.soundEnabled);
    applySoundUI();
    if (!state.soundEnabled) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignora */
      }
      document
        .querySelectorAll(".card.is-speaking")
        .forEach((c) => c.classList.remove("is-speaking"));
    }
  }

  /* =========================================================
     PARSER DO ARQUIVO dicas_ingles.txt
     ========================================================= */
  const PREFIX_REGEX = /^\[[^\]]*\]\s*Você:\s*🇬🇧\s*/u;
  const PREFIX_ALT_REGEX = /^\[[^\]]*\]\s*[^:]+:\s*🇬🇧\s*/u;

  const PT_MARKERS = new Set([
    "o", "a", "os", "as", "um", "uma", "uns", "umas",
    "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
    "para", "pra", "por", "com", "sem", "que", "se", "e", "ou",
    "meu", "minha", "meus", "minhas", "seu", "sua", "seus", "suas",
    "ele", "ela", "eles", "elas", "você", "voce", "vocês", "voces",
    "eu", "nós", "nos", "tu", "isso", "isto", "aquilo", "este", "esta",
    "esse", "essa", "aquele", "aquela",
    "é", "são", "ser", "estar", "está", "estão", "foi", "era",
    "ter", "tem", "têm", "tinha", "há", "haver",
    "muito", "muita", "muitos", "muitas", "pouco", "pouca",
    "mais", "menos", "bem", "mal", "não", "nao", "sim",
    "quando", "onde", "como", "porque", "porquê", "então", "entao",
    "algo", "alguém", "alguem", "nada", "ninguém", "ninguem",
    "aqui", "ali", "lá", "la", "agora", "depois", "antes",
    "também", "tambem", "só", "so", "todo", "toda", "todos", "todas",
    "vez", "vezes", "dia", "dias", "coisa", "coisas", "lugar",
    "fazer", "ir", "vir", "ver", "dar", "ficar", "deixar",
  ]);

  const PT_EXPLANATION = /\b(é|são|serve|significa|usar|usamos|usa-se|quando|na verdade|auxiliar|frase|frases|verbo|verbos|regra|dica|depende|dependendo|contexto|exemplo|forma|também pode|pode ser|geralmente|normalmente|por outro lado|por isso|logo|pois|então|nesse|nessa|dessa|desse|assim como)\b/iu;

  const EN_ANNOTATION = /\b(Correto|Dica|Tradução|traducao|possível|possivel|expressão|expressao|Explicar|exemplo|Exemplo|usar|usamos|use|Use|Você|Voce|Significa|significa|Literalmente|literalmente|Quando|quando|Nao|Não|nao|Verbo|verbo|frase|Frases|palavras|palavra|contexto|regra|Regra|Cuidado|cuidado|Algumas vezes|algumas vezes)\b/u;

  function hasPortugueseAccent(word) {
    return /[áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ]/u.test(word);
  }

  function looksPortuguese(word) {
    if (!word) return false;
    const clean = word.toLowerCase().replace(/[.,!?;:()"']/g, "");
    if (!clean) return false;
    if (hasPortugueseAccent(clean)) return true;
    if (PT_MARKERS.has(clean)) return true;
    return false;
  }

  function splitEnglishPortuguese(text) {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length < 2) return null;

    for (let i = 1; i < words.length; i++) {
      const w = words[i];
      const prev = words[i - 1];
      if (hasPortugueseAccent(w)) {
        const en = words.slice(0, i).join(" ").trim();
        const pt = words.slice(i).join(" ").trim();
        if (en && pt) return { english: en, portuguese: pt };
      }
      if (looksPortuguese(w) && looksPortuguese(prev)) {
        const en = words.slice(0, i - 1).join(" ").trim();
        const pt = words.slice(i - 1).join(" ").trim();
        if (en && pt) return { english: en, portuguese: pt };
      }
    }
    return null;
  }

  function extractPairsFromLine(rawLine) {
    let line = rawLine
      .replace(PREFIX_REGEX, "")
      .replace(PREFIX_ALT_REGEX, "")
      .replace(/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!line) return [];

    line = line.replace(/\s*=\s*/g, " | ");

    if (line.includes("|")) {
      const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
      const pairs = [];
      for (const part of parts) {
        const pair = parseSingleChunk(part);
        if (pair) pairs.push(pair);
      }
      return pairs;
    }

    if (line.includes(":")) {
      const [en, ...rest] = line.split(":");
      const pt = rest.join(":").trim();
      if (en && pt) return [{ english: en.trim(), portuguese: pt.trim() }];
    }

    const pair = splitEnglishPortuguese(line);
    return pair ? [pair] : [];
  }

  function parseSingleChunk(chunk) {
    const trimmed = chunk.trim();
    if (!trimmed) return null;

    if (trimmed.includes(":")) {
      const [en, ...rest] = trimmed.split(":");
      const pt = rest.join(":").trim();
      if (en && pt) return { english: en.trim(), portuguese: pt.trim() };
    }

    const pair = splitEnglishPortuguese(trimmed);
    if (!pair) return null;

    if (pair.english.toLowerCase() === pair.portuguese.toLowerCase()) return null;
    if (pair.english.split(/\s+/).length > 6) return null;

    if (!isQualityPair(pair.english, pair.portuguese)) return null;

    return pair;
  }

  function isQualityPair(english, portuguese) {
    const en = english.trim();
    const pt = portuguese.trim();
    if (!en || !pt) return false;

    const enWords = en.split(/\s+/).filter(Boolean);
    const ptWords = pt.split(/\s+/).filter(Boolean);
    if (enWords.length < 1 || enWords.length > 4) return false;
    if (ptWords.length < 1 || ptWords.length > 8) return false;

    if (EN_ANNOTATION.test(en)) return false;
    if (PT_EXPLANATION.test(pt)) return false;
    if (/^\(.*\)$/u.test(pt)) return false;
    if (/\.\.\./.test(en)) return false;
    if (/\.\//.test(en)) return false;
    if (/[-,\/:]$/.test(en)) return false;
    if (/\b(possível tradução|possivel traducao|Dica para lembrar|dependendo do contexto)\b/iu.test(pt)) {
      return false;
    }
    if ((pt.match(/\(/g) || []).length !== (pt.match(/\)/g) || []).length) return false;
    if ((en.match(/"/g) || []).length % 2 !== 0) return false;
    if (!/[A-Za-z]/.test(en)) return false;

    const lastEn = en.split(/\s+/).pop().toLowerCase().replace(/[.,!?;:"'()]/g, "");
    if (PT_MARKERS.has(lastEn)) return false;

    if (!/[A-Za-zÀ-ÿ]/.test(pt)) return false;
    if (enWords.length === 1 && en.length <= 2) return false;

    return true;
  }

  function parseTipsFile(content) {
    const lines = content.split(/\r?\n/);
    const pairs = [];
    const seen = new Set();

    for (const line of lines) {
      if (!line.includes("🇬🇧")) continue;

      const extracted = extractPairsFromLine(line);
      for (const p of extracted) {
        const en = p.english.trim();
        const pt = p.portuguese.trim();
        if (!en || !pt) continue;
        if (en.length > 80 || pt.length > 100) continue;
        if (!isQualityPair(en, pt)) continue;

        const key = `${en.toLowerCase()}::${pt.toLowerCase()}`;
        if (seen.has(key)) continue;
        seen.add(key);

        pairs.push({ english: en, portuguese: pt });
      }
    }

    return pairs;
  }

  /* =========================================================
     UTILITÁRIOS
     ========================================================= */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function pickRandom(array, n) {
    const copy = shuffle([...array]);
    return copy.slice(0, n);
  }

  function formatTime(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function bump(el) {
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  /* =========================================================
     CARREGAMENTO
     ========================================================= */
  function showOverlay({ title, msg, loading = false, retry = false }) {
    overlayTitle.textContent = title;
    overlayMsg.textContent = msg;
    overlaySpinner.hidden = !loading;
    overlayRetry.hidden = !retry;
    overlayEl.hidden = false;
  }

  function hideOverlay() {
    overlayEl.hidden = true;
  }

  async function loadPool() {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const text = await response.text();
    const pairs = parseTipsFile(text);
    if (pairs.length < PAIRS_COUNT) {
      throw new Error(
        `Poucos pares válidos encontrados (${pairs.length}). Precisa de pelo menos ${PAIRS_COUNT}.`
      );
    }
    return pairs;
  }

  /* =========================================================
     RENDERIZAÇÃO
     ========================================================= */
  function buildDeck(pool) {
    const selected = pickRandom(pool, PAIRS_COUNT);
    const cards = [];
    selected.forEach((pair, index) => {
      const pairId = `p${index}`;
      cards.push({ pairId, type: "en", text: pair.english });
      cards.push({ pairId, type: "pt", text: pair.portuguese });
    });
    return shuffle(cards);
  }

  function renderBoard(deck) {
    boardEl.innerHTML = "";
    const fragment = document.createDocumentFragment();

    deck.forEach((card, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.setAttribute("role", "gridcell");
      btn.dataset.pairId = card.pairId;
      btn.dataset.type = card.type;
      btn.dataset.index = String(index);
      btn.setAttribute("aria-label", "Carta virada para baixo");
      btn.setAttribute("aria-pressed", "false");

      const inner = document.createElement("div");
      inner.className = "card__inner";

      const back = document.createElement("div");
      back.className = "card__face card__back";
      const backIcon = document.createElement("img");
      backIcon.className = "card__back-icon";
      backIcon.setAttribute("aria-hidden", "true");
      backIcon.src = card.type === "en" ? "assets/flag-gb.svg" : "assets/flag-br.svg";
      const backLabel = document.createElement("span");
      backLabel.className = "card__back-label";
      backLabel.textContent = card.type === "en" ? "English" : "Português";
      back.append(backIcon, backLabel);

      const front = document.createElement("div");
      front.className = `card__face card__front card__front--${card.type}`;
      const tag = document.createElement("span");
      tag.className = "card__tag";
      tag.textContent = card.type === "en" ? "EN" : "PT";
      const text = document.createElement("span");
      text.className = "card__text";
      text.textContent = card.text;
      front.append(tag, text);

      // Ícone de alto-falante apenas nas cartas EN
      if (card.type === "en") {
        const speaker = document.createElement("span");
        speaker.className = "card__speaker";
        speaker.setAttribute("aria-hidden", "true");
        speaker.textContent = "🔊";
        front.appendChild(speaker);
      }

      inner.append(back, front);
      btn.appendChild(inner);
      fragment.appendChild(btn);
    });

    boardEl.appendChild(fragment);
  }

  /* =========================================================
     CRONÔMETRO E ESTATÍSTICAS
     ========================================================= */
  function startTimer() {
    if (state.started) return;
    state.started = true;
    state.timerId = setInterval(() => {
      state.seconds += 1;
      statTimeEl.textContent = formatTime(state.seconds);
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateMatches() {
    statMatchesEl.textContent = `${state.matches}/${PAIRS_COUNT}`;
    bump(statMatchesEl);
  }

  function updateAttempts() {
    statAttemptsEl.textContent = String(state.attempts);
    bump(statAttemptsEl);
  }

  /* =========================================================
     LÓGICA DO JOGO
     ========================================================= */
  function onCardClick(event) {
    const card = event.currentTarget;

    // Carta já virada (e ainda não é par): re-fala se for EN
    if (card.classList.contains("is-flipped") || card.classList.contains("is-matched")) {
      if (card.dataset.type === "en") {
        const textEl = card.querySelector(".card__text");
        if (textEl) speakEnglish(textEl.textContent, card);
      }
      return;
    }

    if (state.lock) return;

    startTimer();

    if (!state.firstCard) {
      state.firstCard = card;
      flipCard(card);
      return;
    }

    if (card === state.firstCard) return;

    state.secondCard = card;
    flipCard(card);
    checkPair();
  }

  function flipCard(card) {
    card.classList.add("is-flipped");
    card.setAttribute("aria-pressed", "true");
    const textEl = card.querySelector(".card__text");
    const label = textEl ? textEl.textContent : "carta";
    card.setAttribute("aria-label", `Carta virada: ${label}`);

    // Fala apenas cartas EN
    if (card.dataset.type === "en" && textEl) {
      speakEnglish(textEl.textContent, card);
    }
  }

  function unflipCard(card) {
    card.classList.remove("is-flipped");
    card.classList.remove("is-speaking");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", "Carta virada para baixo");
  }

  function checkPair() {
    const first = state.firstCard;
    const second = state.secondCard;
    if (!first || !second) return;

    const isPair = first.dataset.pairId === second.dataset.pairId;
    state.attempts += 1;
    updateAttempts();

    if (isPair) {
      first.classList.add("is-matched");
      second.classList.add("is-matched");
      first.disabled = true;
      second.disabled = true;
      state.matches += 1;
      updateMatches();
      resetSelection();
      if (state.matches === PAIRS_COUNT) {
        finishGame();
      }
    } else {
      state.lock = true;
      first.classList.add("is-wrong");
      second.classList.add("is-wrong");
      first.classList.add("is-disabled");
      second.classList.add("is-disabled");

      setTimeout(() => {
        first.classList.remove("is-wrong", "is-disabled");
        second.classList.remove("is-wrong", "is-disabled");
        unflipCard(first);
        unflipCard(second);
        resetSelection();
        state.lock = false;
      }, FLIP_BACK_DELAY);
    }
  }

  function resetSelection() {
    state.firstCard = null;
    state.secondCard = null;
  }

  function finishGame() {
    stopTimer();
    setTimeout(() => {
      winTime.textContent = formatTime(state.seconds);
      winAttempts.textContent = String(state.attempts);
      winMatches.textContent = `${state.matches}/${PAIRS_COUNT}`;
      winModal.hidden = false;
      winRestart.focus();
    }, 500);
  }

  /* =========================================================
     NOVO JOGO
     ========================================================= */
  function startNewGame() {
    stopTimer();
    state.attempts = 0;
    state.matches = 0;
    state.seconds = 0;
    state.started = false;
    state.lock = false;
    resetSelection();

    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignora */
    }

    statTimeEl.textContent = "00:00";
    statAttemptsEl.textContent = "0";
    statMatchesEl.textContent = `0/${PAIRS_COUNT}`;
    hintEl.textContent =
      speechSupported && state.soundEnabled
        ? "Clique em duas cartas. Cartas em inglês falam a pronúncia! 🔊"
        : "Clique em duas cartas para tentar formar um par. Boa sorte! 🍀";

    winModal.hidden = true;

    if (!state.pool.length) {
      init();
      return;
    }

    state.deck = buildDeck(state.pool);
    renderBoard(state.deck);
    bindCards();
  }

  function bindCards() {
    const cards = boardEl.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", onCardClick);
    });
  }

  /* =========================================================
     INICIALIZAÇÃO
     ========================================================= */
  async function init() {
    state.soundEnabled = readSoundPref();
    applySoundUI();

    showOverlay({
      title: "Carregando dicas…",
      msg: "Preparando as cartas para você.",
      loading: true,
      retry: false,
    });

    try {
      state.pool = await loadPool();
      hideOverlay();
      startNewGame();
    } catch (error) {
      const isFileProtocol = window.location.protocol === "file:";
      const msg = isFileProtocol
        ? "Não foi possível carregar as dicas via file://. Inicie um servidor local (ex.: python -m http.server 8000) na pasta do projeto e acesse http://localhost:8000."
        : `Não foi possível carregar "${DATA_URL}": ${error.message}. Verifique se o arquivo existe na raiz do projeto.`;

      showOverlay({
        title: "Ops! Algo deu errado",
        msg,
        loading: false,
        retry: true,
      });
    }
  }

  /* ------------------ Eventos globais ------------------ */
  newGameBtn.addEventListener("click", startNewGame);
  winRestart.addEventListener("click", startNewGame);
  overlayRetry.addEventListener("click", init);
  soundToggle.addEventListener("click", toggleSound);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !winModal.hidden) {
      winModal.hidden = true;
    }
  });

  init();
})();
