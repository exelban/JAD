<template>
  <div class="fixed z-30 top-0 left-0 w-full h-full p-1 sm:p-0 flex justify-center items-center bg-neutral-500 bg-opacity-50 dark:bg-neutral-900 dark:bg-opacity-70">
    <div @click.stop class="relative w-full max-w-md max-h-full">
      <div class="relative bg-neutral-100 rounded-lg shadow dark:bg-neutral-800">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">Settings</h3>
          <button @click="store.commit('setSettingsWindow', false)" class="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white" data-modal-hide="small-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="m-4 p-4 md:p-5 bg-white dark:bg-neutral-700 rounded-lg border border-gray-100 dark:border-neutral-800 col-span-1 sm:col-span-3 shadow grid grid-cols-2 gap-x-3 gap-y-4">
          <div class="text-right text-neutral-600 dark:text-neutral-300">Appearance:</div>
          <div class="flex flex-col text-neutral-700 dark:text-neutral-200">
            <label class="flex items-center gap-2">
              <input v-model="theme" @change="changeTheme" type="radio" name="theme" value="light"><span>Light</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="theme" @change="changeTheme" type="radio" name="theme" value="dark"><span>Dark</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="theme" @change="changeTheme" type="radio" name="theme" value="" :checked="!theme"><span>System</span>
            </label>
          </div>
        </div>

        <div class="m-4 p-4 md:p-5 bg-white dark:bg-neutral-700 rounded-lg border border-gray-100 dark:border-neutral-800 col-span-1 sm:col-span-3 shadow">
          <h1 class="mb-4">Links</h1>

          <button @click="download" class="w-full px-3 py-2 text-md font-medium text-center inline-flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
            <span class="ml-2">Download</span>
          </button>
        </div>

        <div class="flex items-center justify-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-600 text-sm">
          <p>Version:&nbsp;</p>
          <a href="https://github.com/exelban/jad" target="_blank" class="underline">{{ store.state.version }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import {ref} from "vue"
import Cookies from "js-cookie"

const store = useStore()
const theme = ref(undefined)

const currentClass = Cookies.get("theme")
if (currentClass) theme.value = currentClass

const download = () => {
  const array = Object.keys(store.state.links).flatMap(k =>
      store.state.links[k].map(l => ({ ...l, group: k }))
  )
  const elem = document.createElement("a")
  elem.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(array))}`)
  elem.setAttribute("download", "links.json")
  document.body.appendChild(elem)
  elem.click()
  elem.remove()
}
const changeTheme = () => {
  const currentActiveClass = document.documentElement.classList.contains("dark") ? "dark" : document.documentElement.classList.contains("light") ? "light" : undefined
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  if (currentActiveClass) document.documentElement.classList.remove(currentActiveClass)
  if (theme.value) {
    document.documentElement.classList.add(theme.value)
    Cookies.set("theme", theme.value, { expires: 7*365 })
  } else {
    document.documentElement.classList.add(systemTheme)
    Cookies.remove("theme")
  }
}
</script>