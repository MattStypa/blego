import blego from 'blego';

blego.data.pages.each((page) => blego.page(page.key + '.html', 'page.html', page));
