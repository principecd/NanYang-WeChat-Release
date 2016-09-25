<template lang="jade">
#app
  div(style='height: 80px; width: 100%;')
  .menu-content
    a.menu.button-collapse(data-activates="slide-out")
      span.fa.fa-bars
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
      a.waves-effect(v-link="{ path: '/Other/HighLvPersonId' }")
        span.fa.fa-level-up
        span(style='margin-left: 15px') 高层次人才认定
    li
      a.waves-effect(v-link="{ path: '/Other/LifePayment' }")
        span.fa.fa-money
        span(style='margin-left: 15px') 生活津贴
    li
      a.waves-effect(v-link="{ path: '/Other/BuyHouse' }")
        span.fa.fa-home
        span(style='margin-left: 15px') 购房补贴
    li
      a.waves-effect(v-link="{ path: '/Other/Children' }")
        span.fa.fa-child
        span(style='margin-left: 15px') 子女择校
    li
      a.waves-effect(v-link="{ path: '/Other/RentHouse' }")
        span.fa.fa-hotel
        span(style='margin-left: 15px') 租房补贴
    li
      a.waves-effect(v-link="{ path: '/Other/GetAddress' }")
        span.fa.fa-bookmark
        span(style='margin-left: 15px') 人才落户
    li
      a.waves-effect(v-link="{ path: '/suggestions' }")
        span.fa.fa-edit
        span(style='margin-left: 15px') 意见建议
    li
      a.waves-effect(v-link="{ path: '/Applications' }")
        span.fa.fa-list
        span(style='margin-left: 15px') 政策申报
    //- a.menu.dropdown-button(data-activates='dropdown2')
    //-   span.fa.fa-ellipsis-v

  router-view
</template>

<script>


var localStorage = window.localStorage

export default {
  data () {
    return {
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
  init() {
  },
  methods: {

  },
  attached () {
    $('.button-collapse').sideNav({
     menuWidth: 300, // Default is 240
     edge: 'left', // Choose the horizontal origin
     closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
     }
   )
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
  box-shadow: 0 1px 2px #999;
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

</style>
