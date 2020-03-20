
<script>
import store from '@/store';
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  onLaunch: function() {
    // if (wx.getStorageSync("token")) {
    //   wx.switchTab({
    //     url: "pages/index/main"
    //   })    
    // }
  },
  onShow() {
    wx.login({
      timeout: 10000,
      success: result => {
        const params = {
          code: result.code
        };
        this.$API.getOpenId(params).then(res => {
            console.log(2222444, res);
          const { data, msg, status } = res;
          if (status == 200) {
            this.$store.commit("OPENID", data.openid);
            this.$store.commit("SESSIONKEY", data.session_key);
          }
        });
      },
      fail: () => {},
      complete: () => {}
    });
  if (wx.getStorageSync("token")) {
      wx.switchTab({
        url: "/pages/index/main"
      })    
    }
  },
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    console.log(this.$store.state.global.code);
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
