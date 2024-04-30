var $e, v, Ct, Y, Ge, St, Ee, xt, fe = {}, Be = [], Gt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ne = Array.isArray;
function J(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}
function $t(e) {
  var t = e.parentNode;
  t && t.removeChild(e);
}
function He(e, t, n) {
  var r, i, a, s = {};
  for (a in t)
    a == "key" ? r = t[a] : a == "ref" ? i = t[a] : s[a] = t[a];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? $e.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null)
    for (a in e.defaultProps)
      s[a] === void 0 && (s[a] = e.defaultProps[a]);
  return we(e, s, r, i, null);
}
function we(e, t, n, r, i) {
  var a = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++Ct, __i: -1, __u: 0 };
  return i == null && v.vnode != null && v.vnode(a), a;
}
function Q(e) {
  return e.children;
}
function K(e, t) {
  this.props = e, this.context = t;
}
function ie(e, t) {
  if (t == null)
    return e.__ ? ie(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++)
    if ((n = e.__k[t]) != null && n.__e != null)
      return n.__e;
  return typeof e.type == "function" ? ie(e) : null;
}
function Yt(e, t, n) {
  var r, i = e.__v, a = i.__e, s = e.__P;
  if (s)
    return (r = J({}, i)).__v = i.__v + 1, v.vnode && v.vnode(r), je(s, r, i, e.__n, s.ownerSVGElement !== void 0, 32 & i.__u ? [a] : null, t, a ?? ie(i), !!(32 & i.__u), n), r.__v = i.__v, r.__.__k[r.__i] = r, r.__d = void 0, r.__e != a && Nt(r), r;
}
function Nt(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
      if ((n = e.__k[t]) != null && n.__e != null) {
        e.__e = e.__c.base = n.__e;
        break;
      }
    return Nt(e);
  }
}
function Oe(e) {
  (!e.__d && (e.__d = !0) && Y.push(e) && !Ce.__r++ || Ge !== v.debounceRendering) && ((Ge = v.debounceRendering) || St)(Ce);
}
function Ce() {
  var e, t, n, r = [], i = [];
  for (Y.sort(Ee); e = Y.shift(); )
    e.__d && (n = Y.length, t = Yt(e, r, i) || t, n === 0 || Y.length > n ? (Ue(r, t, i), i.length = r.length = 0, t = void 0, Y.sort(Ee)) : t && v.__c && v.__c(t, Be));
  t && Ue(r, t, i), Ce.__r = 0;
}
function Lt(e, t, n, r, i, a, s, c, _, l, f) {
  var o, m, d, h, y, w = r && r.__k || Be, p = t.length;
  for (n.__d = _, Qt(n, t, w), _ = n.__d, o = 0; o < p; o++)
    (d = n.__k[o]) != null && typeof d != "boolean" && typeof d != "function" && (m = d.__i === -1 ? fe : w[d.__i] || fe, d.__i = o, je(e, d, m, i, a, s, c, _, l, f), h = d.__e, d.ref && m.ref != d.ref && (m.ref && We(m.ref, null, d), f.push(d.ref, d.__c || h, d)), y == null && h != null && (y = h), 65536 & d.__u || m.__k === d.__k ? _ = Tt(d, _, e) : typeof d.type == "function" && d.__d !== void 0 ? _ = d.__d : h && (_ = h.nextSibling), d.__d = void 0, d.__u &= -196609);
  n.__d = _, n.__e = y;
}
function Qt(e, t, n) {
  var r, i, a, s, c, _ = t.length, l = n.length, f = l, o = 0;
  for (e.__k = [], r = 0; r < _; r++)
    s = r + o, (i = e.__k[r] = (i = t[r]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? we(null, i, null, null, null) : Ne(i) ? we(Q, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? we(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null ? (i.__ = e, i.__b = e.__b + 1, c = Xt(i, n, s, f), i.__i = c, a = null, c !== -1 && (f--, (a = n[c]) && (a.__u |= 131072)), a == null || a.__v === null ? (c == -1 && o--, typeof i.type != "function" && (i.__u |= 65536)) : c !== s && (c === s + 1 ? o++ : c > s ? f > _ - s ? o += c - s : o-- : c < s ? c == s - 1 && (o = c - s) : o = 0, c !== r + o && (i.__u |= 65536))) : (a = n[s]) && a.key == null && a.__e && !(131072 & a.__u) && (a.__e == e.__d && (e.__d = ie(a)), De(a, a, !1), n[s] = null, f--);
  if (f)
    for (r = 0; r < l; r++)
      (a = n[r]) != null && !(131072 & a.__u) && (a.__e == e.__d && (e.__d = ie(a)), De(a, a));
}
function Tt(e, t, n) {
  var r, i;
  if (typeof e.type == "function") {
    for (r = e.__k, i = 0; r && i < r.length; i++)
      r[i] && (r[i].__ = e, t = Tt(r[i], t, n));
    return t;
  }
  e.__e != t && (n.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
function Se(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Ne(e) ? e.some(function(n) {
    Se(n, t);
  }) : t.push(e)), t;
}
function Xt(e, t, n, r) {
  var i = e.key, a = e.type, s = n - 1, c = n + 1, _ = t[n];
  if (_ === null || _ && i == _.key && a === _.type && !(131072 & _.__u))
    return n;
  if (r > (_ != null && !(131072 & _.__u) ? 1 : 0))
    for (; s >= 0 || c < t.length; ) {
      if (s >= 0) {
        if ((_ = t[s]) && !(131072 & _.__u) && i == _.key && a === _.type)
          return s;
        s--;
      }
      if (c < t.length) {
        if ((_ = t[c]) && !(131072 & _.__u) && i == _.key && a === _.type)
          return c;
        c++;
      }
    }
  return -1;
}
function Ye(e, t, n) {
  t[0] === "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || Gt.test(t) ? n : n + "px";
}
function ve(e, t, n, r, i) {
  var a;
  e:
    if (t === "style")
      if (typeof n == "string")
        e.style.cssText = n;
      else {
        if (typeof r == "string" && (e.style.cssText = r = ""), r)
          for (t in r)
            n && t in n || Ye(e.style, t, "");
        if (n)
          for (t in n)
            r && n[t] === r[t] || Ye(e.style, t, n[t]);
      }
    else if (t[0] === "o" && t[1] === "n")
      a = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n.u = r.u : (n.u = Date.now(), e.addEventListener(t, a ? Xe : Qe, a)) : e.removeEventListener(t, a ? Xe : Qe, a);
    else {
      if (i)
        t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (t !== "width" && t !== "height" && t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t !== "rowSpan" && t !== "colSpan" && t !== "role" && t in e)
        try {
          e[t] = n ?? "";
          break e;
        } catch {
        }
      typeof n == "function" || (n == null || n === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, n));
    }
}
function Qe(e) {
  if (this.l) {
    var t = this.l[e.type + !1];
    if (e.t) {
      if (e.t <= t.u)
        return;
    } else
      e.t = Date.now();
    return t(v.event ? v.event(e) : e);
  }
}
function Xe(e) {
  if (this.l)
    return this.l[e.type + !0](v.event ? v.event(e) : e);
}
function je(e, t, n, r, i, a, s, c, _, l) {
  var f, o, m, d, h, y, w, p, g, k, S, T, M, H, j, R = t.type;
  if (t.constructor !== void 0)
    return null;
  128 & n.__u && (_ = !!(32 & n.__u), a = [c = t.__e = n.__e]), (f = v.__b) && f(t);
  e:
    if (typeof R == "function")
      try {
        if (p = t.props, g = (f = R.contextType) && r[f.__c], k = f ? g ? g.props.value : f.__ : r, n.__c ? w = (o = t.__c = n.__c).__ = o.__E : ("prototype" in R && R.prototype.render ? t.__c = o = new R(p, k) : (t.__c = o = new K(p, k), o.constructor = R, o.render = tn), g && g.sub(o), o.props = p, o.state || (o.state = {}), o.context = k, o.__n = r, m = o.__d = !0, o.__h = [], o._sb = []), o.__s == null && (o.__s = o.state), R.getDerivedStateFromProps != null && (o.__s == o.state && (o.__s = J({}, o.__s)), J(o.__s, R.getDerivedStateFromProps(p, o.__s))), d = o.props, h = o.state, o.__v = t, m)
          R.getDerivedStateFromProps == null && o.componentWillMount != null && o.componentWillMount(), o.componentDidMount != null && o.__h.push(o.componentDidMount);
        else {
          if (R.getDerivedStateFromProps == null && p !== d && o.componentWillReceiveProps != null && o.componentWillReceiveProps(p, k), !o.__e && (o.shouldComponentUpdate != null && o.shouldComponentUpdate(p, o.__s, k) === !1 || t.__v === n.__v)) {
            for (t.__v !== n.__v && (o.props = p, o.state = o.__s, o.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(B) {
              B && (B.__ = t);
            }), S = 0; S < o._sb.length; S++)
              o.__h.push(o._sb[S]);
            o._sb = [], o.__h.length && s.push(o);
            break e;
          }
          o.componentWillUpdate != null && o.componentWillUpdate(p, o.__s, k), o.componentDidUpdate != null && o.__h.push(function() {
            o.componentDidUpdate(d, h, y);
          });
        }
        if (o.context = k, o.props = p, o.__P = e, o.__e = !1, T = v.__r, M = 0, "prototype" in R && R.prototype.render) {
          for (o.state = o.__s, o.__d = !1, T && T(t), f = o.render(o.props, o.state, o.context), H = 0; H < o._sb.length; H++)
            o.__h.push(o._sb[H]);
          o._sb = [];
        } else
          do
            o.__d = !1, T && T(t), f = o.render(o.props, o.state, o.context), o.state = o.__s;
          while (o.__d && ++M < 25);
        o.state = o.__s, o.getChildContext != null && (r = J(J({}, r), o.getChildContext())), m || o.getSnapshotBeforeUpdate == null || (y = o.getSnapshotBeforeUpdate(d, h)), Lt(e, Ne(j = f != null && f.type === Q && f.key == null ? f.props.children : f) ? j : [j], t, n, r, i, a, s, c, _, l), o.base = t.__e, t.__u &= -161, o.__h.length && s.push(o), w && (o.__E = o.__ = null);
      } catch (B) {
        t.__v = null, _ || a != null ? (t.__e = c, t.__u |= _ ? 160 : 32, a[a.indexOf(c)] = null) : (t.__e = n.__e, t.__k = n.__k), v.__e(B, t, n);
      }
    else
      a == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = en(n.__e, t, n, r, i, a, s, _, l);
  (f = v.diffed) && f(t);
}
function Ue(e, t, n) {
  for (var r = 0; r < n.length; r++)
    We(n[r], n[++r], n[++r]);
  v.__c && v.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(a) {
        a.call(i);
      });
    } catch (a) {
      v.__e(a, i.__v);
    }
  });
}
function en(e, t, n, r, i, a, s, c, _) {
  var l, f, o, m, d, h, y, w = n.props, p = t.props, g = t.type;
  if (g === "svg" && (i = !0), a != null) {
    for (l = 0; l < a.length; l++)
      if ((d = a[l]) && "setAttribute" in d == !!g && (g ? d.localName === g : d.nodeType === 3)) {
        e = d, a[l] = null;
        break;
      }
  }
  if (e == null) {
    if (g === null)
      return document.createTextNode(p);
    e = i ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g, p.is && p), a = null, c = !1;
  }
  if (g === null)
    w === p || c && e.data === p || (e.data = p);
  else {
    if (a = a && $e.call(e.childNodes), w = n.props || fe, !c && a != null)
      for (w = {}, l = 0; l < e.attributes.length; l++)
        w[(d = e.attributes[l]).name] = d.value;
    for (l in w)
      d = w[l], l == "children" || (l == "dangerouslySetInnerHTML" ? o = d : l === "key" || l in p || ve(e, l, null, d, i));
    for (l in p)
      d = p[l], l == "children" ? m = d : l == "dangerouslySetInnerHTML" ? f = d : l == "value" ? h = d : l == "checked" ? y = d : l === "key" || c && typeof d != "function" || w[l] === d || ve(e, l, d, w[l], i);
    if (f)
      c || o && (f.__html === o.__html || f.__html === e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
    else if (o && (e.innerHTML = ""), Lt(e, Ne(m) ? m : [m], t, n, r, i && g !== "foreignObject", a, s, a ? a[0] : n.__k && ie(n, 0), c, _), a != null)
      for (l = a.length; l--; )
        a[l] != null && $t(a[l]);
    c || (l = "value", h !== void 0 && (h !== e[l] || g === "progress" && !h || g === "option" && h !== w[l]) && ve(e, l, h, w[l], !1), l = "checked", y !== void 0 && y !== e[l] && ve(e, l, y, w[l], !1));
  }
  return e;
}
function We(e, t, n) {
  try {
    typeof e == "function" ? e(t) : e.current = t;
  } catch (r) {
    v.__e(r, n);
  }
}
function De(e, t, n) {
  var r, i;
  if (v.unmount && v.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || We(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount)
      try {
        r.componentWillUnmount();
      } catch (a) {
        v.__e(a, t);
      }
    r.base = r.__P = null, e.__c = void 0;
  }
  if (r = e.__k)
    for (i = 0; i < r.length; i++)
      r[i] && De(r[i], t, n || typeof e.type != "function");
  n || e.__e == null || $t(e.__e), e.__ = e.__e = e.__d = void 0;
}
function tn(e, t, n) {
  return this.constructor(e, n);
}
function Mt(e, t, n) {
  var r, i, a, s;
  v.__ && v.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], s = [], je(t, e = (!r && n || t).__k = He(Q, null, [e]), i || fe, fe, t.ownerSVGElement !== void 0, !r && n ? [n] : i ? null : t.firstChild ? $e.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, s), e.__d = void 0, Ue(a, e, s);
}
function Rt(e, t) {
  var n = { __c: t = "__cC" + xt++, __: e, Consumer: function(r, i) {
    return r.children(i);
  }, Provider: function(r) {
    var i, a;
    return this.getChildContext || (i = [], (a = {})[t] = this, this.getChildContext = function() {
      return a;
    }, this.shouldComponentUpdate = function(s) {
      this.props.value !== s.value && i.some(function(c) {
        c.__e = !0, Oe(c);
      });
    }, this.sub = function(s) {
      i.push(s);
      var c = s.componentWillUnmount;
      s.componentWillUnmount = function() {
        i.splice(i.indexOf(s), 1), c && c.call(s);
      };
    }), r.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
$e = Be.slice, v = { __e: function(e, t, n, r) {
  for (var i, a, s; t = t.__; )
    if ((i = t.__c) && !i.__)
      try {
        if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), s = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), s = i.__d), s)
          return i.__E = i;
      } catch (c) {
        e = c;
      }
  throw e;
} }, Ct = 0, K.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = J({}, this.state), typeof e == "function" && (e = e(J({}, n), this.props)), e && J(n, e), e != null && this.__v && (t && this._sb.push(t), Oe(this));
}, K.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Oe(this));
}, K.prototype.render = Q, Y = [], St = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ee = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, Ce.__r = 0, xt = 0;
const Pt = "https://api.d-id.com", nn = "wss://notifications.d-id.com", et = "100", Ve = {
  mixpanelKey: "79f81a83a67430be2bc0fd61042b8faa"
};
var C = /* @__PURE__ */ ((e) => (e[e.New = 0] = "New", e[e.Fail = 1] = "Fail", e[e.Connected = 2] = "Connected", e[e.Connecting = 3] = "Connecting", e[e.Terminating = 4] = "Terminating", e))(C || {}), $ = /* @__PURE__ */ ((e) => (e[e.New = 0] = "New", e[e.Loading = 1] = "Loading", e[e.Buffering = 2] = "Buffering", e[e.Start = 3] = "Start", e[e.Fail = 4] = "Fail", e))($ || {});
window.appLogs = {};
const tt = (e) => {
  try {
    if (Object.keys(e ?? {}).length === 0)
      return;
    window.appLogs = {
      ...window.appLogs,
      ...e
    };
  } catch (t) {
    console.warn(t);
  }
}, ee = "https://api.d-id.com", rn = "wss://notifications.d-id.com";
function an() {
  let e = window.localStorage.getItem("did_external_key_id");
  return e || (e = Math.random().toString(16).slice(2), window.localStorage.setItem("did_external_key_id", e)), e;
}
function At(e) {
  if (e.type === "bearer")
    return `Bearer ${e.token}`;
  if (e.type === "basic")
    return `Basic ${btoa(`${e.username}:${e.password}`)}`;
  if (e.type === "key")
    return `Client-Key ${e.clientKey}.${an()}`;
  throw new Error(`Unknown auth type: ${e}`);
}
function oe(e, t = ee) {
  const n = async (r, i) => {
    const a = await fetch(t + (r != null && r.startsWith("/") ? r : `/${r}`), {
      ...i,
      headers: {
        ...i == null ? void 0 : i.headers,
        Authorization: At(e),
        "Content-Type": "application/json"
      }
    });
    if (!a.ok) {
      let s = await a.text().catch(() => "Failed to fetch");
      throw new Error(s);
    }
    return a.json();
  };
  return {
    get(r, i) {
      return n(r, {
        ...i,
        method: "GET"
      });
    },
    post(r, i, a) {
      return n(r, {
        ...a,
        body: JSON.stringify(i),
        method: "POST"
      });
    },
    delete(r, i, a) {
      return n(r, {
        ...a,
        body: JSON.stringify(i),
        method: "DELETE"
      });
    },
    patch(r, i, a) {
      return n(r, {
        ...a,
        body: JSON.stringify(i),
        method: "PATCH"
      });
    }
  };
}
function It(e, t = ee) {
  const n = oe(e, `${t}/agents`);
  return {
    create(r, i) {
      return n.post("/", r, i);
    },
    getAgents(r, i) {
      return n.get(`/${r ? `?tag=${r}` : ""}`, i).then((a) => a ?? []);
    },
    getById(r, i) {
      return n.get(`/${r}`, i);
    },
    delete(r, i) {
      return n.delete(`/${r}`, void 0, i);
    },
    update(r, i, a) {
      return n.patch(`/${r}`, i, a);
    },
    newChat(r, i) {
      return n.post(`/${r}/chat`, void 0, i);
    },
    chat(r, i, a, s) {
      return n.post(`/${r}/chat/${i}`, a, s);
    }
  };
}
function on(e, t = ee) {
  const n = oe(e, `${t}/knowledge`);
  return {
    createKnowledge(r, i) {
      return n.post("/", r, i);
    },
    getKnowledgeBase(r) {
      return n.get("/", r);
    },
    getKnowledge(r, i) {
      return n.get(`/${r}`, i);
    },
    deleteKnowledge(r, i) {
      return n.delete(`/${r}`, void 0, i);
    },
    createDocument(r, i, a) {
      return n.post(`/${r}/documents`, i, a);
    },
    deleteDocument(r, i, a) {
      return n.delete(`/${r}/documents/${i}`, void 0, a);
    },
    getDocuments(r, i) {
      return n.get(`/${r}/documents`, i);
    },
    getDocument(r, i, a) {
      return n.get(`/${r}/documents/${i}`, a);
    },
    getRecords(r, i, a) {
      return n.get(`/${r}/documents/${i}/records`, a);
    },
    query(r, i, a) {
      return n.post(`/${r}/query`, {
        query: i
      }, a);
    }
  };
}
function sn(e, t = ee) {
  const n = oe(e, `${t}/chats/ratings`);
  return {
    create(r, i) {
      return n.post("/", r, i);
    },
    getByKnowledge(r, i) {
      return n.get(`/${r}`, i).then((a) => a ?? []);
    },
    update(r, i, a) {
      return n.patch(`/${r}`, i, a);
    },
    delete(r, i) {
      return n.delete(`/${r}`, i);
    }
  };
}
const cn = (e) => new Promise((t) => setTimeout(t, e));
function _n(e) {
  return new Promise((t, n) => {
    const {
      callbacks: r,
      host: i,
      auth: a
    } = e, {
      onMessage: s = null,
      onOpen: c = null,
      onClose: _ = null,
      onError: l = null
    } = r || {}, f = new WebSocket(`${i}?authorization=${At(a)}`);
    f.onmessage = s, f.onclose = _, f.onerror = (o) => {
      console.error(o), l == null || l(o), n(o);
    }, f.onopen = (o) => {
      c == null || c(o), t(f);
    };
  });
}
async function ln(e) {
  const {
    retries: t = 1
  } = e;
  let n = null;
  for (let r = 0; (n == null ? void 0 : n.readyState) !== WebSocket.OPEN; r++)
    try {
      n = await _n(e);
    } catch (i) {
      if (r === t)
        throw i;
      await cn(r * 500);
    }
  return n;
}
async function dn(e, t, n) {
  const r = n ? [n] : [], i = await ln({
    auth: e,
    host: t,
    callbacks: {
      onMessage: (a) => {
        const s = JSON.parse(a.data);
        r.forEach((c) => c(s.event, s));
      }
    }
  });
  return {
    socket: i,
    terminate: () => i.close(),
    subscribeToEvents: (a) => r.push(a)
  };
}
var pe = /* @__PURE__ */ ((e) => (e.Start = "START", e.Stop = "STOP", e))(pe || {}), de = /* @__PURE__ */ ((e) => (e.ChatAnswer = "chat/answer", e.ChatPartial = "chat/partial", e.StreamDone = "stream/done", e.StreamStarted = "stream/started", e.StreamFailed = "stream/error", e))(de || {}), D = /* @__PURE__ */ ((e) => (e.Unrated = "Unrated", e.Positive = "Positive", e.Negative = "Negative", e))(D || {}), P = /* @__PURE__ */ ((e) => (e.Functional = "Functional", e.TextOnly = "TextOnly", e.Maintenance = "Maintenance", e))(P || {}), xe = /* @__PURE__ */ ((e) => (e.Embed = "embed", e.Query = "query", e.Partial = "partial", e.Answer = "answer", e.Complete = "done", e))(xe || {}), ue = /* @__PURE__ */ ((e) => (e.Clip = "clip", e.Talk = "talk", e))(ue || {});
function un(e) {
  return e.presenter.type === ue.Clip ? {
    videoType: ue.Clip,
    driver_id: e.presenter.driver_id,
    presenter_id: e.presenter.presenter_id
  } : {
    videoType: ue.Talk,
    source_url: e.presenter.source_url
  };
}
function nt(e, t, n, r) {
  return new Promise(async (i, a) => {
    const s = await wn(un(e), {
      ...t,
      callbacks: {
        ...t.callbacks,
        onConnectionStateChange: async (c) => {
          var _, l;
          if (c === "connected")
            try {
              r || (r = await n.newChat(e.id)), i({
                chat: r,
                streamingManager: s
              });
            } catch (f) {
              console.error(f), a(new Error("Cannot create new chat"));
            }
          else
            c === "failed" && a(new Error("Cannot create connection"));
          (l = (_ = t.callbacks).onConnectionStateChange) == null || l.call(_, c);
        },
        // TODO remove when webscoket will return partial
        onMessage: (c, _) => {
          var l, f;
          c === de.ChatAnswer && (console.log("ChatAnswer", c, _), (f = (l = t.callbacks).onChatEvents) == null || f.call(l, xe.Answer, {
            content: _,
            event: xe.Answer
          }));
        }
      }
    });
  });
}
function fn(e, t, n) {
  return It(t, n || ee).getById(e);
}
async function pn(e, t) {
  var n, r;
  const i = t.baseURL || ee, a = t.wsURL || rn, s = new AbortController(), c = It(t.auth, i), _ = sn(t.auth, i), l = on(t.auth, i), f = typeof e == "string" ? await c.getById(e) : e;
  (r = (n = t.callbacks) == null ? void 0 : n.onAgentReady) == null || r.call(n, f);
  const o = await dn(t.auth, a, t.callbacks.onChatEvents);
  let {
    chat: m,
    streamingManager: d
  } = await nt(f, t, c);
  return {
    agent: f,
    chatId: m.id,
    async reconnectToChat() {
      const {
        streamingManager: h
      } = await nt(f, t, c, m);
      d = h;
    },
    terminate() {
      return s.abort(), o.terminate(), d.terminate();
    },
    chat(h) {
      return c.chat(f.id, m.id, {
        sessionId: d.sessionId,
        streamId: d.streamId,
        messages: h
      }, {
        signal: s.signal
      });
    },
    rate(h, y) {
      return y ? _.update(y, h) : _.create(h);
    },
    deleteRate(h) {
      return _.delete(h);
    },
    speak(h) {
      function y() {
        if (h.type === "text")
          return {
            type: "text",
            provider: h.provider,
            input: h.input,
            ssml: h.ssml || !1
          };
        if (h.type === "audio")
          return {
            type: "audio",
            audio_url: h.audio_url
          };
        throw new Error("Invalid payload");
      }
      return d.speak({
        script: y()
      });
    },
    async getStarterMessages() {
      var h;
      return (h = f.knowledge) != null && h.id ? l.getKnowledge(f.knowledge.id).then((y) => (y == null ? void 0 : y.starter_message) || []) : [];
    }
  };
}
function hn(e, t) {
  const n = oe(e, t);
  return {
    createStream(r) {
      return n.post("/clips/streams", {
        driver_id: r.driver_id,
        presenter_id: r.presenter_id,
        compatibility_mode: r.compatibility_mode
      });
    },
    startConnection(r, i, a) {
      return n.post(`/clips/streams/${r}/sdp`, {
        session_id: a,
        answer: i
      });
    },
    addIceCandidate(r, i, a) {
      return n.post(`/clips/streams/${r}/ice`, {
        session_id: a,
        ...i
      });
    },
    sendStreamRequest(r, i, a) {
      return n.post(`/clips/streams/${r}`, {
        session_id: i,
        ...a
      });
    },
    close(r, i) {
      return n.delete(`/clips/streams/${r}`, {
        session_id: i
      });
    }
  };
}
function mn(e, t) {
  const n = oe(e, t);
  return {
    createStream(r, i) {
      return n.post("/talks/streams", {
        source_url: r.source_url,
        driver_url: r.driver_url,
        face: r.face,
        config: r.config
      }, i);
    },
    startConnection(r, i, a, s) {
      return n.post(`/talks/streams/${r}/sdp`, {
        session_id: a,
        answer: i
      }, s);
    },
    addIceCandidate(r, i, a, s) {
      return n.post(`/talks/streams/${r}/ice`, {
        session_id: a,
        ...i
      }, s);
    },
    sendStreamRequest(r, i, a, s) {
      return n.post(`/talks/streams/${r}`, {
        session_id: i,
        ...a
      }, s);
    },
    close(r, i, a) {
      return n.delete(`/talks/streams/${r}`, {
        session_id: i
      }, a);
    }
  };
}
function gn(e, t) {
  return e.map((n, r) => r === 0 ? t ? {
    index: r,
    timestamp: n.timestamp,
    bytesReceived: n.bytesReceived - t.bytesReceived,
    packetsReceived: n.packetsReceived - t.packetsReceived,
    packetsLost: n.packetsLost - t.packetsLost,
    jitter: n.jitter,
    frameWidth: n.frameWidth,
    frameHeight: n.frameHeight,
    frameRate: n.frameRate
  } : {
    index: r,
    timestamp: n.timestamp,
    bytesReceived: n.bytesReceived,
    packetsReceived: n.packetsReceived,
    packetsLost: n.packetsLost,
    jitter: n.jitter,
    frameWidth: n.frameWidth,
    frameHeight: n.frameHeight,
    frameRate: n.frameRate
  } : {
    index: r,
    timestamp: n.timestamp,
    bytesReceived: n.bytesReceived - e[r - 1].bytesReceived,
    packetsReceived: n.packetsReceived - e[r - 1].packetsReceived,
    packetsLost: n.packetsLost - e[r - 1].packetsLost,
    jitter: n.jitter,
    frameWidth: n.frameWidth,
    frameHeight: n.frameHeight,
    frameRate: n.frameRate
  });
}
let Et = !1;
const G = (e, t) => Et && console.log(e, t), vn = (window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection).bind(window);
function yn(e, t) {
  let n = [], r = 0, i = 0, a;
  return setInterval(() => {
    e.getStats().then((s) => {
      s.forEach((c) => {
        if (c.type === "inbound-rtp" && c.kind === "video") {
          if (i = n.length - 1, c && n[i]) {
            const _ = c.bytesReceived, l = n[i].bytesReceived;
            let f = a;
            a = _ - l > 0;
            let o;
            if (f !== a) {
              if (a)
                r = n.length;
              else {
                const m = n.slice(r), d = r === 0 ? void 0 : n[r - 1];
                o = gn(m, d), o = o.sort((h, y) => y.packetsLost - h.packetsLost).slice(0, 5);
              }
              t == null || t(a ? pe.Start : pe.Stop, o);
            }
          }
          n.push(c);
        }
      });
    });
  }, 500);
}
async function wn(e, {
  debug: t = !1,
  callbacks: n,
  auth: r,
  baseURL: i = ee
}) {
  Et = t;
  const {
    startConnection: a,
    sendStreamRequest: s,
    close: c,
    createStream: _,
    addIceCandidate: l
  } = e.videoType === ue.Clip ? hn(r, i) : mn(r, i), {
    id: f,
    offer: o,
    ice_servers: m,
    session_id: d
  } = await _(e), h = new vn({
    iceServers: m
  }), y = h.createDataChannel("JanusDataChannel");
  if (!d)
    throw new Error("Could not create session_id");
  const w = yn(h, n.onVideoStateChange);
  h.onicecandidate = (g) => {
    G("peerConnection.onicecandidate", g), g.candidate && g.candidate.sdpMid && g.candidate.sdpMLineIndex !== null && l(f, {
      candidate: g.candidate.candidate,
      sdpMid: g.candidate.sdpMid,
      sdpMLineIndex: g.candidate.sdpMLineIndex
    }, d);
  }, h.oniceconnectionstatechange = () => {
    var g;
    G("peerConnection.oniceconnectionstatechange => " + h.iceConnectionState), (g = n.onConnectionStateChange) == null || g.call(n, h.iceConnectionState);
  }, h.ontrack = (g) => {
    var k;
    G("peerConnection.ontrack", g), (k = n.onSrcObjectReady) == null || k.call(n, g.streams[0]);
  }, y.onmessage = (g) => {
    var k, S;
    if (y.readyState === "open") {
      const [T, M] = g.data.split(":");
      T === de.StreamStarted ? console.log("StreamStarted", T, M) : T === de.StreamDone ? console.log("StreamDone") : T === de.StreamFailed ? ((k = n.onVideoStateChange) == null || k.call(n, pe.Stop, {
        event: T,
        data: M
      }), clearInterval(w), console.log("StreamFailed")) : (S = n.onMessage) == null || S.call(n, T, decodeURIComponent(M));
    }
  }, await h.setRemoteDescription(o), G("set remote description OK");
  const p = await h.createAnswer();
  return G("create answer OK"), await h.setLocalDescription(p), G("set local description OK"), await a(f, p, d), G("start connection OK"), {
    /**
     * Method to send request to server to get clip or talk depend on you payload
     * @param payload
     */
    speak(g) {
      return s(f, d, g);
    },
    /**
     * Method to close RTC connection
     */
    async terminate() {
      var g, k;
      f && (h && (h.close(), h.oniceconnectionstatechange = null, h.onnegotiationneeded = null, h.onicecandidate = null, h.ontrack = null), await c(f, d).catch((S) => {
      }), (g = n.onConnectionStateChange) == null || g.call(n, "closed"), (k = n.onVideoStateChange) == null || k.call(n, pe.Stop), clearInterval(w));
    },
    /**
     * Session identifier information, should be returned in the body of all streaming requests
     */
    sessionId: d,
    /**
     * Id of current RTC stream
     */
    streamId: f
  };
}
var X, x, Me, rt, he = 0, Ht = [], be = [], L = v, it = L.__b, at = L.__r, ot = L.diffed, st = L.__c, ct = L.unmount, _t = L.__;
function me(e, t) {
  L.__h && L.__h(x, e, he || t), he = 0;
  var n = x.__H || (x.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({ __V: be }), n.__[e];
}
function b(e) {
  return he = 1, bn(Ot, e);
}
function bn(e, t, n) {
  var r = me(X++, 2);
  if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Ot(void 0, t), function(c) {
    var _ = r.__N ? r.__N[0] : r.__[0], l = r.t(_, c);
    _ !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
  }], r.__c = x, !x.u)) {
    var i = function(c, _, l) {
      if (!r.__c.__H)
        return !0;
      var f = r.__c.__H.__.filter(function(m) {
        return !!m.__c;
      });
      if (f.every(function(m) {
        return !m.__N;
      }))
        return !a || a.call(this, c, _, l);
      var o = !1;
      return f.forEach(function(m) {
        if (m.__N) {
          var d = m.__[0];
          m.__ = m.__N, m.__N = void 0, d !== m.__[0] && (o = !0);
        }
      }), !(!o && r.__c.props === c) && (!a || a.call(this, c, _, l));
    };
    x.u = !0;
    var a = x.shouldComponentUpdate, s = x.componentWillUpdate;
    x.componentWillUpdate = function(c, _, l) {
      if (this.__e) {
        var f = a;
        a = void 0, i(c, _, l), a = f;
      }
      s && s.call(this, c, _, l);
    }, x.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function E(e, t) {
  var n = me(X++, 3);
  !L.__s && ze(n.__H, t) && (n.__ = e, n.i = t, x.__H.__h.push(n));
}
function kn(e, t) {
  var n = me(X++, 4);
  !L.__s && ze(n.__H, t) && (n.__ = e, n.i = t, x.__h.push(n));
}
function ae(e) {
  return he = 5, Le(function() {
    return { current: e };
  }, []);
}
function Le(e, t) {
  var n = me(X++, 7);
  return ze(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__;
}
function lt(e, t) {
  return he = 8, Le(function() {
    return e;
  }, t);
}
function Z(e) {
  var t = x.context[e.__c], n = me(X++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(x)), t.props.value) : e.__;
}
function Cn() {
  for (var e; e = Ht.shift(); )
    if (e.__P && e.__H)
      try {
        e.__H.__h.forEach(ke), e.__H.__h.forEach(Fe), e.__H.__h = [];
      } catch (t) {
        e.__H.__h = [], L.__e(t, e.__v);
      }
}
L.__b = function(e) {
  x = null, it && it(e);
}, L.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), _t && _t(e, t);
}, L.__r = function(e) {
  at && at(e), X = 0;
  var t = (x = e.__c).__H;
  t && (Me === x ? (t.__h = [], x.__h = [], t.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = be, n.__N = n.i = void 0;
  })) : (t.__h.forEach(ke), t.__h.forEach(Fe), t.__h = [], X = 0)), Me = x;
}, L.diffed = function(e) {
  ot && ot(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (Ht.push(t) !== 1 && rt === L.requestAnimationFrame || ((rt = L.requestAnimationFrame) || Sn)(Cn)), t.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== be && (n.__ = n.__V), n.i = void 0, n.__V = be;
  })), Me = x = null;
}, L.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(ke), n.__h = n.__h.filter(function(r) {
        return !r.__ || Fe(r);
      });
    } catch (r) {
      t.some(function(i) {
        i.__h && (i.__h = []);
      }), t = [], L.__e(r, n.__v);
    }
  }), st && st(e, t);
}, L.unmount = function(e) {
  ct && ct(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      ke(r);
    } catch (i) {
      t = i;
    }
  }), n.__H = void 0, t && L.__e(t, n.__v));
};
var dt = typeof requestAnimationFrame == "function";
function Sn(e) {
  var t, n = function() {
    clearTimeout(r), dt && cancelAnimationFrame(t), setTimeout(e);
  }, r = setTimeout(n, 100);
  dt && (t = requestAnimationFrame(n));
}
function ke(e) {
  var t = x, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), x = t;
}
function Fe(e) {
  var t = x;
  e.__c = e.__(), x = t;
}
function ze(e, t) {
  return !e || e.length !== t.length || t.some(function(n, r) {
    return n !== e[r];
  });
}
function Ot(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ut() {
  return Math.random().toString(16).slice(2);
}
function xn() {
  const e = localStorage.getItem("tracking_id") ?? Ut();
  return localStorage.setItem("tracking_id", e), e;
}
function F(e, t) {
  if (window.localStorage.getItem("track_enabled") === "false")
    return;
  const n = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      data: JSON.stringify([{
        event: e,
        properties: {
          ...t,
          token: Ve.mixpanelKey,
          time: Date.now(),
          distinct_id: xn(),
          $insert_id: Ut(),
          origin: window.location.href,
          "Screen Height": window.screen.height || window.innerWidth,
          "Screen Width": window.screen.width || window.innerHeight,
          "User Agent": navigator.userAgent
        }
      }])
    })
  };
  return fetch("https://api-js.mixpanel.com/track/?verbose=1&ip=1", n).then((r) => r.json()).catch((r) => console.error(r));
}
var $n = 0;
function u(e, t, n, r, i, a) {
  var s, c, _ = {};
  for (c in t)
    c == "ref" ? s = t[c] : _[c] = t[c];
  var l = { type: e, props: _, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --$n, __i: -1, __u: 0, __source: i, __self: a };
  if (typeof e == "function" && (s = e.defaultProps))
    for (c in s)
      _[c] === void 0 && (_[c] = s[c]);
  return v.vnode && v.vnode(l), l;
}
const se = Rt({
  didFetch: async () => {
  },
  authenticate: () => {
  },
  auth: {},
  host: "",
  wsHost: "",
  isAuthenticated: !1
});
se.displayName = "DidFetch";
function Nn({
  children: e,
  auth: t,
  didApiUrl: n,
  didSocketApiUrl: r
}) {
  const [i, a] = b(t), s = Le(() => i && oe(i, n), [i]), c = async (_) => {
    a((l) => JSON.stringify(_) === JSON.stringify(l) ? l : _);
  };
  return u(se.Provider, {
    value: {
      didFetch: s,
      auth: i,
      host: n,
      wsHost: r,
      authenticate: c,
      isAuthenticated: !!i
    },
    children: e
  });
}
var Dt = /* @__PURE__ */ ((e) => (e.Start = "START", e.Stop = "STOP", e))(Dt || {});
const te = Rt({
  connectionState: C.New,
  chatMode: P.Functional,
  setChatMode: () => {
  },
  streamState: $.New,
  videoState: "STOP",
  starterMessage: [],
  connect: async () => {
  },
  reconnectToChat: async () => {
  },
  terminate: async () => {
  },
  setStreamState: () => {
  },
  streamedMessage: "",
  error: "",
  agentManager: {
    agent: {},
    reconnectToChat: async () => {
    },
    terminate: async () => {
    },
    chatId: "",
    chat: async () => ({
      result: ""
    }),
    rate: async () => ({}),
    deleteRate: async () => ({}),
    speak: async () => ({}),
    getStarterMessages: async () => []
  }
});
te.displayName = "Streaming Manager";
function Ln(e) {
  switch (e) {
    case "connected":
      return C.Connected;
    case "checking":
      return C.Connecting;
    case "failed":
      return C.Fail;
    case "new":
    case "closed":
    case "disconnected":
    default:
      return C.New;
  }
}
function Tn({
  children: e,
  agent: t,
  onAgentReady: n,
  enabled: r
}) {
  const [i, a] = b(C.New), [s, c] = b(P.Functional), [_, l] = b($.New), [f, o] = b(
    "STOP"
    /* Stop */
  ), [m, d] = b(), [h, y] = b(""), [w, p] = b([]), [g, k] = b(), [S, T] = b(), [M, H] = b(""), {
    auth: j,
    host: R,
    wsHost: B
  } = Z(se);
  async function ne() {
    if (j && R && B && r)
      try {
        H(""), c(P.Functional), a(C.Connecting);
        const O = await pn(t, {
          auth: j,
          baseURL: R,
          wsURL: B,
          callbacks: {
            onSrcObjectReady: d,
            onAgentReady: (A) => {
              T(A), n == null || n(A);
            },
            onConnectionStateChange(A) {
              const U = Ln(A);
              tt({
                connectionState: C[U]
              }), U === C.Connected && F("agent-chat-loaded"), a(U);
            },
            onVideoStateChange(A, U) {
              const V = A === "START" ? $.Start : $.New;
              o(A), l(V), tt({
                streamState: $[V]
              }), F("agent-video", {
                event: A,
                rtcStats: U ?? [],
                agent_id: S == null ? void 0 : S.id
              });
            },
            onChatEvents(A, U) {
              const {
                content: V = ""
              } = U ?? {};
              y((Te) => A === xe.Partial ? Te + V : V);
            }
          }
        });
        k({
          ...O,
          chat: async (A) => O.agent.presenter.voice ? (y(""), await O.chat(A).catch((V) => {
            throw (V == null ? void 0 : V.kind) === "InsufficientCreditsError" && c(P.TextOnly), V;
          })) : Promise.reject()
        }), p(await O.getStarterMessages());
      } catch (O) {
        _e(O);
      }
  }
  async function ce() {
    l($.New), a(C.Terminating), await (g == null ? void 0 : g.terminate()), a(C.New);
  }
  async function ge() {
    try {
      a(C.Connecting), await (g == null ? void 0 : g.reconnectToChat()), a(C.Connected);
    } catch (O) {
      _e(O);
    }
  }
  function _e(O) {
    console.log(O), O instanceof TypeError && l($.Fail), a(C.Fail), c(P.Maintenance), H(`${(S == null ? void 0 : S.preview_name) || "Agent"} is unavailable at the moment`);
  }
  return E(() => {
    r ? ne() : ce().catch();
  }, [j, R, B, r]), E(() => {
    T(typeof t == "string" ? void 0 : t);
  }, [t]), u(te.Provider, {
    value: {
      streamedMessage: h,
      starterMessage: w,
      srcObject: m,
      streamState: _,
      videoState: f,
      connectionState: i,
      chatMode: s,
      setChatMode: c,
      setStreamState: l,
      terminate: ce,
      connect: ne,
      error: M,
      reconnectToChat: ge,
      agentManager: g,
      agent: S
    },
    children: e
  });
}
const Vt = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.3035%206.70851L14.7142%206.11925C12.1107%203.51576%207.88961%203.51576%205.28612%206.11925C2.68262%208.72275%202.68262%2012.9438%205.28612%2015.5473C7.88961%2018.1508%2012.1107%2018.1508%2014.7142%2015.5473C16.2282%2014.0333%2016.8618%2011.9723%2016.6149%2010.0004M15.3035%206.70851H11.7679M15.3035%206.70851V3.17297'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Mn = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.9399%206.96684L6.87207%2017.0347M6.87203%206.9668L16.9399%2017.0346'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c/svg%3e", Ft = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20height='800px'%20width='800px'%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20199.943%20199.943'%20xml:space='preserve'%3e%3cg%3e%3cg%3e%3cpath%20style='fill:%23010002;'%20d='M99.972,0.004C44.85,0.004,0,44.847,0,99.968c0,55.125,44.847,99.972,99.972,99.972%20s99.972-44.847,99.972-99.972C199.943,44.847,155.093,0.004,99.972,0.004z%20M99.972,190.957c-50.168,0-90.996-40.813-90.996-90.989%20c0-50.172,40.828-90.992,90.996-90.992c50.175,0,91.003,40.817,91.003,90.992S150.147,190.957,99.972,190.957z'/%3e%3cpath%20style='fill:%23010002;'%20d='M99.324,67.354c-3.708,0-6.725,3.01-6.725,6.728v75.979c0,3.722,3.017,6.739,6.725,6.739%20c3.722,0,6.739-3.017,6.739-6.739V74.082C106.063,70.364,103.042,67.354,99.324,67.354z'/%3e%3ccircle%20style='fill:%23010002;'%20cx='99.746'%20cy='48.697'%20r='8.178'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
function W({
  src: e,
  size: t,
  color: n = "currentcolor",
  padding: r = "0",
  rotated: i,
  margin: a = "0",
  width: s,
  className: c = ""
}) {
  return u("svg", {
    className: "didagent__maskedicon " + c,
    style: {
      "--mask-url": `url("${e}")`,
      "--color": n,
      "--width": s,
      "--size": t,
      "--padding": r,
      "--margin": a,
      "--rotation": i ? "180deg" : "0deg"
    }
  });
}
const Rn = ({
  text: e,
  hide: t
}) => t ? null : u("div", {
  className: "didagent__info_message_agent_unavailable didagent__info_message_agent_unavailable_container",
  children: u("pre", {
    className: "didagent__info_message_agent_unavailable_danger",
    children: [u(W, {
      src: Ft,
      size: "20px"
    }), u("pre", {
      children: e
    })]
  })
});
function Pn({
  title: e,
  content: t,
  hide: n
}) {
  return n ? null : u("div", {
    className: "didagent__info_message_agent_unavailable_container",
    children: [u("pre", {
      className: "didagent__info_message_agent_unavailable_indication",
      children: [u(W, {
        src: Ft,
        size: "20px"
      }), u("pre", {
        children: e
      })]
    }), t && u("pre", {
      className: "didagent__info_message_agent_unavailable_message",
      children: t
    })]
  });
}
function An({
  name: e,
  displayRestart: t,
  onRestart: n,
  restartDisabled: r,
  isRestarting: i,
  onClose: a,
  onEasterEgg: s,
  closeClassName: c
}) {
  const {
    chatMode: _,
    agent: l,
    error: f
  } = Z(te);
  (l == null ? void 0 : l.chats) !== void 0 && Math.max(0, et - l.chats);
  const o = ae(0), m = (l == null ? void 0 : l.presenter.type) === "clip";
  function d() {
    o.current += 1, o.current === 5 && (s == null || s(), o.current = 0);
  }
  return u("header", {
    className: "didagent__header",
    children: [u("div", {
      className: "didagent__header-left",
      children: [u("button", {
        onClick: a,
        className: `didagent__close__button ${c}`,
        children: u(W, {
          src: Mn,
          size: "20px"
        })
      }), u("h2", {
        style: {
          "--color": m ? "white" : ""
        },
        className: "didagent__header__name",
        onClick: d,
        children: e
      })]
    }), u(Pn, {
      hide: _ !== P.TextOnly,
      title: "Performance mode",
      content: `${e} is currently in performance mode, sound and face animations will not play`
    }), u(Rn, {
      hide: !f,
      text: f
    }), t && u("button", {
      onClick: n,
      disabled: r,
      title: "Restart conversation",
      className: `didagent__header__menu__item ${i ? "didagent__header__menu__item-rotate" : ""} didagent__header__menu__item__${m ? "clip__agent" : "talk__agent"}`,
      children: u(W, {
        src: Vt,
        size: "20px"
      })
    })]
  });
}
const In = "data:image/svg+xml,%3csvg%20version='1.1'%20id='L9'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20100%20100'%20enable-background='new%200%200%200%200'%20xml:space='preserve'%3e%3cpath%20fill='%23fff'%20d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50%20M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'%3e%3canimateTransform%20attributeName='transform'%20attributeType='XML'%20type='rotate'%20dur='1s'%20from='0%2050%2050'%20to='360%2050%2050'%20repeatCount='indefinite'%20/%3e%3c/path%3e%3c/svg%3e";
function Re() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
const Bt = "data:image/svg+xml,%3csvg%20version='1.1'%20id='L5'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%2052%2042'%20enable-background='new%200%200%200%200'%20xml:space='preserve'%3e%3ccircle%20fill='%23fff'%20stroke='none'%20cx='6'%20cy='21'%20r='6'%3e%3canimateTransform%20attributeName='transform'%20dur='1s'%20type='translate'%20values='0%2015%20;%200%20-15;%200%2015'%20repeatCount='indefinite'%20begin='0.1'/%3e%3c/circle%3e%3ccircle%20fill='%23fff'%20stroke='none'%20cx='25'%20cy='21'%20r='6'%3e%3canimateTransform%20attributeName='transform'%20dur='1s'%20type='translate'%20values='0%2010%20;%200%20-10;%200%2010'%20repeatCount='indefinite'%20begin='0.2'/%3e%3c/circle%3e%3ccircle%20fill='%23fff'%20stroke='none'%20cx='44'%20cy='21'%20r='6'%3e%3canimateTransform%20attributeName='transform'%20dur='1s'%20type='translate'%20values='0%205%20;%200%20-5;%200%205'%20repeatCount='indefinite'%20begin='0.3'/%3e%3c/circle%3e%3c/svg%3e", En = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.4453%2011.5556C10.4453%208.48731%2012.9326%206%2016.0009%206C19.0691%206%2021.5564%208.48731%2021.5564%2011.5556V14.8889C21.5564%2017.9571%2019.0691%2020.4444%2016.0009%2020.4444C12.9326%2020.4444%2010.4453%2017.9571%2010.4453%2014.8889V11.5556Z'%20fill='white'%20stroke='white'%20stroke-width='1.66667'/%3e%3cpath%20d='M24.8911%2013.7812V14.8924C24.8911%2019.8016%2020.9114%2023.7813%2016.0022%2023.7813C11.093%2023.7813%207.11328%2019.8016%207.11328%2014.8924V13.7812'%20stroke='white'%20stroke-width='1.66667'%20stroke-linecap='round'/%3e%3cpath%20d='M16%2023.7812V27.1146'%20stroke='white'%20stroke-width='1.66667'%20stroke-linecap='round'/%3e%3c/svg%3e", Hn = "data:image/svg+xml,%3csvg%20width='23'%20height='24'%20viewBox='0%200%2023%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.68322%2018.9259L14.3358%2016.4985C18.4002%2014.3779%2020.4324%2013.3176%2020.4324%2011.6386C20.4324%209.95953%2018.4002%208.89925%2014.3358%206.77869L9.68324%204.35127C6.40287%202.63977%204.76268%201.78403%203.81181%202.0467C2.90723%202.29659%202.20074%203.0338%201.96126%203.97771C1.70953%204.96992%202.52962%206.68142%204.1698%2010.1044C4.37307%2010.5286%204.78866%2010.8108%205.24318%2010.813L12.6703%2010.8491C13.0882%2010.8511%2013.4253%2011.2062%2013.4234%2011.6423C13.4214%2012.0783%2013.0811%2012.4301%2012.6633%2012.428L5.35607%2012.3926C4.8551%2012.3901%204.39385%2012.7052%204.1698%2013.1728C2.52963%2016.5957%201.70953%2018.3072%201.96126%2019.2994C2.20074%2020.2434%202.90723%2020.9806%203.81181%2021.2305C4.76268%2021.4931%206.40287%2020.6374%209.68322%2018.9259Z'%20fill='white'/%3e%3c/svg%3e", On = "data:image/svg+xml,%3csvg%20id='wave'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%2038.05'%3e%3cstyle%3e%20%23Line_1%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.15s;%20}%20%23Line_2%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.3s;%20}%20%23Line_3%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.45s;%20}%20%23Line_4%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.6s;%20}%20%23Line_5%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.75s;%20}%20%23Line_6%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%200.9s;%20}%20%23Line_7%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%201.05s;%20}%20%23Line_8%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%201.2s;%20}%20%23Line_9%20{%20animation:%20pulse%201s%20infinite;%20animation-delay:%201.35s;%20}%20@keyframes%20pulse%20{%200%25%20{%20transform:%20scaleY(1);%20transform-origin:%2050%25%2050%25;%20}%2050%25%20{%20transform:%20scaleY(0.7);%20transform-origin:%2050%25%2050%25;%20}%20100%25%20{%20transform:%20scaleY(1);%20transform-origin:%2050%25%2050%25;%20}%20}%20%3c/style%3e%3cpath%20id='Line_1'%20data-name='Line%201'%20d='M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z'%20/%3e%3cpath%20id='Line_2'%20data-name='Line%202'%20d='M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z'%20/%3e%3cpath%20id='Line_3'%20data-name='Line%203'%20d='M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z'%20/%3e%3cpath%20id='Line_4'%20data-name='Line%204'%20d='M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z'%20/%3e%3cpath%20id='Line_5'%20data-name='Line%205'%20d='M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z'%20/%3e%3cpath%20id='Line_6'%20data-name='Line%206'%20d='M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z'%20/%3e%3cpath%20id='Line_7'%20data-name='Line%207'%20d='M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z'%20/%3e%3cpath%20id='Line_8'%20data-name='Line%208'%20d='M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z'%20/%3e%3cpath%20id='Line_9'%20data-name='Line%209'%20d='M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z'%20/%3e%3c/svg%3e";
function Un() {
  return navigator.userAgent.toLowerCase().match(/(android|windows).+chrome|(iphone|mac).+safari/) && (window.SpeechRecognition || window.webkitSpeechRecognition);
}
function Dn({
  onstart: e,
  onend: t,
  onresult: n,
  onerror: r,
  interimResults: i = !1
}) {
  const a = Un();
  if (!a)
    return null;
  const s = new a();
  return s.interimResults = i, s.onerror = (c) => r == null ? void 0 : r(c), s.onstart = () => {
    e == null || e();
  }, s.onspeechend = () => {
    t == null || t(), s.stop();
  }, s.onresult = n, {
    start: () => s.start(),
    stop: () => s.stop()
  };
}
function Vn({
  text: e,
  onSend: t,
  onResume: n,
  onTranscript: r
}) {
  var w;
  const [i, a] = b(), [s, c] = b(!1), _ = Z(te), l = (_ == null ? void 0 : _.connectionState) || C.New, f = (_ == null ? void 0 : _.streamState) || $.New, o = ((w = _ == null ? void 0 : _.agentManager) == null ? void 0 : w.chatId) || "", m = (_ == null ? void 0 : _.chatMode) === P.TextOnly, {
    isAuthenticated: d
  } = Z(se), h = Le(() => Dn({
    onresult(p) {
      const g = [...p.results].map((k) => [...k].map((S) => S.transcript.trim()).join(" ")).join(" ");
      r(g);
    },
    onstart: () => c(!0),
    onend: () => c(!1),
    onerror: (p) => {
      F("agent-stt-error", {
        event: "error",
        error: p.error,
        engine: "native",
        chatId: o
      }), a(p);
    }
  }), [r]);
  if (d) {
    if (l === C.Connecting)
      return u("button", {
        className: "didagaent__send__button",
        disabled: !0,
        children: [u("div", {
          className: "didagent__box__blur border8"
        }), u(W, {
          src: Bt,
          size: "16px"
        })]
      });
    if ([C.New, C.Fail, C.Terminating].includes(l) && !m)
      return u("button", {
        className: "didagaent__send__button",
        onClick: n,
        disabled: l === C.Terminating,
        children: [u("div", {
          className: "didagent__box__blur border8"
        }), u(W, {
          src: Vt,
          size: "24px"
        })]
      });
  }
  const y = [$.Start, $.Loading, $.Buffering].includes(f) && !m;
  return e.length === 0 && !i ? u("button", {
    className: "didagaent__send__button",
    onClick: function() {
      if (h) {
        const g = s ? "stop" : "start";
        h[g](), F(`agent-stt-${g}`, {
          event: "click",
          engine: "native",
          chatId: o
        });
      }
    },
    disabled: y,
    children: [u("div", {
      className: "didagent__box__blur border8"
    }), u(W, {
      src: s ? On : En,
      size: "24px"
    })]
  }) : u("button", {
    className: "didagaent__send__button",
    onClick: t,
    disabled: !e.trim() || y,
    children: [u("div", {
      className: "didagent__box__blur border8"
    }), u(W, {
      src: Hn,
      size: "24px",
      color: "white"
    })]
  });
}
function jt(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}
function ut(e, t) {
  for (var n in e)
    if (n !== "__source" && !(n in t))
      return !0;
  for (var r in t)
    if (r !== "__source" && e[r] !== t[r])
      return !0;
  return !1;
}
function ft(e, t) {
  this.props = e, this.context = t;
}
(ft.prototype = new K()).isPureReactComponent = !0, ft.prototype.shouldComponentUpdate = function(e, t) {
  return ut(this.props, e) || ut(this.state, t);
};
var pt = v.__b;
v.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), pt && pt(e);
};
var Fn = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Bn(e) {
  function t(n) {
    var r = jt({}, n);
    return delete r.ref, e(r, n.ref || null);
  }
  return t.$$typeof = Fn, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var jn = v.__e;
v.__e = function(e, t, n, r) {
  if (e.then) {
    for (var i, a = t; a = a.__; )
      if ((i = a.__c) && i.__c)
        return t.__e == null && (t.__e = n.__e, t.__k = n.__k), i.__c(e, t);
  }
  jn(e, t, n, r);
};
var ht = v.unmount;
function Wt(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = jt({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return Wt(r, t, n);
  })), e;
}
function zt(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return zt(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Pe() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Kt(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function ye() {
  this.u = null, this.o = null;
}
v.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), ht && ht(e);
}, (Pe.prototype = new K()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var i = Kt(r.__v), a = !1, s = function() {
    a || (a = !0, n.__R = null, i ? i(c) : c());
  };
  n.__R = s;
  var c = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var _ = r.state.__a;
        r.__v.__k[0] = zt(_, _.__c.__P, _.__c.__O);
      }
      var l;
      for (r.setState({ __a: r.__b = null }); l = r.t.pop(); )
        l.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(s, s);
}, Pe.prototype.componentWillUnmount = function() {
  this.t = [];
}, Pe.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Wt(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = t.__a && He(Q, null, e.fallback);
  return i && (i.__u &= -33), [He(Q, null, t.__a ? null : e.children), i];
};
var mt = function(e, t, n) {
  if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size))
    for (n = e.u; n; ) {
      for (; n.length > 3; )
        n.pop()();
      if (n[1] < n[0])
        break;
      e.u = n = n[2];
    }
};
(ye.prototype = new K()).__a = function(e) {
  var t = this, n = Kt(t.__v), r = t.o.get(e);
  return r[0]++, function(i) {
    var a = function() {
      t.props.revealOrder ? (r.push(i), mt(t, e, r)) : i();
    };
    n ? n(a) : a();
  };
}, ye.prototype.render = function(e) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t = Se(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; )
    this.o.set(t[n], this.u = [1, 0, this.u]);
  return e.children;
}, ye.prototype.componentDidUpdate = ye.prototype.componentDidMount = function() {
  var e = this;
  this.o.forEach(function(t, n) {
    mt(e, n, t);
  });
};
var Wn = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, zn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Kn = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Zn = /[A-Z0-9]/g, qn = typeof document < "u", Jn = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
K.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(K.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var gt = v.event;
function Gn() {
}
function Yn() {
  return this.cancelBubble;
}
function Qn() {
  return this.defaultPrevented;
}
v.event = function(e) {
  return gt && (e = gt(e)), e.persist = Gn, e.isPropagationStopped = Yn, e.isDefaultPrevented = Qn, e.nativeEvent = e;
};
var Xn = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, vt = v.vnode;
v.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, i = {};
    for (var a in n) {
      var s = n[a];
      if (!(a === "value" && "defaultValue" in n && s == null || qn && a === "children" && r === "noscript" || a === "class" || a === "className")) {
        var c = a.toLowerCase();
        a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && s === !0 ? s = "" : c === "translate" && s === "no" ? s = !1 : c === "ondoubleclick" ? a = "ondblclick" : c !== "onchange" || r !== "input" && r !== "textarea" || Jn(n.type) ? c === "onfocus" ? a = "onfocusin" : c === "onblur" ? a = "onfocusout" : Kn.test(a) ? a = c : r.indexOf("-") === -1 && zn.test(a) ? a = a.replace(Zn, "-$&").toLowerCase() : s === null && (s = void 0) : c = a = "oninput", c === "oninput" && i[a = c] && (a = "oninputCapture"), i[a] = s;
      }
    }
    r == "select" && i.multiple && Array.isArray(i.value) && (i.value = Se(n.children).forEach(function(_) {
      _.props.selected = i.value.indexOf(_.props.value) != -1;
    })), r == "select" && i.defaultValue != null && (i.value = Se(n.children).forEach(function(_) {
      _.props.selected = i.multiple ? i.defaultValue.indexOf(_.props.value) != -1 : i.defaultValue == _.props.value;
    })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Xn)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), t.props = i;
  }(e), e.$$typeof = Wn, vt && vt(e);
};
var yt = v.__r;
v.__r = function(e) {
  yt && yt(e), e.__c;
};
var wt = v.diffed;
v.diffed = function(e) {
  wt && wt(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function er(e, t, n) {
  return e ? "var(--did-primary-black-9080)" : "var(--did-primary-black-9060)";
}
function bt({
  negative: e,
  toggled: t,
  onClick: n,
  disabled: r
}) {
  if (!t && r)
    return null;
  const i = e === !0, a = {
    "--hover-color": "var(--did-primary-black-9080)",
    "--color": er(t, i, r === !0),
    "--cursor": r === !0 ? "default" : "pointer"
  };
  return u("div", {
    className: "didagent__thumb__container",
    style: a,
    onClick: () => !r && (n == null ? void 0 : n(!t)),
    children: i ? "👎" : "👍"
  });
}
const tr = (e, t) => e === "up" ? t === D.Positive ? D.Unrated : D.Positive : t === D.Negative ? D.Unrated : D.Negative;
function nr({
  className: e,
  onRate: t,
  message: n,
  style: r
}) {
  const [i, a] = b(D.Unrated), [s, c] = b(), [_, l] = b(!1), {
    agentManager: f
  } = Z(te);
  function o(m) {
    return async () => {
      var y, w;
      const d = tr(m, i);
      a(d), l(!0);
      const h = await (t == null ? void 0 : t(d, n, s));
      F("agents-rating", {
        thumb: m,
        rate: d,
        agentId: (y = f == null ? void 0 : f.agent) == null ? void 0 : y.id,
        matches: ((w = n.matches) == null ? void 0 : w.map((p) => [p.document_id, p.id])) ?? []
      }), c(h);
    };
  }
  return u("div", {
    className: `${e} didagent__rating`,
    style: r,
    children: [u(bt, {
      disabled: _,
      toggled: i === D.Positive,
      onClick: o("up")
    }), u(bt, {
      disabled: _,
      negative: !0,
      toggled: i === D.Negative,
      onClick: o("down")
    })]
  });
}
const rr = ["Juggling thoughts and data...", "Processing, just a moment...", "Cooking up a response...", "Brainstorming potential answers...", "Let me look this up..."], kt = ["Pondering the best reply...", "Processing, just a moment...", "Convincing my electrons to run faster...", "This is interesting..."], ir = [{
  text: [""],
  duration: 2e3
}, {
  text: ["Thinking..."],
  duration: 3e3
}, {
  text: rr,
  duration: 4e3
}, {
  text: kt,
  duration: 4e3
}, {
  text: kt,
  duration: 4e3
}];
function ar(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function or(e) {
  const [t, n] = b(e[0].text[0]), r = ae(), i = (s = 0) => {
    s < e.length && !r.current && (r.current = setTimeout(() => {
      r.current = void 0;
      const c = (s + 1) % e.length;
      n(ar(e[c].text)), i(c);
    }, e[s].duration));
  };
  return {
    text: t,
    doStep: i,
    clear: () => {
      clearTimeout(r.current), n(e[0].text[0]), r.current = void 0;
    }
  };
}
const sr = "#b8b8b8", cr = Bn(function({
  messages: e,
  isLoading: t,
  onRate: n
}, r) {
  const {
    doStep: i,
    text: a,
    clear: s
  } = or(ir);
  return E(() => t ? i() : s(), [t]), u("div", {
    className: "didagent__messages__container",
    ref: r,
    children: [e.filter(({
      content: c
    }) => !!c).map((c, _) => u("div", {
      className: `didagent__message__container didagent__message__container__${c.role}`,
      children: [u("pre", {
        className: `didagent__message didagent__message__${c.role}`,
        children: c.content
      }), _ > 0 && c.role === "assistant" && u(nr, {
        className: "didagent__message__rating",
        message: c,
        onRate: n,
        style: {
          opacity: _ === e.length - 1 ? 1 : void 0
        }
      })]
    })), t && u("div", {
      className: "didagent__message__container didagent__message__container__assistant",
      children: u("pre", {
        className: "didagent__message didagent__message__assistant didagent__message__assistant__loader",
        children: [u(W, {
          src: Bt,
          color: sr,
          size: "22px"
        }), a]
      })
    })]
  });
}), _r = (e, t = 90) => e.length > t ? e.slice(0, t) + "..." : e;
function lr({
  messages: e,
  onClick: t,
  show: n
}) {
  const [r, i] = b(!1);
  return E(() => {
    n && e.length > 0 && setTimeout(() => {
      i(!0);
    }, 2e3);
  }, [n, e]), n ? u("div", {
    className: "didagent__starter_messages__container",
    style: {
      maxHeight: r ? "120px" : "0"
    },
    children: e.map((a) => u("div", {
      className: "didagent__starter_message__container",
      onClick: () => t(a),
      children: _r(a)
    }, a))
  }) : null;
}
function dr({
  size: e = 40
}) {
  const t = `${-e / 2}px`;
  return u("div", {
    className: "didagent__video_blur",
    children: [u("div", {
      className: "didagent__video_blur__position didagent__video_blur__position_right",
      style: {
        top: 0,
        right: t,
        width: `${e}px`,
        height: "100%"
      },
      children: [u("div", {
        className: "didagent__video_blur__inner_v"
      }), u("div", {
        className: "didagent__video_blur__outer"
      })]
    }), u("div", {
      className: "didagent__video_blur__position didagent__video_blur__position_left",
      style: {
        top: 0,
        left: t,
        width: `${e}px`,
        height: "100%"
      },
      children: [u("div", {
        className: "didagent__video_blur__inner_v"
      }), u("div", {
        className: "didagent__video_blur__outer"
      })]
    }), u("div", {
      className: "didagent__video_blur__position didagent__video_blur__position_bottom",
      style: {
        bottom: t,
        left: 0,
        width: "100%",
        height: `${e}px`
      },
      children: [u("div", {
        className: "didagent__video_blur__inner_h"
      }), u("div", {
        className: "didagent__video_blur__outer"
      })]
    })]
  });
}
function ur({
  streamState: e,
  videoState: t,
  srcObject: n,
  idleVideo: r,
  isBlur: i,
  onVideoPlay: a,
  onVideoStop: s,
  onIdleLoad: c
}) {
  const _ = ae(null), l = ae(), [f, o] = b(0);
  return E(() => {
    n && _.current && (l.current = n);
  }, [n, _.current]), E(() => {
    _.current && (e === $.Start ? _.current.srcObject = l.current : t == Dt.Stop && (o(0), setTimeout(() => {
      _.current && (_.current.srcObject = null);
    }, 1e3)));
  }, [e, t]), u("div", {
    className: `didagent__embedded__video__container ${i ? "didagent__embedded__video__blur" : ""}`,
    children: [u("video", {
      onPlay: (m) => {
        o(1), a == null || a();
      },
      ref: _,
      autoPlay: !0,
      playsInline: !0,
      onAbort: (m) => s == null ? void 0 : s(m),
      onPause: (m) => s == null ? void 0 : s(m),
      style: {
        opacity: f
      }
    }), u("video", {
      autoplay: !0,
      onLoadedData: c,
      playsinline: !0,
      src: r,
      muted: !0,
      loop: !0,
      style: {
        opacity: 1 - f
      }
    }), u(dr, {})]
  });
}
let Ae = [], Ie = 0;
function fr({
  offline: e,
  styles: t,
  onClose: n
}) {
  var Ke;
  const {
    isAuthenticated: r
  } = Z(se), {
    terminate: i,
    setStreamState: a,
    streamedMessage: s,
    starterMessage: c,
    streamState: _,
    videoState: l,
    connectionState: f,
    chatMode: o,
    setChatMode: m,
    agentManager: d,
    srcObject: h,
    connect: y,
    reconnectToChat: w,
    agent: p
  } = Z(te), g = ae(null), k = ae(null), [S, T] = b(""), [M, H] = b([]), [j, R] = b(!1), [B, ne] = b(!1), [ce, ge] = b(!1), [_e, O] = b(!1);
  function A() {
    s && H((N) => {
      const q = N.pop();
      return q ? [...N, {
        ...q,
        content: s
      }] : N;
    });
  }
  E(() => {
    h && g.current && (g.current.srcObject = h), window.onbeforeunload = (N) => {
      i().then(() => console.log("terminated"));
    };
  }, [i, h]), kn(() => {
    var N;
    (N = k.current) != null && N.lastElementChild && k.current.scrollTo({
      top: k.current.lastElementChild.offsetTop - k.current.offsetTop - 5,
      behavior: "smooth"
    });
  }, [M, B]), E(() => {
    p && (Ae = [{
      role: "assistant",
      content: `Hi! I'm ${p.preview_name}, welcome to agents. How can I help you?`,
      created_at: Re()
    }], H(Ae));
  }, [p]), E(() => {
    _ === $.Start ? F("agent-video", {
      event: "start",
      chatId: d == null ? void 0 : d.chatId,
      messages: M.length + 1,
      latency: Date.now() - Ie,
      agent_id: p == null ? void 0 : p.id
    }) : [$.Buffering, $.Loading].includes(_) ? ne(!0) : [$.New, $.Fail].includes(_) && (ne(!1), A());
  }, [_]), E(() => {
    ce && (ne(!1), A());
  }, [ce, s]);
  async function U(N) {
    if (r) {
      if (o !== P.TextOnly && (!k.current || N.trim().length === 0 || ![$.New].includes(_) || ![C.Connected].includes(f)))
        return;
    } else
      return F("agent-offline-onsend", {
        event: "click"
      }), e == null ? void 0 : e.onSend(S);
    const q = [...M, {
      role: "user",
      content: N.trim(),
      created_at: Re()
    }];
    T(""), a($.Loading), H(q);
    try {
      if (Ie = Date.now(), F("agent-message-send", {
        event: "success",
        messages: M.length + 1,
        agent_id: p == null ? void 0 : p.id,
        chatId: d == null ? void 0 : d.chatId
      }), !d)
        throw new Error("AgentManager is not available");
      const I = await d.chat(q).catch((re) => (console.error("Error in sending message", re), {
        chatMode: P.Maintenance,
        result: "Sorry, I am not available right now",
        matches: []
      }));
      if (I.chatMode && (m(I.chatMode), I.chatMode === P.Maintenance)) {
        i();
        return;
      }
      H((re) => [...re, {
        role: "assistant",
        content: I.chatMode === P.TextOnly ? I.result ?? "" : "",
        created_at: Re(),
        matches: I.matches
      }]), F("agent-message-received", {
        agent_id: p == null ? void 0 : p.id,
        latency: Date.now() - Ie,
        messages: M.length + 1,
        chatId: d.chatId
      }), a(I.chatMode === P.TextOnly ? $.New : $.Buffering);
    } catch (I) {
      throw a($.New), F("agent-message-send", {
        event: "fail",
        messages: M.length,
        agent_id: p == null ? void 0 : p.id,
        chatId: d == null ? void 0 : d.chatId
      }), I;
    }
  }
  async function V(N, q, I) {
    var re, Ze, qe;
    if (!(!((re = p == null ? void 0 : p.knowledge) != null && re.id) || !(d != null && d.chatId)))
      if (I)
        if (N === D.Unrated)
          await d.deleteRate(I);
        else
          return await d.rate({
            score: N === D.Positive ? 1 : -1,
            knowledge_id: p.knowledge.id,
            chat_id: d.chatId,
            agent_id: p.id,
            matches: ((Ze = q.matches) == null ? void 0 : Ze.map((le) => [le.document_id, le.id])) ?? []
          }, I), I;
      else {
        const le = await d.rate({
          score: N === D.Positive ? 1 : -1,
          knowledge_id: p.knowledge.id,
          chat_id: d.chatId,
          agent_id: p.id,
          matches: ((qe = q.matches) == null ? void 0 : qe.map((Je) => [Je.document_id, Je.id])) ?? []
        });
        if (!le)
          throw new Error("Error in creating rating");
        return le.id;
      }
  }
  const Te = lt(async () => {
    await i(), H(Ae), await y(), F("agent-new-chat", {
      event: "click",
      agentId: p == null ? void 0 : p.id,
      chatId: d == null ? void 0 : d.chatId
    });
  }, [d]), qt = lt(async () => {
    var N;
    await w(), F("agent-resume-chat", {
      event: "click",
      agentId: (N = d == null ? void 0 : d.agent) == null ? void 0 : N.id,
      chatId: d == null ? void 0 : d.chatId
    });
  }, [d]), Jt = j || o === P.Maintenance;
  return u("div", {
    className: `didagent__embedded__container ${_e ? "didagent__fullscreen" : ""}`,
    children: [u("div", {
      className: "didagent__embedded__container__connecting",
      style: {
        opacity: +!Jt
      },
      children: [u(W, {
        src: In,
        size: "64px",
        color: "var(--did-primary-black-50)"
      }), u("span", {
        children: "Starting conversation..."
      })]
    }), u("div", {
      className: "didagent__background",
      style: {
        background: `url(${p == null ? void 0 : p.preview_thumbnail}) top center no-repeat transparent`
      }
    }), u(ur, {
      streamState: _,
      videoState: l,
      srcObject: h,
      idleVideo: (Ke = p == null ? void 0 : p.presenter) == null ? void 0 : Ke.idle_video,
      isBlur: o === P.Maintenance,
      onVideoPlay: () => ge(!0),
      onVideoStop: () => ge(!1),
      onIdleLoad: () => R(!0)
    }), u(An, {
      name: (p == null ? void 0 : p.preview_name) ?? "Agent",
      displayRestart: M.length > 1,
      onRestart: Te,
      restartDisabled: ![C.Connected, C.New].includes(f),
      isRestarting: f === C.Terminating,
      closeClassName: t == null ? void 0 : t.closeClassName,
      onClose: n,
      onEasterEgg: () => {
        console.log("onEaster"), O(!_e);
      }
    }), o !== P.Maintenance && u(Q, {
      children: [u(cr, {
        messages: M,
        isLoading: B,
        ref: k,
        onRate: V
      }), u(lr, {
        show: M.length <= 1 && j && f === C.Connected,
        messages: c,
        onClick: U
      }), u("div", {
        className: "didagent__main__input",
        children: [u("div", {
          className: "didagent__main__input__container",
          children: [u("div", {
            className: "didagent__box__blur border8"
          }), u("input", {
            type: "text",
            placeholder: "Send message",
            value: S,
            onInput: (N) => T(N.currentTarget.value),
            onKeyPress: (N) => N.key === "Enter" && U(S)
          })]
        }), u(Vn, {
          onResume: qt,
          onSend: () => U(S),
          onTranscript: U,
          text: S
        })]
      })]
    })]
  });
}
function pr({
  onApiReady: e,
  children: t
}) {
  const {
    terminate: n,
    connectionState: r,
    agentManager: i
  } = Z(te), {
    authenticate: a
  } = Z(se);
  return E(() => {
    e && e({
      agent: i == null ? void 0 : i.agent,
      disconnect: n,
      connectionState: r,
      authenticate: a
    });
  }, [i, r, n, a]), t;
}
function Zt({
  agent: e,
  auth: t,
  onApiReady: n,
  offline: r,
  isOwner: i,
  mode: a,
  track: s,
  didApiUrl: c,
  didSocketApiUrl: _,
  onerror: l,
  customMixpanelKey: f,
  styles: o,
  onClose: m,
  onAgentReady: d,
  enabled: h = !0
}) {
  return window.localStorage.setItem("track_enabled", (s ?? !0).toString()), Ve.mixpanelKey = f || Ve.mixpanelKey, E(() => {
    function y(w) {
      l && (w.preventDefault(), l == null || l(w.reason));
    }
    return window.addEventListener("unhandledrejection", y), () => window.removeEventListener("unhandledrejection", y);
  }, []), u(Nn, {
    auth: t,
    didApiUrl: c ?? Pt,
    didSocketApiUrl: _ ?? nn,
    children: u(Tn, {
      agent: e,
      onAgentReady: d,
      enabled: h,
      children: u(pr, {
        onApiReady: n,
        children: u(fr, {
          mode: a,
          offline: r,
          isOwner: i,
          styles: o,
          onClose: m
        })
      })
    })
  });
}
function hr(e, t, n = (r) => {
}) {
  if (t.agent) {
    if (!t.auth)
      throw new Error("No auth provider");
  } else
    throw new Error("No agent provider");
  Mt(u(Zt, {
    ...t,
    onApiReady: n
  }), e);
}
function mr(e) {
  const {
    token: t,
    username: n,
    password: r,
    clientKey: i
  } = e;
  if (!i) {
    if (!t) {
      if (!n || !r)
        throw new Error("Failed to load agent. No auth method provided");
      return {
        type: "basic",
        username: n,
        password: r
      };
    }
    return {
      type: "bearer",
      token: t
    };
  }
  return {
    type: "key",
    clientKey: i
  };
}
function gr(e, t) {
  return {
    cursor: e ? "pointer" : "progress",
    opacity: t || !e ? "0" : "1",
    pointerEvents: e ? "auto" : "none",
    border: t ? "none" : "3px solid var(--did-primary-black-300)",
    bottom: e ? "0" : "-50%"
  };
}
function vr(e) {
  const t = {
    opacity: +e,
    translate: e ? "0px -50%" : "0px -60%"
  };
  return e || (t.background = "transparent"), t;
}
function yr(e) {
  return e ? {
    "--fabio-height": "80vh",
    opacity: 1,
    pointerEvents: "auto",
    zIndex: 100
  } : {
    "--fabio-height": 0,
    opacity: 0,
    pointerEvents: "none",
    zIndex: -1
  };
}
function wr(e) {
  var f;
  const [t, n] = b(!1), [r, i] = b(), [a, s] = b(!1), [c, _] = b(!1), l = a && !t;
  return E(() => {
    e.auth && typeof e.agent == "string" && fn(e.agent, e.auth, (e == null ? void 0 : e.didApiUrl) ?? Pt).then(i).catch((o) => console.log(o));
  }, [e.auth, e.agent]), E(() => {
    c && setTimeout(() => {
      s(!0), setTimeout(() => {
        s(!1);
      }, 3e3);
    }, 3e3);
  }, [c]), u("span", {
    className: "didagent__fabio",
    style: {
      width: t ? "120px" : "140px"
    },
    children: [u("button", {
      onClick: () => c && n(!t),
      style: gr(c, t),
      children: [u("div", {
        className: `didagent__fabio__speak_with ${t ? "didagent__transition_out" : ""}`,
        style: vr(l),
        children: u("div", {
          children: "Let's chat"
        })
      }), u("video", {
        src: (f = r == null ? void 0 : r.presenter) == null ? void 0 : f.idle_video,
        alt: "toggle fabio",
        autoplay: !0,
        playsinline: !0,
        muted: !0,
        loop: !0,
        onLoadedData: () => _(!0)
      })]
    }), u("div", {
      onClick: (o) => o.stopPropagation(),
      className: "didagent__fabio__container",
      style: yr(t),
      children: r && u(Zt, {
        ...e,
        onClose: () => n(!1),
        agent: r,
        enabled: t
      })
    })]
  });
}
const z = document.querySelector('script[data-name="did-agent"]');
if (z) {
  const e = z.getAttribute("data-mode") ?? "fabio", t = z.getAttribute("data-target-id"), n = z.getAttribute("data-agent-id"), r = z.getAttribute("data-api-url"), i = z.getAttribute("data-token"), a = z.getAttribute("data-username"), s = z.getAttribute("data-password"), c = z.getAttribute("data-client-key");
  if (!n)
    throw new Error("No agent id");
  const _ = {
    mode: e,
    agent: n,
    // @ts-ignore
    didApiUrl: r,
    auth: mr({
      token: i,
      username: a,
      password: s,
      clientKey: c
    })
  };
  if (e === "full") {
    const l = document.getElementById(t ?? "");
    if (!l)
      throw new Error("No target element");
    hr(l, _);
  } else
    Mt(u(wr, {
      ..._
    }), document.body);
}
