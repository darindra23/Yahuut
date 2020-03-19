import Vue from "vue";
import Vuex from "vuex";
import {axios, errorHandler} from '../config/axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: null,
    rooms: null
  },
  mutations: {
    PLAYERS (state, payload) {
      state.players = payload
    },
    ROOMS (state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    getRooms () {
      axios.get('/room')
      .then( result => {
        this.commit('ROOMS',result.data)
      })
      .catch( err => {
        errorHandler(err)
      })
    },
    getPlayers () {},
  },
  modules: {}
});
