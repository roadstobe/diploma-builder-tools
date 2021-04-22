import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth';
import workList from "./workList";
import jobList from "./jobList";
import historyView from "./historyView";
import itemDetail from './itemDetail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, workList, jobList, historyView, itemDetail
  }
})
