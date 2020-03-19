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
        {{player.name}}
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
          players: [{
            name:'set',
            score: 0
          },
          {
            name:'crocket',
            score: 0
          }]
        }
    },
    methods: {
        getPlayer () {
          let {id} = localStorage
          axios.get(`/user/${id}`)
          .then( ({data}) => {
            this.players = data
          })
        }
    },
    created () {
        this.getPlayer()
    }
}
</script>

<style>

</style>