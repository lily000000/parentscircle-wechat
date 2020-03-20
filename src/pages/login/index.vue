<template>
  <div class="login">
    <div class="logo-cont">
      <img src="../../../static/images/logo.png" class="logo" />
    </div>
    <p class="title">星庐家长圈</p>
    <div class="btn_wrap">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="authory" v-if="checked">
        <div class="auth_btn">
          <img src="../../../static/images/wx.png" />
          <p>微信授权登陆</p>
        </div>
      </button>
      <button  @click="getPhone" class="authory" v-else>
        <div class="auth_btn">
          <img src="../../../static/images/wx.png" />
          <p>微信授权登陆</p>
        </div>
      </button>
      <button class="authory authory_phone" @click="goAuthory">
        <div class="auth_btn">
          <img src="../../../static/images/phone.png" />
          <p>手机号登陆/注册</p>
        </div>
      </button>
      <div class="footer_msg">
        <icon
          class="radio"
          type="success"
          size="16"
          :color="checked?'#1CB80F':'#DDDDDD'"
          @click="radioChange"
        />
        <!-- <radio class="radio" value :checked="checked" @click="radioChange"></radio> -->
        <p>
          <span @click="radioChange">我已阅读并同意</span>
          <span @click="goUserAgree" class="blue">星庐家长圈 用户协议</span> 和
          <span @click="goPrivacy" class="blue">隐私声明</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState({
      sessionKey: state => state.global.sessionKey,
      openid: state => state.global.openid
    })
  },

  data() {
    return {
      checked: false
    };
  },
  created() {
    wx.hideHomeButton()
  },
  methods: {
    getPhone(){
      if (!this.checked) {
        wx.showToast({
          title: "请确认并同意相关协议",
          icon: "none",
          duration: 1000
        });
      }
    },
    //进行手机号注册
    goAuthory() {
      if (this.checked) {
        wx.navigateTo({
          url: "../phoneRegistration/main",
          success: function(res) {}
        });
      } else {
        wx.showToast({
          title: "请确认并同意相关协议",
          icon: "none",
          duration: 1000
        });
      }
    },
    //用户协议
    goUserAgree() {
      wx.navigateTo({
        url: "../userAgreement/main",
        success: function(res) {}
      });
    },
    //隐私说明
    goPrivacy() {
      wx.navigateTo({
        url: "../privacyThat/main",
        success: function(res) {}
      });
    },
    radioChange(e) {
      this.checked = !this.checked;
    },
    //获取手机号
    getPhoneNumber(e) {
      console.log(this.sessionKey,this.openid)
      console.log(this.$store)
      if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
        this.accreditLogin(e.target.encryptedData, e.target.iv);
      } else {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "授权失败",
          success: function(res) {}
        });
      }
    },
    //解密手机号
    accreditLogin(encrypData, ivData) {
      const params = {
        encrypData: encrypData,
        ivData: ivData,
        sessionKey: this.sessionKey,
        openid: this.openid
      };
      this.$API.accreditLogin(params).then(res => {
        const { data, msg, status } = res;
        if (status == 200) {
          wx.setStorageSync("token", data.token);
          if (data.permission.length > 0) {
            wx.showModal({
              title: "提示",
              showCancel: false,
              content: "授权成功",
              success: function(res) {
                wx.switchTab({
                  url: "../index/main"
                });
              }
            });
          } else {
            wx.navigateTo({
              url: "../authorizationCode/main",
              success: function(res) {}
            });
          }
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
