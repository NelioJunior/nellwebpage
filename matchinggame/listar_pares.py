#!/usr/bin/env python3
"""Lista os pares que o jogo usará, aplicando o filtro de qualidade do JS."""
import re
from pathlib import Path

PREFIX_REGEX = re.compile(r"^\[[^\]]*\]\s*Você:\s*🇬🇧\s*", re.UNICODE)
PREFIX_ALT_REGEX = re.compile(r"^\[[^\]]*\]\s*[^:]+:\s*🇬🇧\s*", re.UNICODE)
EMOJI_REGEX = re.compile(r"[\U0001F1E6-\U0001F1FF\U0001F300-\U0001FAFF\u2600-\u27BF]", re.UNICODE)
ACCENT_RE = re.compile(r"[áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ]")

PT_MARKERS = {
    "o","a","os","as","um","uma","uns","umas","de","da","do","das","dos",
    "em","no","na","nos","nas","para","pra","por","com","sem","que","se","e","ou",
    "meu","minha","meus","minhas","seu","sua","seus","suas",
    "ele","ela","eles","elas","você","voce","vocês","voces",
    "eu","nós","nos","tu","isso","isto","aquilo","este","esta",
    "esse","essa","aquele","aquela",
    "é","são","ser","estar","está","estão","foi","era",
    "ter","tem","têm","tinha","há","haver",
    "muito","muita","muitos","muitas","pouco","pouca",
    "mais","menos","bem","mal","não","nao","sim",
    "quando","onde","como","porque","porquê","então","entao",
    "algo","alguém","alguem","nada","ninguém","ninguem",
    "aqui","ali","lá","la","agora","depois","antes",
    "também","tambem","só","so","todo","toda","todos","todas",
    "vez","vezes","dia","dias","coisa","coisas","lugar",
    "fazer","ir","vir","ver","dar","ficar","deixar",
}
PT_EXPLANATION = re.compile(
    r"\b(é|são|serve|significa|usar|usamos|usa-se|quando|na verdade|auxiliar|frase|frases|"
    r"verbo|verbos|regra|dica|depende|dependendo|contexto|exemplo|forma|também pode|pode ser|"
    r"geralmente|normalmente|por outro lado|por isso|logo|pois|então|nesse|nessa|dessa|desse|"
    r"assim como)\b",
    re.IGNORECASE | re.UNICODE,
)
EN_ANNOTATION = re.compile(
    r"\b(Correto|Dica|Tradução|traducao|possível|possivel|expressão|expressao|Explicar|exemplo|"
    r"Exemplo|usar|usamos|use|Use|Você|Voce|Significa|significa|Literalmente|literalmente|"
    r"Quando|quando|Nao|Não|nao|Verbo|verbo|frase|Frases|palavras|palavra|contexto|regra|"
    r"Regra|Cuidado|cuidado|Algumas vezes|algumas vezes)\b",
    re.UNICODE,
)

def has_accent(w): return bool(ACCENT_RE.search(w))

def looks_pt(w):
    if not w: return False
    c = re.sub(r"[.,!?;:()\"']", "", w.lower())
    return bool(c) and (has_accent(c) or c in PT_MARKERS)

def split_en_pt(text):
    words = text.split()
    if len(words) < 2: return None
    for i in range(1, len(words)):
        w, prev = words[i], words[i-1]
        if has_accent(w):
            en, pt = " ".join(words[:i]).strip(), " ".join(words[i:]).strip()
            if en and pt: return en, pt
        if looks_pt(w) and looks_pt(prev):
            en, pt = " ".join(words[:i-1]).strip(), " ".join(words[i-1:]).strip()
            if en and pt: return en, pt
    return None

def quality(en, pt):
    en, pt = en.strip(), pt.strip()
    if not en or not pt: return False
    ew, pw = en.split(), pt.split()
    if not (1 <= len(ew) <= 4): return False
    if not (1 <= len(pw) <= 8): return False
    if EN_ANNOTATION.search(en): return False
    if PT_EXPLANATION.search(pt): return False
    if re.fullmatch(r"\(.*\)", pt): return False
    if "..." in en or "./" in en: return False
    if re.search(r"[-,\/:]$", en): return False
    if re.search(r"\b(possível tradução|possivel traducao|Dica para lembrar|dependendo do contexto)\b", pt, re.I): return False
    if pt.count("(") != pt.count(")"): return False
    if en.count('"') % 2 != 0: return False
    if not re.search(r"[A-Za-z]", en): return False
    last = re.sub(r"[.,!?;:\"'()]", "", ew[-1].lower())
    if last in PT_MARKERS: return False
    if not re.search(r"[A-Za-zÀ-ÿ]", pt): return False
    if len(ew) == 1 and len(en) <= 2: return False
    return True

def parse_chunk(chunk):
    chunk = chunk.strip()
    if not chunk: return None
    if ":" in chunk:
        en, _, pt = chunk.partition(":")
        if en.strip() and pt.strip() and quality(en, pt): return en.strip(), pt.strip()
    pair = split_en_pt(chunk)
    if not pair: return None
    en, pt = pair
    if en.lower() == pt.lower(): return None
    if len(en.split()) > 6: return None
    return (en, pt) if quality(en, pt) else None

def extract(raw):
    line = PREFIX_REGEX.sub("", raw)
    line = PREFIX_ALT_REGEX.sub("", line)
    line = EMOJI_REGEX.sub(" ", line)
    line = re.sub(r"\s+", " ", line).strip()
    if not line: return []
    line = re.sub(r"\s*=\s*", " | ", line)
    if "|" in line:
        return [p for p in (parse_chunk(c) for c in line.split("|")) if p]
    if ":" in line:
        en, _, pt = line.partition(":")
        if en.strip() and pt.strip() and quality(en, pt): return [(en.strip(), pt.strip())]
    pair = split_en_pt(line)
    return [pair] if pair and quality(*pair) else []

def main():
    text = Path("dicas_ingles.txt").read_text(encoding="utf-8")
    seen, pairs = set(), []
    for line in text.splitlines():
        if "🇬🇧" not in line: continue
        for en, pt in extract(line):
            en, pt = en.strip(), pt.strip()
            if not en or not pt: continue
            if len(en) > 80 or len(pt) > 100: continue
            if not quality(en, pt): continue
            k = (en.lower(), pt.lower())
            if k in seen: continue
            seen.add(k); pairs.append((en, pt))
    print(f"TOTAL DE PARES FINAIS: {len(pairs)}\n")
    for i, (en, pt) in enumerate(pairs, 1):
        print(f"{i:3d}. EN: {en}")
        print(f"     PT: {pt}")

if __name__ == "__main__":
    main()
