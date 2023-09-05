FROM node as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build --output-path=/tmp/app
# BASE IMAGE
FROM nginx as runtime
COPY --from=build /tmp/app /usr/share/nginx/html