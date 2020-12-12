import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    //REVIEW need to add comments when we build it in the back end
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        let res = await api.get('boards')
        commit('setBoards', res.data)
      } catch (error) {
        console.error(error);
      }
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    setActiveBoard({ commit, dispatch }, board) {
      commit('setActiveBoard', board)
      router.push({ name: "board", params: { id: board.id } })
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        await api.delete('boards/' + boardId)
        router.push({ name: 'boards' })
      } catch (error) {
        console.error(error);
      }
    },
    async getBoardById({ commit, dispatch }, boardId) {
      try {
        let res = await api.get('boards/' + boardId)
        commit('setActiveBoard', res.data)
      } catch (error) {

      }
    },
    //#endregion


    //#region -- LISTS --
    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get('boards/' + boardId + '/lists')
        commit('setLists', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addList({ commit, dispatch }, listData) {
      try {
        await api.post('lists', listData)
        dispatch('getListsByBoardId', listData.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, listData) {
      try {
        await api.delete('lists/' + listData.id)
        dispatch('getListsByBoardId', listData.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    async editList({ commit, dispatch }, listData) {
      try {
        await api.put('lists/' + listData.id, { title: listData.title })
        dispatch('getListsByBoardId', listData.boardId)
      } catch (error) {
        console.error(error);
      }
    },


    //#endregion

    ////#region --TASKS --
    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get('lists/' + listId + '/tasks')
        commit('setTasks', { tasks: res.data, listId })
      } catch (error) {
        console.error(error)
      }
    },
    async addTask({ commit, dispatch }, taskData) {
      try {
        await api.post('tasks', taskData)
        dispatch('getTasksByListId', taskData.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit, dispatch }, taskData) {
      try {
        await api.delete('tasks/' + taskData.id)
        dispatch('getTasksByListId', taskData.listId)
      } catch (error) {

      }
    },
    async selectList({ commit, dispatch }, taskData) {
      try {
        await api.put("tasks/" + taskData.id, { listId: taskData.listId })
        dispatch('getTasksByListId', taskData.listId)
        dispatch('getTasksByListId', taskData.oldListId)
      } catch (error) {
        console.error(error)
      }
    },
    async editTask({ commit, dispatch }, commentData) {
      try {
        await api.put("tasks/" + commentData.id, commentData)
      } catch (error) {
        console.error(error)
      }
    }

    //#region 
  }

})
