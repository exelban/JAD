<template>
  <main class="min-h-dvh p-1 sm:p-2 flex flex-row justify-center items-center content-center">
    <div v-if="store.state.links" class="container flex flex-col items-center gap-4 sm:gap-6">
      <div v-for="g in Object.keys(store.state.links)" :key="g">
        <draggable v-model="store.state.links[g]" @change="() => store.dispatch('save')" tag="ul" group="links" :disabled="!store.state.editMode" item-key="id" ghost-class="opacity-30" class="flex flex-wrap items-center justify-center flew-row gap-x-4 sm:gap-x-5 gap-y-2 sm:gap-y-3 p-1 sm:p-2 rounded-lg" :class="store.state.editMode ? 'border border-dashed border-neutral-500' : 'border border-transparent'">
          <template #item="{element}">
            <li><CLink @click.stop :value="element"></CLink></li>
          </template>
        </draggable>
      </div>

      <div class="h-10">
        <button v-if="store.state.editMode" @click.stop @click="store.commit('addGroup')" class="px-3 py-1 bg-neutral-400 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white rounded-lg shadow-md">+</button>
      </div>
    </div>
    <button v-else @click="store.dispatch('openNewLink')" class="shadow-sm text-neutral-900 bg-white border border-neutral-300 focus:outline-none hover:bg-neutral-100 font-medium rounded-lg text-sm px-6 py-4 mt-3 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:border-neutral-600 dark:hover:text-neutral-100">Create first link</button>
  </main>

  <button @click="store.commit('setSettingsWindow', true)" title="Open settings" class="absolute bottom-4 left-4 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition ease-in-out duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path fill="currentColor" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>
  </button>
  <button @click.stop="store.dispatch(store.state.editMode ? 'stopEditMode' : 'startEditMode')" title="Edit mode" class="block sm:hidden absolute bottom-4 left-14 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition ease-in-out duration-300">
    <svg v-if="!store.state.editMode" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="24" viewBox="0 0 20 20" width="24"><g><rect fill="none" height="20" width="20"/></g><g><g><rect fill="currentColor" height="5" width="7" x="11" y="11"/><path fill="currentColor" d="M11,9h7V4h-7V9z M12.5,5.5h4v2h-4V5.5z"/><path fill="currentColor" d="M5.57,11.94l1.06-1.06l2.87,2.87l-2.88,2.88l-1.06-1.06l1.06-1.06V14.5H6.25C3.35,14.5,1,12.15,1,9.25 C1,6.35,3.35,4,6.25,4H9.5v1.5H6.25C4.18,5.5,2.5,7.18,2.5,9.25C2.5,11.32,4.18,13,6.25,13h0.37v-0.01L5.57,11.94z"/></g></g></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
  </button>
  <button @click="store.dispatch('openNewLink')" title="Add link" class="absolute bottom-4 right-4 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition ease-in-out duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
  </button>

  <Transition>
    <settings v-if="store.state.window.settings" @click="store.commit('setSettingsWindow', false)"/>
  </Transition>
  <Transition>
    <delete v-if="store.state.window.delete" @click="store.dispatch('closeDelete')"/>
  </Transition>
  <Transition>
    <edit v-if="store.state.window.edit" @click="store.dispatch('closeEditLink')" :value="store.state.editObject"/>
  </Transition>
</template>

<script setup>
import draggable from "vuedraggable"
import CLink from "./components/link.vue"
import {onBeforeMount, onMounted} from "vue"
import Cookies from "js-cookie"
import {useStore} from "vuex"
import Settings from "./components/settings.vue"
import Edit from "./components/edit.vue"
import Delete from "./components/delete.vue"

const store = useStore()

const currentClass = Cookies.get("theme")
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
if (currentClass) document.documentElement.classList.add(currentClass)
else if (systemTheme === "dark") document.documentElement.classList.add("dark")

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  const activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
  if (!Cookies.get("theme")) {
    document.documentElement.classList.remove(activeTheme)
    document.documentElement.classList.add(systemTheme)
  }
})

onMounted(() => {
  document.body.addEventListener("click", (e) => {
    if (store.state.editMode) store.dispatch("stopEditMode")
  })
})
onBeforeMount(() => {
  store.commit("initialize", window.config && window.config.links ? window.config : {version: "demo"})
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>