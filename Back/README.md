## Getting Started

Follow these steps to run the application without any difficulties.


### `Create .env files`

**_To use it with Docker, you only need to set-up the `production` file and skip to `Start Application` > `Start in production mode with Docker` part_**

Create for `development` in `.env`:

```env
DB_HOST = localhost
DB_USER = root
DB_DATABASE = library
DB_PASS = GOT
```

Create for `test` in `.env.test`:

```env
DB_HOST = localhost
DB_USER = root
DB_DATABASE = librarytest
DB_PASS = GOT
```

### `Install Dependencies`

```sh
npm install
```

### `Start Dependencies Containers`

```sh
docker-compose up
```

### `Start Application`

Start in dev mode with hot-reload:

```sh
npm run start
```
