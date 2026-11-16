# Portfólio — Ingrid Rangel

Portfólio pessoal de uma estudante de Análise e Desenvolvimento de Sistemas, com foco em oportunidades de estágio em Dados e Business Intelligence.

## Conteúdo

- Apresentação, trajetória e habilidades.
- Projetos BeautyFinance Analytics e BankSense, com dados fictícios e resultados simulados.
- Apresentação do NIT RUN, em desenvolvimento, sem link de acesso ao site.
- Contato pelo LinkedIn, GitHub e e-mail.
- Assistente interativo com respostas programadas, sem integração com API de IA.

## Executar localmente

Abra `index.html` no navegador ou, com Python instalado, execute na pasta do projeto:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Acesse <http://localhost:8000>. Para encerrar o servidor, pressione `Ctrl+C`.

## Arquivos

- `index.html`: estrutura e conteúdo.
- `style.css` e `visual.css`: aparência, tema azul-escuro e dourado e adaptação para diferentes telas.
- `script.js`: interações do assistente.
- `image-viewer.js`: ampliação das imagens com fechamento por botão, Esc ou clique externo.
- `imagens/`: foto e imagens dos projetos. As versões escuras das capturas do BankSense e BeautyFinance foram adaptadas visualmente com IA; as capturas originais foram preservadas.

## Estado

Site estático preparado para GitHub Pages, com publicação a partir da branch `main`, pasta raiz (`/`). O arquivo `.nojekyll` mantém os arquivos estáticos sem processamento pelo Jekyll.

Endereço: <https://ingridrdev.github.io/Portfolio/>.

## Validação

Revisão no Chrome em larguras de 1440, 390 e 320 pixels: carregamento de imagens, ausência de rolagem horizontal, abertura e fechamento de imagens e funcionamento do assistente. O assistente usa respostas programadas; não é uma IA generativa.
