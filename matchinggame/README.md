# 🎮 Jogo da Memória - English Tips Matching Game

## 📋 Visão Geral do Projeto

Desenvolver um jogo da memória (matching game) em página web única, onde o usuário deve combinar **6 pares de cartas**: cada par contém uma **dica/frase em inglês** e sua **respectiva tradução ou explicação em português**, extraídas aleatoriamente do arquivo `dicas_ingles.txt`.

O objetivo é pedagógico: reforçar o aprendizado de inglês através da gamificação.

---

## 📁 Estrutura de Arquivos Esperada

projeto/
├── index.html # Página principal do jogo
├── style.css # Estilos visuais
├── script.js # Lógica do jogo
├── dicas_ingles.txt # Base de dados (já existente na raiz)
└── README.md # Este arquivo


---

## 🎯 Decisão Técnica: 100% Vanilla (HTML + CSS + JS puro)

**Não usar bibliotecas externas** (React, Vue, jQuery, GSAP, etc.). Todo o projeto deve ser implementado com **HTML + CSS + JavaScript puro (vanilla)**.

### Por que essa é a melhor escolha para este projeto:

1. **Escopo bem definido**: O jogo tem funcionalidades pontuais — parsing de texto, manipulação de DOM, animações simples e lógica de matching. Nada disso justifica o overhead de uma biblioteca.
2. **APIs nativas modernas são suficientes**:
   - `fetch()` para ler o arquivo de dicas.
   - CSS 3D Transforms (`transform: rotateY()`) para animações de flip das cartas.
   - `setInterval()` / `requestAnimationFrame()` para o cronômetro.
   - Métodos de Array (`map`, `filter`, `sort`, Fisher-Yates) para manipulação de dados.
3. **Performance**: Sem overhead de bibliotecas, carregamento instantâneo.
4. **Manutenção simplificada**: Código direto, sem dependências para atualizar ou conflitos de versão.
5. **Portabilidade total**: Funciona abrindo direto no navegador ou em qualquer servidor estático, sem configuração de build tools (webpack, vite, npm, etc.).

### Quando bibliotecas fariam sentido (mas NÃO é o caso aqui):
- **React/Vue**: se houvesse múltiplas telas, roteamento ou state management complexo.
- **GSAP**: se as animações fossem muito elaboradas (mas CSS já resolve bem).
- **jQuery**: obsoleto para projetos novos com JS moderno.

**Resumo**: mantenha o projeto enxuto, sem `package.json`, sem `node_modules`, sem bundlers. Apenas 3 arquivos de código-fonte (`index.html`, `style.css`, `script.js`) + o arquivo de dados.

---

## 🗂️ Formato do Arquivo de Dados (`dicas_ingles.txt`)

Cada linha do arquivo segue o padrão:

[M/D/YY, H:MM:SS AM/PM] Você: 🇬🇧 <texto_em_ingles> <traducao_ou_explicacao>


**Exemplos reais do arquivo:**

[5/3/26, 10:23:40 AM] Você: 🇬🇧 Follow my lead Siga meu exemplo
[5/4/26, 8:43:16 AM] Você: 🇬🇧 to break the bank Gastar uma fortuna
[5/12/26, 8:06:14 AM] Você: 🇬🇧 Nao confundir! assurance Garantia | insurance Seguro (Dica para lembrar: Assegurar é garantir)
[7/3/26, 3:30:51 PM] Você: 🇬🇧hire Contratar | hide Esconder


### ⚠️ Regras de Parsing (CRÍTICO)

1. **Remover** o prefixo `[data/hora] Você: 🇬🇧 ` de cada linha (regex: `^\[.*?\]\s*Você:\s*🇬🇧\s*`).
2. **Ignorar** linhas que não contenham o emoji 🇬🇧 (linhas vazias, de separação ou inválidas).
3. **Separar** o texto em inglês da tradução/explicação em português.
   - O separador geralmente é um **espaço** entre a palavra em inglês e a primeira palavra em português.
   - **Estratégia recomendada:** identificar onde termina o inglês e começa o português pela transição de idioma (palavras em português como "Siga", "Gastar", "Desordenado", etc.) OU por delimitadores visuais como `|`, `:`, `-`.
   - **Simplificação pragmática:** para linhas simples (sem `|` ou `:` no meio), considerar que a **primeira palavra/palavras em inglês** formam o "termo em inglês" e o restante é a "tradução". Uma heurística útil: pegar as primeiras 1-4 palavras como inglês e o resto como português.
   - **Para linhas com `|`:** dividir pelo `|` e tratar cada parte como um par separado (ex.: `assurance Garantia | insurance Seguro` gera 2 pares).
4. **Normalizar** espaços extras (trim, remover múltiplos espaços).
5. **Embaralhar** o array resultante a cada carregamento da página.
6. **Selecionar** 6 pares aleatórios do pool disponível.

### 💡 Sugestão de Heurística de Separação

