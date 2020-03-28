<template lang="html">
<div>
  <!-- <instruction v-show="showInstruction" z-index="1" class="instruction-slide">

  </instruction> -->
  <div @click.stop="showInstruction=false;closeContextMenu()" class="container-body" >

    <ScoreBoard ref="scoreBoard" v-bind:class="{'blur':showInstruction} " @click.stop="showInstruction=false;closeContextMenu()"></ScoreBoard>
    <div class="header-bar" v-bind:class="{'blur':showInstruction}">
      <div class="score col-sm-3">
        <h6 style="float:left" class=""><b>Score:</b>  </h6><div class="span-score"> <span > {{user_score}}</span></div>
      </div>

      <div style="text-align:right; padding-right:40px;" class="user-info col-sm-6">
        <h7 style="" class=""><b>{{user.name}}</b>  </h7> <img src="@/assets/img/user-icon.png" class="user-icon" alt="">
      </div>


    </div>
    <div class="user-question">


      <div class="question-header" v-bind:class="{'blur':showInstruction}" @click.stop="showInstruction=false;closeContextMenu()" >
        <div class="instruction" >
          <img  data-toggle="Tutorail" @click.stop="showInstruction=true;closeContextMenu()" src="@/assets/img/help-icon.jpg" class="help-icon pointer">
          <h4 style=""><b> ข้อความ Tweet</b></h4>
          <p><span class="question-number"><b>1</b></span>กรุณาไฮไลท์คำที่ระบุสถานที่ทั้งหมด พร้อมเลือกประเภทของสถานที่นั้นๆ</p>
        </div>
        
        <div  class="arrow-left">
          <a><img v-show="answer_history.length!== 0 && answer_current >  0" @click="clickBack" src="@/assets/img/back-icon.png" class="arrow-icon pointer" alt="กลับไปก่อนหน้า"></a>
        </div>
        <div
            tabindex="0"
            id="tweettext"
            style="">
            <div class="twitter-col-icon" style="width:10%; float:left; text-align: right;">
              <img src="@/assets/img/twitter-icon.png" style="width:50px" alt="">
            </div>

            <div @click.start="$refs.contextMenu.close()"
                @click.stop=" detectTextHightlighted($event,{'type':'tweet'})"
                style="width:85%; float:left; margin-left:20px;">
              <h6><b>Tweet</b></h6>
              <p>
                {{ tweet_text }}
              </p>



            </div>
            <div style="clear:both">

            </div>
        </div>
        <div class="arrow-right">
          <a><img @click="clickNext" src="@/assets/img/next-icon.png" class="arrow-icon pointer" alt="ข้อต่อไป..."></a>
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
            <div class="col-lg-6 col-sm-6 mt-6 mt-md-0"><div class="mb-3"><small class="text-uppercase font-weight-bold">ประเภทของข้อความ</small></div>
            
            <div class="custom-control custom-radio purpose-message-radio">
              <input id="zRNNANl" type="radio" class="custom-control-input " value="Request" v-model="ans.purpose_message">
              <label for="zRNNANl" class="custom-control-label">
                    ขอความช่วยเหลือ/บริจาค
              </label>
            </div>

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP" type="radio" class="custom-control-input" value="Response" v-model="ans.purpose_message">
              <label for="GSXZIQP" class="custom-control-label">
                    แจ้งให้ความช่วยเหลือ/บริจาค
              </label>
            </div>
                

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP1" type="radio" class="custom-control-input" value="Service" v-model="ans.purpose_message">
              <label for="GSXZIQP1" class="custom-control-label">
                    เสนอความช่วยเหลือ/บริจาค
              </label>
            </div>

            <div class="custom-control custom-radio purpose-message-radio">
              <input id="GSXZIQP3" type="radio" class="custom-control-input" value="not_relate" v-model="ans.purpose_message">
              <label for="GSXZIQP3" class="custom-control-label">
                    ไม่เกี่ยวข้อง
              </label>
            </div>
                

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
      <!-- -----------------------------------answer.contact_name---------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->

      <div class="answer-section">
        <div  class="arrow-left"></div>
        <div v-show="ans.contact_name.length >0" class="location-list-new">
          <div class="second-instruction">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              ชื่อผู้ติดต่อ
              <span @click.stop="ans.contact_name = []" class="float-right clear-location-all pointer">ลบชื่อที่ทั้งหมด</span>
              </p>
            </u></b>
          </div>

          <div v-for=" (name,index) in ans.contact_name" class="location-stoke-select pointer "
              @mouseover="hoverLocationIndex=index;hoverAttr='contact_name'"
              @mouseleave="hoverLocationIndex=null;hoverAttr=null"
          >
          <div class="location-new" >
            <img class="location-icon float-left phase-img"  src="@/assets/img/location-marker.png" alt="">
            <p class="p-location"> {{name}} 
              <span v-show="hoverLocationIndex==index&&hoverAttr=='contact_name'" style="font-size: 1em; color: red; margin-left:10px; float:right;">
                  <i @click.stop="removeLocation('contact_name',index)" class='delete-location-element fa fa-minus-circle'></i>
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


      <div class="answer-section">
        <div  class="arrow-left"></div>
        <div v-show="ans.contact_address.length >0" class="location-list-new">
          <div class="second-instruction">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              ข้อความแสดงที่อยู่ติดต่อ
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
            <p class="p-location"> {{contact_address}} 
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
      <!-- --------------------------------answer.organize_name---------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->


      <div class="answer-section">
        <div  class="arrow-left"></div>
        <div v-show="ans.organize_name.length >0" class="location-list-new">
          <div class="second-instruction">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              ชื่อสถาบัน
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
            <p class="p-location"> {{organize_name}} 
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
      <!-- ---------------------------answer.request_or_offer_items-------------------------------------- -->
      <!-- ---------------------------------------------------------------------------------------------- -->


      <div class="answer-section">
        <div  class="arrow-left"></div>
        <div v-show="ans.request_or_offer_items.length >0" class="location-list-new">
          <div class="second-instruction">
            <!-- <span class="question-number">2</span> -->
            <b><u>
              <p class="second-instruction">
              สิ่งของที่ร้องขอ / เสนอบริจาค
              <span @click.stop="ans.request_or_offer_items = []" class="float-right clear-location-all pointer">ลบทั้งหมด</span>
              </p>
            </u></b>
          </div>

          <div v-for=" (request_or_offer_items,index) in ans.request_or_offer_items" class="location-stoke-select pointer "
              @mouseover="hoverLocationIndex=index;hoverAttr='request_or_offer_items'"
              @mouseleave="hoverLocationIndex=null;hoverAttr=null"
              
          >
          <div class="location-new" >
             <img class="location-icon float-left phase-img"  src="@/assets/img/location-marker.png" alt="">
            <p class="p-location"> {{request_or_offer_items}} 
              <span v-show="hoverLocationIndex==index&&hoverAttr=='request_or_offer_items'" style="font-size: 1em; color: red; margin-left:10px; float:right;">
                  <i @click.stop="removeLocation('request_or_offer_items',index)" class='delete-location-element fa fa-minus-circle'></i>
              </span>
            </p>
          </div>
          </div>
          <div  class="arrow-right"></div>
          <div class="location-link-new">

          </div>
        </div>
      </div>



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
          <p>คุณยังไม่ได้ระบุวสถานที่ในวลีหนึ่ง</p>
          <template slot="footer">
              <base-button @click="modals2.modal1 = false" type="primary">กลับไปแก้ไข</base-button>
              <base-button @click="modalSaveBeforeBack(false);modals2.modal1 = false" type="link" class="ml-auto" >ละทิ้งข้อนี้
              </base-button>
          </template>
      </modal>

      <modal :show.sync="modals3.modal1">
          <h6 slot="header" class="modal-title" id="modal-title-default">คุณยังเลือกสถานที่ไม่เสร็จนะ</h6>
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
</div>
</template>

