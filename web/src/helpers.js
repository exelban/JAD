export const Cookies = {
  get(key) {
    const nameEQ = key + "="
    const ca = document.cookie.split(';')
    for (let i=0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1,c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length)
    }
    return null
  },
  set(key, value, hours) {
    let expires = ""
    if (hours) {
      const date = new Date()
      date.setTime(date.getTime() + (hours*60*60*1000))
      expires = "; expires=" + date.toUTCString()
    }
    document.cookie = key + "=" + (value || "")  + expires + "; path=/"
  },
  remove(key) {
    document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  },
}

export const randomColor = () => {
  let letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)] }
  return color
}

export const getContrast = (color) => {
  if (color.slice(0, 1) === "#") {
    color = color.slice(1)
  }
  if (color.length === 3) {
    color = color.split('').map(hex => hex + hex).join('')
  }

  const r = parseInt(color.substr(0,2),16)
  const g = parseInt(color.substr(2,2),16)
  const b = parseInt(color.substr(4,2),16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

  return (yiq >= 128) ? "black" : "white"
}

export const isValidUrl = url => {
  try {
    return Boolean(new URL(url))
  }
  catch(e) {
    return false
  }
}

export const detectIcon = (name, link) => {
  if (name.toLowerCase().includes("proxmox") || link.includes(":8006")) {
    return "/icon/proxmox.png"
  } else if (name.toLowerCase().includes("unifi") || name.toLowerCase().includes("ubiquiti")) {
    return "/icon/ui.png"
  } else if (name.toLowerCase().includes("gitea")) {
    return "/icon/gitea.png"
  } else if (name.toLowerCase().includes("notes")) {
    return "/icon/flatnotes.png"
  } else if (name.toLowerCase().includes("portainer")) {
    return "/icon/portainer.png"
  } else if (name.toLowerCase().includes("pihole")) {
    return "/icon/pihole.png"
  } else if (name.toLowerCase().includes("homebridge")) {
    return "/icon/homebridge.png"
  } else if (name.toLowerCase().includes("plex")) {
    return "/icon/plex.png"
  } else if (name.toLowerCase().includes("synology") || link.includes(":5000")) {
    return "/icon/synology.png"
  } else if (name.toLowerCase().includes("kuma")) {
    return "/icon/kuma.png"
  } else if (name.toLowerCase().includes("jellyfin") || link.includes(":8096")) {
    return "/icon/jellyfin.png"
  } else if (name.toLowerCase().includes("transmission") || link.includes(":9091")) {
    return "/icon/transmission.png"
  } else if (name.toLowerCase().includes("sonarr") || link.includes(":8989")) {
    return "/icon/sonarr.png"
  } else if (name.toLowerCase().includes("radarr") || link.includes(":7878")) {
    return "/icon/radarr.png"
  } else if (name.toLowerCase().includes("youtube") || link.includes("youtube.com")) {
    return "/icon/youtube.png"
  } else if (name.toLowerCase().includes("github") || link.includes("github.com")) {
    return "/icon/github.png"
  } else if (name.toLowerCase().includes("cloudflare") || link.includes("cloudflare.com")) {
    return "/icon/cloudflare.png"
  }
  return undefined
}
