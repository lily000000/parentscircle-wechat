import { Decrypt, Encrypt } from "./cryptoJS";
export function authBeforeRes(response) {
  console.log(2222,response)
  try {
    response.data = JSON.parse(Decrypt(response.data));
  }
  catch (e) {
    console.log(1111)
  }
  switch (response.data.status) {
    case 200:
      return response.data;
    case 302:
      wx.showToast({
        icon: "none",
        mask: true,
        title: response.data.message,
        duration: 3000
      });
      wx.redirectTo({
        url: "../login/main"
      });
      wx.removeStorageSync("token");
    case 401:
      wx.redirectTo({
        url: "../login/main"
      });
      wx.removeStorageSync("token");
    case 403:
      wx.redirectTo({
        url: "../login/main"
      });
      wx.removeStorageSync("token");
      default:
      wx.showToast({
        icon: "none",
        mask: true,
        title: response.data.msg,
        duration: 3000
      });

      // if (process.env.NODE_ENV !== "production") {
      //   console.error("Request error: ", response.code, response.message);
      // }
     
  }

}
