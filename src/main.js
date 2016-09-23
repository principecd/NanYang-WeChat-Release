require('../static/css/materialize.min.css')
require('../static/css/font-awesome.min.css')
require('../static/css/animate.css')
//  http://www.hzts.com.cn:8088/rcjk

var Vue = require('vue')
var VueRouter = require('vue-router')

import rest from './rest'

Vue.use(VueRouter)
Vue.use(require('vue-animated-list'))

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

        var App = Vue.extend({})
        var router = new VueRouter()

        router.map({
            '/': {
              name: 'HomePage',
              component: require('./App.vue')
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
            'Other': {
              component: require('./pages/Other.vue'),
              subRoutes: {
                'HighLvPersonId': {
                    component: require('./pages/HighLvPersonId.vue')
                },
                'LifePayment': {
                    component: require('./pages/LifePayment.vue')
                },
                'Children': {
                    component: require('./pages/Children.vue')
                },
                'BuyHouse': {
                    component: require('./pages/BuyHouse.vue')
                },
                'RentHouse': {
                    component: require('./pages/RentHouse.vue')
                },
                'GetAddress': {
                    component: require('./pages/GetAddress.vue')
                }
              }
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
          }
        })

        router.start(App, '#app')
      })
  }
  else {
    var App = Vue.extend({})
    var router = new VueRouter

    router.map({
        '/': {
          name: 'HomePage',
          component: require('./App.vue')
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
        'Other': {
          component: require('./pages/Other.vue'),
          subRoutes: {
            'HighLvPersonId': {
                component: require('./pages/HighLvPersonId.vue')
            },
            'LifePayment': {
                component: require('./pages/LifePayment.vue')
            },
            'Children': {
                component: require('./pages/Children.vue')
            },
            'BuyHouse': {
                component: require('./pages/BuyHouse.vue')
            },
            'RentHouse': {
                component: require('./pages/RentHouse.vue')
            },
            'GetAddress': {
                component: require('./pages/GetAddress.vue')
            }
          }
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
      }
    })

    router.start(App, '#app')
  }
}
