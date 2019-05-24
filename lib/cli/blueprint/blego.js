const blego = require('blego');

blego.data.pages.each((page) => blego.page(page.key + '.html', 'page.html', page));
