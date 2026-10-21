# EUNIJOPA — MASTER MVP HANDOFF

## 1. Missão

Criar uma apresentação comercial rápida e convincente do EduCore para o **Centro Infantil e Externato EUNIJOPA**, sem reconstruir o produto inteiro.

A prioridade é demonstrar:

1. identidade própria da escola;
2. landing pública forte;
3. utilização de fotografias reais;
4. continuidade para um portal EduCore;
5. apresentação responsiva em desktop e mobile.

## 2. Estratégia técnica desta fase

Para estes MVPs comerciais foi abandonada a estratégia de manter várias escolas dentro do mesmo deployment/branch. A experiência com o Colégio Páscoa mostrou risco de branch errada, metadata cruzada, fallback de outra escola e assets incorrectos.

Por isso este projecto segue:

- 1 escola = 1 repositório;
- 1 branch principal de produção;
- 1 deployment;
- 1 domínio;
- branding e assets isolados.

Repositório: `rightware-corporations/educore-eunijopa`.

## 3. Base EduCore de referência

A referência funcional/visual utilizada para compreender os fluxos do portal foi a implementação pública:

`aevumlux1-rwbot/educore.v1.1`

branch de referência:

`tenant/colegio-pascoa-live`

HEAD observado durante este trabalho:

`4d5b360dbf66d1a22b5855590c7cbfde90e9def2`

O design público do Páscoa NÃO deve ser copiado. Foi usado apenas como referência de fluxo: landing → login → perfis → portal.

## 4. Identidade observada nos materiais EUNIJOPA

Elementos visuais dominantes:

- verde institucional;
- amarelo dos uniformes e da árvore do logótipo;
- cinza e branco dos uniformes;
- azul claro presente no espaço físico;
- linguagem infantil colorida sem perder a identidade institucional;
- símbolo central de árvore/crescimento sustentada por mãos.

A composição escolhida evita os anéis/círculos usados no Páscoa. O conceito visual usa:

- ramos/linhas de crescimento;
- recortes editoriais;
- pequenos padrões inspirados no xadrez dos uniformes;
- papel/cartaz para a área infantil;
- fotografia real em escala grande.

## 5. Conteúdo suportado pelos materiais fornecidos

### Confirmado visualmente

- Nome/marca: Centro Infantil e Externato EUNIJOPA.
- Inscrições abertas/anunciadas para 2026.
- Ensino Pré-escolar.
- Ensino Primário.
- Professores qualificados e dedicados.
- Ambiente seguro, acolhedor e estimulante.
- Actividades extracurriculares.
- "One-on-one learning: Turmas reduzidas".
- Centro Infantil: crianças dos 1 aos 5 anos.
- Aprendizagem através da diversão, expressão artística, música e movimento.
- Promoção da criatividade, pensamento inovador e valores humanos.
- Localização apresentada: Matola-rio, Av. da Namaacha, Thandavando.
- Contactos apresentados: `+25884 078-0064 | 84 439-8559`.
- Há material fotográfico de actividade de jardinagem e de judo.

### Cuidado

O texto criativo da landing não deve ser tratado como slogan oficial da escola. "Um lugar para sonhar. Aprender. Crescer." deriva do texto institucional visto num dos materiais e funciona como headline de apresentação.

## 6. Media planeada para o MVP

- `assets/logo.webp` — logótipo EUNIJOPA.
- `assets/hero.webp` — grupo de alunos em uniforme.
- `assets/classroom.webp` — ambiente de sala de aula.
- `assets/garden.webp` — actividade de jardinagem.
- `assets/judo.webp` — actividade de judo.
- `assets/campus.webp` — espaço físico infantil/exterior.
- `assets/admissions.webp` — cartaz de inscrições 2026.

Os ficheiros foram optimizados para WebP para reduzir peso no deployment.

## 7. Estrutura do MVP

### Landing

- header EUNIJOPA;
- hero com fotografia real;
- provas/benefícios institucionais;
- secção escola;
- experiência escolar;
- Centro Infantil;
- portal EduCore;
- admissões/contactos;
- footer "Powered by EduCore".

### Portal

Página `/portal` com:

- identidade EUNIJOPA;
- sete perfis demonstrativos: Aluno, Encarregado, Professor, Pedagogia, Direcção, Secretaria e Finanças;
- entrada sem credenciais reais;
- dashboard demonstrativo por perfil.

Não existe backend real neste MVP. Nenhum dado apresentado deve ser interpretado como dado real da escola.

## 8. Deployment

O servidor é Node.js puro (`server.js`) e lê `PORT` do ambiente. Isto simplifica Railway e evita dependências/npm install.

Start command:

`npm start`

## 9. Definition of Done

Antes de partilhar com o cliente:

- validar desktop;
- validar mobile;
- validar `/portal`;
- confirmar logo/media;
- confirmar favicon/title;
- confirmar nenhum "Páscoa" ou "Deus Connosco" aparece;
- confirmar todos os assets retornam 200;
- confirmar o domínio/deployment é exclusivo da EUNIJOPA;
- testar em janela privada.

## 10. Próximo passo recomendado

1. publicar no Railway;
2. validar URL pública;
3. ajustar copy/imagens se o utilizador enviar mais materiais;
4. só depois, se necessário, aproximar ainda mais o portal do core React completo do EduCore.
