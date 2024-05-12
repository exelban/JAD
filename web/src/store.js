import Vuex from "vuex"

export default new Vuex.Store({
  state: {
    links: [],
    popup: {
      new: false,
    },
    id: null,
    editMode: false,
  },
  mutations: {
    setLinks(state, links) {
      state.links = links
    },
    setEditMode(state, editMode) {
      state.editMode = editMode
    },
    setNewPopup(state, newValue) {
      state.popup.new = newValue
      if (newValue === false) {
        state.id = null
      }
    },
    setId(state, id) {
      state.id = id
    }
  },
  actions: {
    async save({ commit, state }) {
      return fetch(`${window.config.apiHost}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state.links)
      })
    },
    async create({ commit, state, dispatch }, link) {
      commit("setLinks", state.links.concat(link))
      return new Promise((resolve, reject) => {
        dispatch("save").then(() => {
          resolve()
        }).catch(() => {
          commit("setLinks", state.links.filter(l => l.id !== link.id))
          reject()
        })
      })
    },
    async delete({ commit, state, dispatch }, id) {
      const copy = state.links.find(l => l.id === id)
      commit("setLinks", state.links.filter(l => l.id !== id))
      return new Promise((resolve, reject) => {
        dispatch("save").then(() => {
          resolve()
        }).catch(() => {
          commit("setLinks", state.links.concat(copy))
          reject()
        })
      })
    },
    toggleEditMode({ commit, state }) {
      commit("setEditMode", !state.editMode)
    },
    openEditPopup({ commit }, id) {
      commit("setId", id)
      commit("setNewPopup", true)
    }
  }
})