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
import { axios } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  name: "Home",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    async login() {
      try {
        let input = {
          username: this.username
        };
        let { data } = await axios.post("/user", input);
        localStorage.setItem("player", data.username);
        localStorage.setItem("id", data.id);
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        this.$router.push({
          path: "/rooms"
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Please input username."
        });
      }
    }
  }
};
</script>