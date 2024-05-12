<template>
  <header>
    <button v-if="editMode" @click="cancelEditMode" title="Cancel edit mode"><i class="gg-check" style="color: green;"/></button>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'" title="Toggle theme"><i class="gg-edit-contrast"/></button>
    <button @click="openNewPopup" title="Add new link"><i class="gg-math-plus"/></button>
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

header {
  height: 26px;
  padding: 4px 4px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 4px;

  button {
    width: 24px;
    height: 24px;
    padding: 2px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background-color: var(--background-color);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: var(--icon-color);
    }
  }
}
</style>