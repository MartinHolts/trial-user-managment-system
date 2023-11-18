# Frontend-Trial-Work

## Running `json-server` Locally
### To Run `json-server`:

1.&nbsp; Ensure you have npm installed on your system. If not, you can install it from [https://www.npmjs.com/get-npm](https://nodejs.org/en).

2.&nbsp; Install `json-server` globally using npm:
```bash
npm install -g json-server
```
This command will globally install `json-server` on your system.

3.&nbsp; Start the `json-server` by running the following command in your project directory:
```bash
json-server --watch db.json .
```
This command initiates the `json-server` and watches the `db.json` file for changes.

4.&nbsp; Access the data from the users endpoint by navigating to http://localhost:3000/users in your browser. This should display the `JSON` data you defined in `db.json`.

## Compiling `SCSS` Code Using `SASS`
### To run `SCSS` Code
1.&nbsp; Ensure you have npm installed on your system. If not, you can install it from [https://www.npmjs.com/get-npm](https://nodejs.org/en).

2.&nbsp; Install `SASS` globally using npm:
```bash
npm install -g sass
```
This command will globally install `SASS` on your system.

3.&nbsp; Start compiling `SCSS` to `CSS` by running the following command in your project directory:
```bash
sass --watch scss:css
```
Sass will automatically compile the code in the `SCSS` folder into the `CSS` folder when changes are made.

4.&nbsp; Now, your `SCSS` code is compiled into `CSS` whenever changes are made in the `SCSS` folder.
