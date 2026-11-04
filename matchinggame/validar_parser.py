#!/usr/bin/env python3
"""Valida o parser do jogo (com filtro de qualidade) contra dicas_ingles.txt."""
import re
from pathlib import Path

PREFIX_REGEX = re.compile(r"^\[[^\]]*\]\s*Você:\s*🇬🇧\s*", re.UNICODE)
PREFIX_ALT_REGEX = re.compile(r"^\[[^\]]*\]\s*[^:]+:\s*🇬🇧\s*", re.UNICODE)
EMOJI_REGEX = re.compile(r"[\U0001F1E6-\U0001F1FF\U0001F300-\U0001FAFF\u2600-\u27BF]", re.UNICODE)

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
ACCENT_RE = re.compile(r"[áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ]")
EN_BAD = re.compile(
    r"\b(Correto|Dica|Tradução|traducao|possível|possivel|expressão|expressao|"
    r"Explicar|exemplo|Exemplo|usar|usamos|use|Use|Você|Voce|Significa|significa|"
    r"Literalmente|literalmente|Quando|quando|Nao|Não|nao|Verbo|verbo|frase|Frases|"
    r"palavras|palavra|contexto|regra|Regra|Cuidado|cuidado)\b",
    re.UNICODE,
)
PT_BAD = re.compile(
    r"\b(possível tradução|possivel traducao|Dica para lembrar|literalmente|"
    r"dependendo do contexto)\b",
    re.IGNORECASE | re.UNICODE,
)

def has_accent(w): return bool(ACCENT_RE.search(w))

def looks_pt(w):
    if not w: return False
    clean = re.sub(r"[.,!?;:()\"']", "", w.lower())
    if not clean: return False
    return has_accent(clean) or clean in PT_MARKERS

def split_en_pt(text):
    words = text.split()
    if len(words) < 2: return None
    for i in range(1, len(words)):
        w, prev = words[i], words[i-1]
        if has_accent(w):
            en = " ".join(words[:i]).strip()
            pt = " ".join(words[i:]).strip()
            if en and pt: return en, pt
        if looks_pt(w) and looks_pt(prev):
            en = " ".join(words[:i-1]).strip()
            pt = " ".join(words[i-1:]).strip()
            if en and pt: return en, pt
    return None

def is_quality_pair(en, pt):
    en, pt = en.strip(), pt.strip()
    if not en or not pt: return False
    if re.fullmatch(r"\(.*\)", pt): return False
    if EN_BAD.search(en): return False
    if PT_BAD.search(pt): return False
    if len(en.split()) > 5 and len(pt.split()) > 10: return False
    if pt.count("(") != pt.count(")"): return False
    if en.count('"') % 2 != 0: return False
    last = re.sub(r"[.,!?;:]", "", en.split()[-1].lower()) if en.split() else ""
    if last in PT_MARKERS: return False
    if not re.search(r"[A-Za-z]", en): return False
    return True

def parse_chunk(chunk):
    chunk = chunk.strip()
    if not chunk: return None
    if ":" in chunk:
        en, _, pt = chunk.partition(":")
        en, pt = en.strip(), pt.strip()
        if en and pt and is_quality_pair(en, pt): return en, pt
    pair = split_en_pt(chunk)
    if not pair: return None
    en, pt = pair
    if en.lower() == pt.lower(): return None
    if len(en.split()) > 6: return None
    if not is_quality_pair(en, pt): return None
    return en, pt

def extract_pairs(raw_line):
    line = PREFIX_REGEX.sub("", raw_line)
    line = PREFIX_ALT_REGEX.sub("", line)
    line = EMOJI_REGEX.sub(" ", line)
    line = re.sub(r"\s+", " ", line).strip()
    if not line: return []
    line = re.sub(r"\s*=\s*", " | ", line)
    if "|" in line:
        out = []
        for part in line.split("|"):
            pair = parse_chunk(part)
            if pair: out.append(pair)
        return out
    if ":" in line:
        en, _, pt = line.partition(":")
        en, pt = en.strip(), pt.strip()
        if en and pt and is_quality_pair(en, pt): return [(en, pt)]
    pair = split_en_pt(line)
    return [pair] if pair and is_quality_pair(*pair) else []

def main():
    text = Path("dicas_ingles.txt").read_text(encoding="utf-8")
    seen, pairs = set(), []
    for line in text.splitlines():
        if "🇬🇧" not in line: continue
        for en, pt in extract_pairs(line):
            en, pt = en.strip(), pt.strip()
            if not en or not pt: continue
            if len(en) > 90 or len(pt) > 120: continue
            if not is_quality_pair(en, pt): continue
            key = (en.lower(), pt.lower())
            if key in seen: continue
            seen.add(key)
            pairs.append((en, pt))

    print(f"Total de pares válidos (com filtro de qualidade): {len(pairs)}")
    print("\nPrimeiras 20 amostras:")
    for i, (en, pt) in enumerate(pairs[:20], 1):
        print(f"{i:2d}. EN: {en!r}")
        print(f"    PT: {pt!r}")

if __name__ == "__main__":
    main()
