<template lang="html">
  <div :style="{'background-image':'url('+backgroundUrl+');'}" class="index-components">

      <!-- <button v-on:click="gotoQuestion" id="start-index-button" type="button" class="btn btn-1 btn-lg btn-success"> เริ่มกันเลย </button> -->
      <div class="container">
        <div class="row">
          <div class="col">







            <section style="height:100vh;" class="section section-shaped section-lg my-0">
              <div class="shape shape-style-1 bg-gradient-default">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <div class="container pt-lg-md">
                  <div class="row justify-content-center">
                      <div class="col-lg">
                          <card type="secondary" shadow
                                header-classes="bg-white pb"
                                body-classes="px-md py-md"
                                class="border-0">
                              <template>
                                  <!-- <div class="text-muted text-center mb-3">
                                      <small>Sign in with</small>
                                  </div> -->

                              </template>
                              <template>
                                  <div class="text-center text-muted mb-4">
                                      <h4>COVID-19 THagGetter</h4> 
                                      <!-- <h4>COVID-19 Social Media Text Tagging</h4>  -->
                                      <small>ลงชื่อเข้าใช้งาน</small>
                                      <br>
                                      
                                  </div>

                                  <div class="btn-wrapper text-center">
                                      

                                      <!-- <base-button type="neutral">
                                          <img slot="icon" src="img/icons/common/google.svg">
                                          Google
                                      </base-button> -->
                                  </div>
                                  
                                  <form v-on:keyup.enter="checkForm" role="form">
                                    <base-input
                                        class="mb-3"
                                        placeholder="อีเมล์"
                                        v-model="email"
                                        addon-left-icon="ni ni-email-83">
                                    </base-input>
                                    <base-input
                                        type="password"
                                        placeholder="รหัสผ่าน"
                                        v-model="password"
                                        addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                      <!-- <base-checkbox v-model="remember_me">
                                          Remember me
                                      </base-checkbox> -->
                                      <div style="margin-bottom: 20px;" class="text-center">
                                          <base-button @click="gotoRegister" type="neutral" class=" haft-btn">สร้างบัญชีใหม่</base-button>
                                          <base-button @click="checkForm" type="primary" class="haft-btn">ลงชื่อเข้าใช้</base-button>
                                      </div>
                                  </form>
                                        <div style="margin-bottom: 20px;" class="text-center text-muted">
                                                <small>or Login as</small><br>
                                        </div>
                                      <facebook-login  class="button facebook-button"
                                        appId="194868541732995"
                                        @login="onLogin"
                                        @logout="onLogout"
                                        @get-initial-status="getUserData"
                                        @sdk-loaded="sdkLoaded">
                                      </facebook-login>
                                      
                                      
                                      
                                      <!-- <base-button style="margin:10px 0;" type="neutral">
                                          <img slot="icon" src="@/assets/img/facebook-icon.png">
                                          Facebook
                                      </base-button>  -->
                                        <base-button @click="loginAsGust" type="success"  class="guest-login"> Guest</base-button>
                              </template>

                            
                          </card>
                          <div class="row mt-3">
                              <!-- <div class="col-6">
                                  <a href="#" class="text-light">
                                      <small>Forgot password?</small>
                                  </a>
                              </div> -->
                              <!-- <div class="col-6 text-right">
                                  <a @click="gotoRegisterPage" class="text-light pointer">
                                      <small>สร้างบัญชีผู้ใช้ใหม่</small>
                                  </a>
                              </div> -->
                          </div>
                      </div>
                  </div>

        
         


        </div>
    </section>










          </div>
          <div class="col section section-shaped section-lg my-0">
            <div class="container pt-lg-md">
              <div class="row justify-content-center">
                <div class="purpose-content">
                  <p class="header-purpose-alert-index"><b>วัตถุประสงค์ของระบบ</b> </p>
                  <p class="content-purpose-alert-index"> <span style="margin-left: 30px;"></span>
                  แอปพลิเคชัน COVID-19 THagGetter ทำขึ้นเพื่อรวบรวมและจัดระเบียบข้อมูลเกี่ยวกับการร้องขอ, การเสนอ และการแจ้งให้ความช่วยเหลือผ่านสื่อสังคมออนไลน์ต่างๆ เช่น Twitter, Facebook และ Instagram โดยให้อาสาสมัครช่วยแยกรายละเอียดจากโพสต์ข้อความและรูปภาพ เพื่อให้ระบบหรือทีมงานนำเสนอและประสานความช่วยเหลืออื่นๆสามารถนำข้อมูลเหล่านี้ไปใช้งานให้เกิดประโยชน์ต่อสังคมในวงกว้างขึ้นได้
                  </p> </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <img id="image-index" z-index="999" src="@/assets/img/bg-index-THagGetter.png" alt="">

    <!--
    <p>Hello World สวัสดีค่ะ {{ api_url }} {{text}} </p> -->
  </div>

