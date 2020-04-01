<template>
  <div>
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
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
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
                                <!-- <facebook-login  class="button"
                                  appId="194868541732995"
                                  @login="onLogin"
                                  @logout="onLogout"
                                  @get-initial-status="getUserData"
                                  @sdk-loaded="sdkLoaded">
                                </facebook-login> -->
                                
                                
                                
                                <!-- <base-button style="margin:10px 0;" type="neutral">
                                    <img slot="icon" src="@/assets/img/facebook-icon.png">
                                    Facebook
                                </base-button>  -->
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
                                <base-checkbox v-model="remember_me">
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button @click="checkForm" type="primary" class="my-4">ลงชื่อเข้าใช้</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <!-- <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a> -->
                        </div>
                        <div class="col-6 text-right">
                            <a @click="gotoRegisterPage" class="text-light pointer">
                                <small>สร้างบัญชีผู้ใช้ใหม่</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        
         


        </div>
    </section>





  </div>
</template>
<script>

import axios from 'axios';
import facebookLogin from 'facebook-login-vuejs'
import Swal from 'sweetalert2';
import modal from "@/components/Modal.vue";



export default {
  components: {
    modal
  },
  data (){
    return {
      // email : "",
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
  components: {
    facebookLogin
  },
  mounted(){
    this.showPropose()
  },
  methods: {
    showPropose(){
      Swal.fire({
        html:
          '<div class="purpose-content"><h6 class="header-purpose-alert"><b>วัตถุประสงค์ของระบบ</b></<h6>'+
          '<p> </p><p class="content-purpose-alert"> <span style="margin-left: 30px;"></span>'+
          'แอปพลิเคชัน COVID-19 THagGetter ทำขึ้นเพื่อรวบรวมและจัดระเบียบข้อมูลเกี่ยวกับการร้องขอ, การเสนอ และการแจ้งให้ความช่วยเหลือผ่านสื่อสังคมออนไลน์ต่างๆ เช่น Twitter, Facebook และ Instagram โดยให้อาสาสมัครช่วยแยกรายละเอียดจากโพสต์ข้อความและรูปภาพ เพื่อให้ระบบหรือทีมงานนำเสนอและประสานความช่วยเหลืออื่นๆสามารถนำข้อมูลเหล่านี้ไปใช้งานให้เกิดประโยชน์ต่อสังคมในวงกว้างขึ้นได้ '+
          '</p> </div>'
     })
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
      console.log("cookie: "+this.$cookies.get("test") );
      // console.log("Email:"+this.email+"/n Password: "+this.password);
      await axios.post(process.env.VUE_APP_URL_API+'/login', data, { useCredentails: true })
      .then(function (response) {
        if(response.data.status == "success"){
          // initail user info
          var user = response.data
          console.log("success");
          window.$cookies.set('user',user.data)
          login_success = true



          if(remember_me){
            // initail user info in session

          }

        }
        else if(response.data.status == "not found"){
          console.log("incorrect email or password");
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
        console.log(error);
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
          console.log(user)
          console.log("personalID: "+this.personalID)
          console.log("email: "+this.email)
          console.log("name: "+this.name)
          console.log("picture: "+this.picture)
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
        console.log("response");
        console.log(response);

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
          console.log("user_temp");
          console.log(user_temp);
          window.$cookies.set('user',user_temp)
          self.gotoFirstPage()
          this.login_success = true
          if(remember_me){
            // initail user info in session
          }

        }
        else if(response.data.status == "not found"){
          console.log("incorrect email or password");
        }
        // console.log(response.data)
        console.log("cookie: "+window.$cookies.get('user') );

      })
      .catch(function (error) {
        console.log(error);
        // currentObj.output = error;
      });
      
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
        this.isConnected = true
        this.getUserData()
    },
    onLogout() {
        this.isConnected = false;
    },
    gotoFirstPage(){
      this.$router.push('/userQuestion')
    }

  }
};
</script>
<style scope>

.pointer 
{cursor: pointer;}

.purpose-content{
  text-align: left;
  margin: 20px 20px;
}

.header-purpose-alert{
  font-size: 1.1em;

}

.content-purpose-alert{
  background-color: #FEFAE3;
  padding: 20px;
  color: black;
  font-size: 0.7em;
}

</style>
