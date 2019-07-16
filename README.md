<p align="center"><img src="https://raw.githubusercontent.com/MattStypa/assets/master/blego/blego.png"></p>



# Blego
Blego is an exceptionally powerful and easy to use static site generator. It's a great choice for beginners AND veterans.

## Progressively dynamic templates
Blego makes developing purpose-built templates effortless but it also enables a progressive transformation of static HTML sites. This makes Blego the perfect companion for thousands of existing HTML templates.

## Relational data model
Blego is powered by an unopinionated data model that supports multiple types of relationships. It is trivial to access related data across multiple levels of hierarchy.

## Flexibility
Blego is flexible enough to generate any type of a website like Blogs, Stores or Wikis. In fact, it can handle a lot more than just websites. It can generate XMLs, PDFs or even images.



# Using Blego
### Requirements
Blego requires [Node.js 8.0](https://nodejs.org) or newer. Visit [https://nodejs.org](https://nodejs.org/) for more information.

## Creating a project
```sh
npx blego new my-project
```

This will create a new directory with a basic Blego project already set up. You can replace `my-project` with any directory name you would like.

## Building a project
```sh
npx blego build
```

This will build your project and save the output to the `dist` directory.

## Serving a project
```sh
npx serve
```

This will start a web server from the `dist` directory. Visit [http://localhost:3000](http://localhost:3000) to see your generated project.

## File system
Standard Blego project comes preconfigured with the following files and directories.

`data`: Contains data files parsed by Blego.

`globals`: Contains data files available globally.

`static`: Contains files copied directly to the `dist` directory.

`template`: Contains [Handlebars.js](https://handlebarsjs.com/) templates used to generate files.

`blego.js`: This is the brain of your Blego project. This file contains definitions of all relationships and instructions on how your project will be built.

## Building pages
To build a page add the following code to the `blego.js` file.

```js
blego.page('page.html', 'welcome.html', { title: 'Hello World' });
```

This will populate the `welcome.html` template with data passed in the last argument and save it as `page.html`.

## Templates
Template files use [Handlebars.js](https://handlebarsjs.com/) to fill in static markup with dynamic content.

```html
<div class="entry">
  <h1>{{ title }}</h1>
  <div class="body">
    {{ body }}
  </div>
</div>
```

All templates are treated as [Handlebars.js partials](https://handlebarsjs.com/partials.html). This means that you can compose templates using shared components.

```html
{{> header.html }}
Hello World
{{> footer.html }}
```

There is a lot more that [Handlebars.js](https://handlebarsjs.com/) can do. Visit [https://handlebarsjs.com](https://handlebarsjs.com/) to learn more.

## Macros
Macros allow you to call Javascript functions from your templates.

For example, you may want to report when the page was generated.

First you need to register a macro in the `blego.js` file.

```js
blego.macro('currentDateTime', () => new Date().toLocaleString());
```

You can then use it in your templates.

```html
<span>{{ currentDateTime }}</span>
```

Macros can also accept arguments.

```js
blego.macro('getUserAge', (user) => user.age || 'Age not available');
```

```html
<span>{{ getUserAge user }}</span>
```

Macros use [Handlebars.js helpers](https://handlebarsjs.com/#helpers). Visit [https://handlebarsjs.com/#helpers](https://handlebarsjs.com/#helpers) to learn more.

## Static files
Not all files used by a website are dynamically generated. Move your static files like images, CSS, etc. to the `static` directory and Blego will automatically copy them to the `dist` directory when building.

## Data
Blego creates data Stores by parsing variety of files from the `data` directory.

First tier subdirectories represent the Store name while the remaining file path represents the Record key. File extensions are omitted from the Record key.

```
.
+- Data
   +- Pages
      +- home.md
      +- about.md
      +- about
         +- contact.md
```

Given this file structure, Blego will create a data Store called `Pages` with 3 Records. The Records will have the following keys.

```
- home
- about
- about/contact
```

### Stores
Stores provide many ways of accessing and manipulating the Records. See the Store API reference to learn more.

### Data file types
Blego can parse different data file types and each offers different behavior.

#### Markdown
Markdown data files use `.md` file extension and support Front Matter. 

#### HTML

#### JSON

#### JS

#### YAML


#### Globals

[ todo ]

#### Relationships

[ todo ]

#### Collections

[ todo ]

# Learn More
- API reference
- Blego for absolute beginners
- Debugging
- Advanced topics
- Tutorials
