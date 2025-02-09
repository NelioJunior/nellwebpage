var te = /* @__PURE__ */ ((e) => (e.TRIAL = "trial", e.BASIC = "basic", e.ENTERPRISE = "enterprise", e.LITE = "lite", e.ADVANCED = "advanced", e))(te || {}), ne = /* @__PURE__ */ ((e) => (e.TRIAL = "deid-trial", e.PRO = "deid-pro", e.ENTERPRISE = "deid-enterprise", e.LITE = "deid-lite", e.ADVANCED = "deid-advanced", e.BUILD = "deid-api-build", e.LAUNCH = "deid-api-launch", e.SCALE = "deid-api-scale", e))(ne || {}), re = /* @__PURE__ */ ((e) => (e.Created = "created", e.Started = "started", e.Done = "done", e.Error = "error", e.Rejected = "rejected", e.Ready = "ready", e))(re || {}), ae = /* @__PURE__ */ ((e) => (e.Unrated = "Unrated", e.Positive = "Positive", e.Negative = "Negative", e))(ae || {}), k = /* @__PURE__ */ ((e) => (e.Functional = "Functional", e.TextOnly = "TextOnly", e.Maintenance = "Maintenance", e.Playground = "Playground", e.DirectPlayback = "DirectPlayback", e))(k || {}), x = /* @__PURE__ */ ((e) => (e.Embed = "embed", e.Query = "query", e.Partial = "partial", e.Answer = "answer", e.Complete = "done", e))(x || {}), ie = /* @__PURE__ */ ((e) => (e.KnowledgeProcessing = "knowledge/processing", e.KnowledgeIndexing = "knowledge/indexing", e.KnowledgeFailed = "knowledge/error", e.KnowledgeDone = "knowledge/done", e))(ie || {}), se = /* @__PURE__ */ ((e) => (e.Knowledge = "knowledge", e.Document = "document", e.Record = "record", e))(se || {}), oe = /* @__PURE__ */ ((e) => (e.Pdf = "pdf", e.Text = "text", e.Html = "html", e.Word = "word", e.Json = "json", e.Markdown = "markdown", e.Csv = "csv", e.Excel = "excel", e.Powerpoint = "powerpoint", e.Archive = "archive", e.Image = "image", e.Audio = "audio", e.Video = "video", e))(oe || {}), q = /* @__PURE__ */ ((e) => (e.Clip = "clip", e.Talk = "talk", e))(q || {});
const ce = (e) => {
  switch (e) {
    case "clip":
      return "clip";
    case "talk":
      return "talk";
    default:
      throw new Error(`Unknown video type: ${e}`);
  }
};
var T = /* @__PURE__ */ ((e) => (e.Start = "START", e.Stop = "STOP", e))(T || {}), V = /* @__PURE__ */ ((e) => (e.ChatAnswer = "chat/answer", e.ChatPartial = "chat/partial", e.StreamDone = "stream/done", e.StreamStarted = "stream/started", e.StreamFailed = "stream/error", e.StreamReady = "stream/ready", e.StreamCreated = "stream/created", e.StreamVideoCreated = "stream-video/started", e.StreamVideoDone = "stream-video/done", e.StreamVideoError = "stream-video/error", e.StreamVideoRejected = "stream-video/rejected", e))(V || {}), y = /* @__PURE__ */ ((e) => (e.New = "new", e.Fail = "fail", e.Connected = "connected", e.Connecting = "connecting", e.Closed = "closed", e.Completed = "completed", e.Disconnected = "disconnected", e))(y || {}), de = /* @__PURE__ */ ((e) => (e.Amazon = "amazon", e.Microsoft = "microsoft", e.Afflorithmics = "afflorithmics", e.Elevenlabs = "elevenlabs", e))(de || {}), le = /* @__PURE__ */ ((e) => (e.Public = "public", e.Premium = "premium", e.Private = "private", e))(le || {});
const z = "https://api.d-id.com", me = "wss://notifications.d-id.com", ge = "79f81a83a67430be2bc0fd61042b8faa", F = () => Math.random().toString(16).slice(2);
function J() {
  let e = window.localStorage.getItem("did_external_key_id");
  return e || (e = Math.random().toString(16).slice(2), window.localStorage.setItem("did_external_key_id", e)), e;
}
let ue = F();
function X(e) {
  if (e.type === "bearer")
    return `Bearer ${e.token}`;
  if (e.type === "basic")
    return `Basic ${btoa(`${e.username}:${e.password}`)}`;
  if (e.type === "key")
    return `Client-Key ${e.clientKey}.${J()}_${ue}`;
  throw new Error(`Unknown auth type: ${e}`);
}
function B(e, n = z, s) {
  const a = async (t, r) => {
    const i = await fetch(n + (t != null && t.startsWith("/") ? t : `/${t}`), {
      ...r,
      headers: {
        ...r == null ? void 0 : r.headers,
        Authorization: X(e),
        "Content-Type": "application/json"
      }
    });
    if (!i.ok) {
      let o = await i.text().catch(() => "Failed to fetch");
      throw s && s(new Error(o), {
        url: t,
        options: r,
        headers: i.headers
      }), new Error(o);
    }
    return i.json();
  };
  return {
    get(t, r) {
      return a(t, {
        ...r,
        method: "GET"
      });
    },
    post(t, r, i) {
      return a(t, {
        ...i,
        body: JSON.stringify(r),
        method: "POST"
      });
    },
    delete(t, r, i) {
      return a(t, {
        ...i,
        body: JSON.stringify(r),
        method: "DELETE"
      });
    },
    patch(t, r, i) {
      return a(t, {
        ...i,
        body: JSON.stringify(r),
        method: "PATCH"
      });
    }
  };
}
function Y(e, n = z, s) {
  const a = B(e, `${n}/agents`, s);
  return {
    create(t, r) {
      return a.post("/", t, r);
    },
    getAgents(t, r) {
      return a.get(`/${t ? `?tag=${t}` : ""}`, r).then((i) => i ?? []);
    },
    getById(t, r) {
      return a.get(`/${t}`, r);
    },
    delete(t, r) {
      return a.delete(`/${t}`, void 0, r);
    },
    update(t, r, i) {
      return a.patch(`/${t}`, r, i);
    },
    newChat(t, r, i) {
      return a.post(`/${t}/chat`, r, i);
    },
    chat(t, r, i, o) {
      return a.post(`/${t}/chat/${r}`, i, o);
    },
    createRating(t, r, i, o) {
      return a.post(`/${t}/chat/${r}/ratings`, i, o);
    },
    updateRating(t, r, i, o, l) {
      return a.patch(`/${t}/chat/${r}/ratings/${i}`, o, l);
    },
    deleteRating(t, r, i, o) {
      return a.delete(`/${t}/chat/${r}/ratings/${i}`, o);
    }
  };
}
const we = (e) => new Promise((n) => setTimeout(n, e));
function he(e) {
  return new Promise((n, s) => {
    const {
      callbacks: a,
      host: t,
      auth: r
    } = e, {
      onMessage: i = null,
      onOpen: o = null,
      onClose: l = null,
      onError: d = null
    } = a || {}, g = new WebSocket(`${t}?authorization=${X(r)}`);
    g.onmessage = i, g.onclose = l, g.onerror = (h) => {
      console.error(h), d == null || d("Websocket failed to connect", h), s(h);
    }, g.onopen = (h) => {
      o == null || o(h), n(g);
    };
  });
}
async function fe(e) {
  const {
    retries: n = 1
  } = e;
  let s = null;
  for (let a = 0; (s == null ? void 0 : s.readyState) !== WebSocket.OPEN; a++)
    try {
      s = await he(e);
    } catch (t) {
      if (a === n)
        throw t;
      await we(a * 500);
    }
  return s;
}
async function pe(e, n, s) {
  const a = s != null && s.onMessage ? [s.onMessage] : [], t = await fe({
    auth: e,
    host: n,
    callbacks: {
      onError: s == null ? void 0 : s.onError,
      onMessage: (r) => {
        const i = JSON.parse(r.data);
        a.forEach((o) => o(i.event, i));
      }
    }
  });
  return {
    socket: t,
    disconnect: () => t.close(),
    subscribeToEvents: (r) => a.push(r)
  };
}
const ve = "X-Playground-Chat";
function ye(e, n, s, a) {
  const t = B(e, `${n}/agents/${s}`, a);
  return {
    createStream(r) {
      return t.post("/streams", {
        output_resolution: r.output_resolution,
        compatibility_mode: r.compatibility_mode,
        stream_warmup: r.stream_warmup,
        session_timeout: r.session_timeout
      });
    },
    startConnection(r, i, o) {
      return t.post(`/streams/${r}/sdp`, {
        session_id: o,
        answer: i
      });
    },
    addIceCandidate(r, i, o) {
      return t.post(`/streams/${r}/ice`, {
        session_id: o,
        ...i
      });
    },
    sendStreamRequest(r, i, o) {
      return t.post(`/streams/${r}`, {
        session_id: i,
        ...o
      });
    },
    close(r, i) {
      return t.delete(`/streams/${r}`, {
        session_id: i
      });
    }
  };
}
function Ce(e, n, s, a) {
  const t = B(e, `${n}/agents/${s}`, a);
  return {
    createStream(r, i) {
      return t.post("/streams", {
        driver_url: r.driver_url,
        face: r.face,
        config: r.config,
        output_resolution: r.output_resolution,
        compatibility_mode: r.compatibility_mode,
        stream_warmup: r.stream_warmup,
        session_timeout: r.session_timeout
      }, i);
    },
    startConnection(r, i, o, l) {
      return t.post(`/streams/${r}/sdp`, {
        session_id: o,
        answer: i
      }, l);
    },
    addIceCandidate(r, i, o, l) {
      return t.post(`/streams/${r}/ice`, {
        session_id: o,
        ...i
      }, l);
    },
    sendStreamRequest(r, i, o, l) {
      return t.post(`/streams/${r}`, {
        session_id: i,
        ...o
      }, l);
    },
    close(r, i, o) {
      return t.delete(`/streams/${r}`, {
        session_id: i
      }, o);
    }
  };
}
let Z = !1;
const b = (e, n) => Z && console.log(e, n), _e = (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection).bind(window);
function H(e) {
  switch (e) {
    case "connected":
      return y.Connected;
    case "checking":
      return y.Connecting;
    case "failed":
      return y.Fail;
    case "new":
      return y.New;
    case "closed":
      return y.Closed;
    case "disconnected":
      return y.Disconnected;
    case "completed":
      return y.Completed;
    default:
      return y.New;
  }
}
function ke() {
  let e = 0;
  return (n) => {
    for (const s of n.values())
      if (s && s.type === "inbound-rtp" && s.kind === "video") {
        const a = s.bytesReceived, t = a - e > 0;
        return e = a, t;
      }
    return !1;
  };
}
function Me(e, n) {
  const a = Math.max(Math.ceil(10), 1);
  let t = 0, r = !1;
  const i = ke();
  return setInterval(async () => {
    const o = await e.getStats();
    i(o) ? (t = 0, r || (n == null || n(T.Start), r = !0)) : r && (t++, t >= a && (n == null || n(T.Stop), r = !1));
  }, 100);
}
async function Se(e, n, {
  debug: s = !1,
  callbacks: a,
  auth: t,
  baseURL: r = z,
  warmup: i
}) {
  Z = s;
  let o;
  const {
    startConnection: l,
    sendStreamRequest: d,
    close: g,
    createStream: h,
    addIceCandidate: M
  } = n.videoType === q.Clip ? ye(t, r, e, a.onError) : Ce(t, r, e, a.onError), {
    id: _,
    offer: O,
    ice_servers: K,
    session_id: E
  } = await h(n), p = new _e({
    iceServers: K
  });
  if (!E)
    throw new Error("Could not create session_id");
  const c = Me(p, a.onVideoStateChange);
  p.onicecandidate = (m) => {
    b("peerConnection.onicecandidate", m), m.candidate && m.candidate.sdpMid && m.candidate.sdpMLineIndex !== null ? M(_, {
      candidate: m.candidate.candidate,
      sdpMid: m.candidate.sdpMid,
      sdpMLineIndex: m.candidate.sdpMLineIndex
    }, E) : M(_, {
      candidate: null
    }, E);
  }, p.oniceconnectionstatechange = () => {
    var f;
    b("peerConnection.oniceconnectionstatechange => " + p.iceConnectionState);
    const m = H(p.iceConnectionState);
    m === y.Connected ? o = setTimeout(() => {
      var w;
      return (w = a.onConnectionStateChange) == null ? void 0 : w.call(a, y.Connected);
    }, i ? 5e3 : 0) : (clearTimeout(o), (f = a.onConnectionStateChange) == null || f.call(a, m));
  }, p.ontrack = (m) => {
    var f;
    b("peerConnection.ontrack", m), (f = a.onSrcObjectReady) == null || f.call(a, m.streams[0]);
  }, await p.setRemoteDescription(O), b("set remote description OK");
  const u = await p.createAnswer();
  return b("create answer OK"), await p.setLocalDescription(u), b("set local description OK"), await l(_, u, E), b("start connection OK"), {
    /**
     * Method to send request to server to get clip or talk depend on you payload
     * @param payload
     */
    speak(m) {
      return d(_, E, m);
    },
    /**
     * Method to close RTC connection
     */
    async disconnect() {
      var m, f;
      if (_) {
        const w = H(p.iceConnectionState);
        if (p) {
          if (w === y.New) {
            (m = a.onVideoStateChange) == null || m.call(a, T.Stop), clearInterval(c);
            return;
          }
          p.close(), p.oniceconnectionstatechange = null, p.onnegotiationneeded = null, p.onicecandidate = null, p.ontrack = null;
        }
        try {
          w === y.Connected && await g(_, E).catch((v) => {
          });
        } catch (v) {
          b("Error on close stream connection", v);
        }
        (f = a.onVideoStateChange) == null || f.call(a, T.Stop), clearInterval(c);
      }
    },
    /**
     * Session identifier information, should be returned in the body of all streaming requests
     */
    sessionId: E,
    /**
     * Id of current RTC stream
     */
    streamId: _
  };
}
let U = {};
function Ee(e) {
  const n = window != null && window.hasOwnProperty("DID_AGENTS_API") ? "agents-ui" : "agents-sdk", s = e.agent.presenter, a = {
    token: e.token || "testKey",
    distinct_id: e.distinctId || J(),
    agentId: e.agent.id,
    agentType: s.type === "clip" && s.presenter_id.startsWith("v2_") ? "clip_v2" : s.type,
    owner_id: e.agent.owner_id ?? ""
  };
  return {
    ...a,
    isEnabled: e.isEnabled ?? !0,
    getRandom: () => Math.random().toString(16).slice(2),
    track(t, r) {
      if (!this.isEnabled)
        return Promise.reject("MixPanel analytics is disabled on creation");
      const {
        audioPath: i,
        ...o
      } = r || {}, l = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          data: JSON.stringify([{
            event: t,
            properties: {
              ...o,
              ...a,
              source: n,
              time: Date.now(),
              $insert_id: this.getRandom(),
              origin: window.location.href,
              "Screen Height": window.screen.height || window.innerWidth,
              "Screen Width": window.screen.width || window.innerHeight,
              "User Agent": navigator.userAgent
            }
          }])
        })
      };
      // return fetch("https://api-js.mixpanel.com/track/?verbose=1&ip=1", l).then((d) => d.json()).catch((d) => console.error(d));
    },
    linkTrack(t, r, i, o) {
      U[t] || (U[t] = {
        events: {},
        resolvedDependencies: []
      }), o.includes(i) || o.push(i);
      const l = U[t];
      if (l.events[i] = {
        props: r
      }, l.resolvedDependencies.push(i), o.every((g) => l.resolvedDependencies.includes(g))) {
        const g = o.reduce((h, M) => l.events[M] ? {
          ...h,
          ...l.events[M].props
        } : h, {});
        this.track(t, g), l.resolvedDependencies = l.resolvedDependencies.filter((h) => !o.includes(h)), o.forEach((h) => {
          delete l.events[h];
        });
      }
    }
  };
}
function Ie(e) {
  var t, r, i, o;
  const n = () => /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop", s = () => {
    const l = navigator.platform;
    return l.toLowerCase().includes("win") ? "Windows" : l.toLowerCase().includes("mac") ? "Mac OS X" : l.toLowerCase().includes("linux") ? "Linux" : "Unknown";
  }, a = e.presenter;
  return {
    $os: `${s()}`,
    isMobile: `${n() == "Mobile"}`,
    browser: navigator.userAgent,
    origin: window.location.origin,
    agentType: a.type === "clip" && a.presenter_id.startsWith("v2_") ? "clip_v2" : a.type,
    agentVoice: {
      voiceId: (r = (t = e.presenter) == null ? void 0 : t.voice) == null ? void 0 : r.voice_id,
      provider: (o = (i = e.presenter) == null ? void 0 : i.voice) == null ? void 0 : o.type
    }
  };
}
function Re(e, n, s) {
  var d, g;
  const {
    event: a,
    ...t
  } = e, {
    template: r
  } = (n == null ? void 0 : n.llm) || {}, {
    language: i
  } = ((d = n == null ? void 0 : n.presenter) == null ? void 0 : d.voice) || {}, {
    stitch: o
  } = (n == null ? void 0 : n.presenter) || {};
  return {
    ...t,
    llm: {
      ...t.llm,
      template: r
    },
    script: {
      ...t.script,
      provider: {
        ...(g = t == null ? void 0 : t.script) == null ? void 0 : g.provider,
        language: i
      }
    },
    stitch: o,
    ...s
  };
}
let D = 0;
function $e(e, n) {
  var s, a, t, r;
  return {
    videoType: ce(e.presenter.type),
    output_resolution: (s = n == null ? void 0 : n.streamOptions) == null ? void 0 : s.outputResolution,
    session_timeout: (a = n == null ? void 0 : n.streamOptions) == null ? void 0 : a.sessionTimeout,
    stream_warmup: (t = n == null ? void 0 : n.streamOptions) == null ? void 0 : t.streamWarmup,
    compatibility_mode: (r = n == null ? void 0 : n.streamOptions) == null ? void 0 : r.compatibilityMode
  };
}
function Q(e) {
  return e === k.Playground ? {
    headers: {
      [ve]: "true"
    }
  } : {};
}
async function G(e, n, s, a) {
  try {
    const t = await n.newChat(e, {
      persist: !0
    }, Q(a));
    return s.track("agent-chat", {
      event: "created",
      chat_id: t.id,
      agent_id: e,
      mode: a
    }), t;
  } catch (t) {
    try {
      console.error(t);
      const r = JSON.parse(t.message);
      if ((r == null ? void 0 : r.kind) === "InsufficientCreditsError")
        throw new Error("InsufficientCreditsError");
    } catch (r) {
      console.error("Error parsing the error message:", r);
    }
    throw new Error("Cannot create new chat");
  }
}
function Ae(e, n, s, a, t) {
  return new Promise(async (r, i) => {
    var l;
    D = 0;
    const o = await Se(e.id, $e(e, n), {
      ...n,
      analytics: a,
      warmup: (l = n.streamOptions) == null ? void 0 : l.streamWarmup,
      callbacks: {
        ...n.callbacks,
        onConnectionStateChange: async (d) => {
          var g, h;
          d === y.Connected && (!t && n.mode !== k.DirectPlayback && (t = await G(e.id, s, a, n.mode).catch((M) => {
            i(M);
          })), o ? r({
            chat: t,
            streamingManager: o
          }) : t && i(new Error("Something went wrong while initializing the manager"))), (h = (g = n.callbacks).onConnectionStateChange) == null || h.call(g, d);
        },
        onVideoStateChange(d) {
          var g, h;
          (h = (g = n.callbacks).onVideoStateChange) == null || h.call(g, d), D > 0 && d === T.Start && a.linkTrack("agent-video", {
            event: "start",
            latency: Date.now() - D
          }, "start", [V.StreamVideoCreated]);
        }
      }
    }).catch(i);
  });
}
function j(e, n) {
  if (n && n.length > 0)
    return n;
  let s = "";
  if (e.greetings && e.greetings.length > 0) {
    const a = Math.floor(Math.random() * e.greetings.length);
    s = e.greetings[a];
  } else
    s = `Hi! I'm ${e.preview_name || "My Agent"}. How can I help you?`;
  return [{
    content: s,
    id: F(),
    role: "assistant",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  }];
}
function be(e) {
  if (e.answer !== void 0)
    return e.answer;
  let n = 0, s = "";
  for (; n in e; )
    s += e[n], n++;
  return s;
}
function Pe(e, n, s, a, t) {
  if (!(e === x.Partial || e === x.Answer))
    return;
  const r = a.messages[a.messages.length - 1];
  if ((r == null ? void 0 : r.role) !== "assistant")
    return;
  const {
    content: i,
    sequence: o
  } = n;
  e === x.Partial ? s[o] = i : s.answer = i;
  const l = be(s);
  (r.content !== l || e === x.Answer) && (r.content = l, t == null || t([...a.messages], e));
}
async function De(e, n) {
  var K, E, p;
  let s = {}, a = !0;
  const t = {
    messages: [],
    chatMode: n.mode || k.Functional
  }, r = n.baseURL || z, i = n.wsURL || me, o = n.mixpanelKey || ge, l = Y(n.auth, r, n.callbacks.onError), d = await l.getById(e);
  t.messages = j(d, n.initialMessages), (E = (K = n.callbacks).onNewMessage) == null || E.call(K, [...t.messages], "answer");
  const g = Ee({
    token: o,
    agent: d,
    ...n
  });
  g.track("agent-sdk", {
    event: "loaded",
    ...Ie(d)
  });
  const h = {
    onMessage: (c, u) => {
      var m, f;
      if ("content" in u)
        Pe(c, u, s, t, n.callbacks.onNewMessage), c === x.Answer && g.track("agent-message-received", {
          messages: t.messages.length,
          mode: t.chatMode
        });
      else {
        const w = V, v = [w.StreamVideoDone, w.StreamVideoError, w.StreamVideoRejected], I = [w.StreamFailed, w.StreamVideoError, w.StreamVideoRejected], S = Re(u, d, {
          mode: t.chatMode
        });
        if (c = c, c === w.StreamVideoCreated)
          g.linkTrack("agent-video", S, w.StreamVideoCreated, ["start"]);
        else if (v.includes(c)) {
          const C = c.split("/")[1];
          g.track("agent-video", {
            ...S,
            event: C
          });
        }
        I.includes(c) && ((f = (m = n.callbacks).onError) == null || f.call(m, new Error(`Stream failed with event ${c}`), {
          data: u
        })), u.event === w.StreamDone && _();
      }
    }
  };
  async function M(c) {
    var I, S, C, R, N, A, $;
    (S = (I = n.callbacks).onConnectionStateChange) == null || S.call(I, y.Connecting), D = 0, c && !a && (delete t.chat, t.messages = j(d), (R = (C = n.callbacks).onNewMessage) == null || R.call(C, [...t.messages], "answer"));
    const u = n.mode === k.DirectPlayback ? Promise.resolve(void 0) : pe(n.auth, i, h), m = Ae(d, n, l, g, t.chat).catch((P) => {
      var L, W;
      throw O(k.Maintenance), (W = (L = n.callbacks).onConnectionStateChange) == null || W.call(L, y.Fail), P;
    }), [f, {
      streamingManager: w,
      chat: v
    }] = await Promise.all([u, m]);
    v && v.id !== ((N = t.chat) == null ? void 0 : N.id) && (($ = (A = n.callbacks).onNewChat) == null || $.call(A, v.id)), t.streamingManager = w, t.socketManager = f, t.chat = v, a = !1, O((v == null ? void 0 : v.chat_mode) ?? n.mode ?? k.Functional);
  }
  async function _() {
    var c, u, m, f;
    (c = t.socketManager) == null || c.disconnect(), await ((u = t.streamingManager) == null ? void 0 : u.disconnect()), delete t.streamingManager, delete t.socketManager, (f = (m = n.callbacks).onConnectionStateChange) == null || f.call(m, y.Disconnected);
  }
  async function O(c) {
    var u, m;
    c !== t.chatMode && (g.track("agent-mode-change", {
      mode: c
    }), t.chatMode = c, t.chatMode !== k.Functional && await _(), (m = (u = n.callbacks).onModeChange) == null || m.call(u, c));
  }
  return {
    agent: d,
    starterMessages: ((p = d.knowledge) == null ? void 0 : p.starter_message) || [],
    changeMode: O,
    async connect() {
      var c;
      await M(!0), g.track("agent-chat", {
        event: "connect",
        chatId: (c = t.chat) == null ? void 0 : c.id,
        agentId: d.id,
        mode: t.chatMode
      });
    },
    async reconnect() {
      var c;
      await _(), await M(!1), g.track("agent-chat", {
        event: "reconnect",
        chatId: (c = t.chat) == null ? void 0 : c.id,
        agentId: d.id,
        mode: t.chatMode
      });
    },
    async disconnect() {
      var c;
      await _(), g.track("agent-chat", {
        event: "disconnect",
        chatId: (c = t.chat) == null ? void 0 : c.id,
        agentId: d.id,
        mode: t.chatMode
      });
    },
    async chat(c) {
      var m, f, w, v, I, S;
      const u = F();
      s = {};
      try {
        if (D = Date.now(), n.mode === k.DirectPlayback)
          throw new Error("Direct playback is enabled, chat is disabled");
        if (c.length >= 800)
          throw new Error("Message cannot be more than 800 characters");
        if (c.length === 0)
          throw new Error("Message cannot be empty");
        if (t.chatMode === k.Maintenance)
          throw new Error("Chat is in maintenance mode");
        if (![k.TextOnly, k.Playground].includes(t.chatMode))
          if (t.streamingManager) {
            if (!t.chat)
              throw new Error("Chat is not initialized");
          } else
            throw new Error("Streaming manager is not initialized");
        t.messages.push({
          id: F(),
          role: "user",
          content: c,
          created_at: new Date(D).toISOString()
        }), (f = (m = n.callbacks).onNewMessage) == null || f.call(m, [...t.messages], "user"), t.chat || (t.chat = await G(d.id, l, g, t.chatMode), (v = (w = n.callbacks).onNewChat) == null || v.call(w, t.chat.id));
        const C = {
          id: u,
          role: "assistant",
          content: "",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          matches: []
        }, R = [...t.messages];
        t.messages.push(C);
        const N = ($) => {
          var P, L;
          return l.chat(d.id, $, {
            sessionId: (P = t.streamingManager) == null ? void 0 : P.sessionId,
            streamId: (L = t.streamingManager) == null ? void 0 : L.streamId,
            chatMode: t.chatMode,
            messages: R.map(({
              matches: W,
              ...ee
            }) => ee)
          }, Q(t.chatMode));
        }, A = await N(t.chat.id).catch(async ($) => {
          var P;
          if (!((P = $ == null ? void 0 : $.message) != null && P.includes("missing or invalid session_id")))
            throw $;
          return await _(), await M(!1), N(t.chat.id);
        });
        return g.track("agent-message-send", {
          event: "success",
          mode: t.chatMode,
          messages: t.messages.length + 1
        }), C.context = A.context, C.matches = A.matches, A.result && (C.content = A.result, g.track("agent-message-received", {
          latency: Date.now() - D,
          mode: t.chatMode,
          messages: t.messages.length
        }), (S = (I = n.callbacks).onNewMessage) == null || S.call(I, [...t.messages], "answer")), A;
      } catch (C) {
        throw t.messages[t.messages.length - 1].id === u && t.messages.pop(), g.track("agent-message-send", {
          event: "error",
          mode: t.chatMode,
          messages: t.messages.length
        }), C;
      }
    },
    rate(c, u, m) {
      var v, I, S, C;
      const f = t.messages.find((R) => R.id === c);
      if (t.chat) {
        if (!f)
          throw new Error("Message not found");
      } else
        throw new Error("Chat is not initialized");
      const w = ((v = f.matches) == null ? void 0 : v.map((R) => [R.document_id, R.id])) ?? [];
      return g.track("agent-rate", {
        event: m ? "update" : "create",
        thumb: u === 1 ? "up" : "down",
        knowledge_id: ((I = d.knowledge) == null ? void 0 : I.id) ?? "",
        mode: t.chatMode,
        matches: w,
        score: u
      }), m ? l.updateRating(d.id, t.chat.id, m, {
        knowledge_id: ((S = d.knowledge) == null ? void 0 : S.id) ?? "",
        message_id: c,
        matches: w,
        score: u
      }) : l.createRating(d.id, t.chat.id, {
        knowledge_id: ((C = d.knowledge) == null ? void 0 : C.id) ?? "",
        message_id: c,
        matches: w,
        score: u
      });
    },
    deleteRate(c) {
      var u;
      if (!t.chat)
        throw new Error("Chat is not initialized");
      return g.track("agent-rate-delete", {
        type: "text",
        chat_id: (u = t.chat) == null ? void 0 : u.id,
        id: c,
        mode: t.chatMode
      }), l.deleteRating(d.id, t.chat.id, c);
    },
    speak(c) {
      if (!t.streamingManager)
        throw new Error("Please connect to the agent first");
      function u() {
        if (typeof c == "string") {
          if (!d.presenter.voice)
            throw new Error("Presenter voice is not initialized");
          return {
            type: "text",
            provider: d.presenter.voice,
            input: c,
            ssml: !1
          };
        }
        if (c.type === "text" && !c.provider) {
          if (!d.presenter.voice)
            throw new Error("Presenter voice is not initialized");
          return {
            type: "text",
            provider: d.presenter.voice,
            input: c.input,
            ssml: c.ssml
          };
        }
        return c;
      }
      const m = u();
      return g.track("agent-speak", m), t.streamingManager.speak({
        script: m
      });
    }
  };
}
function xe(e, n, s) {
  const {
    getById: a
  } = Y(n, s || z);
  return a(e);
}
export {
  re as AgentStatus,
  k as ChatMode,
  x as ChatProgress,
  y as ConnectionState,
  oe as DocumentType,
  se as KnowledgeType,
  ne as PlanGroup,
  de as Providers,
  ae as RateState,
  V as StreamEvents,
  T as StreamingState,
  ie as Subject,
  te as UserPlan,
  q as VideoType,
  le as VoiceAccess,
  De as createAgentManager,
  xe as getAgent,
  ce as mapVideoType
};
