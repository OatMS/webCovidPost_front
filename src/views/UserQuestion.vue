<template lang="html">
<div>
  <!-- <instruction v-show="showInstruction" z-index="1" class="instruction-slide">

  </instruction> -->
  <div @click.stop="showInstruction=false;closeContextMenu()" class="container-body" >

    <ScoreBoard ref="scoreBoard" v-bind:class="{'blur':showInstruction} " @click.stop="showInstruction=false;closeContextMenu()"></ScoreBoard>
    <div class="header-bar" v-bind:class="{'blur':showInstruction}">
      <div class="score cชol-sm-3">
        <h6 style="float:left; color:white" class=""><b>Score:</b>  </h6><div class="span-score"> <span > {{user_score}}</span></div>
      </div>

      <div style="text-align:right; padding-right:40px;" class="user-info col-sm-6">
        <h7 style="" class=""><b>{{user.name.substring(0, 15)}}</b>  </h7> 
        <img src="@/assets/img/user-icon.png" class="user-icon" alt="">
        <button @click.stop="logout" type="button" class="btn btn-primary btn-sm btn-neutral logout-btn">Logout</button>

      </div>


    </div>
    <div class="user-question">


      <div class="question-header" v-bind:class="{'blur':showInstruction}" @click.stop="showInstruction=false;closeContextMenu()" >
        <div class="instruction" >
          <img  v-show="false"   data-toggle="Tutorail" @click.stop="showInstruction=true;closeContextMenu()" src="@/assets/img/help-icon.jpg" class="help-icon pointer">
          <h4 style=""><b> ข้อความจาก {{post.text_type}}</b></h4>
          <p class="first-instruction">
            <span class="question-number"><b>1</b></span>
            กรุณาระบุประเภทของข้อความที่ตัวเลือกด้านล่าง และเลือกคำหรือกลุ่มคำที่บอกข้อมูล ชื่อบุคคล/หน่วยงาน, ช่องทางติดต่อ, สิ่งที่ขอ/แจ้งให้/เสนอความช่วยเหลือ
            <span style="color: #10A64A;">(คลิกลูกศร &gt; เพื่อไปข้อถัดไป)</span>
          </p>
        </div>

        <div class="post-ans-arrow">
          <div  class="arrow-left">
            <a><img v-show="answer_history.length!== 0 && answer_current >  0" @click="clickBack" src="@/assets/img/back-icon.png" class="arrow-icon pointer" alt="กลับไปก่อนหน้า"></a>
          </div>
          <div
              tabindex="0"
              id="tweettext"
              style="">
              <div class="twitter-col-icon" style="width:10%; float:left; text-align: right;">
                <img v-if="post.text_type == 'Twitter'" src="@/assets/img/twitter-icon.png" style="width:50px" alt="">
                <img v-else-if="post.text_type == 'Facebook'" src="@/assets/img/facebook-icon.png" style="width:50px" alt="">
                <img v-else-if="post.text_type == 'Instargram'" src="@/assets/img/ig-icon.png" style="width:50px" alt="">
              </div>

              <div @click.start="$refs.contextMenu.close()"
                  @click.stop=" detectTextHightlighted($event,{'type':'post'})"
                  style="width:85%; float:left; margin-left:20px;">
                <h6><b>{{post.text_type}}</b></h6>
                <!-- <p>ขอรับบริจาครพ.ทุ่งยางแดง จ.ปัตตานีด้วยน่ะคร้าmask N95 ชุดPPE Mask surgical เราขาดมากๆๆเลยคร้า คนไข้เสี่ยงงกลับจากมาเลเซียเยอะมากคร้าช่วยพวกเราด้วยน่ะคร้าเราลำบากมากคร้าmaskต้องเย็บเอง faceshielต้องทำเอง. ผู้รับผิดชอบนางสาวนาดียะห์ ดอเลาะ แผนกห้องคลอด 0936482284. @naphat_nine 🙏🙏😭😭😭</p> -->
                <p>{{ post_text }}</p>



              </div>
              <div style="clear:both">

              </div>
          </div>
          <div class="arrow-right">
            <a><img @click="clickNext" src="@/assets/img/next-icon.png" class="arrow-icon pointer" alt="ข้อต่อไป..."></a>
          
          </div>
          <div style="clear:both"></div>
        </div>

        <div style="clear:both"></div>
        <!-- <a v-show="true" @click="submitAndNext(false)" class="btn btn-link text-warning" style="margin-right:120px;margin-top:10px;"></a> -->
      </div>




      <!-- ---------------------------------------------------------------------------------------------- -->
      <!-- -----------------------------------answer.purpose_message------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->
      <div class="answer-section">
        <div  class="arrow-left"></div>
          <div  class="location-list-new">
            <div class="col-lg-6 col-sm-6 mt-6 mt-md-0"><div class="mb-3"><small class="text-uppercase font-weight-bold">เลือกประเภทของข้อความ</small></div>
            
            <div class="custom-control custom-radio purpose-message-radio">
              <input id="zRNNANl" type="radio" class="custom-control-input " value="Request" v-model="ans.purpose_message">
              <label for="zRNNANl" class="custom-control-label">
                    ขอความช่วยเหลือ/บริจาค (Request)
              </label>
            </div>

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP" type="radio" class="custom-control-input" value="Response" v-model="ans.purpose_message">
              <label for="GSXZIQP" class="custom-control-label">
                    แจ้งให้ความช่วยเหลือ/บริจาค (Response)
              </label>
            </div>
                

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP1" type="radio" class="custom-control-input" value="Service" v-model="ans.purpose_message">
              <label for="GSXZIQP1" class="custom-control-label">
                    เสนอความช่วยเหลือ/บริจาค (Service)
              </label>
            </div>

            <!-- <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP3" type="radio" class="custom-control-input" value="not_relate" v-model="ans.purpose_message">
              <label for="GSXZIQP3" class="custom-control-label">
                    ไม่เกี่ยวข้อง
              </label>
            </div> -->
                

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP2" type="radio" class="custom-control-input" value="etc" v-model="ans.purpose_message">
              <label for="GSXZIQP2" class="custom-control-label">
                    อื่นๆ
              </label>
            </div>
                
            
          </div>
        </div>
      </div>

      <div style="clear:both"></div>


      <!-- ---------------------------------------------------------------------------------------------- -->
      <!-- --------------------------------answer.organize_name---------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->


      <div v-show="ans.organize_name.length >0" class="answer-section">
        <div  class="arrow-left"></div>
        <div  class="location-list-new">
          <div class="second-instruction">
             <img class="location-icon float-left phase-img"  src="@/assets/img/organization-icon.png" alt="">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              ชื่อบุคคล/หน่วยงาน
              <span @click.stop="ans.organize_name = []" class="float-right clear-location-all pointer">ลบทั้งหมด</span>
              </p>
            </u></b>
          </div>

          <div v-for=" (organize_name,index) in ans.organize_name" class="location-stoke-select pointer "
              @mouseover="hoverLocationIndex=index;hoverAttr='organize_name'"
              @mouseleave="hoverLocationIndex=null;hoverAttr=null"
              
          >
          <div class="location-new" >
            <!-- <img class="location-icon float-left phase-img" v-if="location.location_type=='Point'" src="@/assets/img/location-marker.png" alt=""> -->
            <p class="p-location"> {{organize_name.obj_text}} 
              <span v-show="hoverLocationIndex==index&&hoverAttr=='organize_name'" style="font-size: 1em; color: red; margin-left:10px; float:right;">
                  <i @click.stop="removeLocation('organize_name',index)" class='delete-location-element fa fa-minus-circle'></i>
              </span>
            </p>
          </div>
          </div>
          <div  class="arrow-right"></div>
          <div class="location-link-new">

          </div>
        </div>
      </div>

      <div style="clear:both"></div>

      <!-- ---------------------------------------------------------------------------------------------- -->
      <!-- --------------------------------answer.contact_address---------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->


      <div v-show="ans.contact_address.length >0" class="answer-section">
        <div  class="arrow-left"></div>
        <div  class="location-list-new">
          <div class="second-instruction">
             <img class="location-icon float-left phase-img"  src="@/assets/img/contact-icon.png" alt="">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              ช่องทางติดต่อ
              <span @click.stop="ans.contact_address = []" class="float-right clear-location-all pointer">ลบทั้งหมด</span>
              </p>
            </u></b>
          </div>

          <div v-for=" (contact_address,index) in ans.contact_address" class="location-stoke-select pointer "
              @mouseover="hoverLocationIndex=index;hoverAttr='contact_address'"
              @mouseleave="hoverLocationIndex=null;hoverAttr=null"
              
          >
          <div class="location-new" >
            <!-- <img class="location-icon float-left phase-img" v-if="location.location_type=='Point'" src="@/assets/img/location-marker.png" alt="">
            <img class="location-icon float-left phase-img" v-else-if="location.location_type=='From'" src="@/assets/img/from-icon.png" alt="">
            <img class="location-icon float-left phase-img" v-else-if="location.location_type=='To'" src="@/assets/img/to-icon.png" alt="">
            <img class="location-icon float-left phase-img" v-else-if="location.location_type=='Area'" src="@/assets/img/area-icon.png" alt=""> -->
            <p class="p-location"> {{contact_address.obj_text}} 
              <span v-show="hoverLocationIndex==index&&hoverAttr=='contact_address'" style="font-size: 1em; color: red; margin-left:10px; float:right;">
                  <i @click.stop="removeLocation('contact_address',index)" class='delete-location-element fa fa-minus-circle'></i>
              </span>
            </p>
          </div>
          </div>
          <div  class="arrow-right"></div>
          <div class="location-link-new">

          </div>
        </div>
      </div>
      
      <div style="clear:both"></div>


      <!-- ---------------------------------------------------------------------------------------------- -->
      <!-- ---------------------------answer.items-------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->


      <div v-show="ans.items.length >0" class="answer-section">
        <div  class="arrow-left"></div>
        <div  class="location-list-new">
          <div class="second-instruction">
            <!-- <span class="question-number">2</span> -->
            <img class="location-icon float-left phase-img"  src="@/assets/img/item-icon.png" alt="">
            <b><u>
              <p class="second-instruction">
              สิ่งที่ขอ/แจ้งให้/เสนอความช่วยเหลือ
              <span @click.stop="ans.items = []" class="float-right clear-location-all pointer">ลบทั้งหมด</span>
              </p>
            </u></b>
          </div>

          <div v-for=" (item,index) in ans.items" class="location-stoke-select pointer "
              @mouseover="hoverLocationIndex=index;hoverAttr='items'"
              @mouseleave="hoverLocationIndex=null;hoverAttr=null"
              
          >
          <div class="location-new" >
             <!-- <img class="location-icon float-left phase-img"  src="@/assets/img/item.png" alt=""> -->
            <p class="p-location"> {{item.obj_text}} 
              <span v-show="hoverLocationIndex==index&&hoverAttr=='items'" style="font-size: 1em; color: red; margin-left:10px; float:right;">
                  <i @click.stop="removeLocation('items',index)" class='delete-location-element fa fa-minus-circle'></i>
              </span>
            </p>
          <span class="badge">{{item.number_request}}</span>
          </div>
          
          </div>
          <div  class="arrow-right"></div>
          <div class="location-link-new">

          </div>
        </div>
      </div>


      <!-- ------------------------------------ grap footter ---------------------------------------------- -->
      <div class="footer"></div>


      <!-- modal  ask user to back without save -->

      <modal :show.sync="modals.modal1">
          <h6 slot="header" class="modal-title" id="modal-title-default">คำตอบยังไม่ได้บันทึก</h6>
          <p>ต้องการบันทึกคำตอนข้อนี้ ก่อนกลับไปแก้ไขข้อที่แล้วหรือไม่?</p>
          <template slot="footer">
              <base-button @click="modalSaveBeforeBack(true)" type="primary">บันทึก</base-button>
              <base-button @click="modalSaveBeforeBack(false)" type="link" class="ml-auto" >ไม่ต้องการ
              </base-button>
          </template>
      </modal>

      <modal :show.sync="modals2.modal1">
          <h6 slot="header" class="modal-title" id="modal-title-default">ไม่สามารถกลับไปข้อก่อนหน้าได้</h6>
          <p>กรุณาเลือกประเภทของขอความก่อนบันทึก</p>
          <template slot="footer">
              <base-button @click="modals2.modal1 = false" type="primary">กลับไปแก้ไข</base-button>
              <base-button @click="modalSaveBeforeBack(false);modals2.modal1 = false" type="link" class="ml-auto" >ละทิ้งข้อนี้
              </base-button>
          </template>
      </modal>

      <modal :show.sync="modals3.modal1">
          <h6 slot="header" class="modal-title" id="modal-title-default">คุณยังไม่ได้เลือกประเภทของข้อความ</h6>
          <p>ต้องการทำข้อนี้ให้เสร็จหรือไม่...?</p>
          <template slot="footer">
              <base-button @click="modals3.modal1 = false" type="primary">กลับไปแก้ไข</base-button>
              <base-button @click="setupNextTweet();modals3.modal1 = false" type="link" class="ml-auto" >ละทิ้งข้อนี้
              </base-button>
          </template>
      </modal>
      

    </div>

    <ContextMenu ref="contextMenu">
      <template slot-scope="{ contextData }">
        <!-- <ContextMenuItem v-for="menu in contextData " @click.native="appendByContextMenu(menu['type'])"> <img class='contextIcon' :src="menu['src'] ">  {{ menu.text }} </ContextMenuItem> -->
        <ContextMenuItem v-for="menu in contextData " @click.native="appendByContextMenu(menu['type'])"> <img class='contextIcon' :src="getImgUrl(menu['src'])">  {{ menu.text }} </ContextMenuItem>
        <!-- <ContextMenuItem @click.native="appendByContextMenu('Point')"> <img class='contextIcon' src="@/assets/img/location-marker.png">  Point </ContextMenuItem>
        <ContextMenuItem @click.native="appendByContextMenu('Area')"> <img class='contextIcon' src="@/assets/img/area-icon.png"> Area</ContextMenuItem> -->
        <!-- <ContextMenuItem @click.native="appendByContextMenu('Link')"><img class='contextIcon' src="@/assets/img/path-icon.png"> Link</ContextMenuItem> -->
      </template>
    </ContextMenu>

  </div>
  <transition name="fade">
    <div v-show="isAlertSuccess" id="alertsuccess" ref="alertsuccess" role="alert" class="alert alert-success alert-dismissible">
      <span class="alert-inner--icon">
        <i class="ni ni-like-2"></i>
        </span>
        <span class="alert-inner--text">
          <span><strong>บันทึกสำเร็จ! </strong> คำตอบถูกบันถึงแล้ว</span>
      </span>
          <button type="button" data-dismiss="alert" aria-label="Close" class="close">
          </button>
    </div>
  </transition>

