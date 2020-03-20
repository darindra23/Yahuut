<template>
  <div class="room">
    <div>ini logo</div>
    <button>start now!</button>
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
let socket = io("http://localhost:3000");
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
  }
};
</script>

<style>
</style>