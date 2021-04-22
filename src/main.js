import Vue from "vue";
import Vuelidate from "vuelidate";
import firebase from "firebase";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueLetterAvatar from 'vue-letter-avatar';

Vue.use(Buefy);
Vue.use(VueLetterAvatar);

import App from "./App.vue";
import router from "./router";
import store from "./store";

import getAverageMarkFilter from "@/filters/getAverageMark.filter";
import searchFilter from "./filters/serch.filter";
import timeFilter from "./filters/time.filter";
import spentTimeFilter from "./filters/spentTime.filter";
import getSpentTimeHours from "./filters/getSpentTimeHours";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.filter("averageMark", getAverageMarkFilter);
Vue.filter("search", searchFilter);
Vue.filter('time', timeFilter);
Vue.filter('timeSpent', spentTimeFilter);
Vue.filter('timeSpentHours', getSpentTimeHours);

let app = null;

//wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  //init app if now already created
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
