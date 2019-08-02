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
    Gets an array of all Records.
    ##### returns
      - `array`

  - #### `blego.data.Store.get(key)`
    Gets a Record with specified key.
    ##### arguments
      - `key` Key of the requested Record.
    ##### returns
      - `Record`

  - #### `blego.data.Store.filter(fn)`
    Gets a new Store with Records that pass the test.
    ##### arguments
      - `fn` Filtering function.
    ##### returns
      - `Store`

  - #### `blego.data.Store.where(prop, value)`
    Gets a new Store with Records where specified prop equals the provided value.
    ##### arguments
      - `prop` Name of the prop.
      - `value` Desired value.
    ##### returns
      - `Store`

  - #### `blego.data.Store.pluck(prop)`
    Gets an array of values of the specified prop.
    ##### arguments
      - `prop` Name of the prop.
    ##### returns
      - `array`

  - #### `blego.data.Store.each(fn)`
    Executes a provided function once for every Record.
    ##### arguments
      - `fn` Processing function.

  - #### `blego.data.Store.map(fn)`
    Gets an array with the results of calling provided function on every Record.
    ##### arguments
      - `fn` Processing function.
    ##### returns
      - `array`

  - #### `blego.data.Store.count()`
    Gets the size of the Store.
    ##### returns
      - `integer`

  - #### `blego.data.Store.isEmpty()`
    Checks if the Store is empty.
    ##### returns
      - `boolean`

  - #### `blego.data.Store.sort(fn)`
    Gets a new Store sorted using the provided comparing function.
    ##### arguments
      - `fn` Comparing function.
    ##### returns
      - `Store`

  - #### `blego.data.Store.sortBy(prop)`
    Gets a new Store sorted by the provided prop.
    ##### arguments
      - `prop` Name of the prop.
    ##### returns
      - `Store`

  - #### `blego.data.Store.reverse()`
    Gets a new Store with Records in reversed order.
    ##### returns
      - `Store`

  - #### `blego.data.Store.take(size)`
    Gets an array with the specified amount of Records.
    ##### arguments
      - `prop` Requested size.
    ##### returns
      - `array`

  - #### `blego.data.Store.chunk(size)`
    Gets an array of Records split into groups of the specified size. If the Store can't be split evenly, the final chunk will be the remaining Records.
    ##### arguments
      - `prop` Requested chunk size.
    ##### returns
      - `array`

  - #### `blego.data.Store.dump()`
    Prints Store data to the console.

  - #### `blego.data.Store.dd()`
    Prints Store data to the console and stops the execution.

  - #### `blego.data.Store.linkToOne(relatedStore, prop)`
    Replaces Record key in the provided prop with an actual Record from the related Store.
    ##### arguments
      - `relatedStore` Related Store.
      - `prop` Name of the prop.

  - #### `blego.data.Store.linkToMany(relatedStore, prop)`
    Replaces Record keys in the provided prop with an actual Records from the related Store.
    ##### arguments
      - `relatedStore` Related Store.
      - `prop` Name of the prop.

  - #### `blego.data.Store.linkFromOne(relatedStore, relatedProp, prop)`
    Adds new prop to Records with a Record from related Store that references this Record in its own specified prop.
    ##### arguments
      - `relatedStore` Related Store.
      - `relatedProp` Name of the prop containing reference to this Record.
      - `prop` Name of the prop to add to this Record.

  - #### `blego.data.Store.linkFromMany(relatedStore, relatedProp, prop)`
    Adds new prop to Records with Records from related Store that reference this Record in their own specified prop.
    ##### arguments
      - `relatedStore` Related Store.
      - `relatedProp` Name of the prop containing reference to this Record.
      - `prop` Name of the prop to add to this Record.

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
