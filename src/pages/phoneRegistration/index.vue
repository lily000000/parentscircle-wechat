<template>
  <div class="reginstr_wrap">
    <div class="item_ul">
      <div :class="{'item_li':true,'item_active':phoneActive}">
        <div :class="{'item-cont':true}">
          <p>手机号码</p>
          <input
            type="number"
            placeholder="输入有效手机号码"
            @focus="onFocus"
            @blur="onBlur"
            @input="onChange"
            v-model="phoneNumber"
            :maxlength="11"
          />
          <div @click="onClear" class="clear_wrap">
            <img src="../../../static/images/del.png" class v-if="clearState" />
          </div>
        </div>
        <p :class="{'getCode':true,'code_active':!timeShow}" @click="getCode" v-if="!timeShow">获取验证码</p>
        <p class="getCode" v-else>
          获取验证码
          <span>({{timeNumber}})</span>
        </p>
      </div>
      <div :class="{'item_li':true,'itemt_active':codeActive}">
        <div class="item-cont">
          <p>验证码</p>
          <input
            type="number"
            placeholder="输入6位验证码"
            placeholder-style
            @focus="onCodeFocus"
            @blur="onCodeBlur"
            v-model="codeNumber"
            @input="onCodeChange"
            :maxlength="6"
            hold-keyboard
          />
        </div>
        <div class="clear_code" @click="onCode">
          <img src="../../../static/images/del.png" class v-if="clearCode" />
        </div>
      </div>
    </div>
    <p class="msg">提示：未注册小程序的用户，初次登录时将完成注册</p>
    <p :class="{'determine':true,'determine_active':determineActive}" @click="onSubmit">完成</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState({
      openid: state => state.global.openid
    })
  },
  data() {
    return {
      determineActive: false,
      codeNumber: "",
      clearCode: false,
      timeShow: false,
      timeNumber: 60,
      phoneNumber: "",
      phoneActive: false,
      checked: false,
      codeActive: false,
      clearState: false,
      timeClear: null
    };
  },
  created() {},
  methods: {
    getCode() {
      this.clearState = false;
      if (!this.phoneNumber) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1000
        });
        return;
      } else {
        if (!this.$sandBox.checkPhone(this.phoneNumber)) {
          wx.showToast({
            title: "请输入正确手机号",
            icon: "none",
            duration: 1000
          });
          return;
        }
      }
      this.timeClear = setInterval(() => {
        if (this.timeNumber <= 0) {
          clearInterval(this.timeClear);
          this.timeNumber = 60;
          this.timeShow = false;
        } else {
          this.timeShow = true;
          this.timeNumber = this.timeNumber - 1;
        }
      }, 1000);
      this.sendSmsCode();
    },
    //发送验证码
    sendSmsCode() {
      const params = {
        phone: this.phoneNumber
      };
      this.$API.sendSmsCode(params).then(res => {
        const { data, msg, status } = res;
        if (status == 200) {
        }
      });
    },
    //提交登录
    onSubmit() {
      if (!this.phoneNumber) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (!this.$sandBox.checkPhone(this.phoneNumber)) {
        wx.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (!this.codeNumber) {
        wx.showToast({
          title: "请输入验证码",
          icon: "none",
          duration: 1000
        });
        return;
      }
      const params = {
        phone: this.phoneNumber,
        code: this.codeNumber
      };
      this.$API.login(params).then(res => {
        const { data, msg, status } = res;
        if (status == 200) {
          console.log("数据", data);
          if (data.permission.length > 0) {
            wx.switchTab({
              url: "../index/main"
            });
          } else {
            wx.navigateTo({
              url: "../authorizationCode/main",
              success: function(res) {}
            });
          }
          wx.setStorageSync("token", data.token);
        } else {
          wx.showToast({
            title: msg,
            icon: "none",
            duration: 1000
          });
        }
      });
    },
    onCode() {
      this.codeNumber = "";
      this.clearCode = false;
      this.determineActive = false;
    },
    onClear() {
      this.phoneNumber = "";
      this.clearState = false;
    },
    onFocus() {
      this.phoneActive = true;
      this.clearCode = false;
    },
    onChange() {
      if (this.phoneNumber) {
        this.clearState = true;
      } else {
        this.clearState = false;
      }
    },
    onCodeChange() {
      if (this.codeNumber) {
        this.clearCode = true;
        this.determineActive = true;
      } else {
        this.determineActive = false;
        this.clearCode = false;
      }
    },
    onBlur() {
      this.phoneActive = false;
      // this.clearState = false;
      if (this.phoneNumber && !this.$sandBox.checkPhone(this.phoneNumber)) {
        wx.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 1000
        });
        return;
      }
    },
    onCodeFocus() {
      this.codeActive = true;
      this.clearState = false;
    },
    onCodeBlur() {
      this.codeActive = false;
      // this.clearCode = false;
    }
  },
  onUnload() {
    clearInterval(this.timeClear);
  }
};
</script>

<style lang='scss' >
@import "./style.scss";
</style>
