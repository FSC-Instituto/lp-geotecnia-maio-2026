Como publicar na Hostinger

Opção 1 - HTML estático:
1. Envie todo o conteúdo desta pasta para public_html.
2. Use index.html como página inicial.
3. Mantenha a pasta public/assets junto, pois ela contém imagens, vídeos e favicon.

Opção 2 - PHP:
1. Envie todo o conteúdo desta pasta para public_html.
2. Use index.php como página inicial.
3. O index.php apenas carrega o index.html, sem precisar de Node.

Arquivos importantes:
- index.html: site principal em HTML.
- preview.html: cópia separada para prévia HTML.
- index.php: entrada compatível com hospedagem PHP.
- styles.css: estilos.
- app.js: animações e interações.
- public/assets: imagens, vídeos e ícones.

Não é necessário enviar server.js, package.json ou rodar npm na Hostinger para esta versão.
