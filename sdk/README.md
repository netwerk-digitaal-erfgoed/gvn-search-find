# GVN Search and Find: SDK

A prototype for demonstrating the use of an SDK to query GVN's backend services. Experimental!

## Docker

### Install

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine npm install --no-progress

### Login

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine /bin/sh

### Run tests

    docker run --rm -it -v "$PWD":/app -w /app node:lts-alpine npm run test:watch
