<template>
  <form class="column" @submit.prevent="create">
    <c-input name="Name" type="text" v-model="link.name" :error="errors.name" placeholder="JAD"/>
    <c-input name="URL" type="text" v-model="link.url" :error="errors.url" placeholder="http://jad.local"/>
    <c-input name="Color" type="color" v-model="link.color"/>

    <div class="row center middle"><c-link :id="link.id" :name="link.name" :url="link.url" :color="link.color" preview/></div>

    <button type="submit" @click="create">{{ exist ? "Save" : "Create"}}</button>
  </form>

  <div v-if="status.active" class="status row center middle">
    <span v-if="status.loading" class="loader"></span>
    <svg v-else-if="status.error" width="42" height="42" viewBox="0 0 24 24" style="color: var(--color-red);" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"/>
    </svg>
    <svg v-else-if="status.success" width="52" height="52" viewBox="0 0 24 24" style="color: var(--color-green);" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z" fill="currentColor"/>
    </svg>
  </div>
</template>

<script>
import CInput from "@/components/input.vue"
import CLink from "@/components/link.vue"
import {randomColor, isValidUrl} from "@/helpers.js"

export default {
  name: "New",
  components: {
    CInput, CLink
  },
  data: () => ({
    status: {
      active: false,
      loading: false,
      error: false,
      success: false,
    },
    exist: false,
    link: {
      name: "",
      url: "",
      color: randomColor(),
    },
    errors: {
      name: undefined,
      url: undefined,
    }
  }),
  methods: {
    create(e) {
      e.preventDefault()

      this.errors.name = this.link.name.length === 0
      this.errors.url = this.link.url.length === 0 || !isValidUrl(this.link.url)

      if (this.errors.name || this.errors.url) {
        return
      }
      this.status.active = true
      this.status.loading = true
      this.status.error = false
      this.status.success = false

      if (!this.link.order) {
        this.link.order = this.$store.state.links.length + 1
      }

      this.$store.dispatch("upsert", this.link).then(() => {
        this.$store.commit("setNewPopup", false)
        this.status.success = true
      }).catch(() => {
        this.status.error = true
      }).finally(() => {
        this.status.loading = false
        setTimeout(() => {
          this.status.active = false
        }, 2000)
      })
    },
  },
  beforeMount() {
    if (!this.$store.state.id) {
      this.link.id = Math.random().toString(36).substring(2, 9)
      return
    }
    const link = this.$store.state.links.find(link => link.id === this.$store.state.id)
    if (link) {
      this.link = {...link}
      this.exist = true
    }
  },
  beforeUnmount() {
    this.$store.commit("setId", null)
  }
}
</script>

<style lang="scss" scoped>
form {
  min-width: 320px;
  gap: 8px;
  border-radius: 0.5rem;
  margin: 0 auto;

  button {
    padding: 8px;
    border: none;
    cursor: pointer;
    background: var(--button-background-color);
    color: var(--button-text-color);
    font-size: 15px;
    font-weight: 500;
    border-radius: 2px;
  }
}
.status {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background-color);
  z-index: 99;

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid var(--title-color);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>