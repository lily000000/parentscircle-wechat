<template>
  <div class="index">
    <p>首页55555</p>
    <!-- <van-button type="primary">按钮</van-button> -->
    <button @click="goBack">返回登录页</button>
  </div>
</template>

<script>
export default {
  onShow() {},

  mounted() {},
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: []
    };
  },
  components: {},
  methods: {
    goBack() {
      wx.redirectTo({
        url: "../login/main"
      });
    },
    getUserInfo: function(cb) {
      var that = this;
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.$storage.set("userInfo", res.userInfo);
            }
          });
        }
      });
    },
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function(info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
