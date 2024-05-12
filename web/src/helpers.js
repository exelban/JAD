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