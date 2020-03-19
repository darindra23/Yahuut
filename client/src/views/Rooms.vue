<template>
  <div class="room-list">
    <div class="logo">ini logo</div>
    <div class="rooms-container">
      <div class="room-card" v-for="(room,i) in rooms" :key="i">
        <h2>{{room.name}}</h2>
        <div>total player: {{room.player.length}}</div>
        <div>{{room.status}}</div>
        <button v-if="room.status === 'waiting'">join</button>
      </div>
      <div>
        <button class="room-card">add new room</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Rooms",
  data() {
    return {
      // rooms.findAll(include:user)
      rooms: [
        {
          id:1,
          name: "test",
          status: "waiting",
          player: [
            {
              name: "abc",
              score: 0
            },
            {
              name: "qwe",
              score: 0
            },
            {
              name: "asd",
              score: 0
            },
            {
              name: "asd",
              score: 0
            },
            {
              name: "rich",
              score: 0
            }
          ]
        },
        {
          name: "test2",
          status: "playing",
          player: [
            {
              name: "lets",
              score: 0
            },
            {
              name: "get",
              score: 0
            },
            {
              name: "rich",
              score: 0
            }
          ]
        },
        {
          name: "test2",
          status: "waiting",
          player: [
            {
              name: "lets",
              score: 0
            },
            {
              name: "get",
              score: 0
            },
            {
              name: "rich",
              score: 0
            }
          ]
        }
      ]
    };
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