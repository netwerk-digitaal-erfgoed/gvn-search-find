# Geheugen van Nederland / Zoek en vind

This prototype is one of three experiments developed in the NDE project 'Koppelvlak Zichtbaar-Bruikbaar'. The experiments aim to gather knowledge on how the NDE infrastructure - developed in the domain area 'Bruikbaar' - is implemented by user applications.

We deliberately kept the scope of the prototypes very limited. During construction, the developers mainly chose to test the interaction between web applications and infrastructure. It means that the prototypes may need more basic user functionality.

This prototype explores the possibilities of uniformly searching in structured data of digital heritage collections. An end user selects datasets and searches for heritage objects in these datasets using a term-based search functionality.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit # or `npm run test:unit:ci` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Docker

Optional

### Development

#### Install

docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine npm install --no-progress

#### Run

docker run --rm -it -v "$PWD":/app -w /app -p 5173:5173 node:lts-alpine npm run dev

### Production

#### Build

docker build . -t gvn-search-find

#### Run

docker run --rm -it -p 80:80 gvn-search-find
