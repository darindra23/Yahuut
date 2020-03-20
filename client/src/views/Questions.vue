<template>
  <div class="wrepper container">
    <div class="container">
    <div class="container icon mt-2 col-10">
    <i class="far fa-question-circle" style="font-size: 10rem; color: #8a4eb9; -webkit-box-shadow: 0px 5px 18px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 18px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 18px 1px rgba(0,0,0,0.75); border-radius: 100px"></i>
    </div>
    <div class="container sd text-center col-2" style="font-size : 5rem">
    {{ this.time }}
    </div>
    <div class="container option question"> {{this.question}} </div>
    </div>
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
    <div class="container col-6 option awnser-a" style="font-size: 30px; margin-top:-20px">A<button @click.prevent="jawabanA" type="button" class="btn btn-primary jwb">{{this.answer[0]}} </button></div>
    <div class="container col-6 option awnser-b" style="font-size: 30px; margin-top:-20px">C<button @click.prevent="jawabanC" type="button" class="btn btn-success jwb">{{this.answer[2]}}</button></div>
      </div>
      <div class="d-flex justify-content-between mt-4">
    <div class="container col-6 option awnser-a" style="font-size: 30px; margin-top:-20px;">B<button @click.prevent="jawabanB" type="button" class="btn btn-info jwb">{{this.answer[1]}}</button></div>
    <div class="container col-6 option awnser-b" style="font-size: 30px;margin-top:-20px;">D<button @click.prevent="jawabanD" type="button" class="btn btn-danger jwb">{{this.answer[3]}}</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"
import axios from 'axios'
var count = 7
export default {
  name: "Home",
  data() {
    return {
      question: null,
      answer : [],
      correct_answer : null,
      category: null,
      time: '__',
      timer: null,
      champ : ['malik', 'gusti', 'adam']
    }
  },
  components: {
  },
  created() {
    setTimeout(() => {
      this.getquestion()
    },2000);
  },
  methods : {
    getquestion() {
      if (count > 0) {
        axios({
          url : 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple',
          method : 'GET'
          })
            // this.countDown()
          .then(data => {
            const temp = []
            const regex = /&#039;|&quot;/gi
            const questionApi = data.data.results[0].question
            this.question = questionApi.replace(regex, `'`)
  
  
            this.correct_answer = data.data.results[0].correct_answer
            temp.push(data.data.results[0].correct_answer)
            data.data.results[0].incorrect_answers.forEach(element => {
             temp.push(element)
            });
            this.category = data.data.results[0].category
            var currentIndex = temp.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = temp[currentIndex];
            temp[currentIndex] = temp[randomIndex];
            temp[randomIndex] = temporaryValue;
            }
            this.answer = temp
            this.countDown()
          })
          .catch(err => {
            console.log(err)
          })
          count--
      } else {
        let input = this.champ.join(', ')
       Swal.fire({
      html : `<div style="font-size: 3em;">${input}<div>`,
      width: 800,
      padding: '10em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
          `,
          onClose() {

          }
        })
      }
    },
    jawabanA() {
      clearInterval(this.timer)
      if(this.answer[0] === this.correct_answer) {
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'well done!!!',
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      } else {
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Ups, wrong answer!! The answer is 
        🙈 ${this.correct_answer} 🙈`,
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      }
    },
     jawabanB() {
       clearInterval(this.timer)
      if(this.answer[1] === this.correct_answer) {
        Swal.fire({
          position: 'center',
        icon: 'success',
        title: 'well done!!!',
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      } else {
        Swal.fire({
          position: 'center',
        icon: 'error',
        title: `Ups, wrong answer!! The answer is 
        🙈 ${this.correct_answer} 🙈`,
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      }
    },
     jawabanC() {
       clearInterval(this.timer)
      if(this.answer[2] === this.correct_answer) {
        Swal.fire({
          position: 'center',
        icon: 'success',
        title: 'well done!!!',
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      } else {
        Swal.fire({
          position: 'center',
        icon: 'error',
        title: `Ups, wrong answer!! The answer is 
        🙈 ${this.correct_answer} 🙈`,
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      }
    },
     jawabanD() {
      clearInterval(this.timer)
      if(this.answer[3] === this.correct_answer) {
        Swal.fire({
          position: 'center',
        icon: 'success',
        title: 'well done!!!',
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
        setTimeout(() => {
      this.getquestion()
    }, 4000);
      } else {
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Ups, wrong answer!! The answer is 
        🙈 ${this.correct_answer} 🙈`,
        showConfirmButton: false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        timer: 5000,
        })
      setTimeout(() => {
      this.getquestion()
    }, 4000);
      }
    },
    countDown(){
        let t = 10
         this.timer = setInterval(()=>{
         
          let menit = Math.floor(t/60)
          this.time = t % 60
          t--
          console.log(this.time)
          // this.time = t
          if(t < 0) {
            clearInterval(this.timer)
          Swal.fire({
          position: 'center',
          icon: 'error',
          title: ` Ups, Time is Up !!! The answer is 
          🙈 ${this.correct_answer} 🙈`,
          showConfirmButton: false,
          allowOutsideClick : false,
          allowEscapeKey : false,
          timer: 5000,
          onClose: () => {
            this.getquestion()
          },
          })
        
          }
        }, 1000); 
    }
  }
};
</script>
<style scoped>
.question {
  color: white;
  font-size: 25px;
  font-weight: 600;
  padding: 20px;
  border-radius: 0px 95px;
  border: 4px black solid;
  width: 50%;
  margin: 0 auto;
  height: 7em;
  -webkit-box-shadow: 7px -7px 12px 2px rgba(0,0,0,0.70);
-moz-box-shadow: 7px -7px 12px 2px rgba(0,0,0,0.70);
box-shadow: 7px -7px 12px 2px rgba(0,0,0,0.70);
background: rgb(2,0,36);
background: linear-gradient(41deg, rgba(2,0,36,1) 0%, rgba(138,78,185,1) 67%, rgba(0,212,255,1) 100%);
}
.wrepper {
  font-family: 'Bellota', cursive;
}
.jwb {
  font-size: 20px;
  height: 3em;
  width: 25em;
  border-radius: 40px;
  -webkit-box-shadow: inset 0px 0px 12px 2px rgba(0,0,0,0.51);
  -moz-box-shadow: inset 0px 0px 12px 2px rgba(0,0,0,0.51);
box-shadow: inset 0px 0px 12px 2px rgba(0,0,0,0.51);
}
.sd {
  margin-top: -20px;
}

</style>
