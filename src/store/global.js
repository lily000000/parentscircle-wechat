const globalOne = {
  state: {
    navData:[],
    openid:"",
    sessionKey:"",
    code:"",
    sideBar:{
      isFold:false
    }
  },
  mutations: {
    SESSIONKEY:(state, data)=>{
      state.sessionKey = data;
    },
    OPENID: (state, data) => {
      state.openid = data;
    },
    CODE: (state, data) => {
      state.code = data;
    },
    GET_NAV_DATA: (state, data) => {
      state.navData = data;
    },
    TOGGLE_SIDE_BAR: (state, data) => {
      state.sideBar.isFold =!state.sideBar.isFold;
    }
  },
  actions: {
    getNavData({ commit }, params,cb) {
      
   },
    toggleSideBar({ commit }, params,cb) {
      commit('TOGGLE_SIDE_BAR', );
    }
  }
}

export default globalOne
