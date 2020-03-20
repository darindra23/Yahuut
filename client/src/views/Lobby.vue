<template>
  <div class="room">
    <div class="logo">
      <h1>Yahoot!</h1>
    </div>
    <button class="start-btn">start now!</button>
    <div>
      <p>{{players.length}} has joined</p>
    </div>
    <div class="list-player">
      <div class="player" v-for="(player,i) in players" :key="i">{{player.username}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";
// let socket = io("https://yahoot-coy.herokuapp.com/");
let socket = io("http://localhost:3000/");
export default {
  name: "Room",
  data() {
    return {};
  },
  computed: {
    ...mapState(["players"])
  },
  methods: {},
  created() {
    this.$store.dispatch("getPlayer", localStorage.room);
    socket.on("playerUpdate", rtplayer => {
      this.$store.dispatch("addPlayer", rtplayer);
    });
  },
  mounted() {
    socket.emit("join",this.$route.params.id);
  },
};
</script>

<style>
.room {
  display: flex;
  flex-flow: column;
  justify-content: center space-evenly;
  align-items: center;
  min-height: 100vh;
}
.start-btn {
  border: 5px black solid;
  background-color: whitesmoke;
  border-radius: 100px;
  padding: 1vh;
}
.start-btn:hover {
  color: #9300f5;
  transform: scale(1.18)
}
.list-player {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 80vw;
  padding: 3vh;
}
.player {
  display: flex;
  width: 20vw;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 4px black solid;
  border-radius: 10px;
  margin: 1vh;
}
</style>