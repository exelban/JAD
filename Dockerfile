FROM exelban/baseimage:node-latest as web
WORKDIR /app/
COPY ./web .
RUN yarn && yarn build

FROM exelban/baseimage:golang-latest as build

WORKDIR /app/

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY --from=web /app/dist /app/web/dist
COPY . .
RUN version="$(/script/build_time.sh)" && \
    echo "version=$version" && \
    go build -o ./bin/main -ldflags "-X main.version=${version} -s -w" ./

FROM exelban/baseimage:alpine-latest
WORKDIR /srv
EXPOSE 8080
COPY --from=build /app/bin/main /srv/main
ENTRYPOINT ./main