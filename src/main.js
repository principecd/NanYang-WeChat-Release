require('../static/css/materialize.min.css')
require('../static/css/font-awesome.min.css')
require('../static/css/animate.css')

var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)
Vue.use(require('vue-animated-list'))

var App = Vue.extend({})
var router = new VueRouter()
var localStorage = window.localStorage

// var baseInfo = {
//   ssoOpenId: '1544902973BD4F4A9C4E621479DCF9CA',
//   rcId: '1544902973BD4F4A9C4E621479DCF9CA'
// }
// localStorage.setItem('baseInfo', JSON.stringify(baseInfo))

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


// router.redirect({'*': '/Login'})
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