</template>

<script>

import axios from 'axios';
import facebookLogin from 'facebook-login-vuejs'
import Swal from 'sweetalert2';
import modal from "@/components/Modal.vue";
import moment from 'moment';

export default {
  components: {
    facebookLogin
  },
  mounted() {
    // console.log('Component mounted.')
    this.axios.get(process.env.VUE_APP_URL_API+'/helloworld', {
    }, { useCredentails: true })
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      currentObj.output = error;
    });

    this.isConnected =  window.$cookies.get('facebook-login')
  },
  data () {
    return {
      api_url: process.env.VUE_APP_URL_API,
      // text: process.env.NODE_ENV
      bgImage: 'assets/img/bg-index-THagGetter.png',
      backgroundUrl:require('@/assets/img/bg-index-THagGetter.png'),
      login_success:false,
      password : "",
      // email : "oat.boonnavasin@gmail.com",
      // password : "1234",
      remember_me : false,
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',  
      FB: undefined,
      user:{},

      modals3: {
        modal1: true,
      }

    }
  },
  methods: {
    gotoQuestion() {
      // console.log("clicked");
      this.$router.push('/userQuestion') ;
    },
    gotoRegister() {
      // console.log("clicked");
      this.$router.push('/register') ;
    },
    checkForm(){
      let textAlert = ""
      let hasAlert = false
      if(this.email == ""){
        textAlert = "กรุณากรอกอีเมลค่ะ"
        hasAlert = true
      }
      else if(this.password == ""){
        textAlert = "กรุงณากรอกพาสเวิร์ดค่ะ"
        hasAlert = true
      }

      if(hasAlert ==  true){
                Swal.fire({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วนค่ะ',
                            text: textAlert,
                            icon:'info'

                        })
            }else{
                this.login()
            }


    },
    async login() {
      var user = {
        email: this.email,
        password: this.password
      }
      let data = {
        user : user,
        login_via: 'common'
      }
      var remember_me = this.remember_me
      var login_success = false
      this.$cookies.set('test',"test");
      // console.log("cookie: "+this.$cookies.get("test") );
      // console.log("Email:"+this.email+"/n Password: "+this.password);
      await axios.post(process.env.VUE_APP_URL_API+'/login', data, { useCredentails: true })
      .then(function (response) {
        if(response.data.status == "success"){
          // initail user info
          var user = response.data
          // console.log("success");
          window.$cookies.set('user',user.data)
          login_success = true



          if(remember_me){
            // initail user info in session

          }

        }
        else if(response.data.status == "not found"){
          // console.log("incorrect email or password");
          Swal.fire({
            title: 'ไม่สามารถเข้าสู่ระบบได้ค่ะ',
            text: 'ชื่อผู้ใช้หรือพาสเวิร์ดไม่ถูกต้อง',
            icon:'info'

          })
        }
        // console.log(response.data)
        console.log("cookie: "+window.$cookies.get('user') );

      })
      .catch(function (error) {
        // console.log(error);
        // currentObj.output = error;
      });

      if(login_success){
        this.$router.push('/userQuestion')
      }
    },
    gotoRegisterPage(){
      this.$router.push('/register')
    },
    async getUserData() {
      await this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.picture = user.picture.data.url;
          // window.$cookies.set('user',user)
          this.user = {
            personalID :user.id,
            email :user.email,
            name :user.name,
            picture_url :user.picture.data.url

          }
          // console.log(user)
          // console.log("personalID: "+this.personalID)
          // console.log("email: "+this.email)
          // console.log("name: "+this.name)
          // console.log("picture: "+this.picture)
          this.loginViaFacebook()
          // this.gotoFirstPage()

        }
      )
      
      
    },
    async loginViaFacebook(){
      self  =  this
      let data = {
        login_via: "facebook",
        user: this.user
      }
      await axios.post(process.env.VUE_APP_URL_API+'/login', data, { useCredentails: false })
      .then(function (response) {
        // console.log("response");
        // console.log(response);

        if(response.data.status == "success"){
          // initail user info
          var user = response.data.data
          let user_temp  =  {
            _id: user._id,
            name : user.name,
            email : user.email,
            user_score: user.user_score,
            picture_url: user.picture_url,
            personalID: user.personalID
          }
          // console.log("user_temp");
          // console.log(user_temp);
          window.$cookies.set('user',user_temp)
          self.gotoFirstPage()
          this.login_success = true
          if(remember_me){
            // initail user info in session
          }

        }
        else if(response.data.status == "not found"){
          // console.log("incorrect email or password");
        }
        // console.log(response.data)
        // console.log("cookie: "+window.$cookies.get('user') );

      })
      .catch(function (error) {
        // console.log(error);
        // currentObj.output = error;
      });
      
    },
    sdkLoaded(payload) {
      // this.isConnected = payload.isConnected
      this.isConnected  = window.$cookies.get('facebook-login')
      // this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
        this.isConnected = true
        window.$cookies.set('facebook-login',true)
        this.getUserData()
    },
    onLogout() {
        this.isConnected = false;
    },
    gotoFirstPage(){
      this.$router.push('/userQuestion')
    },
    loginAsGust(){
      let self =  this;
      let genInt_now = moment().format('DDMMYYhmmss ')
      let  mock_user = {
        'personalID':"",
        'name': 'Guest'+genInt_now,
        'email': 'Guest'+genInt_now,
        'password': 'Guest'+genInt_now,
        'picture_url': "",
        'login_via': 'guest',
        'user_score': 0,
        'lasted_login' : moment().format('LLLL')

      }
      axios.post(process.env.VUE_APP_URL_API+'/register', {user:mock_user}).then(function(response){
          let returnData = response.data
          window.$cookies.set('user',returnData.data)
            
          Swal.fire({
              title: 'เข้าสู่ระบบแบบไม่ระบุตัวตน',
              text: 'ชื่อผู้ใช้ '+mock_user.name+' เข้าใช้ระบบได้เลยค่ะ',
              icon:'success'

          }).then((result) =>{
              
              self.gotoFirstPage()
          })
          // console.log(response.data)
      })
    }
  }
}
</script>

