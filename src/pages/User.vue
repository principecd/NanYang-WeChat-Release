<template lang="jade">
div
  div(style='height: 80px; width: 100%;')
  .menu-content
    a.menu.button-collapse(data-activates="slide-out")
      span.fa.fa-bars
    a.menu.dropdown-button(@click='itemBar', style='height: 50px; width: 50px; line-height: 50px; margin-right: -40px')
      span.fa.fa-ellipsis-v
    #itemBar.modal.bottom-sheet(style='max-height: 80%;background: #f3f3f3;')
      .modal-content(style='padding: 0 !important')
        ul.itemList
          li
            a.waves-effect(v-link="{ path: '/User/UserProfessor' }", @click='closeItemBar')
              i.fa.fa-graduation-cap(style='margin:0 15px 0 20px; font-size: 20px')
              | 专业职称
          li
            a.waves-effect(v-link="{ path: '/User/UserProSkill' }", @click='closeItemBar')
              i.fa.fa-magic(style='margin:0 20px 0 20px; font-size: 20px')
              | 专业技能
          li
            a.waves-effect(v-link="{ path: '/User/UserHonor' }", @click='closeItemBar')
              i.fa.fa-book(style='margin:0 20px 0 20px; font-size: 20px')
              | 荣誉称号
          li
            a.waves-effect(v-link="{ path: '/User/UserResults' }", @click='closeItemBar')
              i.fa.fa-road(style='margin:0 20px 0 20px; font-size: 20px')
              | 人才业绩成果
          li
            a.waves-effect(v-link="{ path: '/User/UserOtherFileList' }", @click='closeItemBar')
              i.fa.fa-file(style='margin:0 20px 0 20px; font-size: 20px')
              | 其他附件
  ul#slide-out.side-nav(style='color: #666')
    li
      a.waves-effect(style='height: 60px')
    li
      a.waves-effect(v-link="{ path: '/' }")
        span.fa.fa-home
        span(style='margin-left: 15px') 首页
    li
      a.waves-effect(v-link="{ path: '/User' }")
        span.fa.fa-user
        span(style='margin-left: 15px') 人才基本信息
    li
      a.waves-effect(v-link="{ path: '/HighLvPersonId' }")
        span.fa.fa-level-up
        span(style='margin-left: 15px') 高层次人才认定
    li
      a.waves-effect(v-link="{ path: '/LifePayment' }")
        span.fa.fa-money
        span(style='margin-left: 15px') 生活津贴
    li
      a.waves-effect(v-link="{ path: '/BuyHouse' }")
        span.fa.fa-home
        span(style='margin-left: 15px') 购房补贴
    li
      a.waves-effect(v-link="{ path: '/Children' }")
        span.fa.fa-child
        span(style='margin-left: 15px') 子女择校
    li
      a.waves-effect(v-link="{ path: '/RentHouse' }")
        span.fa.fa-hotel
        span(style='margin-left: 15px') 租房补贴
    li
      a.waves-effect(v-link="{ path: '/GetAddress' }")
        span.fa.fa-bookmark
        span(style='margin-left: 15px') 人才落户
    li
      a.waves-effect(v-link="{ path: '/Suggestions' }")
        span.fa.fa-edit
        span(style='margin-left: 15px') 意见建议
    li
      a.waves-effect(v-link="{ path: '/Applications' }")
        span.fa.fa-list
        span(style='margin-left: 15px') 政策申报
    //- br
    //- li
    //-   a.waves-effect(@click='logout') 注销
  router-view
</template>

<script>
import UserInfo from './UserInfo.vue'
import UserProfessor from './UserProfessor.vue'

export default {
  data () {
    return {
      tabs: {
        info: true,
        professor: false
      }
    }
  },
  computed: {},
  ready () {
    // this.$root.user = {
    //   ssoOpenId: '1544902973BD4F4A9C4E621479DCF9CA',
    //   rcId: '1544902973BD4F4A9C4E621479DCF9CA'
    // }
  },
  attached () {
    $('.button-collapse').sideNav({
       menuWidth: 240, // Default is 240
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
       }
     )
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    )
  },
  methods: {
    logout() {
      localStorage.clear()
      return this.$router.go({name: 'Login'})
    },
    itemBar() {
      $('#itemBar').openModal()
    },
    closeItemBar() {
      $('#itemBar').closeModal()

    },
    change (tab) {
      var me = this

      Object.keys(this.tabs).forEach(key => {
        me.tabs[key] = false
      })
      this.tabs[tab] = true
    }
  },
  components: {
    UserInfo,
    UserProfessor
  }
};
</script>

<style lang="css">
.bottom-sheet {
  max-height: 80%
}
.modal .modal-content {
  padding: 25px 0 !important;
}
.card-image {
  padding-top: 0 !important;
}
.itemList {
  color: #666
}
.itemList li {
  /*background: white;*/
  /*border: 1px solid#eee;*/
  height: 50px;
  line-height: 50px;
  /*padding-left: 20px;*/
  margin: 0 10px;
  color: #666;
}
.itemList li a {
  color: #666;
  display: block;
  width: 100%;
  height: 50px;
  font-size: 15px;
}
.menu-content{
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  padding: 0 20px;
  color: white;
  background: #26a69a;
  font-size: 21px;
  z-index: 99999999;
}
#dropdown2 {
  width: 50% !important;
  padding: 0;
  z-index: 9999;
  right: 0 !important;
  left: auto !important;
}
#dropdown2 a {
  color: #666;
}
.v-select>.dropdown-menu {
  padding: 3px;
  border: 1px solid#9e9e9e;
}
.menu {
  color: white;
}
/*.expand-transition {
}

.expand-enter {
  -webkit-animation: fadeInRight .3s forwards;
}*/
/*.expand-leave {
  animation: fadeOutLeft .8s forwards;
}*/
</style>
