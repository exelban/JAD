<template>
  <header class="row middle between">
    <div class="row center middle settings">
      <label for="info" title="Settings"><i class="gg-controller"/></label>
      <input id="info" type="checkbox">
      <div class="info row middle between">
        <div class="row middle center" style="gap: 2px;">
          <button @click="theme = theme === 'dark' ? 'light' : 'dark'" title="Toggle theme"><i class="gg-edit-contrast"/></button>
          <button v-if="!demoMode" title="Download links" @click="download"><i class="gg-software-download"/></button>
          <button v-if="!demoMode" title="Upload links"><i class="gg-software-upload"/></button>
        </div>
        <a href="https://github.com/exelban/jad" target="_blank" title="Version">{{ version }}</a>
      </div>
    </div>

    <div class="row center middle" style="gap: 4px;">
      <button v-if="!editMode" @click="startEditMode" title="Cancel edit mode"><i class="gg-pen" style=""/></button>
      <button v-else @click="cancelEditMode" title="Cancel edit mode"><i class="gg-check" style="color: yellowgreen;"/></button>
      <button @click="openNewPopup" title="Add new link"><i class="gg-math-plus"/></button>
    </div>
  </header>
</template>

<script>
import {Cookies} from "@/helpers.js"

export default {
  data: () => ({
    theme: Cookies.get("theme") ?? "auto",
    ts: "--:--:--",
  }),
  computed: {
    editMode() {
      return this.$store.state.editMode
    },
    version() {
      if (window && window.config && window.config.version) {
        return window.config.version
      }
      return "unknown"
    },
    demoMode() {
      return this.version === "demo"
    }
  },
  beforeMount() {
    document.body.classList.add(this.theme)
  },
  created() {
    this.getNow()
    setInterval(this.getNow, 1000)
  },
  methods: {
    openNewPopup() {
      this.$store.commit("setEditMode", false)
      this.$store.commit("setNewPopup", true)
    },
    getNow: function() {
      const today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()

      if (h < 10) {
        h = "0" + h
      }
      if (m < 10) {
        m = "0" + m
      }
      if (s < 10) {
        s = "0" + s
      }

      this.ts = `${h}:${m}:${s}`
    },
    cancelEditMode() {
      this.$store.commit("setEditMode", false)
    },
    startEditMode() {
      this.$store.commit("setEditMode", true)
    },
    download() {
      const elem = document.createElement("a")
      elem.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.$store.state.links))}`)
      elem.setAttribute("download", "links.json")
      document.body.appendChild(elem)
      elem.click()
      elem.remove()
    }
  },
  watch: {
    theme(newTheme, oldTheme) {
      document.body.classList.remove(oldTheme)
      document.body.classList.add(newTheme)
      Cookies.set("theme", newTheme)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "css.gg/icons/scss/edit-contrast.scss";
@import "css.gg/icons/scss/math-plus.scss";
@import "css.gg/icons/scss/check.scss";
@import "css.gg/icons/scss/pen.scss";
@import "css.gg/icons/scss/controller.scss";
@import "css.gg/icons/scss/software-download.scss";
@import "css.gg/icons/scss/software-upload.scss";

.gg-pen {
  --ggs: 0.75;
  margin-top: -2px;
}
.gg-math-plus {
  margin-top: 0;
}
.gg-controller {
  --ggs: 0.7;
}
.gg-software-download, .gg-software-upload {
  --ggs: 0.8;
  margin-top: 7px;
}

header {
  width: calc(100% - 8px);
  height: 24px;
  padding: 4px 4px;
  position: absolute;
  top: 0;

  button, label {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background-color: var(--background-color);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    color: var(--icon-color);
  }

  .settings {
    width: auto;
    height: 22px;
    border-radius: 4px;
    &:has(input:checked) label {
      border-radius: 4px 0 0 4px;
    }
    input[type="checkbox"] {
      display: none;
    }
    .info {
      width: 0;
      height: 24px;
      overflow: hidden;
      transition: all 200ms ease;
      border-left: none;
      border-radius: 0 4px 4px 0;
      padding: 0;
      a {
        font-size: 12px;
        margin: 0;
        text-wrap: none;
        color: var(--title-color);
        &:hover {
          text-decoration: underline;
        }
        position: relative;

        &.outdated:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          background: var(--color-red);
          width: 3px;
          height: 3px;
          border-radius: 50%;
        }
      }
    }
    input:checked + .info {
      width: 120px;
      padding: 0 0 0 4px;
    }
  }

  @media (max-width: 420px) {
    width: calc(100% - 20px);
    height: 40px;
    padding: 4px 10px;
    button, label {
      width: 32px;
      height: 32px;
    }
    .settings, .info {
      height: 32px !important;
    }
    .info > div {
      > :nth-child(2), > :nth-child(3) {
        display: none;
      }
    }
    input:checked + .info {
      width: 80px !important;
    }
    .gg-check {
      --ggs: 1.3;
    }
  }
}
</style>
