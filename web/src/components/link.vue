<template>
  <div class="link" :class="{'edit': editMode && !preview}">
    <a :href="url" target="_blank" :style="{'backgroundColor': color, color: color ? getContrast(color) : ''}">
      <div class="icon row center middle">
        <img v-if="icon" :src="icon" alt="Icon"/>
        <svg v-else :style="{color: color ? getContrast(color) : ''}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z" fill="currentColor"/>
          <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z" fill="currentColor"/>
          <path d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z" fill="currentColor"/>
        </svg>
      </div>
      <p>{{name}}</p>
    </a>
    <div v-if="editMode && !preview" class="action delete" title="Delete link" @click="deleteLink">
      <svg viewBox="-5 -5 34 34"  fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"/>
        <path d="M9 9H11V17H9V9Z" fill="currentColor" />
        <path d="M13 9H15V17H13V9Z" fill="currentColor" />
      </svg>
    </div>
    <div v-if="editMode && !preview" class="action edit" title="Edit link" @click="editLink">
      <svg viewBox="-10 -10 44 44"  fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z" fill="currentColor"/>
        <path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill="currentColor"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"

import {getContrast, detectIcon} from "@/helpers.js"

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: String,
    preview: Boolean
  },
  name: "CLink",
  data: () => ({
    longPressTimer: null,
  }),
  computed: {
    ...mapState(["editMode"]),
    icon() {
      return detectIcon(this.name, this.url)
    }
  },
  methods: {
    getContrast,
    deleteLink() {
      if (this.preview) return
      if (confirm(`Are you sure you want to delete ${this.name} link?`)) {
        this.$store.dispatch("delete", this.id)
      }
    },
    editLink() {
      if (this.preview) return
      this.$store.dispatch("openEditPopup", this.id)
    },
    startLongPress(e) {
      let leftButton = false
      if ("buttons" in e) {
        leftButton = e.buttons === 1
      } else {
        leftButton = e.which === 1
      }
      if (!leftButton) return

      this.longPressTimer = setTimeout(() => {
        this.$store.commit("setEditMode", true)
        e.preventDefault()
      }, 500)
    },
    stopLongPress() {
      clearTimeout(this.longPressTimer)
    }
  },
  mounted() {
    if (this.preview) return
    this.$el.addEventListener("mousedown", this.startLongPress)
    this.$el.addEventListener("mouseup", this.stopLongPress)
  },
  beforeUnmount() {
    if (this.preview) return
    this.$el.removeEventListener("mousedown", this.startLongPress)
    this.$el.addEventListener("mouseup", this.stopLongPress)
  }
}
</script>

<style lang="scss" scoped>
@keyframes shaking {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
}

.link {
  position: relative;
  width: 200px;
  height: 70px;
  cursor: move;
  &.edit {
    animation: shaking 0.3s infinite;
    a {
      pointer-events: none;
    }
  }
  &.ghost {
    opacity: 0.4;
  }
  @media (max-width: 410px) {
    width: 180px;
  }

  a {
    height: calc(100% - 20px);
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    gap: 4px;
    padding: 10px;
    background: var(--background-color);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    z-index: 5;
    box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09);

    &:hover {
      box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
      0 0 4px 3px hsla(0, 0%, 0%, 0.05),
      0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
      0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
      0 3.5px 6px hsla(0, 0%, 0%, 0.09);
    }

    .icon {
      width: 38px;
      height: 38px;
      padding: 6px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    p {
      max-width: 100px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &::before {
      content: "";
      display: block;
      width: 30px;
      height: 100%;
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      border-radius: 50% 10px 10px 50%;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &::after {
      content: "";
      display: block;
      right: 11px;
      position: absolute;
      top: 50%;
      border-style: solid;
      border-width: 0 0 2px 2px;
      height: 6px;
      margin-top: -3px;
      width: 6px;
      transform: rotate(225deg);
    }
  }

  div.action {
    width: 20px;
    height: 20px;
    background: var(--icon-color);
    position: absolute;
    top: -6px;
    z-index: 100;
    border-radius: 100%;
    cursor: pointer;

    &.delete {
      left: -6px;
      color: var(--color-black);
    }
    &.edit {
      right: -6px;
      color: var(--color-black);
    }
  }
}
</style>