import Vue from "vue";
import Router from "vue-router";

import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import UserQuestion from "./views/UserQuestion.vue";
import FacebookLogin from "./views/FacebookLogin/FacebookLogin.vue";
import TestHightlight from "./views/TestHightlight.vue";

Vue.use(Router);


function guard(to, from, next){
  // console.log("check in guard")
  try{
    if(window.$cookies.isKey("user") &&  window.$cookies.get("user")._id != undefined) {
      // or however you store your logged in state
      // console.log("cookie is:"+window.$cookies.get("user")._id);
      // console.log("can  go to userQuestion")

      next(); // allow to enter route
    } else{
      // console.log("can not  go")
        next('/login'); // go to '/login';
    }
  }
  catch(err){
    next('/login');

  }
  
    
}

function canPass(to, from, next){
  // console.log('in check canPass')
  try{
    if(window.$cookies.isKey("user") &&  window.$cookies.get("user")._id != undefined) {
      // or however you store your logged in state
      // console.log('alerady have user cookies')
      // console.log("cookie is:"+window.$cookies.get("user")._id);
      


      next('/userQuestion'); // allow to enter route
    } else{
        next(); // go to '/login';
    }
  }
  catch(err){
    next();

  }
}

export default new Router({

  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      title: 'Covid 19 THagGetter -  index ',
      name: "index",
      beforeEnter: guard,
      components: {
        
        default: Index
      }
    },
    // {
    //   path: "/facebooklogin",
    //   name: "facebooklogin",
    //   components: {
    //     default: FacebookLogin
    //   }
    // },
    {
      title: 'Covid 19 THagGetter - index',
      path: "/userQuestion",
      name: "UserQuestion",
      beforeEnter: guard,
      components: {
        default: UserQuestion
      }
    },
    {
      title: 'Covid 19 THagGetter - login',
      path: "/login",
      name: "login",
      beforeEnter: canPass,
      components: {
        default: Index
        // default: Login
      }
    },
    {
      title: 'Covid 19 THagGetter -  register',
      path: "/register",
      name: "register",
      beforeEnter: canPass,
      components: {
        default: Register
      }
    }
    ,
    // {
    //   path: "/test",
    //   name: "test",
    //   components: {
    //     default: TestHightlight
    //   }
    // }

  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
