# API simples com NestJS

<p>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" />
</p>

## API backend para aprender o framework NestJs

Esta API foi criada seguindo o tutorial [NestJs Course for Beginners - Create a REST API](https://youtu.be/GHTA143_b-s?si=VO3eZ0_kYvZkGJpt) e como o próprio nome já diz, segue os padrões REST

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Custom

```bash
# execute docker compose detached
$ npm run db:dev:up

# deploy the saved migrations
$ npm run db:dev:deploy

# stop and remove the container
$ npm run db:dev:rm


$ npm run db:dev:restart
```

## License

Nest is [MIT licensed](LICENSE).