<script>

import ContextMenu from "./ContextMenu/ContextMenu";
import ContextMenuItem from "./ContextMenu/ContextMenuItem";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import Modal from "@/components/Modal.vue";
import Instruction from "./Instruction/Instruction.vue";
import axios from "axios";

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
      tweet_text:{},
      tweet:{},
      tweet_id:"",
      nowHightlighted:"",
      phaseList:[],
      ans: {
        'contact_name':[],
        'contact_address': [], //ที่อยู่
        'organize_name':[], //หน่วยงานที่ขอรับบริจาค
        'purpose_message':"", //จุดประสงค์ของข้อความ 'ร้องขอความช่วยเหลือ' หรือ 'เสนอความช่วยเหลือ'
        'requester_or_helper':[], //ชื่อคนขอความช่วยเหลือ หรือ ชื่อคนเสนอตวามช่วยเหลือ
        'request_or_offer_items':[] //สิ่งของที่ร้อขอ หรือเสนอ
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
        {
          "text" : "ชื่อผู้ขอความช่วยเหลือ",
          "type": "contact_name",
          "src": "location-marker.png"
        },
        {
          "text" : "ที่อยู่ติดต่อ",
          "type": "contact_address",
          "src": "area-icon.png"
        },
        {
          "text" : "ชื่อหน่วยงาน",
          "type": "organize_name",
          "src": "from-icon.png"
        },
        {
          "text" : "สิ่งของที่ร้อขอ",
          "type": "request_or_offer_items",
          "src": "to-icon.png"
        }
      ],
      canNext: false,
      hasChange:  false

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
      this.tweet_text = result['post_text']
      this.tweet = result
      this.tweet_id = result._id
      this.user = $cookies.get("user")
      console.log(this.user)
      this.user_score = this.user.user_score
      // console.log(this.tweet_text)
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
        this.dupplicate = false
        // hightlight in tweet
        if(objHightlight['type'] == "tweet"){
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

          if(text_type=="contact_name"){
            this.ans.contact_name.push(this.nowHightlighted)
          }
          else if(text_type=="contact_address"){
            this.ans.contact_address.push(this.nowHightlighted)
          }
          else if(text_type=="contact_address"){
            this.ans.contact_address.push(this.nowHightlighted)
          }
          else if(text_type=="organize_name"){
            this.ans.organize_name.push(this.nowHightlighted)
          }
          else if(text_type=="request_or_offer_items"){
            this.ans.request_or_offer_items.push(this.nowHightlighted)
          }
          
        }
        // console.log("Choose context in tweet");
        
      }

      this.$refs.contextMenu.close();
      this.chooseContext = false
      this.isChooseContextOnTweet = null
      this.highlightOnPhaseId = null
      
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
          tweet_id: this.tweet['_id'],
          tweet_text: this.tweet_text,
          ans: this.ans,
          no_location: false,
          ans_from_account_id:this.$cookies.get('user')._id,
          ans_from_account: this.$cookies.get('user').name,
          all_locations: allLocation,
          ans_datetime : "",
          score:10
          // score:allLocation.length*10
        }
      }else{
        data = {
        tweet_id: this.tweet['_id'],
        tweet_text: this.tweet_text,
        ans:this.ans,
        all_locations: [],
        no_location: true,
        ans_from_account: this.$cookies.get('user').name,
        all_locations: [],
        ans_datetime : ""
      }
      }

      
      console.log("data post: ");
      console.log(data);

      if(this.isEditMode){
        // data._id = this.answer_history[this.answer_current]._id
        uri = "http://localhost:3000/editAnswer"
        data._id = this.editAnswer_id
        this.answer_history[self.answer_current].ans = this.ans
      }else {
        uri = "http://localhost:3000/submitAndNext"
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
        // console.log("result: "+JSON.stringify(response.data))
        if(!isEditMode_temp){
          self.answer_history.push(response.data.result)
        }
        self.$refs.scoreBoard.updateScore();
        self.updateUserScore()
        

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
        this.tweet_text = result['post_text']
        this.tweet = result
        // console.log(this.tweet_text)
      }
      console.log("setup  next tweet")
      init()
      this.ans={
        'contact_name':[],
        'contact_address': [], //ที่อยู่
        'organize_name':[], //หน่วยงานที่ขอรับบริจาค
        'purpose_message':"", //จุดประสงค์ของข้อความ 'ร้องขอความช่วยเหลือ' หรือ 'เสนอความช่วยเหลือ'
        'requester_or_helper':[], //ชื่อคนขอความช่วยเหลือ หรือ ชื่อคนเสนอตวามช่วยเหลือ
        'request_or_offer_items':[] //สิ่งของที่ร้อขอ หรือเสนอ
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
      if((this.ans.contact_name.length == 0 && this.ans.contact_address.length == 0 && this.ans.organize_name.length == 0 && this.ans.request_or_offer_items.length == 0 )||  this.purpose_message == "" ){
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
        var tweet = {}
        console.log("can  back to"+answer_id);


        console.log(previous_answer);
        this.tweet_text  = previous_answer.tweet_text
        this.tweet_id  = previous_answer.tweet_id
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
  background-color: #2AAAE0;
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
  width:1000px;
  margin: auto;
  margin-top: 80px;
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

div#tweettext{
  width:55vw;
  border: 1px solid #2AAAE0;
  padding: 30px;
  border-radius: 25px;
  float:left;
}

.text-warning{
  float:right;
}

.purpose-message-radio{
  // float: left;
}

div.answer-section{
  width:1000px;
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
  width: 55vw;
  border: 1px solid #2AAAE0;
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




</style>
