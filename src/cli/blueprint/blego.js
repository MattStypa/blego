const Blego = require('blego');
const blego = new Blego();

blego.task('Building pages', () => {
  blego.store.pages.each((page) => blego.page(page.key + '.html', 'page.html', page));
});
