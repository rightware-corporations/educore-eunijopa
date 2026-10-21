# EUNIJOPA — EduCore

Implementação independente do **Centro Infantil e Externato EUNIJOPA**, construída a partir dos módulos EduCore v1.1 para o MVP comercial.

## Estrutura

- `frontend/` — aplicação React/Vite, landing EUNIJOPA, entrada e sete áreas de trabalho EduCore
- `frontend/public/school/` — imagens próprias da escola
- `server.js` — servidor de produção do frontend compilado
- `docs/` — contexto de transferência e decisões da implementação

## Executar

```bash
npm run build
npm start
```

Build: `npm --prefix frontend ci && npm --prefix frontend run build`

Desenvolvimento: `cd frontend && npm ci && npm run dev`

Testes: `npm test`

Railway: repositório `rightware-corporations/educore-eunijopa`, branch `main`, build command `npm run build`, start command `npm start`. URL/domínio próprios da EUNIJOPA.

## Identidade e isolamento

- Só existe a escola EUNIJOPA nesta instalação; não existe seletor de escolas.
- `/login` dá acesso à demonstração por perfil; **a autenticação é demonstrativa**, não contém utilizadores reais nem controlo de acesso de produção.
- Conteúdos escolares reais e os módulos internos EduCore reutilizados permanecem separados; os dados do portal são de demonstração.
- Nunca devem ser exibidas marcas, contactos, dados ou ativos de outras instituições.

## Antes do deployment

Executar build/testes, confirmar todos os assets, QA desktop/mobile, navegação nos sete perfis e pré-visualizações da URL definitiva. Validação real de API/backend fica fora desta apresentação demonstrativa.
