<template>
  <div class="room">
    <div>
      ini logo
    </div>
    <button>start now!</button>
    <div>
      <p>{{players.length}} has joined</p>
    </div>
    <div class="list-player">
      <div class="player" v-for="(player,i) in players" :key="i">
        {{player.username}}
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from '../config/axios'
export default {
    name: 'Room',
    data () {
        return {
          players: []
        }
    },
    methods: {
        getPlayer () {
          let id = localStorage.id
          axios.get(`/user/${id}`)
          .then( ({data}) => {
            this.players = data
          })
        },
        start () {
          axios.put(`/user/${localStorage.id}`)
        }
    },
    created () {
        this.getPlayer()
    }
}
</script>

<style>

</style>