</transition>



</div>
</template>

<script>

import ContextMenu from "./ContextMenu/ContextMenu";
import ContextMenuItem from "./ContextMenu/ContextMenuItem";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import Modal from "@/components/Modal.vue";
import Instruction from "./Instruction/Instruction.vue";
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  components: {
    ContextMenu,
    ContextMenuItem,
    Modal,
    ScoreBoard,
    Instruction
  },
  data (){
    return {
      user:{},
      showInstruction:false,
      isEditMode: false,
      editAnswer_id:"",
      user_score:0,
      answer_history:[],
      answer_count:0,
      answer_current:0,
      post_text:{},
      post:{},
      post_id:"",
      nowHightlighted:"",
      nowHightlighted_start:null,
      nowHightlighted_end:null,
      phaseList:[],
      ans: {
        // 'contact_name':[],
        'contact_address': [], //ที่อยู่
        'organize_name':[], //หน่วยงานที่ขอรับบริจาค
        'purpose_message':"", //จุดประสงค์ของข้อความ 'ร้องขอความช่วยเหลือ' หรือ 'เสนอความช่วยเหลือ'
        // 'requester_or_helper':[], //ชื่อคนขอความช่วยเหลือ หรือ ชื่อคนเสนอตวามช่วยเหลือ
        'items':[] //สิ่งของที่ร้อขอ หรือเสนอ
      },
      dupplicate: false,
      context_purpose:"", //['request','offer','none']

      // for remove focus
      hoverPhase: false,
      hoverLocation: false,
      hoverPhaseIndex: null,
      hoverLocationIndex: null,
      hoverAttr:null,

      viewMenu: false,
      top: '0px',
      left: '0px',
      chooseContext:false,
      isChooseContextOnTweet: null,
      highlightOnPhaseId: null,
      modals: {
        modal1: false,
      },
      modals2: {
        modal1: false,
      },
      modals3: {
        modal1: false,
      },
      payloadContextMenuTweet:[
        // {
        //   "text" : "ชื่อผู้ขอความช่วยเหลือ",
        //   "type": "contact_name",
        //   "src": "location-marker.png"
        // },
        {
          "text" : "ชื่อบุคคล/หน่วยงาน",
          "type": "organize_name",
          "src": "organization-icon.png"
        },
        {
          "text" : "ช่องทางติดต่อ",
          "type": "contact_address",
          "src": "contact-icon.png"
        },
        {
          "text" : "สิ่งของ",
          "type": "items",
          "src": "item-icon.png"
        }
      ],
      canNext: false,
      hasChange:  false,
      isAlertSuccess: false

    }
  },
  created: function () {


  },
  mounted(){
    var result = {}

    var init = async ()=> {
      await this.axios.get(process.env.VUE_APP_URL_API+'/nextTweet', {
      }, { useCredentails: true })
      .then(function (response) {

        console.log(response.data)
        result = response.data
        // this.tweet = response.data
      })
      .catch(function (error) {
        console.log(error);
        // currentObj.output = error;
      });
      this.post_text = result['post_text']
      this.post = result
      this.post_id = result._id
      this.user = $cookies.get("user")
      console.log(this.user)
      this.user_score = this.user.user_score
      // console.log(this.tweet_text)
      console.log(this.post)
    }
    init()
    this.updateUserScore()
    // this.payloadContextMenuTweet = ;

  },
  methods: {

    // ----- get hightlight text ----------
    closeContextMenu(){
      this.$refs.contextMenu.close();
    },
    detectTextHightlighted(event,objHightlight) {

      // console.log("window.getSelection().getRangeAt(0)")
      // console.log(window.getSelection().getRangeAt(0))
      if(this.chooseContext){
        // console.log("selected context menu");
        this.$refs.contextMenu.close();
        this.chooseContext = false
        this.isChooseContextOnTweet = null
        this.highlightOnPhaseId = null
      }
      else{
        console.log("Just highlight text");
        this.nowHightlighted = window.getSelection().toString()
        this.nowHightlighted_start = window.getSelection().getRangeAt(0).startOffset
        this.nowHightlighted_end = window.getSelection().getRangeAt(0).endOffset 
        console.log("nowHightlighted: "+this.nowHightlighted);
        console.log("nowHightlighted_start: "+this.nowHightlighted_start);
        console.log("nowHightlighted_end: "+this.nowHightlighted_end);

        this.dupplicate = false
        // hightlight in tweet
        if(objHightlight['type'] == "post"){
          if(this.nowHightlighted !== "" && this.dupplicate == false){
            this.$refs.contextMenu.open(event, this.payloadContextMenuTweet)
            this.chooseContext  = false
            this.isChooseContextOnTweet = true
            this.highlightOnPhaseId =  null
            // console.log("context show in tweet");
          }

        }
        // else if(objHightlight['type'] == "phase"){
        //   if(this.nowHightlighted !== "" && this.dupplicate == false){
        //     this.$refs.contextMenu.open(event, this.payloadContextMenuPhase)
        //     this.highlightOnPhaseId = objHightlight['phaseIdx']
        //     this.isChooseContextOnTweet = false
        //     this.chooseContext  = false
        //     // console.log("context show in phase id :"+this.highlightOnPhaseId);
        //   }
        // }
      }


    },
    appendByContextMenu(text_type){ 
      this.chooseContext = true
      this.hasChange = true

      // console.log(this.dupplicate);
      if(this.isChooseContextOnTweet){
        if(this.nowHightlighted!=="" && !this.dupplicate){
          // if(location_type === "Area"||location_type === "Point"||location_type === "From"||location_type === "To"){
          //   let  data = {
          //     'location_text':this.nowHightlighted,
          //     'location_type': location_type,
          //     'is_main_location':false
          //     // 'location_link_index':Number
          //   }
          //   this.ans.push(data)
          //   this.dupplicate = true
          //   console.log("appendPhase press Area");
          // }

          console.log("text_type is: "+text_type)
          console.log(this.ans)

          // if(text_type=="contact_name"){
          //   this.ans.contact_name.push(this.nowHightlighted)
          // }
          let temp_item = {
            obj_text: this.nowHightlighted,
            start_position: this.nowHightlighted_start,
            end_position: this.nowHightlighted_end,

          }

          if(text_type=="contact_address"){
            this.ans.contact_address.push(temp_item)
          }
          else if(text_type=="organize_name"){
            this.ans.organize_name.push(temp_item)
          }
          else if(text_type=="items"){
            Swal.fire({
                title: "ใส่จำนวนของ",
                text: ""+this.nowHightlighted,
                input: 'number',
                inputPlaceholder: "จำนวน",
                showCancelButton: true        
            }).then((result) => {
              console.log("result.value: "+result.value)
                if (result.value) {
                    this.appendItem(temp_item,result.value)
                    console.log("Result: " + result.value);
                }else if(result.value==""){
                  this.appendItem(temp_item, 0)
                }
            });
            
          }
          
        }
        // console.log("Choose context in tweet");
        
      }

      this.$refs.contextMenu.close();
      this.chooseContext = false
      this.isChooseContextOnTweet = null
      this.highlightOnPhaseId = null
      
    },
    appendItem(temp_item,number_request){
      if(number_request >0){ 
        temp_item.number_request = number_request
        this.ans.items.push(temp_item)
      }
      else{
        temp_item.number_request = null
        this.ans.items.push(temp_item)
      }
      
    },
    appendLocation(phaseIndex){
      if(this.locationList!=="" && !this.dupplicate){
        this.phaseList[phaseIndex].locations.push(this.nowHightlighted)
        this.dupplicate = true
      }
    },
    async removeLocation(hoverAttr,locationIndex){
      console.log("Before remove")
      console.log(this.ans)
      
      this.ans[''+hoverAttr].splice(locationIndex,1)
      this.hasChange = true

      console.log("After remove")
      console.log(this.ans)
    },
    getImgUrl(img) {
      return require("@/assets/img/"+img)
      // return require(img)
    },
    classLocation (type) {
      return  {
        'location':  true,
        'point': type == 'Point' ,
        'area': type == 'Area' ,
        'from': type == 'From' ,
        'to': type == 'To'
      }
    },
    async submit(hasLocation){
      this.canNext  = false
      var uri = ""
      var self = this;
      var allLocation = []
      // this.ans.forEach(l => {
      //   allLocation.push(l.location_text)
      // })

      console.log(allLocation);
      var data = {}

      if(hasLocation){
        data = {
          post_id: this.post._id,
          post_text: this.post_text,
          post_date: this.post.post_date,
          ans: this.ans,
          ans_from_account_id:this.$cookies.get('user')._id,
          ans_from_account: this.$cookies.get('user').name,
          all_locations: allLocation,
          ans_datetime : "",
          score:1
          // score:allLocation.length*10
        }
      }else{
        data = {
        post_id: this.post._id,
        post_text: this.post_text,
        post_date: this.post.post_date,
        ans:this.ans,
        all_locations: [],
        ans_from_account: this.$cookies.get('user').name,
        all_locations: [],
        ans_datetime : ""
      }
      }

      
      console.log("data post: ");
      console.log(data);

      if(this.isEditMode){
        // data._id = this.answer_history[this.answer_current]._id
        uri = process.env.VUE_APP_URL_API+"/editAnswer"
        data._id = this.editAnswer_id
        this.answer_history[self.answer_current].ans = this.ans
      }else {
        uri = process.env.VUE_APP_URL_API+"/submitAndNext"
      }
      // console.log(data);
      console.log("is  Edit mode: "+self.isEditMode);

      // console.log(JSON.stringify(data))
      var isEditMode_temp = true && this.isEditMode


      if(isEditMode_temp){
          // console.log("sunmit in edit mode")
          self.isEditMode = false
          self.answer_current = self.answer_count
        }else{
          self.answer_count += 1
          self.answer_current = self.answer_count
          // self.answer_history.push(response.data.result)
        }

      var answer = await this.axios.post(uri, data , { useCredentails: true })
      .then(function (response) {
        console.log("submit result: "+JSON.stringify(response.data))
        if(!isEditMode_temp){
          self.answer_history.push(response.data.result)
        }
        self.$refs.scoreBoard.updateScore();
        self.updateUserScore()
        self.isAlertSuccess = true
        self.fadeOutAlert()
        

      })
      .catch(function (error) {
        console.log(error);
        // currentObj.output = error;
      });


      this.isEditMode = false
      this.hasChange =  false
      
      // this.userScore += 10
      // this.userScore += allLocation.length*10




      console.log("answer_history is: ");
      console.log(this.answer_history);
      console.log("answer in  "+this.answer_current+"/"+this.answer_history.length);
      console.log("answer count: "+this.answer_count);

    },
    setupNextTweet(){
      var result = {}
      var init = async ()=> {
        await this.axios.get(process.env.VUE_APP_URL_API+'/nextTweet', {
        }, { useCredentails: true })
        .then(function (response) {

          // console.log(response.data)
          result = response.data
          // this.tweet = response.data
        })
        .catch(function (error) {
          console.log(error);
          // currentObj.output = error;
        });
        this.post_text = result['post_text']
        this.post = result
        // console.log(this.tweet_text)
      }
      console.log("setup  next post")
      init()
      this.ans={
        // 'contact_name':[],
        'contact_address': [], //ที่อยู่
        'organize_name':[], //หน่วยงานที่ขอรับบริจาค
        'purpose_message':"", //จุดประสงค์ของข้อความ 'ร้องขอความช่วยเหลือ' หรือ 'เสนอความช่วยเหลือ'
        'requester_or_helper':[], //ชื่อคนขอความช่วยเหลือ หรือ ชื่อคนเสนอตวามช่วยเหลือ
        'items':[] //สิ่งของที่ร้อขอ หรือเสนอ
      }
    },
    submitAndNext(hasLocation){
      this.submit(hasLocation)
      this.setupNextTweet()
    },
    clickNext(){
      if(this.checkComplete()){
        console.log("Can next")
        this.submitAndNext(true)
      }else{
        console.log("Can not next")
        
        this.modals3.modal1 = true
      }
    },
    clickBack(){
      console.log("Click back");
      if(  (!this.checkLengthAllAttr() && !this.isEditMode ) ||  (this.isEditMode && !this.hasChange)){
        this.isEditMode = true
        this.backToPrevious()
      }else{
        this.modals.modal1 = true
      }
    },
    checkLengthAllAttr(){
      if(( this.ans.contact_address.length == 0 && this.ans.organize_name.length == 0 && this.ans.items.length == 0 )||  this.purpose_message == "" ){
        return false
      }else{
        return true
      }
    },
    modalSaveBeforeBack(isSubmit){
      if(isSubmit){
        if(!this.checkComplete()){
          console.log(" still have empty phase ")
          this.modals2.modal1 = true
          this.modals.modal1 = false
        }else{
          this.submit(true)
          this.backToPrevious()
          this.modals.modal1 = false
          this.isEditMode = true
        }
      }else{
        this.backToPrevious()
          this.modals.modal1 = false
          this.isEditMode = true
      }
      

    },
    async backToPrevious(){
      console.log("back to previous");
      var self = this;

      this.isEditMode = true

      if(this.answer_current > 0){

        this.answer_current = this.answer_current-1
        // console.log(this.answer_history);
        console.log("this.answer_current: "+this.answer_current);
        var previous_answer = Object.assign({}, JSON.parse(JSON.stringify(this.answer_history[this.answer_current])));
        var answer_id = previous_answer._id
        var answer = {}
        var post = {}
        console.log("can  back to"+answer_id);


        console.log(previous_answer);
        this.post_text  = previous_answer.post_text
        this.post_id  = previous_answer.post_id
        this.ans =  previous_answer.ans
        this.editAnswer_id = previous_answer._id

        console.log("is  Edit mode: "+this.isEditMode);
        console.log("answer_history is: ");
        console.log(this.answer_history);
        console.log("answer in  "+this.answer_current+"/"+this.answer_history.length);
        console.log("answer count: "+this.answer_count);

      }
      this.hasChange =  false



    },
    async checkCanNext(){
      console.log("Check can next!!!!");
      let hasMainLocation = false

      if(this.ans.length == 0|| !hasMainLocation ){
        console.log("cannot next")
        this.canNext = false
      }else{
        this.canNext = true
      }

    },
    checkComplete(){
      if(this.ans.purpose_message == ""  ){
        this.canNext = false
        return false
      }else{
        this.canNext = true
        return true
      }

    },
    fadeOutAlert(){
      setTimeout(() => this.isAlertSuccess = false, 2000)

    },
    updateUserScore(){
      console.log("updateUserScore")
      self = this
      let user =  window.$cookies.get('user')
      axios.post(process.env.VUE_APP_URL_API+'/getUserScore', {_id:this.user._id} , { useCredentails: true })
        .then(function (response) {
          if(response.data.status == 'success'){
            console.log(response)
            let temp = user
            temp.user_score = response.data.data.user_score
            window.$cookies.set('user',temp)
            self.user_score = temp.user_score
          }
          

        })
    },
    logout(){
      window.$cookies.set('user',{})
      this.$router.push('/')
      this.$router.go(process.env.VUE_APP_URL_API+'/')
    }

  }
}
</script>

