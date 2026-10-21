# Fotografias originais EUNIJOPA

## Problema identificado

O hero anteriormente usava uma imagem WebP com cerca de 14 KB, insuficiente para uma fotografia de ecrã inteiro. A imagem de judo também tinha uma legenda publicitária impressa, que se sobrepunha à tipografia da landing.

## Solução

A landing usa as fotografias originais em JPEG do arquivo EUNIJOPA, sem nova compressão. O hero usa a fotografia do grupo de alunos, a abordagem pedagógica usa a fotografia da sala de aula, e a vida escolar usa horta, instalações e judo numa composição integrada. A fotografia de judo é apresentada com corte superior para afastar a legenda publicitária impressa.

## Adicionar os ficheiros

Descarregar o pacote `EUNIJOPA_HD_ASSETS_READY.zip` fornecido na conversa e, na **raiz do repositório**, executar em PowerShell:

```powershell
Expand-Archive -Path "$HOME\Downloads\EUNIJOPA_HD_ASSETS_READY.zip" -DestinationPath "." -Force
git status
git add frontend/public/school
git commit -m "Install original resolution EUNIJOPA photography"
git push origin main
```

O pacote preserva nove fotografias originais em JPEG e inclui uma versão WebP sem perdas adicionais do logótipo. Os nomes de destino encontram-se em `frontend/public/school/`. A aplicação mantém as imagens WebP anteriores como fallback até aos ficheiros originais serem publicados. Não fazer novamente compressão para 10–20 KB.

> Nota: o upload direto de binários JPEG do ficheiro ZIP para o repositório não está disponível nesta integração GitHub. O commit do frontend e da documentação é independente do commit de assets a efetuar localmente.
