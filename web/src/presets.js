const list = {
  "unifi": {
    "name": "UniFi",
    "color": "#0061ff",
    "icon": "/presets/unifi.png"
  },
  "proxmox": {
    "name": "Proxmox",
    "color": "#d6d6d6",
    "icon": "/presets/proxmox.png"
  },
  "hass": {
    "name": "Home Assistant",
    "icon": "/presets/hass.png"
  },
  "cloudflare": {
    "name": "Cloudflare",
    "icon": "/presets/cloudflare.png"
  },
  "flatnotes": {
    "name": "FlatNotes",
    "color": "#fec700",
    "icon": "/presets/flatnotes.png"
  },
  "gitea": {
    "name": "Gitea",
    "color": "#b1dd8c",
    "icon": "/presets/gitea.png"
  },
  "grafana": {
    "name": "Grafana",
    "icon": "/presets/grafana.png"
  },
  "homebridge": {
    "name": "Homebridge",
    "color": "#232323",
    "icon": "/presets/homebridge.png"
  },
  "influx": {
    "name": "InfluxDB",
    "color": "#0056d6",
    "icon": "/presets/influxdb.png"
  },
  "jackett": {
    "name": "Jackett",
    "icon": "/presets/jackett.png"
  },
  "jam": {
    "name": "JAM",
    "color": "#444444",
    "icon": "/presets/jam.png"
  },
  "jellyfin": {
    "name": "Jellyfin",
    "icon": "/presets/jellyfin.png"
  },
  "kuma": {
    "name": "Kuma",
    "icon": "/presets/kuma.png"
  },
  "lidarr": {
    "name": "Lidarr",
    "icon": "/presets/lidarr.png"
  },
  "myspeed": {
    "name": "MySpeed",
    "color": "#9FADE9",
    "icon": "/presets/myspeed.png"
  },
  "pihole": {
    "name": "Pi-hole",
    "color": "#444444",
    "icon": "/presets/pihole.png"
  },
  "plex": {
    "name": "Plex",
    "icon": "/presets/plex.png"
  },
  "portainer": {
    "name": "Portainer",
    "icon": "/presets/portainer.png"
  },
  "prowlarr": {
    "name": "Prowlarr",
    "icon": "/presets/prowlarr.png"
  },
  "radarr": {
    "name": "Radarr",
    "color": "#BD0E1F",
    "icon": "/presets/radarr.png"
  },
  "scrypted": {
    "name": "Scrypted",
    "color": "#7b219f",
    "icon": "/presets/scrypted.png"
  },
  "sonarr": {
    "name": "Sonarr",
    "color": "#DA93FD",
    "icon": "/presets/sonarr.png"
  },
  "synology": {
    "name": "Synology",
    "icon": "/presets/synology.png"
  },
  "transmission": {
    "name": "Transmission",
    "icon": "/presets/transmission.png"
  },
  "zigbee2mqtt": {
    "name": "Zigbee2MQTT",
    "icon": "/presets/zigbee2mqtt.png"
  },
  "openWebUI": {
    "name": "Open Web UI",
    "color": "#000000",
    "icon": "/presets/openwebui.png"
  },
  "llama": {
    "name": "llama",
    "color": "#FFFFFF",
    "icon": "/presets/llama.png"
  }
}

export default Object.keys(list).sort().reduce((acc, key) => ({ ...acc, [key]: list[key] }), {})