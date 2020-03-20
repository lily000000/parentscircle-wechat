<template>
  <div class="code_wrap">
    <p>我是首页</p>
    <van-button type="primary">按钮</van-button>

    <button @click="goBack">返回登录页</button>
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
    goBack(){
      wx.redirectTo({
        url: '../login/main'
      })

    },
    
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
            success: function(res) {
              

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
