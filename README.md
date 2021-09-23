<h1 align="center">
  Fullstack starter chat app with next-auth, prisma, next.js, graphql-shield, ably channels, profiles, typescript, Chakra and more!
</h1>

---

<h2 align="center">
🚧🚧🚧🦺 Under Construction 🦺🚧🚧🚧🚧
</h1>

<details>
  <summary>Status</summary>

### Done

- [x] Integrate prisma
- [x] Create db models
- [x] Set up next-auth
- [x] Create graphql queries
- [x] Integrate Chakra

### Todo

- [ ] Integrate ably for realtime chat
- [ ] Add jest (others?) testing
- [ ] Landing page `#/`
- [ ] Chat by username
- [ ] Profile Page (edit)
</details>


---

## Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Chakra](https://img.shields.io/badge/-Chakra%20UI-24e0d1.svg?style=for-the-badge)
![Ably](https://img.shields.io/badge/Ably-b32805.svg?style=for-the-badge)

[![typescript](https://img.shields.io/badge/typescript-3178c6.svg?style=flat-square)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: eslint](https://img.shields.io/badge/linter-eslint-4B32C3.svg?style=flat-square)](https://github.com/eslint/eslint)

_A special thanks to [@wangel13](https://github.com/wangel13) for their great project: [
prisma-next-auth-graphql-starter](https://github.com/wangel13/prisma-next-auth-graphql-starter)!_

**🤝 Lets make this a learning tool 🛠 together! Open some questions 🙋‍♂️ over in the [Discussions](https://github.com/nrgapple/prisma-next-auth-graphql-ably-chat/discussions) tab! Ask questions, suggest features, and chat around. We truly believe this to be the best stack for scaling your app from free 🆓 to millions of users. 🚀**

## 🚀 Getting started

1.  **Setup a database.**

    Use the predefined `docker-compose.yml` configuration for local `postgres` instance.

    ```shell
    docker-compose up -d
    ```

    <sub>don't forget about [`.env`](#-env)</sub>

    Also, you can use any DB supported by Prisma([docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/))

1.  **Start developing.**

    Navigate into your new site’s directory install modules and start it up.

    ```shell
    npm i
    npm run dev
    ```

1.  **Open the source code and start editing!**

    Your site is now running at [localhost:3000](http://localhost:3000)!

    Open the `starter` directory in your code editor of choice and edit `src/pages/index.tsx`. Save your changes, and the browser will update in real-time!

## 🗃️ Database

### Database toolkit

Starter use [Prisma](https://www.prisma.io/docs/) for db queries.

### Migrations

1.  **Modify your schema file.**

    Open the `starter` directory in your code editor of choice and edit `prisma/schema.prisma`. Add Book model for example.

    ```prisma
    model Book {
      id         String   @id @default(cuid())
      title      String
      authors    User[]   @relation(references: [id])
      published  Boolean  @default(false)
      content    String
      createdAt  DateTime @default(now())
      updatedAt  DateTime @updatedAt
    }
    ```

1.  **Generate migration files.**

    Use Prisma migrate tool.

    ```shell
    prisma migrate dev --create-only --name init
    ```

    You can find migration files in `prisma/migrations`.

1.  **Apply migration.**

    Use Prisma migrate tool.

    ```shell
    prisma migrate dev
    ```

1.  **Generate new fresh Prisma client.**

    ```shell
    npm run generate
    ```

More info about Prisma Migrate you can find in [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate)

## 🧐 Auth

- Starter use [next-auth](https://github.com/nextauthjs/next-auth) - it's a complete open source authentication solution for Next.js applications.
- For graphql queries protection and auth rules you can use [graphql-shield](https://github.com/maticzav/graphql-shield). Starter has a basic setup for it.

## ⚒️ Bundled instruments

### Prisma studio

Prisma Studio is a visual editor for your database.
Open [prisma studio](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-studio) interface:

```
npm run studio
```

### Graphql playground

Starter use ApolloServer and it's provide [graphql-playground](https://github.com/graphql/graphql-playground) in `dev` mode.
You can find it on [localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### Apollo Client Devtools

Starter use Apollo Client and it's provide [apollo-client-devtools](https://github.com/apollographql/apollo-client-devtools) in `dev` mode.
To use it you need to install browser extension:

[Download for Firefox](https://addons.mozilla.org/firefox/addon/apollo-developer-tools/) | [Download for Chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

## 📜 ENV

Use `.env.local` on production or `.env.development` on dev. [Read more](https://nextjs.org/docs/basic-features/environment-variables)

```
# Database
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/prisma?schema=public"

# Auth providers
AUTH_SECRET="this-is-a-secret-value-with-at-least-32-characters"
NEXTAUTH_URL="http://localhost:3000"

PROVIDER_GITHUB_ID=""
PROVIDER_GITHUB_SECRET=""
```

## 💫 Deploy

Before deploy, you need to set up a database.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/wangel13/prisma-next-auth-graphql-starter)

## 🤝 Contributions

<a href="https://github.com/nrgapple/prisma-next-auth-graphql-ably-chat/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nrgapple/prisma-next-auth-graphql-ably-chat" />
</a>
