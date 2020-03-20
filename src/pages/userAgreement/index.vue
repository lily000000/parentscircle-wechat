<template>
<div class="user_wrap">
  <ul>
    <li>1、任何微信用户在进入本平台时均视为已经仔细看过本条款并完全同意。凡以任何方式登陆本平台，或直接、间接使用本平台资料者，均视为自愿接受本平台相关声明和用户服务协议的约束。</li>
    <li>2、本平台发布的非原创内容，并不代表本平台之意见及观点，也不意味着本平台赞同其观点或保证其内容的真实性。</li>
    <li> 3、本平台发布的非原创文字、图片、音视频等资料其真实性、准确性和合法性由信息发布人负责。本平台不提供任何保证，并不承担任何法律责任。</li>
    <li>4、本平台发布的原创内容中，若部分图文侵犯了第三方的知识产权或其他权利，请联系我们及时处理。</li>
    <li> 5、本平台不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该外部链接指向的不由本平台实际控制的任何内容，本平台不承担任何责任。</li>
    <li>6、用户明确并同意其使用本平台网络服务所存在的风险将完全由其本人承担；因其使用本平台网络服务而产生的一切后果也由其本人承担，本平台对此不承担任何责任。</li>
    <li>7、除本平台注明之服务条款外，其它因不当使用本平台而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失（包括因不当下载、跳转外部链接而感染电脑病毒等），本平台概不负责，亦不承担任何法律责任。</li>
    <li>8、对于因不可抗力或因黑客攻击、通讯线路中断等本平台不能控制的原因造成的网络服务中断或其他缺陷，导致用户不能正常使用本平台，本平台不承担任何责任，但将尽力减少因此给用户造成的损失或影响。</li>
    <li>9、本声明未涉及的问题请参照国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。</li>
  </ul>

</div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      checked: false
    };
  },
  created() {},
  methods: {
    radioChange(e){
      this.checked = !this.checked
    },
    //获取手机号
    getPhoneNumber(e) {
      console.log(e);
      var that = this;
      if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "授权成功",
          success: function(res) {}
        });
      } else {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "授权失败",
          success: function(res) {}
        });
      }
    }
  }
};
</script>

<style lang='scss' >
@import "./style.scss";
</style>
