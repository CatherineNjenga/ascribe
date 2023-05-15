# NodeJS Blog Application
> Blog application written in NodeJS, Express and MongoDB.
> Demo application at: https://

![Screenshot](./)

## Learning Goals
- Increased proficiency in version control (git)
- Increased proficiency in Node.js/Express
- Increased proficiency in NoSQL databases (mongoose & MongoDB)
- Basic HTTP Authentication with JWT as Bearer tokens
- Backend and Frontend Cookie handling
- End to end testing with Cypress

## Future Features/ Stretch Learning Goals
- The use of SQL databases (PostgreSQL) with Node.js/Express to build the comments section - https://www.taniarascia.com/add-comments-
- Integrating with third-party APIs (Social Media, Geocoding)
- Sending emails from my application
- Testing with Jest
- Proper Authentication using Auth0 - https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/ 
- Or use of passportjs - https://www.passportjs.org/ 

## Features

- **Authentication** - 
- **Create/Read/Update/Delete Blog Posts** - 
- **EJS** - view rendered HTML
<!-- - **Syntax highlighting** - light and dark mode available (based on the beautiful [New Moon theme](https://taniarascia.github.io/new-moon/))
- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options
- **Drag and drop** - drag a note or multiple notes to categories, favorites, or trash
- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options
- **Search notes** - easily search all notes, or notes within a category
- **Prettify notes** - use Prettier on the fly for your Markdown
- **No WYSIWYG** - made for developers, by developers
- **No database** - notes are only stored in the browser's local storage and are available for download and export to you alone
- **No tracking or analytics** - 'nuff said
- **GitHub integration** - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo) -->

## About

Blog application written in Node.js/Express, MongoDB for database persistence and EJS for server side scripting.

## Getting Started

### 1. Installation

This project is built with Node.js, Express, MongoDB for database and tested with Cypress. To start working on the project, first clone the repository on your local machine and install the dependencies.

```bash
git clone git@github.com:
cd ascribe
npm i
```

### 2. Create .env File

**copy the `.env.template` file to a new file called `.env`.** This file contains the required environment variables that are injected by Node.js via the `dotenv` package.

### 3. Run Development Server

Finally, run the development server:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) with your browser to see the application.


## Testing

Run unit and component/integration tests.

```bash
npm run test
```

> If using Jest Runner in VSCode, add `"jestrunner.configPath": "config/jest.config.js"` to your settings

Run Cypress end-to-end tests.

```bash
# In one window, run the application
npm run client

# In another window, run the end-to-end tests
npm run test:e2e:open
```

<!-- ## Contributing

TakeNote is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and feature requests are all listed on the [issues](https://github.com/taniarascia/takenote/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

View [CONTRIBUTING.md](CONTRIBUTING.md) to learn about the style guide, folder structure, scripts, and how to contribute. -->

<!-- ## Contributors

Thanks goes to these wonderful people: -->


## Acknowledgements

- A big thank you to.

## Author

- [Catherine Njenga](https://www.taniarascia.com)

## License

This project is open source and available under the [MIT License](LICENSE).