<template>
  <div>
    <div>
      <b-modal
        id="add"
        hide-footer
        size="sm"
        hide-backdrop
        header-bg-variant="warning"
        @hidden="resetModalData"
      >
        <template v-slot:modal-title>
          <strong style="text-align: center; color:#9300f5;;">Add Room</strong>
        </template>
        <b-form @submit.prevent="add">
          <b-form-group>
            <b-form-input
              v-model="input.name"
              style="border-radius:0px; text-align:center;"
              type="text"
              placeholder="Enter Room Name"
            ></b-form-input>
          </b-form-group>

          <b-button
            style="background-color:#9300f5; color: #ffd000;"
            squared
            type="submit"
            :block="true"
            variant="primary"
          >
            <strong>Submit</strong>
          </b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { axios } from "../config/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      input: {
        name: ""
      }
    };
  },
  methods: {
    async add() {
      try {
        let input = {
          name: this.input.name
        };
        let created = await axios.post("/room", input);
        if (created) {
          this.$bvModal.hide("add");
          this.resetModalData();
          this.$store.dispatch("getRooms");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Please input room name."
        });
      }
    },
    resetModalData() {
      let stringDefault = "";
      let numberDefault = 0;
      let booleanDefault = false;
      Object.keys(this.input).forEach(key => {
        if (typeof this.input[key] === "number") {
          this.input[key] = numberDefault;
        } else if (typeof this.input[key] === "boolean") {
          this.input[key] = booleanDefault;
        } else {
          this.input[key] = stringDefault;
        }
      });
    }
  }
};
</script>