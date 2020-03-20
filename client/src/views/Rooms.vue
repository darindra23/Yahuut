<template>
  <div class="room-list">
    <div class="logo">ini logo</div>
    <div class="rooms-container">
      <div class="room-card" v-for="(room,i) in rooms" :key="i">
        <h2>{{room.name}}</h2>
        <div>total player: {{room.Users.length}}</div>
        <div>{{room.status}}</div>
        <button class="join-btn" @click.prevent="join(room.id, room.name)" v-if="room.status === 'Waiting'">join</button>
      </div>
      <div>
        <button v-b-modal.add class="room-card">add new room</button>
      </div>
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
let socket = io("http://localhost:3000");

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
  height: 40vh;
  width: 30vw;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid black;
  border-radius: 30px;
  margin-top: 3vh;
  margin-bottom: 3vh;
}
.join-btn {
  border: 1px black solid;
  border-radius: 7px;
  padding: 1vh;
  width: 10vh;
}
.join-btn:hover {
  border: 1px black solid;
  border-radius: 7px;
  background-color: yellow ;
  padding: 1vh;
  width: 10vh;
}
.rooms-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>