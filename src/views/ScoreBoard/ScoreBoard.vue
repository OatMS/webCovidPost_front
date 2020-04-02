<template>
  <div class="score-board">
      <!-- <div>
        <b><p class="title-name">COVID-19
          <br>THagGetter</p></b>
      </div> -->
    <div class="score-board-container">
      <div class="score-board-icon">
        <!-- <img class="ranking-icon" src="@/assets/img/ranking-motion.gif" alt=""> -->
        <img class="ranking-icon" src="@/assets/img/ranking-icon.png" alt="">
      </div>
      <div class="user-ranking">
        <div class="header-ranking">
          <b><h7> จัดอันดับ<br>คะแนนจิตอาสา </h7></b>
        </div>
        <div class="user-list">
          <div v-for="(row, index) in user_score" class="user-score">
            <!-- <span class="ranking-number"><b>{{index+1}}</b></span>  -->
            <img v-if="index==0" src="@/assets/img/gold-crown.png" class="crown-icon">
            <img v-else-if="index==1" src="@/assets/img/silver-crown.png" class="crown-icon">
            <img v-else-if="index==2" src="@/assets/img/bronze-crown.png" class="crown-icon">
            <div  v-else-if="index>2" style="height:20px;" class="crown-icon"></div>
            <span class = "rank-name">
              <b>{{row.name.substring(0, 11)}}</b>
            </span>
            <img v-if="index == 0" class="gift-icon" src="@/assets/img/starbucks-icon.png" alt="">
            <br>
            <span class="score-number" style=""><b>{{numberWithCommas(row.user_score)}}</b> ข้อ</span>
          </div>

        </div>

      </div>

      <div  class="clear:both;"></div>

    </div>
    <!-- <div class="btn-view-gift">
      <a href="" class="a-view-gift pointer">ดูของรางวัล</a>
    </div> -->

    <!-- <div class="logout-button  pointer" data-toggle="tooltip" data-placement="right" title="logout">
      <i @click="logout" style="color:white;" class="fa fa-power-off pointer"></i>

    </div> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      user_score: []
    }

  },
  mounted(){
    // this.user_score = [
    //   {username:"Manassanan Bo", score: 150000},
    //   {username:"Chalush Bo", score: 50000},
    //   {username:"Teerasak To", score: 3000}
    // ]
    var self = this
    var init = async ()=> {
      await this.axios.get(process.env.VUE_APP_URL_API+'/topScore', {
      }, { useCredentails: true })
      .then(function (response) {

        console.log(response.data)
        var result = response.data.data
        self.user_score = result
        // this.tweet = response.data
      })
      .catch(function (error) {
        console.log(error);
        // currentObj.output = error;
      });
      // this.tweet_text = result['tweet_text']
      // this.tweet = result
      // this.tweet_id = result._id
      // console.log(this.tweet_text)
    }
    init()
  },
  methods:{
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateScore(){
      var self = this
      this.axios.get(process.env.VUE_APP_URL_API+'/topScore', {
      }, { useCredentails: true })
      .then(function (response) {

        console.log(response.data)
        console.log("upadte score");
        var result = response.data
        self.user_score = result.data
        // this.tweet = response.data
      })
      .catch(function (error) {
        console.log(error);
        // currentObj.output = error;
      });

    },
    logout(){
      window.$cookies.set('facebook-login',{isConnected:false})
      window.$cookies.set('user',{})
      this.$router.push('/login')
      this.$router.go(process.env.VUE_APP_URL_API+'/login')
    }

  }

}
</script>

<style lang="scss" scoped>
.score-board{
  width:17vw;
  // width:300px;
  float:left;
  height:100vh;
  background-color: #3A5CA5;
  position:fixed;
  top: 0px;
  left:0px;
}

.score-board-container{
  border-radius: 20px;
  border: 2px solid #FFF;
  width:90%;
  // height:60%;
  margin-left:auto;
  margin-right:auto;
  margin-top: 50px;
  background-color: #FFF;

}

.score-board-icon{
  width:100%;
  text-align: center;
}

.ranking-icon{
  width:80px;
  margin-top:20px;
  margin-left: auto;
  margin-right: auto;

}

.header-ranking{
  text-align: center;
}

.ranking-number{
    display: block;
    float:left;
    height: 20px;
    width: 20px;
    line-height: 20px;

    -moz-border-radius: 30px; /* or 50% */
    border-radius: 30px; /* or 50% */
    border: 1.5px solid black;
    

    background-color: white;
    color: black;
    text-align: center;
    font-size: 1em;

    margin-right: 10px;
}

.crown-icon{
  width: 20px;
  float: left;
  margin-right:5px;
}

.rank-name{
  font-size: 1.1em;
}

.user-list{
  padding: 10px;
}

.gift-icon{
  width:30px;
  float: right;
}

.user-score{
  font-size: 0.8em;
  margin-bottom: 10px;
}

.score-number{
  margin-left: 30px;;
}

button.btn-view-gift{

  display:inline;

}
div.btn-view-gift{
  margin: 10px auto;
  text-align: center;
}

a.a-view-gift{
  color: #FFF;
  font-size: 0.8em;
  border-radius: 20px;
  border: 1px solid #FFF;
  padding: 5px 10px;
}

div.logout-button{
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 1.3em;
}
.pointer 
{cursor: pointer;}

.title-name{
  color:white;
  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  font-size: 1.1em;
  letter-spacing: 0.05em;
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>
