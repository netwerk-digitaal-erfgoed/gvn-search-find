# GVN Search and Find: SDK

A prototype for demonstrating the use of an SDK to query GVN's backend services. Experimental!

## Docker

### Install

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine npm install --no-progress

### Login

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine /bin/sh

### Run tests

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine npm run test:watch

## API

### Autocomplete terms

```typescript
const terms = new Terms();
const autocompletedTerms = await terms.autocomplete({word: 'klo'}); // klokjes, klokkenstoelen, klompen, ...
```

### Get term

```typescript
const terms = new Terms();
const term = await terms.getById({id: 'https://data.cultureelerfgoed.nl/term/id/cht/211658de-fb55-42d0-8c7f-bd9a94c2dc17'}); // klokjes
```

### Search heritage objects with term

```typescript
const heritageObjects = new HeritageObjects();
const result = await heritageObjects.searchByTerm({id: 'https://data.cultureelerfgoed.nl/term/id/cht/211658de-fb55-42d0-8c7f-bd9a94c2dc17'}); // klokjes
```
