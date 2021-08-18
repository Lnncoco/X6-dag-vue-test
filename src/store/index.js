import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    graph: null,
    stencil: null,
    select: null,
  },
  mutations: {
    saveGraph (state, graph) {
      return state.graph = graph;
    },
    saveStencil (state, stencil) {
      return state.stencil = stencil;
    },
    saveSelectInfo(state, data){
      return state.select = data;
    },
    resetSelectInfo(state){
      return state.select = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
