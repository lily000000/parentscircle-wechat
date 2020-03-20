<template>
  <div class="code_wrap">
    <input type="text" placeholder="请输入授权码" v-model="code">
    <button class="btn" @click="onAccredit">授权</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  computed: {
  },

  data() {
    return {
      code: ""
    };
  },
  created() {},
  methods: {
    
    //解密手机号
    onAccredit() {
      const params = {
        code:this.code,
      };
      this.$API.accredit(params).then(res => {
        const { data, msg, status } = res;
        if (status == 200) {
          console.log(res)
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "授权成功",
            success: res=> {
              wx.switchTab({
                url: "../index/main"
              });
            }
          });
        } else {
          wx.showToast({
            title: msg,
            icon: "none",
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style lang='scss' >
@import "./style.scss";
</style>
