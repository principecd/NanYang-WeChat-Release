<template lang="jade">
#app
  div(style='height: 60px; width: 100%;')
  .menu-content
    a.menu.button-collapse(@click='slideBar', data-activates="slide-out")
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
    //- ul#dropdown1.dropdown-content(style='margin-left: -20px')
    //-   li(style='margin-top: 20px')
    //-     a(v-link="{ path: '/User' }") 人才基本信息
    //-   li
    //-     a(v-link="{ path: '/Other/HighLvPersonId' }") 高层次人才认定
    //-   li
    //-     a(v-link="{ path: '/Other/LifePayment' }") 生活津贴
    //-   li
    //-     a(v-link="{ path: '/Other/BuyHouse' }") 购房补贴
    //-   li
    //-     a(v-link="{ path: '/Other/Children' }") 子女择校
    //-   li
    //-     a(v-link="{ path: '/Other/RentHouse' }") 租房补贴
    //-   li
    //-     a(v-link="{ path: '/Other/RentHouse' }") 人才落户
    //- a.menu.dropdown-button(data-activates='dropdown2')
    //-   span.fa.fa-ellipsis-v
  //- p
  //-   br
  //-   a(v-link="{ path: '/User' }") 人才信息
  //-   br
  //-   a(v-link="{ path: '/HighLvPersonId' }") 高层次人才认定
  //-   a(v-link="{ path: '/LifePayment' }") 生活津贴
  //-   br
  //-   a(v-link="{ path: '/Children' }") 子女择校
  //-   a(v-link="{ path: '/BuyHouse' }") 购房补贴
  //-   br
  //-   a(v-link="{ path: '/RentHouse' }") 租房补贴
  //-   a(v-link="{ path: '/GetAddress' }")
  //- loadmore(:top-method="loadTop", :bottom-method="loadBottom", :bottom-all-loaded="allLoaded", style='width: 100%; height: 100%;', topPullText='', topDropText='')
  //- loadmore#cardList(:bottom-method="loadBottom", :bottom-all-loaded="allLoaded", :bottom-status.sync='bottomStatus', :translate='translate')
  //-   div(slot="top" class="mint-loadmore-top")
  //-   div(slot="bottom" class="mint-loadmore-bottom", style='text-align: center;')
  //-     h6(v-if='bottomStatus === "drop"', style='font-size: 20px') 加载更过
  //-     moon-loader(v-if='bottomStatus === "loading"', :loading='bottomStatus === "loading"', :color="color", :size="size")
      //- i.fa.fa-spinner.fa-spin(v-if='bottomStatus === "loading"', style='font-size: 30px; color: #999')
  div
    ul.tabs(style='background: #26a69a; margin-top: -10px;')
      li.tab.col.s3
        a(href="#waiting", style='color: white') 未申请办理
      li.tab.col.s3
        a(href="#active", style='color: white') 已申请办理
    #waiting
        v-loading(:show='loading')
        .card(v-for='item in list', v-if='!item.flowDoStageInfo')
          .card-content
            div
                span.card-title
                  i.fa(v-bind:class='{"fa-money": item.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": item.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-home": item.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": item.flowEntityUI === "/rccore/Zx/flowUI", "fa-home": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
                |     {{item.flowEntityInfo}}
                p {{item.flowEntityTime}}
                p(v-if='item.flowDoStageInfo') 办理情况：{{item.flowDoStageInfo}}
                p(v-if='!item.flowDoStageInfo') 当前状态：临时保存
          .card-action
            .btn-list
              a.waves-effect(@click='getItemDetail(item)') 修改
              a.waves-effect(v-for='i in filter[item.flowEntityUI].tranList', @click='verStart({"i": i, "flowEntityUI": item.flowEntityUI, "flowEntityId": item.flowEntityId, "flowEntityInfo": item.flowEntityInfo})') {{i.tranName}}

    #active

            .card(v-if='item.flowDoStageInfo', v-for='item in list')
              .card-content
                span.card-title
                  i.fa(v-bind:class='{"fa-money": item.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": item.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-home": item.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": item.flowEntityUI === "/rccore/Zx/flowUI", "fa-home": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
                |     {{item.flowEntityInfo}}
                p {{item.flowEntityTime}}
                p(v-if='item.flowDoStageInfo') 办理情况：{{item.flowDoStageInfo}}
                p(v-if='!item.flowDoStageInfo') 当前状态：临时保存
  infinite-loading#infinite-loading(:on-infinite="onInfinite", :distance="distance", v-if='list.length < 300 &&  list.length')
</template>

<script>
import UserInfo from './pages/UserInfo.vue'
import rest from './rest'
import VLoading from './components/VLoading.vue'
import _ from 'lodash'
import Loadmore from './components/loadmore.vue'
// import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import InfiniteLoading from 'vue-infinite-loading'
// /rccore/Rcrd/tranList
// /rccore/Shjt/tranList
// /rccore/Zx/tranList
// /rccore/Rcpo/tranList
// /rccore/Poxx/tranList
// /rccore/SettledAddress/tranList

var localStorage = window.localStorage

export default {
  data () {
    return {
      distance: 100,
      translate: '0',
      color: '#26a69a',
      size: '40px',
      bottomStatus: '',
      bottomPullText: ' ',
      topLoadingText: ' ',
      topDropText: ' ',
      topPullText: ' ',
      bottomLoadingText: ' ',
      bottomDropText: ' ',
      topStatus: '',
      allLoaded: false,
      loading: false,
      list: [],
      listCache: [],
      busy: false,
      filter: {
        '/rccore/Rcrd/flowUI': {
          name: 'HighLvPersonId',
          getUrl: '/rccore/Rcrd/get',
          tranListUrl: '/rccore/Rcrd/tranList',
          verStartUrl: '/rccore/Rcrd/verStart',
          flowId: '403942F8F0B920C372128083DCFF75A0'
        },
        '/rccore/Shjt/flowUI': {
          name: 'LifePayment',
          getUrl: '/rccore/Shjt/get',
          tranListUrl: '/rccore/Shjt/tranList',
          verStartUrl: '/rccore/Shjt/verStart',
          flowId: '1C4C5A0B871558CDE9C465856D5F3B0C'
        },
        '/rccore/Zx/flowUI': {
          name: 'Children',
          getUrl: '/rccore/Zx/get',
          tranListUrl: '/rccore/Zx/tranList',
          verStartUrl: '/rccore/Zx/verStart',
          flowId: 'FE195B8E150946A5AB871DA314142C80'
        },
        '/rccore/Rcpo/flowUI': {
          name: 'BuyHouse',
          getUrl: '/rccore/Rcpo/get',
          tranListUrl: '/rccore/Rcpo/tranList',
          verStartUrl: '/rccore/Rcpo/verStart',
          flowId: '092FBACA67D7442613CC824B7025F953'
        },
        '/rccore/Poxx/flowUI': {
          name: 'RentHouse',
          getUrl: '/rccore/Poxx/get',
          tranListUrl: '/rccore/Poxx/tranList',
          verStartUrl: '/rccore/Poxx/verStart',
          flowId: '2aecc2e9691811e6add500155d017903'
        },
        '/rccore/SettledAddress/flowUI': {
          name: 'GetAddress',
          getUrl: '/rccore/SettledAddress/get',
          tranListUrl: '/rccore/SettledAddress/tranList',
          verStartUrl: '/rccore/SettledAddress/verStart',
          flowId: '3937D50EF0AA76803976CF9B12EBA618'
        }
      }
    }
  },
  components: {
    VLoading,
    Loadmore,
    // MoonLoader,
    InfiniteLoading,
    'loadmore': Loadmore
  },
  init() {
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

  },
  methods: {
    redirect(item) {
      if (!item.detail) return
      var name = this.filter[item.flowEntityUI]
      return this.$router.go({name: name, query: item.detail})
    },
    onInfinite() {
      var start = this.list.length
      if (!start) return
      rest.post(this.user, {flowOwnerId: this.user.rcId, start: start,limit: 50}, '/flowengine/run/full/entityPage').then(res => {
        // this.loading = false
        this.allLoaded = false
        this.bottomStatus = ''
        if (!res.success) return Materialize.toast(res.message, 4000)
        res.datas.forEach(i => {
          this.list.push(i)
        })
        this.$broadcast('$InfiniteLoading:loaded')
        // var offset = $('#cardList').height() - 300
        // $('body, html').animate({'scrollTop': offset}, '1000')
      })
    },
    logout() {

      localStorage.clear()
      return this.$router.go({name: 'Login'})
    },
    formatFilter() {

    },
    slideBar() {

    },
    getItemDetail(item) {
      var url = this.filter[item.flowEntityUI].getUrl

      var fff = {
        '/rccore/Rcrd/flowUI': 'sqId',
        '/rccore/Shjt/flowUI': 'jtId',
        '/rccore/Zx/flowUI': 'zxId',
        '/rccore/Rcpo/flowUI': 'poId',
        '/rccore/Poxx/flowUI': 'poId',
        '/rccore/SettledAddress/flowUI': 'settledGuid'
      }
      var key = fff[item.flowEntityUI]
      var data = {}
      // data[key] = item.flowEntityId
      data[key] = item.flowEntityId
      var me = this
      this.loading = true
      rest.post(this.user, data, url).then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)

        item.detail = res.data

        var name = this.filter[item.flowEntityUI].name

        return this.$router.go({name: name, query: item.detail})
      })
    },
    verStart(a) {

      var flowEntityUI = a.flowEntityUI
      var i = a.i
      i.flowEntityUI = flowEntityUI
      var fff = {
        '/rccore/Rcrd/flowUI': 'sqId',
        '/rccore/Shjt/flowUI': 'jtId',
        '/rccore/Zx/flowUI': 'zxId',
        '/rccore/Rcpo/flowUI': 'poId',
        '/rccore/Poxx/flowUI': 'poId',
        '/rccore/SettledAddress/flowUI': 'settledGuid'
      }
      var key = fff[flowEntityUI]
      i[key] = a.flowEntityId
      i.flowEntityInfo = a.flowEntityInfo
      i.flowEntityId = a.flowEntityId
      var url = this.filter[flowEntityUI].getUrl

      this.loading = true
      rest.post(this.user, i, url).then(res => {
        this.loading = false

        if (!res.success) {
          return Materialize.toast(res.message, 4000)
        }

        res.data.isAdd = false
        res.data.flowTranId = i.tranId
        res.data.flowEntityId = i.flowEntityId
        res.data.flowEntityInfo = i.flowEntityInfo
        res.data.flowVerId = i.flowVerId
        res.data.flowEntityUI = i.flowEntityUI
        var data = res.data
        this.loading = true
        rest.post(this.user, data, this.filter[flowEntityUI].verStartUrl).then(cb => {
          // console.log(cb)
          this.loading = false
          if (!cb.success) {
            return Materialize.toast(cb.message, 4000)
          }
          return Materialize.toast('已提交', 4000)


        })
      })
    },
    loadBottom() {
      // this.loading = true
      this.allLoaded = true

      var start = this.list.length
      rest.post(this.user, {flowOwnerId: this.user.rcId, start: start,limit: 50}, '/flowengine/run/full/entityPage').then(res => {
        // this.loading = false
        this.allLoaded = false
        this.bottomStatus = ''
        if (!res.success) return Materialize.toast(res.message, 4000)
        res.datas.forEach(i => {
          this.list.push(i)
        })
        var offset = $('#cardList').height() - 300
        $('body, html').animate({'scrollTop': offset}, '1000')
      })
    },
    loadTop() {
      // console.log('loading-more')
      this.loading = true
      this.list = []
      rest.post(this.user, {flowOwnerId: this.user.rcId, start: 0,limit: 50}, '/flowengine/run/full/entityPage').then(res => {
        this.loading = false
        this.topStatus = ''

        if (!res.success) return Materialize.toast(res.message, 4000)
         this.list = res.datas
      })
    }
  },
  attached () {
    $('ul.tabs').tabs()
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    })
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
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    )
  },
  ready() {
    var me = this
    this.loading = true
    rest.post(this.user, {flowOwnerId: this.user.rcId, start: 0,limit: 50}, '/flowengine/run/full/entityPage').then(res => {
      this.loading = false

      if (!res.success) return Materialize.toast(res.message, 4000)
       this.listCache = res.datas

       if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
         me.list = me.listCache
       }
    })

    Object.keys(this.filter).forEach(key => {
      var value = JSON.parse(localStorage.getItem(key))
      if (!value) {
        rest.get(this.user, {flowId: this.filter[key].flowId}, this.filter[key].tranListUrl).then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          me.filter[key].tranList = res.datas
          localStorage.setItem(key, JSON.stringify(res.datas))
          if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
            this.loading = false
            me.list = me.listCache
          }
        })
      }
      else {
        me.filter[key].tranList = value

        if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
          this.loading = false
          me.list = me.listCache
        }
      }
    })
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.bottom-sheet {
  min-height: 60%;
}
body {
  font-family: Helvetica, sans-serif;
  background: #fafafa;
  display: block;
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
.item-transition {
  animation: fadeInUp 600ms cubic-bezier(.55,0,.1,1) forwards;
  -wekbit-animation: fadeInUp 600ms cubic-bezier(.55,0,.1,1) forwards;
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
  box-shadow: none;
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
.mint-loadmore-top span {
  display: inline-block;
  transition: .2s linear;
}
.rotate {
  transform: rotate(180deg);
}
.btn-list a{
  color: #666;
}
</style>
