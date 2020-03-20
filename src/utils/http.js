import Loading from "./gloading";
import { authBeforeRes } from './interceptor';
const gloading = new Loading({ sync: true });
import storage from '@/utils/storage';
import { Decrypt, Encrypt } from "./cryptoJS";
class Reqeust {
  constructor(options) {
    this.options = options;
    this.defaultConfig = {
      // baseURL:'http://172.36.171.59:8800/', // base url
      baseURL: 'https://yaoyang.imdo.co', // base url
      // baseURL: "http://28y853m626.wicp.vip:50886",
      headers: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
    };
  }
  get(url, params) {
    let options = { method: 'GET' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.send(req_url, options)
  }

  post(url, data) {
    let options = { method: 'POST', headers: { "content-type": "application/json;charset=UTF-8" } }
    if (data) options.body = JSON.stringify(data)
    return this.send(url, options)
  }
  delete(url, params) {
    let options = { method: 'DELETE' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.send(req_url, options)
  }
  put(url, data) {
    let options = { method: 'PUT' }
    if (data) options.body = JSON.stringify(data)
    return this.send(url, options)
  }
  postForm(url, data, flag) {
    let options = { method: 'POST' }
    if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    return this.send(url, options)
  }
  head(url) {
    let options = { method: 'Head' }
    return this.send(url, options)
  }
  buildUrl(url, params) {
    const ps = []
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&')
  }

  buildFormData(params) {
    if (params) {
      const data = new FormData()
      for (let p in params) {
        if (p) {
          data.append(p, params[p])
        }
      }
      return data;
    }
  }
  send(path, options = {}) {
    const config = Object.assign({}, this.defaultConfig);
    config.method = options.method || 'GET';
    config.params = options.params || {};
    return this.request(path, options.data, config).then(response => response);
  }
  request(url, data, config = {}) {
    gloading.start();
    return new Promise((resolve, reject) => {
      const { headers = {} } = config;
      wx.request({
        url: this.defaultConfig.baseURL + url,
        ...config,
        header: Object.assign({}, headers, this.defaultConfig.headers),
        success: res => {
          // try {
          //   res.data = JSON.parse(Decrypt(res.data));
          // }
          // catch (e) {
          //   console.log(1111)
          // }
          // console.log(66666,res.data)
          // switch (res.data.status) {
          //   case 200:
          //     console.log(77777, res)
          //     resolve(res.data);
          //     return;
          //   case 302:
          //     wx.showToast({
          //       icon: "none",
          //       mask: true,
          //       title: res.data.message,
          //       duration: 3000
          //     });
          //     wx.redirectTo({
          //       url: "../login/main"
          //     });
          //     wx.removeStorageSync("token");
          //     return;
          //   case 401:
          //     wx.redirectTo({
          //       url: "../login/main"
          //     });
          //     wx.removeStorageSync("token");
          //     return;
          //   case 403:
          //     wx.redirectTo({
          //       url: "../login/main"
          //     });
          //     wx.removeStorageSync("token");
          //     return;
          //   default:
          //     wx.showToast({
          //       icon: "none",
          //       mask: true,
          //       title: res.data.msg,
          //       duration: 3000
          //     });
          //     return;
          // }
          authBeforeRes(res);
          resolve(res.data);

        },
        fail: function (error) {
          reject(false)
        },
        complete: function () {
          setTimeout(() => {
            gloading.stop();;
          }, 300);
        }
      })
    })
  }
}

export default new Reqeust();
