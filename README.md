# olympic-channel-full-stack-code-test-back

NodeJS + GraphQL w/ Apollo + Sequelize + SQLite - Olympic Channel - Full Stack - Code Test - Back

## Initial configuration

In the project directory, you must copy .env.example as .env a fill missing fields (e.g. PORT).

In the project directory, you can run:

### `npm install`

To download dependencies into node_modules directory.

## Available Scripts

In the project directory, you can run:

### `npm run lint`

Runs the linter.

### `npm test`

Launches the tests runner.

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run debug`

Runs the app in the development and debug mode.<br />
Open [http://localhost:4000](http://localhost:3000) to view it in the browser.
Connect to [http://localhost:9229](http://localhost:9229) to debug.

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm starts`

Runs the app for production (expects real Postgres database and configuration through DATABASE_URL env var).

## Docker

This assumes Docker and Docker Compose are installed.

Also, copy and rename .env.docker.example to .env.docker and edit for configuration specifics (Database URL, Email, etc)

This file contains the configuration to run the server as in production, but with a local Docker (that can be later deployed for real).

DO NOT push real tokens and/or passwords to git, those included in *.example are and should be FAKE ones.

### `docker-compose up`

Runs containerised server using Docker
