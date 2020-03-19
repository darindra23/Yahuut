import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";
import io from "socket.io-client";
let socket = io("http://localhost:3000");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    rooms: []
  },
  mutations: {
    PLAYERS(state, payload) {
      state.players = payload;
    },
    ROOMS(state, payload) {
      state.rooms = payload;
    }
  },
  actions: {
    async getRooms() {
      try {
        let { data } = await axios.get("/room");
        this.commit("ROOMS", data);
        socket.emit("room", this.state.rooms);
      } catch (error) {
        errorHandler(error);
      }
    },
    async getPlayer(context, id) {
      try {
        let { data } = await axios.get("/room");
        let player = data.filter(i => i.id === Number(id));
        this.commit("PLAYERS", player[0].Users);
      } catch (error) {
        errorHandler(error);
      }
    },
    addRoom(context, data) {
      this.commit("ROOMS", data);
    }
  },
  modules: {}
});
