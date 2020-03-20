<template>
  <div class="room-list">
    <div class="logo">
      <h1>Yahoot!</h1>
    </div>
    <div class="rooms-container">
      <div class="room-card" v-for="(room,i) in rooms" :key="i">
        <div class="room-card-front">
        <h2>{{room.name}}</h2>
        <div>total player: {{room.Users.length}}</div>
        <div>{{room.status}}</div>
      </div>
      <div class="room-card-back">
       <button class="join-btn" @click.prevent="join(room.id, room.name)" v-if="room.status === 'Waiting'">join</button>
      </div>
    </div>
      <button v-b-modal.add class="room-card">add new room</button>
    </div>
    <Add></Add>
    <router-view />
  </div>
</template>

<script>
import { axios, errorHandler } from "../config/axios";
import { mapState } from "vuex";
import Add from "../components/add";
import io from "socket.io-client";
// let socket = io("https://yahoot-coy.herokuapp.com/");
let socket = io("http://localhost:3000/");

export default {
  name: "Rooms",
  components: {
    Add
  },
  computed: {
    ...mapState(["rooms"])
  },
  mounted() {
    this.$store.dispatch("getRooms");
    socket.on("roomUpdate", rtroom => {
      this.$store.dispatch("addRoom", rtroom);
    });
  },
  methods: {
    join(id) {
      const username = localStorage.player;
      axios
        .put(`/room/${localStorage.id}`, { username, RoomId: id })
        .then(() => {
          localStorage.setItem("room", id);
          this.$store.dispatch("getRooms");
          this.$router.push(`/lobby/${id}`);
        })
        .catch(error => {
          errorHandler(error);
        });
    }
  },
  watch: {
  }
};
</script>

<style>
.room-card {
  background-color: white;
  height: 40vh;
  width: 30vw;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(105, 6, 38, 0.25);
  padding: 16px;
  transition: 320ms ease;
  border-radius: 30px;
  margin-top: 3vh;
  margin-bottom: 3vh;
}
.room-card h2 {
  margin-top: 0px;
}
.room-card button {
  border: 1px black solid;
  border-radius: 7px;
  padding: 1vh;
  width: 10vh;
}
.room-card button:hover {
  background-color: #9300f5;
  color: white;
  transform: scale(1.18)
}
.room-card:hover > a {
  opacity:1;
  transform: translateX(0px);
}
.rooms-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>