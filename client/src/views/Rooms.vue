<template>
  <div class="room-list">
    <div class="logo">ini logo</div>
    <div class="rooms-container">
      <div class="room-card" v-for="(room,i) in rooms" :key="i">
        <h2>{{room.name}}</h2>
        <div>total player: {{room.length}}</div>
        <div>{{room.status}}</div>
        <button @click.prevent="join(room.id, room.name)" v-if="room.status === 'Waiting'">join</button>
      </div>
      <div>
        <button @click.prevent="add" class="room-card">add new room</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import {axios, errorHandler} from '../config/axios'

export default {
  name: "Rooms",
  data() {
    return {
      rooms: null
    }
  },
  methods: {
    getRooms () {
      axios.get('/room')
      .then( result => {
        this.rooms = result.data
      })
      .catch( err => {
        errorHandler(err)
      })
    },
    join (id) {
      console.log(id,'rooms')
      const username = localStorage.player
      console.log(username)
      console.log(localStorage.id)
      axios.put(`/room/${localStorage.id}`, {username, RoomId:id })
      .then( data => {
        console.log(data)
        this.$router.push(`/lobby`)
      })
      // axios.put('/user/2', {username: 123, RoomId: 2})
      // .then(data => {
      //   console.log(data)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    add () {
      axios.post('/room', {name: 'test', status: 'Waiting'})
      .then( () => {
        this.getRooms()
      })
      .catch(err => errorHandler(err))
    }
  },
  created () {
    this.getRooms()
  },
  watch: {
    roomStatus () {
      if(!this.room.status) {
        this.room.status = 'Waiting'
      } else {
        this.room.status = 'Playing'
      }
    }
  }
};
</script>

<style>
.room-card {
  height: 20vh;
  width: 30vw;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 30px;
  margin-top: 3vh;
  margin-bottom: 3vh;
}
.rooms-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>