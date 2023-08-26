# Frontend-Trial-Work

## Running `json-server` Locally
### To Run `json-server`:

1.&nbsp; Install `json-server` globally using npm:
```bash
npm install -g json-server
```
This command will globally install `json-server` on your system.

2.&nbsp; Start the `json-server` by running the following command in your project directory:
```bash
json-server --watch db.json
```
This command initiates the `json-server` and watches the `db.json` file for changes.

3.&nbsp; Access the data from the users endpoint by navigating to http://localhost:3000/users in your browser. This should display the JSON data you defined in `db.json`.

## Compiling `SCSS` Code Using `SASS`
### To run `SCSS` Code:
1.&nbsp; Install `sass` globally using npm:
```bash
npm install -g sass
```
This command will globally install `sass` on your system.

2.&nbsp; Start compiling `scss` to `css` by running the following command in your project directory:
```bash
sass --watch scss:css
```
Sass will automatically compile the code in the `scss` folder into the `css` folder when changes are made.

3.&nbsp; Now, your `scss` code is compiled into `css` whenever changes are made in the `scss` folder.
