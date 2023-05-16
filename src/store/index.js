import Vue from "vue";
import Vuex from "vuex";
import VueXAlong from "vuex-along";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    INIT_CURRUSER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    VueXAlong({
      name: "along",
      local: { list: ["currentUser"], isFilter: "true" },
      session: { list: ["currentUser"] },
    }),
  ],
});
