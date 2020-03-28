<template lang="html">
  <div class="index-components">

      <img id="image-index" src="@/assets/img/index_background_img.jpg" alt="">
      <button v-on:click="gotoQuestion" id="start-index-button" type="button" class="btn btn-1 btn-lg btn-success"> เริ่มกันเลย </button>
    <!--
    <p>Hello World สวัสดีค่ะ {{ api_url }} {{text}} </p> -->
  </div>

</template>

<script>
export default {
  mounted() {
    console.log('Component mounted.')
    this.axios.get(process.env.VUE_APP_URL_API+'/helloworld', {
    }, { useCredentails: true })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      currentObj.output = error;
    });
  },
  data () {
    return {
      api_url: process.env.VUE_APP_URL_API,
      // text: process.env.NODE_ENV
    }
  },
  methods: {
    gotoQuestion() {
      // console.log("clicked");
      this.$router.push('/userQuestion') ;
    }
  }
}
</script>

<style lang="css">
#image-index{
  /* background-image: url("@/assets/img/index_background_img.jpg"); */
  width: 100%;
  margin: auto;
}

#start-index-button{
  position:fixed;
  top: 50%;
  left:20%;
  width: 15%;
  height: 10%;
  font-size: 30px;

}
</style>