Para linhas no formato `<inglês> <português>`:
- Identificar a posição onde começa a tradução em português. Uma forma prática é usar uma lista de palavras comuns em português como marcadores, OU assumir que o inglês ocupa as primeiras palavras até encontrar uma palavra claramente portuguesa.
- **Abordagem mais simples e robusta:** procurar por delimitadores visuais (`|`, `:`, `-`, `=`). Se existirem, usar como separador. Caso contrário, usar uma regex ou função que detecta a transição de idioma (ex.: primeira palavra que contenha acentos, "ç", ou seja palavra comum do português como "o", "a", "de", "para", "meu", etc.).

**Fallback:** se a separação falhar, pular a linha e tentar a próxima.

---

## 🎯 Especificação Funcional

### Tela Inicial
- Ao carregar a página, exibir um **grid 4x3** (ou 3x4) com **12 cartas** viradas para baixo.
- As 12 cartas representam **6 pares** (inglês ↔ português).
- A disposição das cartas no grid deve ser **aleatória** a cada partida.

### Mecânica do Jogo
1. O usuário clica em uma carta → ela **vira** e revela o conteúdo.
2. O usuário clica em uma segunda carta → ela também vira.
3. **Se forem um par válido** (mesma dica/tradução):
   - As cartas permanecem viradas.
   - Aplicar efeito visual de sucesso (ex.: borda verde, leve animação).
   - Incrementar contador de acertos.
4. **Se NÃO forem um par**:
   - Aguardar ~1 segundo para o usuário memorizar.
   - As cartas voltam a ficar viradas para baixo.
   - Incrementar contador de tentativas.
5. **Bloquear cliques** durante a verificação (evitar spam de cliques).

### Condição de Vitória
- Quando todos os 6 pares forem encontrados:
  - Exibir modal ou mensagem de parabéns.
  - Mostrar estatísticas: número de tentativas e tempo total.
  - Botão **"Jogar Novamente"** que embaralha e seleciona 6 novos pares.

### Estatísticas em Tempo Real
Exibir no topo da página:
- ⏱️ **Tempo:** cronômetro iniciado no primeiro clique.
- 🎯 **Tentativas:** contador de pares testados.
- ✅ **Acertos:** contador de pares encontrados (X/6).

---

## 🎨 Especificação Visual (UI/UX)

### Design Geral
- **Tema:** moderno, clean, com gradientes suaves (azul/roxo ou tons pastel).
- **Tipografia:** sans-serif legível (ex.: Inter, Poppins, ou system fonts).
- **Responsivo:** funcionar bem em desktop e mobile.

### Cartas
- **Verso (fechada):** padrão visual uniforme, com ícone ou logo (ex.: "🇬🇧" ou "?").
- **Frente (aberta):**
  - Cartas de **inglês**: fundo de uma cor (ex.: azul claro), texto em inglês em destaque.
  - Cartas de **português**: fundo de outra cor (ex.: verde claro), texto em português.
- **Animação de virada:** usar `transform: rotateY()` com `transition` para efeito 3D de flip.
- **Tamanho:** mínimo 120x160px em desktop, ajustável em mobile.

### Estados Visuais
- **Hover:** leve elevação (box-shadow) e cursor pointer.
- **Match:** borda verde + animação de pulso.
- **Mismatch:** leve tremida (shake) antes de voltar.
- **Desabilitado:** opacity reduzida durante verificação.

### Layout

┌──────────────────────────────────────────┐
│          🎮 ENGLISH MEMORY GAME           │
├──────────────────────────────────────────┤
│                                          │
│   ⏱️ 00:45       🎯 8       ✅ 3/6        │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│   │   ??   │ │   ??   │ │   ??   │ │   ??   │
│   └────────┘ └────────┘ └────────┘ └────────┘
│                                          │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│   │   ??   │ │   ??   │ │   ??   │ │   ??   │
│   └────────┘ └────────┘ └────────┘ └────────┘
│                                          │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│   │   ??   │ │   ??   │ │   ??   │ │   ??   │
│   └────────┘ └────────┘ └────────┘ └────────┘
│                                          │
├──────────────────────────────────────────┤
│           Encontre os pares!             │
└──────────────────────────────────────────┘



---

## 🔧 Requisitos Técnicos

### HTML
- Estrutura semântica (header, main, section, button).
- Acessibilidade básica: `aria-label` nas cartas, contraste adequado.

### CSS
- Usar **CSS Grid** ou **Flexbox** para o layout das cartas.
- **Variáveis CSS** para cores e espaçamentos (facilita manutenção).
- Animações com `@keyframes` e `transition`.
- Media queries para responsividade.

### JavaScript
- **Carregamento do arquivo:** usar `fetch('dicas_ingles.txt')` para ler o arquivo.
- **Parsing:** função dedicada que retorna array de objetos:
  ```js
  [
    { id: 1, english: "Follow my lead", portuguese: "Siga meu exemplo" },
    { id: 2, english: "to break the bank", portuguese: "Gastar uma fortuna" },
    // ...
  ]

   # Opção 1: Python
   python -m http.server 8000
   
   # Opção 2: Node.js (npx) — apenas para servir, sem instalar dependências do projeto
   npx serve
   
   # Opção 3: VS Code Live Server extension
