require('../static/css/materialize.min.css')
require('../static/css/font-awesome.min.css')
require('../static/css/animate.css')
//  http://www.hzts.com.cn:8088/rcjk

var Vue = require('vue')
// var VueValidator = require('vue-validator')
var VueRouter = require('vue-router')
var vueForm = require('vue-form')

import rest from './rest'

Vue.use(VueRouter)
Vue.use(require('vue-animated-list'))
Vue.use(vueForm)

// Vue.use(VueValidator)

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
            'suggestions': {
              name: 'suggestions',
              component: require('./pages/suggestions.vue')
            },
            'Applications': {
              name: 'Applications',
              component: require('./pages/Applications.vue')
            },
            'Other': {
              component: require('./pages/Other.vue'),
              subRoutes: {
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
            window.location.href = '/#!/Login'
            // return router.go({name: 'Login'})
            // return to.redirect('Login')
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
        'Applications': {
          name: 'Applications',
          component: require('./pages/Applications.vue')
        },
        'suggestions': {
          name: 'suggestions',
          component: require('./pages/suggestions.vue')
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
        window.location.href = '/#!/Login'
        // return router.go({name: 'Login'})
        // return to.redirect('Login')
      }
    })

    router.start(App, '#app')
  }
}
