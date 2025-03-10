<template>
  <div class="fixed top-0 left-0 w-full h-full p-1 sm:p-0 flex justify-center items-center bg-neutral-500 bg-opacity-50 dark:bg-neutral-900 dark:bg-opacity-70">
    <div @click.stop class="relative w-full max-w-md max-h-full">
      <div class="relative bg-neutral-100 rounded-lg shadow dark:bg-neutral-800">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
          <h3 class="text-xl font-medium text-neutral-900 dark:text-white">{{ value.id ? "Edit" : "New" }} link</h3>
          <button @click="store.dispatch('closeEditLink')" class="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white" data-modal-hide="small-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <form class="p-4 md:p-5 flex flex-col gap-4" @submit.prevent="addOrSaveLink">
          <div class="grid gap-4 grid-cols-3 text-sm">
            <div class="col-span-3 flex items-center">
              <div class="w-[80px] sm:w-1/3">
                <label class="block text-neutral-700 dark:text-neutral-300 font-medium text-right pr-4" for="name">Name</label>
              </div>
              <div class="w-full sm:w-2/3">
                <input v-model="value.name" id="name" placeholder="Type link name" type="text" class="bg-neutral-50 appearance-none border border-neutral-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" required>
              </div>
            </div>
            <div class="col-span-3 flex items-center">
              <div class="w-[80px] sm:w-1/3">
                <label class="block text-neutral-700 dark:text-neutral-300 font-medium text-right pr-4" for="url">URL</label>
              </div>
              <div class="w-full sm:w-2/3">
                <input v-model="value.url" id="url" placeholder="Type link url" type="text" class="bg-neutral-50 appearance-none border border-neutral-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" required>
              </div>
            </div>
            <div class="col-span-3 flex items-center">
              <div class="w-[80px] sm:w-1/3">
                <label class="block text-neutral-700 dark:text-neutral-300 font-medium text-right pr-4" for="color">Preset</label>
              </div>
              <div class="w-full sm:w-2/3">
                <select v-model="value.preset" @change="onPresetChange" class="appearance-none bg-neutral-50 appearance-none border border-neutral-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white">
                  <option v-bind:value="undefined">None</option>
                  <option v-for="(p, key) in presets" v-bind:value="key">{{ p.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-span-3 flex items-center">
              <div class="w-[80px] sm:w-1/3">
                <label class="block text-neutral-700 dark:text-neutral-300 font-medium text-right pr-4" for="color">Color</label>
              </div>
              <div class="w-full sm:w-2/3">
                <div class="flex flex-row items-center gap-2 bg-neutral-50 appearance-none border border-neutral-300 rounded-lg w-full text-gray-700">
                  <input v-model="value.color" id="color" type="text" placeholder="HEX color code" class="w-full pl-2.5 py-2 pl-4 bg-transparent rounded-l-lg leading-tight focus:outline-none focus:bg-white">
                  <input v-model="value.color" type="color" class="pr-2.5 w-[65px] h-[32px] bg-transparent">
                </div>
              </div>
            </div>
          </div>

          <div class="w-full h-[90px] flex items-center justify-center">
            <CLink :value="value" :preview="true"/>
          </div>

          <button type="submit" class="text-white inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            {{ value.id ? "Save" : "Add" }}
          </button>
        </form>
      </div>

      <div v-if="status" class="absolute top-0 left-0 w-full h-full bg-neutral-50 bg-opacity-80 dark:bg-dark dark:bg-opacity-80 flex justify-center items-center rounded-t z-50">
        <svg v-if="status === 'in_progress'" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <svg v-else-if="status === 'ok'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-14 h-14 text-blue-500"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        <div v-else class="flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-14 h-14 text-red-500"><path d="M0 0h24v24H0z" fill="none"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <p class="bg-white text-black dark:bg-dark dark:text-white">{{ status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CLink from "./link.vue"
import { useStore } from "vuex"
import presets from "../presets.js"
import {ref} from "vue"

const store = useStore()
const props = defineProps(["value"])
const status = ref(undefined)

const onPresetChange = () => {
  if (props.value.preset && presets[props.value.preset].color) delete(props.value.color)
}
const addOrSaveLink = (e) => {
  e.preventDefault()
  if (!props.value.id) props.value.id = Math.random().toString(36).substring(2, 9)
  status.value = "in_progress"
  store.dispatch("upsert", props.value).then(() => {
    status.value = "ok"
    setTimeout(() => store.dispatch("closeEditLink"), 500)
  }).catch((e) => {
    status.value = e
    setTimeout(() => store.dispatch("closeEditLink"), 3000)
  })
}
</script>