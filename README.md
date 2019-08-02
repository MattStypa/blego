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
## Requirements
Blego requires [Node.js 8.0](https://nodejs.org) or newer. Visit [https://nodejs.org](https://nodejs.org/) to learn more.

## Creating a project
```sh
npx blego new my-project
```

This will create a new directory with a simple Blego project already set up. You can replace `my-project` with any directory name you like.

## Building a project
```sh
npx blego build
```

This will build your project and save it to the `dist` directory.

## Serving a project
```sh
npx serve
```

This will start a web server from the `dist` directory. Visit [http://localhost:3000](http://localhost:3000) to see your generated project.

## File system
Standard Blego project is preconfigured with the following files and directories.

`data`: Contains data files parsed into Stores. [Learn more](#Data).

`globals`: Contains data files available globally. [Learn more](#Globals).

`static`: Contains files copied directly to the `dist` directory. [Learn more](#Static files).

`template`: Contains [Handlebars.js](https://handlebarsjs.com/) template files. [Learn more](#Template)

`blego.js`: This is the brain of your Blego project. This file contains definitions of all relationships and instructions on how to build your project.

## Building pages
To build a page add the following code to the `blego.js` file.

```js
blego.page('page.html', 'welcome.html', { title: 'Hello World' });
```

This will create `page.html` using the `welcome.html` template populated with data passed in the last argument.

## Template
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
Macros allow you to call Javascript functions from your template.

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
Not all files used by a website are dynamically generated. Put your static files like images, CSS, etc. in the `static` directory and Blego will automatically copy them to the `dist` directory when building.

## Data
Blego creates data Stores by parsing files from the `data` directory.

First tier subdirectories represent the Store name while the remaining file path represents the Record key. File extension is omitted from the Record key.

```
.
+- Data
   +- Pages
      +- home.md
      +- about.md
      +- about
         +- contact.md
```

Given this file structure, Blego will create a Store called `Pages` with 3 Records. The Records will have the following keys.

```
- home
- about
- about/contact
```

## Stores
Stores provide many ways of accessing and manipulating the Records.

For example, you may want to get twitter handles for the five newest users.

```js
blego.data.Users.sortBy('joinedAt').reverse().take(5).pluck('twitter');
```

See the [API reference](API.md#store) to learn more.

## Data file types
Blego can parse many different data file types.

- **Markdown** files use `.md` file extension.
- **HTML** files use `.html` file extension.
- **Javascript** files use `.js` file extension.
- **JSON** files use `.json` file extension.
- **YAML** files use `.yaml` file extension.

Markdown and HTML data files support [Front Matter](https://github.com/jxson/front-matter). Meta data provided is exposed as parameters of the Record while the content is available via the `body` parameter.

Visit [https://github.com/jxson/front-matter](https://github.com/jxson/front-matter) to learn more about [Front Matter](https://github.com/jxson/front-matter).

Javascript data files must export an object which will be merged into the Record.

JSON and YAML files are parsed into Javascript object and merged into the Record.

## Globals

Some data may need to be available globally. Data files in the `globals` directory will  be automatically made available in every template file.

**Note**: Global data is a Javascript object and not a Store.

Below is a simple `config.json` file placed in the `globals` directory.

```json
{
  "site_name": "My Project"
}
```

The data can be accessed in any template.

```html
<h1>{{ config.site_name }}</h1>
```

## Relationships

Blego must be told how the data models relate to each other. You may be used to thinking about relationships as one-to-one or one-to-many. However, it is important to also understand the direction of the relationship.

For example; A team has many players but a player has one team.

When creating a relationship between Books and Authors it makes a lot more sense to define the Authors in the Book model. But, this relationship must work both ways.

To define bidirectional relationship between Books and Authors you need to add the following code to the `blego.js` file.

```
blego.data.Books.linkToMany(blego.data.Authors, 'authors');
blego.data.Authors.linkFromMany(blego.data.Books, 'authors', 'books');
```

This will replace the Author keys in `authors` property of Book Records with actual Author Records. And, add `books` property to the Author Records containing related Book Records.

See the [API reference](API.md#blegodatastorelinktoonerelatedstore-prop) to learn more.
