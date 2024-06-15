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
    async save({}, list) {
      let url = window.config.apiHost ? `${window.config.apiHost}/api` : `/api`
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
      })
    },
    async upsert({ commit, state, dispatch }, link) {
      const shadow = JSON.parse(JSON.stringify(state.links))
      const i = shadow.findIndex(l => l.id === link.id)
      if (i === -1) {
        shadow.push(link)
      } else {
        shadow[i] = link
      }
      return new Promise((resolve, reject) => {
        dispatch("save", shadow).then(() => {
          commit("setLinks", shadow)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    async delete({ commit, state, dispatch }, id) {
      const shadow = JSON.parse(JSON.stringify(state.links))
      const i = shadow.findIndex(l => l.id === id)
      if (i === -1) {
        return
      }
      shadow.splice(i, 1)
      return new Promise((resolve, reject) => {
        dispatch("save", shadow).then(() => {
          commit("setLinks", shadow)
          resolve()
        }).catch(() => {
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