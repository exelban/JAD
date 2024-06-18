# JAD

[![JAD](https://serhiy.s3.eu-central-1.amazonaws.com/Github_repo/JAD/cover.png)](https://github.com/exelban/JAD)

Just Another Dashboard

## About

JAD is a super simple dashboard for a homelab (and not only). It has has limited functionality, and it will be a main idea of the dashboard. For now it supports ony external links with a few predefined apps (icons).

## Installation

### Docker
```
docker run -p 8080:8080 exelban/jad:latest
```

### Docker compose

```yaml
services:
  JAD:
    image: exelban/jad:latest
    restart: always
    ports:
      - "8080:8080"
    environment:
      - PUID=1000
      - PGID=1000
```

## License
[MIT License](https://github.com/exelban/JAD/blob/master/LICENSE)
