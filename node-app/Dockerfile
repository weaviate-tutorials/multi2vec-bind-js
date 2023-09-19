FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run compile-ts
CMD node build/index.js && exit 1