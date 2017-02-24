import 'es6-promise/auto'
require('../static/css/materialize.min.css')
require('../static/css/font-awesome.min.css')
require('../static/css/animate.css')
//  http://www.hzts.com.cn:8088/rcjk
import sha1 from 'sha1'
import rest from './rest'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueTouch from 'vue-touch'
require('materialize-css/js/leanModal')

var Vue = require('vue')
// var VueValidator = require('vue-validator')
var VueRouter = require('vue-router')
var vueForm = require('vue-form')

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(require('vue-animated-list'))
Vue.use(vueForm)
Vue.use(VueTouch)

// Vue.use(VueValidator)
$(function() {
    FastClick.attach(document.body);
})

function getUrlQueryString() {
  var splitUrl = window.location.href.split('?')
  var strUrl = (splitUrl.length > 1) ? splitUrl[1].split('&') : 0
  var i = 0
  var iLen = strUrl.length
  var str = ''
  var obj = {}

  for (i = 0; i < iLen; i++ ) {
    str = strUrl[i].split('=')
    obj[str[0]] = str[1]
  }

  return Array.prototype.sort.call(obj)
}

function init () {
  var localStorage = window.localStorage
  var query = getUrlQueryString()

  if (query && query.wcOpenId) {
    var newBind = {
      wcOpenId: query.wcOpenId
    }
    // var old = JSON.parse(localStorage.getItem('bind'))

    // if (old) old = old.wcOpenId

    localStorage.setItem('bind', JSON.stringify(newBind))
  }

  var bind = JSON.parse(localStorage.getItem('bind'))


  if (bind && bind.wcOpenId) {
    rest
      .post({}, {wcOpenId: bind.wcOpenId}, '/rccore/WeChatUser/get')
      .then(res => {
        if (res.success&&res.data.ssoUserId) {
          var baseInfo = {
            ssoOpenId: res.data.ssoUserId,
            username: res.data.ssoLoginName,
            rcId: res.data.ssoUserId
          }

          localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
        }
        else {
          localStorage.removeItem('baseInfo')
        }

        var App = Vue.extend({})
        var router = new VueRouter({history: true})

        router.map({
            '/': {
              name: 'HomePage',
              component: require('./App.vue'),
              subRoutes: {
                '': {
                  name: 'Home',
                  component: require('./pages/TotalList.vue')
                },
                'GetAddress': {
                    name: 'GetAddress',
                    component: require('./pages/GetAddress.vue')
                },
                'HighLvPersonId': {
                    name: 'HighLvPersonId',
                    component: require('./pages/HighLvPersonId.vue')
                },
                'LifePayment': {
                    name: 'LifePayment',
                    component: require('./pages/LifePayment.vue')
                },
                'Children': {
                    name: 'Children',
                    component: require('./pages/Children.vue')
                },
                'BuyHouse': {
                    name: 'BuyHouse',
                    component: require('./pages/BuyHouse.vue')
                },
                'RentHouse': {
                    name: 'RentHouse',
                    component: require('./pages/RentHouse.vue')
                },
                'Suggestions': {
                  name: 'Suggestions',
                  component: require('./pages/Suggestions.vue')
                }
              }
            },
            '/Foo': {
              component: require('./pages/Foo.vue')
            },
            '/Login': {
                name: 'Login',
                component: require('./pages/Login.vue')
            },
            '/SignUp': {
                name: 'SignUp',

                component: require('./pages/SignUp.vue')
            },
            //'Applications': {
            //  name: 'Applications',
            //  component: require('./pages/Applications.vue')
            //},
            '/User': {
                component: require('./pages/User.vue'),
                subRoutes: {
                  '': {
                    component: require('./pages/Usernav.vue')
                  },
                  '/UserInfo': {
                    component: require('./pages/UserInfo.vue')
                  },
                  '/UserProfessor': {
                    component: require('./pages/UserProfessor.vue')
                  },
                  '/UserProSkill': {
                    component: require('./pages/UserProSkill.vue')
                  },
                  '/UserHonor': {
                    component: require('./pages/UserHonor.vue')
                  },
                  '/UserResults': {
                    component: require('./pages/UserResults.vue')
                  },
                  '/UserOtherFileList': {
                    component: require('./pages/UserOtherFileList.vue')
                  },
                }
            }
        })

        router.beforeEach(function(to) {
          var user = JSON.parse(localStorage.getItem('baseInfo'))

          if (to.to.path === '/Login' || to.to.path === '/SignUp') {
            return to.next()
          }
          if (user) {
            return to.next()
          }
          else {
            to.abort()
            router.go({name:"Login"})
            // return router.go({name: 'Login'})
            // return to.redirect('Login')
          }
        })

        router.start(App, '#app')

      })
  }
  else {
    var App = Vue.extend({})
    var router = new VueRouter({history: true})

    router.map({
        '/': {
          name: 'HomePage',
          component: require('./App.vue'),
          subRoutes: {
            '': {
              name: 'Home',
              component: require('./pages/TotalList.vue')
            },
            'GetAddress': {
                name: 'GetAddress',
                component: require('./pages/GetAddress.vue')
            },
            'HighLvPersonId': {
                name: 'HighLvPersonId',
                component: require('./pages/HighLvPersonId.vue')
            },
            'LifePayment': {
                name: 'LifePayment',
                component: require('./pages/LifePayment.vue')
            },
            'Children': {
                name: 'Children',
                component: require('./pages/Children.vue')
            },
            'BuyHouse': {
                name: 'BuyHouse',
                component: require('./pages/BuyHouse.vue')
            },
            'RentHouse': {
                name: 'RentHouse',
                component: require('./pages/RentHouse.vue')
            },
            'Suggestions': {
              name: 'Suggestions',
              component: require('./pages/Suggestions.vue')
            },
          }
        },
        '/Foo': {
          component: require('./pages/Foo.vue')
        },
        '/*': {
          component: require('./pages/Foo.vue')
        },
        '/Login': {
            name: 'Login',
            component: require('./pages/Login.vue')
        },
        '/SignUp': {
            name: 'SignUp',

            component: require('./pages/SignUp.vue')
        },
        //'Applications': {
        //  name: 'Applications',
        //  component: require('./pages/Applications.vue')
        //},
        //'Suggestions': {
        //  name: 'Suggestions',
        //  component: require('./pages/Suggestions.vue')
        //},
        '/User': {
            component: require('./pages/User.vue'),
            subRoutes: {
              '': {
                component: require('./pages/Usernav.vue')
              },
              '/UserInfo': {
                component: require('./pages/UserInfo.vue')
              },
              '/UserProfessor': {
                component: require('./pages/UserProfessor.vue')
              },
              '/UserProSkill': {
                component: require('./pages/UserProSkill.vue')
              },
              '/UserHonor': {
                component: require('./pages/UserHonor.vue')
              },
              '/UserResults': {
                component: require('./pages/UserResults.vue')
              },
              '/UserOtherFileList': {
                component: require('./pages/UserOtherFileList.vue')
              },
            }
        }
    })

    router.beforeEach(function(to) {
      var user = JSON.parse(localStorage.getItem('baseInfo'))

      if (to.to.path === '/Login' || to.to.path === '/SignUp') {
        return to.next()
      }
      if (user) {
        return to.next()
      }
      else {
        console.log(to)
        // window.location.href = '/Login'
        to.abort()
        router.go({name:"Login"})
      }
    })

    router.start(App, '#app')
  }
}

init()

let url = window.location.href


$.ajax({
  type: 'post',
  url: rest.basicUrl + '/webres/wechat/core/getJsSignature.jsp',
  data: {urlPath: url},
  dataType: 'json'
})
.then(res => {
  if (typeof res === 'string') res = JSON.parse(res)

  let config = {
    debug: false,
    appId: 'wxe1ec4830f40317a0',
    signature: res.data.signature,
    timestamp: res.data.timestamp,
    nonceStr: res.data.nonceStr,
    jsApiList: [
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage'
    ]
  }
  wx.config(config)
  // wx.error(function(res){
  //   alert("config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。");
  // });
  // wx.ready(function(){
  //   alert("config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。");
  //       wx.chooseImage({
  //         success: function (res) {
  //           alert('已选择 ' + res.localIds.length + ' 张图片');
  //         },
  //         fail:function(res){
  //           alert(JSON.stringify(res));
  //         }
  //       })
  // });
})