<style lang="scss">

.instruction-slide{
  width: 60vw;
  height: 60vh;
  position:fixed;
  top:20vh;
  left:20vw;
  z-index: 1;
  background-color: #000;
}

.user-question{
  width:83vw;
  // float:left;
  position:fixed;
  top:0;
  left:17vw;
  bottom:0;
  position:fixed;
  overflow-y: scroll;

}

.header-bar{
  height: 50px;
  background-color: #3A5CA5;
  position:fixed;
  top:0;
  left:17vw;
  width:83vw;
  z-index:1;
}

.user-icon{
  width:30px;
  margin-left:15px;
}

.logout-btn{
  margin-left: 20px;
}

img.help-icon{
  width: 25px;
  float: right;
}

span.location{
  border-radius: 20px;
  padding: 10px;
  display: flex;
  margin: 2px 2px;
  border: 2px dotted #082B72

  // &.point{
  //   border: 2px solid #082B72;
  // }
  //
  // &.area{
  //   border: 2px solid #0B9117;
  // }
  // &.from{
  //   border: 2px solid #910B25;
  // }
  // &.to{
  //   border: 2px solid #73AD21;
  // }
}

div.span-score{
  width:100px;
  border-radius: 20px;
  border: 2px solid #FFF;
  background-color: #FFF;
  color: #000;
  float:left;
  padding: 0px 20px;
  margin: 0px 10px;
}

