# API reference

## Blego

- ### Properties

  - #### `blego.data`
    Contains parsed Stores. See [Store](#store).

  - #### `blego.global`
    Contains parsed global data.

- ### Methods

  - #### `blego.page(path, templatePath, context)`
    Creates a file in the `dist` directory.
    ##### arguments
      - `path` Relative path to the generated file.
      - `templatePath` Relative path to the template file.
      - `context` Data available in the template.

  - #### `blego.macro(name, fn)`
    Registers a macro function available in templates. Macro functions may accept parameters. Visit [https://handlebarsjs.com/#helpers](https://handlebarsjs.com/#helpers) to learn more.
    ##### arguments
      - `name` Name of the macro.
      - `fn` Macro function.

  - #### `blego.log(...messages)`
    Prints log messages to the console.
    ##### arguments
      - `...messages` Massages that will be printed to the console.

  - #### `blego.warn(...messages)`
    Prints warning messages to the console.
    ##### arguments
    - `...messages` Massages that will be printed to the console.

  - #### `blego.dump(...data)`
    Prints data to the console.
    ##### arguments
    - `...data` data that will be printed to the console.

  - #### `blego.dd(...data)`
    Prints data to the console and stops the execution.
    ##### arguments
    - `...data` data that will be printed to the console.

## Store

- ### Methods
  - #### `blego.data.Store.all()`
  - #### `blego.data.Store.get(key)`

  - #### `blego.data.Store.filter(fn)`
  - #### `blego.data.Store.where(prop, value)`

  - #### `blego.data.Store.pluck(prop)`

  - #### `blego.data.Store.each(fn)`
  - #### `blego.data.Store.map(fn)`

  - #### `blego.data.Store.count()`
  - #### `blego.data.Store.isEmpty()`

  - #### `blego.data.Store.sort(fn)`
  - #### `blego.data.Store.sortBy(prop)`
  - #### `blego.data.Store.reverse()`

  - #### `blego.data.Store.take(size)`
  - #### `blego.data.Store.chunk(size)`

  - #### `blego.data.Store.dump()`
  - #### `blego.data.Store.dd()`

  - #### `blego.data.Store.linkFromMany(relatedStore, relatedProp, prop)`
  - #### `blego.data.Store.linkFromOne(relatedStore, relatedProp, prop)`
  - #### `blego.data.Store.linkToMany(relatedStore, prop)`
  - #### `blego.data.Store.linkToOne(relatedStore, prop)`

## Record

- ### Properties
  - #### `blego.data.Store.Record.key`
    Unique identifier of the Record.

  - #### `blego.data.Store.Record.{property}`
    Property of the Record.

## CLI

- #### `npx blego new {project_directory}`
  Creates a new Blego project.
  ##### arguments
  - `project_directory` Directory in which the project will be created.

- #### `npx blego build`
  Builds project in the current directory.

- #### `npx blego serve`
  Starts a web server from the `dist` directory.
