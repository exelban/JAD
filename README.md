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

## Apps

- [Unifi](https://ui.com)
- [Proxmox](https://www.proxmox.com)
- [Synology](https://www.synology.com)
- [Gitea](https://gitea.com)
- [Flatnotes](https://github.com/dullage/flatnotes)
- [PiHole](https://pi-hole.net)
- [Homebridge](https://homebridge.io)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [Jellyfin](https://jellyfin.org)
- [Radarr](https://github.com/Radarr/Radarr)
- [Sonarr](https://github.com/Sonarr/Sonarr)
- [Transmission](https://transmissionbt.com)
- [Portainer](https://www.portainer.io)
- [Plex](https://www.plex.tv)

You can help by adding a new app with PR or request with issues.

## License
[MIT License](https://github.com/exelban/JAD/blob/master/LICENSE)