div.user-info{
  float:right;
  color:#FFF;
  padding:10px;
}

.score{
  color:#FFF;
  padding:10px;
  float:left;
}
.question-header{
  width:100%;
  margin: auto;
  margin-top: 80px;
}
.post-ans-arrow{
  margin: 0 auto;
    /* text-align: center; */
  width: calc(85%);
}

div#tweettext{
  width: calc(100% - 200px);
  border: 1px solid #3A5CA5;
  padding: 30px;
  border-radius: 25px;
  float:left;
  text-align: left;
}


.question-number{
    display: block;
    float:left;
    height: 20px;
    width: 20px;
    line-height: 20px;

    -moz-border-radius: 30px; /* or 50% */
    border-radius: 30px; /* or 50% */

    background-color: black;
    color: white;
    text-align: center;
    font-size: 1em;

    margin-right: 10px;
}

.first-instruction{
  width: 55vw;
}

.instruction{
  padding-left: 35px;  
  margin-bottom:30px;
  color: black;
}

.arrow-left{
  width:100px;
  float:left;
  border:1px solid #FFF;
}

.arrow-right{
  width:100px;
  float:left;
  // border:1px solid;
}

img.arrow-icon{
  width:60px;
  margin-top: 50px;
  margin-left: 20px;
}


.text-warning{
  float:right;
}

