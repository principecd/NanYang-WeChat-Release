<template lang="jade">
#app
  div(style='height: 80px; width: 100%;')
  .menu-content
    a.menu.button-collapse(data-activates="slide-out", @click='hideSide', v-show='index')
      span.fa.fa-bars
    a.menu(v-show='!index', v-link="{ path: '/' }")
      span.fa.fa-arrow-left
  ul.tabs(v-show='index', transition='expand')
    li.tab.col.s3
      a(href="#waiting") 未申请办理
    li.tab.col.s3
      a(href="#active") 已申请办理
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
        span.fa.fa-line-chart
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
    //- a.menu.dropdown-button(data-activates='dropdown2')
    //-   span.fa.fa-ellipsis-v

  router-view(transition="fade", transition-mode="out-in")
</template>

<script>

import store from './vuex/store'

var localStorage = window.localStorage

export default {
  data () {
    return {
      index: true,
      allLoaded: false,
      loading: false,
      user: {

      },
      list: [],
      busy: false
    }
  },
  components: {

  },
  store,
  init() {
  },
  methods: {
    hideSide() {
      $('#sidenav-overlay').remove()
    }
  },
  attached () {
    $('ul.tabs').tabs()

    $('.button-collapse').sideNav({
     menuWidth: 240, // Default is 240
     edge: 'left', // Choose the horizontal origin
     closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
     }
   )
   $('#sidenav-overlay').remove()
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    )
  },
  ready() {
    var index = window.location.pathname
    if (index !== '/') {
      this.index = false
    }
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.bottom-sheet {
  min-height: 60%;
}
body {
  font-family: Helvetica, sans-serif;
  background: #fafafa;
}

#app {
  height: 100%;
}
#sidenav-overlay {
  display: none !important;
  background-color: rgba(0,0,0,0) !important;
  opacity: 0 !important;
}
#app p a {
  display: block;
  padding: 12px;
  color: #333;
  font-size: 15px;
  /*margin: 2px;*/
  padding-left: 25px;
  position: relative;
  z-index: 1000;
  background-color: white;
}

.fade-transition {
  transition: opacity 200ms ease, transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.fade-enter {
  transform: translateX(100%);
  opacity: 0;
}

.fade-leave {
  /*transform: translateY(100%);*/
  opacity: 0;
}
.svg {
  bottom: -50px;
  position: fixed;
  width: 100%;
  /*height: 200px;*/
}

a:link {
  text-decoration:none;
}
a:visited{
  text-decoration:none;
}
a:hover{
  text-decoration:none;
}
a:active{
  text-decoration:none;
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
  /*box-shadow: 0 1px 2px #999;*/
}
#dropdown1 {
  width: 50% !important;
  padding: 0;
  z-index: 9999;
}
#dropdown1 a {
  color: #666;
}
.v-select>.dropdown-menu {
  padding: 3px;
  border: 1px solid#9e9e9e;
}
.menu {
  color: white;
}

.tabs {
  background: #26a69a !important;
  position: fixed;
  /*top: -45px;*/
  top: 40px;
  left: 0;
  z-index: 9999;
}

.tabs li a {
  color: white;
}

.tabs .tab a:hover {
  color: #f3f3f3 !important;
}
.tabs .indicator {
  background-color: #fff !important;
}

/* 必需 */
.expand-transition {
  transition: all .3s ease;
  transition-delay: 200ms;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
  opacity: 0;
}

</style>
