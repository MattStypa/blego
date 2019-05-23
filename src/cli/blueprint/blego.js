const blego = require('blego');

blego.init();

blego.task('Build pages', () => {
  blego.store.pages.each((page) => blego.page(page.key + '.html', 'page.html', page));
});
