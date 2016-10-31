require('../static/css/materialize.min.css')
require('../static/css/font-awesome.min.css')
require('../static/css/animate.css')
//  http://www.hzts.com.cn:8088/rcjk
import sha1 from 'sha1'
import rest from './rest'
import Vuex from 'vuex'
import FastClick from 'fastclick'

var Vue = require('vue')
// var VueValidator = require('vue-validator')
var VueRouter = require('vue-router')
var vueForm = require('vue-form')

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(require('vue-animated-list'))
Vue.use(vueForm)

// Vue.use(VueValidator)
$(function() {
    FastClick.attach(document.body);
})
init()

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
        if (res.success) {
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
            'Suggestions': {
              name: 'Suggestions',
              component: require('./pages/Suggestions.vue')
            },
            'Applications': {
              name: 'Applications',
              component: require('./pages/Applications.vue')
            },
            '/User': {
                component: require('./pages/User.vue'),
                subRoutes: {
                  '': {
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
            return to.redirect('/Login')
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
        'Applications': {
          name: 'Applications',
          component: require('./pages/Applications.vue')
        },
        'Suggestions': {
          name: 'Suggestions',
          component: require('./pages/Suggestions.vue')
        },
        '/User': {
            component: require('./pages/User.vue'),
            subRoutes: {
              '': {
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
        // window.location.href = '/Login'
        // return router.go({name: 'Login'})
        return to.redirect('/Login')
      }
    })

    router.start(App, '#app')
  }
}

$(document).ready(function() {
  fetch(rest.basicUrl + '/webres/wechat/core/getJsSignature.jsp', {method: 'GET', mode: 'cors', cache: 'default'})
  .then(response => response.json())
  .then(res => {
    let config = {
      debug: true,
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
    wx.error(function(res){
      console.log(res)
    })
  })
})

// function initConfig () {
//   var now = Date.now()
//   var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
//   var timestamp = now
//   var nonce = '123332'
//
//   return {
//     debug: true,
//     appId: 'wxe1ec4830f40317a0',
//     signature: sha1(signature),
//     timestamp: timestamp,
//     nonceStr: nonce,
//     jsApiList: [
//       'chooseImage',
//       'previewImage',
//       'uploadImage',
//       'downloadImage'
//     ]
//   }
// }
//
// var config = initConfig()
