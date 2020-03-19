<template>
  <div>
    <div class="container p-10 align-content-center" style="background-color:#9300f5;">
      <div class="container p-10 align-content-center" style="background-color:#9300f5;">
        <div class="container p-10 align-content-center" style="background-color:#9300f5;">
          <div class="container p-10 align-content-center" style="background-color:#9300f5;">
            <img
              src="../image/logo.png"
              style="margin-left:415px; margin-bottom:-295px; margin-top:200px"
              width="250px"
              alt
            />
            <b-card
              style="max-width: 17rem; margin-top:26%; background-color:#9300f5; border:0px"
              class="mx-auto"
            >
              <b-form-input
                v-model="username"
                placeholder="Username"
                style="text-align:center; border-radius:0px;"
              ></b-form-input>

              <v-btn
                :block="true"
                color="info"
                dark
                style="margin-top:10px;border-radius:0px"
                @click.prevent="login"
              >
                <v-icon dark right style="margin-right:3px;">mdi-account-arrow-right</v-icon>ENTER
              </v-btn>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import io from "socket.io-client";
let socket = io("http://localhost:3000");
export default {
  name: "Home",
  data() {
    return {
      username: "",
      player: []
    };
  },
  created() {
    socket.on("player", player => {
      console.log(player, "ini created");
      this.player = player;
    });
  },
  methods: {
    login() {
      localStorage.setItem("player", this.username);
      socket.emit("player", this.username);
      this.$router.push({
        path: "/lobby"
      });
    }
  }
};
</script>