<style lang="scss">
#image-index{
  /* background-image: url("@/assets/img/index_background_img.jpg"); */
  width: 100%;
  min-width: calc(100vh*1.8);
  margin: auto;
  position: fixed;
  top:0;
  left:0;
  z-index: -1;
}

#start-index-button{
  position:fixed;
  top: 50%;
  left:20%;
  width: 15%;
  height: 10%;
  font-size: 30px;

}


.purpose-content{
  text-align: left;
  margin: 20px 20px;
}

.header-purpose-alert-index{
  font-size: 1.5em;
  color: white;

}

.content-purpose-alert-index{
  background-color: #FEFAE3;
  padding: 30px;
  color: black;
  font-size: 1em;
}

button.guest-login{
  margin-top:10px;
  width: 100%;
  /* background-color: white; */
  /* color: gray; */
  border-radius: 20px;
  /* border: solid 1px gray; */
}

button.haft-btn{
  width: 48%;
  border-radius: 20px;
}

.facebook-button {
  button{
    width: 100%;
    border-radius: 25px;
    padding: 6px !important;
  }
  
}

.facebook-button{
  padding:0 !important;
  img{
    float: left !important;
    top: 3px;
    left: 10px;
    width: 25px !important;
    margin-top: 6px;
    margin-left: 20px;

  }

}
.facebook-button{
  .spinner {
  // box-sizing: border-box;
  width: 25px !important;
  height: 25px !important;
  margin-top: 6px;
  margin-left: 20px;

  }

}


</style>
