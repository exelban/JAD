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

  <c-popup v-if="popup.new" :title="id ? 'Edit link' : 'New link'" @closed="() => $store.commit('setNewPopup', false)">
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
  computed: {
    ...mapState(["editMode", "popup", "id"]),
    links: {
      get() {
        return this.$store.state.links
      },
      set(newValue) {
        for (let i = 0; i < newValue.length; i++) {
          newValue[i].order = i
        }
        this.$store.commit("setLinks", newValue)
        this.$store.dispatch("save", newValue)
      }
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
  padding: 60px 40px;
  @media (max-width: 520px) {
    padding: 60px 0;
  }

  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    gap: 20px;
    @media (max-width: 420px) {
      gap: 10px;
    }
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
