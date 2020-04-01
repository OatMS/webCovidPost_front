<template>
    <section class="section section-shaped section-lg my-0">
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
                        <!-- <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template> -->
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h4>COVID-19 THagGetter</h4> 
                                สร้างบัญชีจิดอาสา
                                <!-- <small>ข้อมูลเพื่อรับรางวัลจ้า</small> -->
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="ชื่อที่แสดงในระบบ"
                                            v-model="user.name"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <!-- <base-input alternative
                                            class="mb-3"
                                            placeholder="เบอร์โทรศัพท์"
                                            type="number"
                                            v-model="user.tel"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input> -->
                                <base-input alternative
                                            class="mb-3"
                                            v-model="user.email"
                                            type="email"
                                            placeholder="อีเมล์ (ใช้ในการล็อคอิน)"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            v-model="user.password"
                                            placeholder="รหัสผ่าน"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            v-model="user.repassword"
                                            placeholder="รหัสผ่านอีกครั้ง"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-muted font-italic">
                                    <!-- <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small> -->
                                </div>
                                <!-- <base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox> -->
                                <div class="text-center">
                                    <base-button @click="gotoLoginPage" type="neutral" class="my-4">สร้างบัญชีใหม่</base-button>
                                    <base-button @click.stop="checkVerifyForm" type="primary" class="my-4">สร้างบัญชีผู้ใช้</base-button>
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
                            
                            <!-- <a @click="gotoLoginPage" class="text-light pointer">
                                <small>Login</small>
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>
<script>

import axios from 'axios';
import Swal from 'sweetalert2'



export default {
    data(){
        return{
            user:{
                name:"",
                email:"",
                tel:"",
                password:"",
                repassword:"",
                login_via:'common'
            }
        }
    },
    methods:{
        async  checkEmail(){

            await this.axios.post(process.env.VUE_APP_URL_API+'/checkEmail', {email:this.user.email
            }, { useCredentails: true })
            .then(function (response) {

                console.log(response.data)
                let data = response.data
                if(data.status == "can use this email"){
                    console.log("Can use this email")
                    return true
                }else if(data.status == "email already exist"){
                    console.log("Email is  already  exist")
                    return false
                }
                // var result = response.data
                // self.user_score = result.data
                // this.tweet = response.data
            })
            .catch(function (error) {
                console.log(error);
                // currentObj.output = error;
            });
        },
        async submitRegister(){
            let canRegister = await this.checkEmail()
            
            if(canRegister){
                console.log("register  with")
                console.log(this.user)
                await this.axios.post(process.env.VUE_APP_URL_API+'/register', {user:this.user}).then(function(response){
                    let returnData = response.data
                    console.log(response.data)
                })
            }else{
                // modal alert
            }
            
        },
        gotoLoginPage(){
            this.$router.push('/login')
            this.$router.go(process.env.VUE_APP_URL_API+'/login')
        },
        validateEmail(mail){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
                return (true)
            }
                
            return (false)
        },
        checkVerifyForm(){
            let textAlert = ""
            let isHasAlert =  false
            if(this.user.name == ''){
                textAlert  = 'กรุณากรอกชื่อในช่องค่ะ'
                isHasAlert =  true
            }
            else if(this.user.name.length < 6){
                textAlert  = 'ชื่อต้องมากกว่า 6 ตัวอักษรค่ะ'
                isHasAlert =  true
            }
            else if(this.user.name.length > 20){
                textAlert  = 'ชื่อห้ามเกิน 20 ตัวอักษรค่ะ'
                isHasAlert =  true
            }
            else if(!this.validateEmail(this.user.email)){
                textAlert  = 'กรุณากรอกอีเมล์ให้ถูกต้องค่ะ'
                isHasAlert =  true
            }
            // else if(this.user.tel.length == 10){
            //     textAlert  = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้องค่ะ'
            //     isHasAlert =  true
            // }
            else if(this.user.password.length < 6){
                textAlert  = 'พาสเวิร์ดต้องมากกว่า 6 ตัวอักษรค่ะ'
                isHasAlert =  true
            }
            else if(this.user.password !== this.user.repassword){
                textAlert  = 'พาสเวิร์ดทั้งสองไม่ตรงกันค่ะ'
                isHasAlert =  true
            }
            else if(this.user.password.length >50){
                textAlert  = 'พาสเวิร์ดห้ามเกิน 50 ตัวอักษรค่ะ'
                isHasAlert =  true
            }

            if(isHasAlert ==  true){
                Swal.fire({
                            title: 'ข้อมูลไม่ครบถ้วนค่ะ',
                            text: textAlert,
                            icon:'info'

                        })
            }else{
                this.checkAndSubmit()
            }
        },
        async  checkAndSubmit(){
            self = this

            await axios.post(process.env.VUE_APP_URL_API+'/checkEmail', {email:this.user.email
            }, { useCredentails: true })
            .then(function (response) {

                console.log(response.data)
                let data = response.data
                if(data.status == "can use this email"){
                    axios.post(process.env.VUE_APP_URL_API+'/register', {user:self.user}).then(function(response){
                        let returnData = response.data
                        window.$cookies.set('user',returnData.data)
                         
                        Swal.fire({
                            title: 'ลงทะเบียนสำเร็จ',
                            text: 'ชื่อผู้ใช้ '+self.user.name+' ลงทะเบียนเรียบร้อยแล้วค่ะ',
                            icon:'success'

                        }).then((result) =>{
                            
                            self.gotoFirstPage()
                        })
                        console.log(response.data)
                    })
                }else if(data.status == "email already exist"){
                    Swal.fire({
                            title: 'Email Already Exsit',
                            text: 'This email has already used ',
                            icon:'info'
                        })
                    console.log("Email is  already  exist")
                    // return false
                }
                // var result = response.data
                // self.user_score = result.data
                // this.tweet = response.data
            })
            .catch(function (error) {
                console.log(error);
                // currentObj.output = error;
            });
        },
        gotoFirstPage(){
            this.$router.push('/userQuestion')
            
        }
    }
};
</script>
<style>
</style>
