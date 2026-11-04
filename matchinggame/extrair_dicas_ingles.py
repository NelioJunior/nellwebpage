#!/usr/bin/env python3
"""
Extrai mensagens de dicas de inglês de uma exportação TXT do WhatsApp.

Uso:
    python3 extrair_dicas_ingles.py conversa.txt
    python3 extrair_dicas_ingles.py conversa.txt -o minhas_dicas.txt

Por padrão, gera "dicas_ingles.txt" na mesma pasta do arquivo de entrada.
Reconhece mensagens cujo texto começa com 🇬🇧 ou 🏴.
"""

import argparse
import re
import sys
from pathlib import Path

# Formatos comuns do WhatsApp:
# 03/11/2026, 17:05 - Nome: mensagem
# [03/11/2026, 17:05:00] Nome: mensagem
PADROES_INICIO = [
    re.compile(r"^\d{1,2}/\d{1,2}/\d{2,4},\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?\s+-\s+"),
    re.compile(r"^\[\d{1,2}/\d{1,2}/\d{2,4},\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?\]\s+"),
    re.compile(r"^\d{4}-\d{1,2}-\d{1,2},?\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?\s+-\s+"),
]

MARCADORES = ("🇬🇧", "🏴")


def eh_inicio_mensagem(linha: str) -> bool:
    return any(padrao.match(linha) for padrao in PADROES_INICIO)


def mensagem_e_dica(mensagem: list[str]) -> bool:
    """Verifica se o corpo da mensagem começa com uma das bandeiras."""
    primeira = mensagem[0]

    # Remove data/hora e separador; o restante contém remetente: corpo.
    for padrao in PADROES_INICIO:
        correspondencia = padrao.match(primeira)
        if correspondencia:
            restante = primeira[correspondencia.end():]
            break
    else:
        return False

    # Separa o remetente do corpo na primeira ocorrência de ": ".
    if ": " not in restante:
        return False

    _, corpo = restante.split(": ", 1)
    corpo = corpo.lstrip()

    return any(corpo.startswith(marcador) for marcador in MARCADORES)


def extrair_dicas(texto: str) -> list[str]:
    dicas = []
    mensagem_atual = []

    def finalizar_mensagem():
        if mensagem_atual and mensagem_e_dica(mensagem_atual):
            dicas.append("\n".join(mensagem_atual))

    for linha in texto.splitlines():
        if eh_inicio_mensagem(linha):
            finalizar_mensagem()
            mensagem_atual = [linha]
        elif mensagem_atual:
            # Linhas seguintes pertencem à mensagem anterior.
            mensagem_atual.append(linha)

    finalizar_mensagem()
    return dicas


def main():
    parser = argparse.ArgumentParser(
        description="Extrai mensagens marcadas com 🇬🇧 ou 🏴 de um TXT do WhatsApp."
    )
    parser.add_argument(
        "arquivo",
        help="Caminho do arquivo TXT exportado do WhatsApp."
    )
    parser.add_argument(
        "-o", "--saida",
        help="Nome/caminho do arquivo de saída (opcional)."
    )
    args = parser.parse_args()

    entrada = Path(args.arquivo).expanduser()

    if not entrada.is_file():
        parser.error(f"Arquivo não encontrado: {entrada}")

    try:
        texto = entrada.read_text(encoding="utf-8-sig")
    except UnicodeDecodeError:
        # Algumas exportações podem vir com outra codificação.
        texto = entrada.read_text(encoding="utf-8", errors="replace")

    dicas = extrair_dicas(texto)

    saida = (
        Path(args.saida).expanduser()
        if args.saida
        else entrada.with_name("dicas_ingles.txt")
    )

    conteudo_saida = "\n\n".join(dicas)
    if dicas:
        conteudo_saida += "\n"

    saida.write_text(conteudo_saida, encoding="utf-8")

    print(f"Dicas encontradas: {len(dicas)}")
    print(f"Arquivo criado: {saida.resolve()}")


if __name__ == "__main__":
    main()
