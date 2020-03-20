export default {
  getUserData:{
    method:'get',
    url:'static/mock/userData.json'
  },
  getListData:{
    method:'get',
    url:'https://www.heyuhsuo.xyz/heyushuo/index/index'
  },
   /*----------------------授权登录--------------------------*/
  login:{//登录
    method:'get',
    url:'/member/memUser/login/login'
  },
  getOpenId:{ //解密openid
    method:'get',
    url:'/member/memUser/login/getOpenId'
  },
  sendSmsCode:{ //注册时发送验证码
    method:'get',
    url:'/member/memUser/login/sendSmsCode'
  },
  decodePhone:{ //解密手机号
    method:'get',
    url:'/member/memUser/login/decodePhone'
  },
  accreditLogin:{ //微信授权登录
    method:'get',
    url:'/member/memUser/login/accreditLogin'
  },
  accredit:{ //授权码授权
    method:'get',
    url:'/member/memUser/accredit'
  }
  
  
}
