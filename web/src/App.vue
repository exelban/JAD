<template>
  <c-header/>

  <main>
    <draggable v-if="links.length" :disabled="!editMode" v-model="links" item-key="order" ghost-class="ghost" id="main">
      <template #item="{element}">
        <c-link :id="element.id" :url="element.url" :name="element.name" :color="element.color"/>
      </template>
    </draggable>
    <div v-else>
      <div class="empty" @click="() => $store.commit('setNewPopup', true)">
        Start by adding a new link
      </div>
    </div>
  </main>

  <c-popup v-if="newPopup" title="New link" @closed="() => $store.commit('setNewPopup', false)">
    <c-new/>
  </c-popup>
</template>

<script>
import {mapState} from "vuex"

import CHeader from "@/components/header.vue"
import CLink from "@/components/link.vue"
import CPopup from "@/components/popup.vue"
import CNew from "@/components/new.vue"
import draggable from "vuedraggable"

export default {
  name: "App",
  components: { CHeader, CLink, CPopup, CNew, draggable },
  data: () => ({
    popup: {
      new: false
    },
  }),
  computed: {
    ...mapState(["editMode"]),
    links: {
      get() {
        return this.$store.state.links
      },
      set(newValue) {
        for (let i = 0; i < newValue.length; i++) {
          newValue[i].order = i
        }
        this.$store.commit("setLinks", newValue)
        this.$store.dispatch("save")
      }
    },
    newPopup() {
      return this.$store.state.popup.new
    },
  },
  methods: {
    checkEditMode(e) {
      if (this.editMode && e.target.id === "main") {
        this.$store.commit("setEditMode", false)
      }
    }
  },
  beforeCreate() {
    if (window.config && window.config.links) {
      this.$store.commit("setLinks", window.config.links.sort((a, b) => a.order - b.order))
    }
  },
  mounted() {
    document.body.addEventListener("click", this.checkEditMode)
  }
}
</script>

<style lang="scss">
main {
  flex: 1;
  display: flex;

  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .empty {
    background: var(--background-color);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
  }
}
</style>