.purpose-message-radio{
  // float: left;
}

div.answer-section{
  // width:1000px;
  width: 85%;
  margin: auto;
  margin-top:20px;
}

p.second-instruction{
  color: #000;

}

.clear-location-all{
  font-size: 0.8em;
  color: red;
}


div.location-list-new{
  width: calc(100% -  200px);
  border: 1px solid #3A5CA5;
  padding: 30px;
  border-radius: 25px;
  margin:0 100px;
  float: left;
  margin: 0 auto;
}
div.location-new{
  // margin: 10px 5px;
  border: 1px dashed #000;
  padding: 10px 10px;
  border-radius: 15px;
  float: left;
  background-color: white;
  max-width: 1000px;

  position: relative;
  display: inline-block;
}

div.location-stoke-select{
  margin: 5px 5px;
  border: none;
  padding: 7px;
  border-radius: 20px;
  float: left;
  max-width: 1000px;
}


p.p-location{
  display: inline-block;
 margin: 2px 5px;
//  white-space: nowrap;
//  text-overflow: ellipsis;
}

div.selected{
  background-color: #ffe37e;
}

img.phase-img{
  margin-right: 10px;
}

div.phaseType_list{
  width:55vw;
  margin:20px auto;
  text-align: right;

}
button.type-tweet-btn{
  margin: 10px;
}

div.div-phaseList{
  width: 55vw;
  margin: 0 auto;
  overflow-y:scroll;
  overflow-x:hidden;


}

div.div-phase{
  margin: 30px 10px;
  border: 1px dashed #000;
  padding: 10px 30px;
  border-radius: 25px;
}

.phase-command{
  font-size: 0.7em;
  color: #000;
}

.contextIcon{
  margin-right: 4px;
  width:25px;
}
div.location-group-in-phase{
  float: left;

}

img.location-icon{
  width:25px;
}

span.location-delete-icon{
  padding:10px;
  font-size: 1em;
  color: red;
}

.pointer 
{cursor: pointer;}

.blur {
  filter: blur(4px);
}

#alertsuccess{
    position: fixed;
    bottom: 0;
    right: 10px;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: #3A5CA5 ;
  color : white;
}

div.footer{
  height: 100px;
  width: 100vh;
  clear: both;
  background-color: white;
}


</style>
