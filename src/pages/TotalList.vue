<template lang="jade">
div
  div
    #waiting
        v-loading(:show='loading')
        .card(v-for='item in list', v-if='!item.flowDoStageInfo')
          .card-content
            .fixed-action-btn.horizontal(style="bottom: 35px; right: 24px; position: absolute", @click='getItemDetail(item)')
                a.btn-floating.btn-large(v-bind:class='{"red": item.flowEntityUI === "/rccore/Shjt/flowUI", "pink": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "purple": item.flowEntityUI === "/rccore/Rcrd/flowUI", "blue": item.flowEntityUI === "/rccore/Rcpo/flowUI", "green": item.flowEntityUI === "/rccore/Zx/flowUI", "amber": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
                  i.fa(v-bind:class='{"fa-money": item.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": item.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-line-chart": item.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": item.flowEntityUI === "/rccore/Zx/flowUI", "fa-hotel": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
            div
                span.card-title
                  i.fa(v-bind:class='{"fa-money": item.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": item.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-line-chart": item.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": item.flowEntityUI === "/rccore/Zx/flowUI", "fa-hotel": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
                |     {{item.flowEntityInfo}}
                p {{item.flowEntityTime}}
                p(v-if='item.flowDoStageInfo') 办理情况：{{item.flowDoStageInfo}}
                p(v-if='!item.flowDoStageInfo') 当前状态：临时保存
          .card-action
            .btn-list
              a.waves-effect(v-for='i in filter[item.flowEntityUI].tranList', @click='verStart({"i": i, "flowEntityUI": item.flowEntityUI, "flowEntityId": item.flowEntityId, "flowEntityInfo": item.flowEntityInfo})') {{i.tranName}}

    #active

            .card(v-if='item.flowDoStageInfo', v-for='item in list')
              .card-content
                span.card-title
                  i.fa(v-bind:class='{"fa-money": item.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": item.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": item.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-home": item.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": item.flowEntityUI === "/rccore/Zx/flowUI", "fa-home": item.flowEntityUI === "/rccore/Poxx/flowUI"}')
                |     {{item.flowEntityInfo}}
                p {{item.flowEntityTime}}
                p(v-if='item.flowDoStageInfo') 办理情况：{{item.flowDoStageInfo}}
                p(id='ysq{{item.flowEntityId}}')

             //- .card(v-for='stageItems in stageList')
             //-   .card-content
             //-     span.card-title
             //-       i.fa(v-bind:class='{"fa-money": stageItems.flowEntityUI === "/rccore/Shjt/flowUI", "fa-bookmark": stageItems.flowEntityUI === "/rccore/SettledAddress/flowUI", "fa-level-up": stageItems.flowEntityUI === "/rccore/Rcrd/flowUI", "fa-home": stageItems.flowEntityUI === "/rccore/Rcpo/flowUI", "fa-child": stageItems.flowEntityUI === "/rccore/Zx/flowUI", "fa-home": stageItems.flowEntityUI === "/rccore/Poxx/flowUI"}')
             //-     |     {{stageItems.flowEntityInfo}}
             //-     p {{stageItems.flowEntityTime}}
             //-     p(id='ysq{{stageItems.flowEntityId}}')

  infinite-loading#infinite-loading(:on-infinite="onInfinite", :distance="distance", v-if='list.length < 300 &&  list.length')
</template>

<script>
import UserInfo from './UserInfo.vue'
import rest from '../rest'
import VLoading from '../components/VLoading.vue'
import _ from 'lodash'
import Loadmore from '../components/loadmore.vue'
// import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import InfiniteLoading from 'vue-infinite-loading'
import { getData } from '../vuex/getters'
import { incrementCounter } from '../vuex/actions'

// /rccore/Rcrd/tranList
// /rccore/Shjt/tranList
// /rccore/Zx/tranList
// /rccore/Rcpo/tranList
// /rccore/Poxx/tranList
// /rccore/SettledAddress/tranList

var localStorage = window.localStorage

export default {
  vuex: {
    getters: {
      // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
      dataValue: getData
    },
    actions: {
      increment: incrementCounter
    }
  },
  props: ['index'],
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
      list: [],//list[0].stageItems[0].flowStageName
      listCache: [],
      stageList:[],
      stagedatas:[],
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
          flowId: 'FE195B8E150946A5AB871DA314142C80',
          getMore: '/rccore/Zxzn/list',
          childrenKey: 'zxznData'
        },
        '/rccore/Rcpo/flowUI': {
          name: 'BuyHouse',
          getUrl: '/rccore/Rcpo/get',
          tranListUrl: '/rccore/Rcpo/tranList',
          verStartUrl: '/rccore/Rcpo/verStart',
          flowId: '092FBACA67D7442613CC824B7025F953',
          getMore: '/rccore/Qtcy/list',
          childrenKey: 'qtcyInfo'
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
          flowId: '3937D50EF0AA76803976CF9B12EBA618',
          getMore: '/rccore/SettledAddressFile/fileList',
          childrenKey: 'transferPersonJson'
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
    this.list = []
    this.listCache = []
    this.stageList = []
    this.user = JSON.parse(localStorage.getItem('baseInfo'))
  },
  methods: {
    deleteItem(item) {

    },
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
        this.getStageList()
        this.$broadcast('$InfiniteLoading:loaded')
        // var offset = $('#cardList').height() - 300
        // $('body, html').animate({'scrollTop': offset}, '1000')
      })
    },
    logout() {

      localStorage.clear()
      return this.$router.go({name: 'Login', query: {'do': 'edit'}})
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
        this.increment(res.data)
        return this.$router.go({name:`${name}`, query: {'do': 'edit'}})
        // window.location.href = `/${name}`

      })
    },
    verStart(a) {
      var me = this
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

        if (this.filter[flowEntityUI].getMore) {
          rest.post(this.user, i, this.filter[flowEntityUI].getMore).then(myChildren => {
            myChildren.datas.forEach(v => {
              v.saveInDatebase = 'false'
            })
            data[this.filter[flowEntityUI].childrenKey] = JSON.stringify(myChildren.datas)
            rest.post(this.user, data, this.filter[flowEntityUI].verStartUrl).then(cb => {
              // console.log(cb)
              this.loading = false
              if (!cb.success) {
                return Materialize.toast(cb.message, 4000)
              }
              Materialize.toast('已申请办理', 4000)
              me.list = []
              me.reflash()
            })
          })
        }
        else {
          rest.post(this.user, data, this.filter[flowEntityUI].verStartUrl).then(cb => {
            // console.log(cb)
            this.loading = false
            if (!cb.success) {
              return Materialize.toast(cb.message, 4000)
            }
            Materialize.toast('已申请办理', 4000)
            me.list = []
            me.reflash()
          })
        }
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
        this.getStageList();
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
         this.getStageList();
      })
    },
    getStageList(){
      //alert('getStageList')
      var me = this
      //alert(JSON.stringify(me.list))
         me.list.forEach(item => {
            //var listItem = this
            if(item.flowDoStageInfo){
                  rest.post(me.user, {flowEntityId: item.flowEntityId}, '/flowengine/run/full/stagePage').then(res => {
                    //alert(JSON.stringify(res))
                    if (!res.success) return Materialize.toast(res.message, 4000)
                    /*
                     me.stageList.push({
                        flowEntityUI:item.flowEntityUI,
                        flowEntityInfo:item.flowEntityInfo,
                        flowEntityTime:item.flowEntityTime,
                        flowDoStageInfo:item.flowDoStageInfo,
                        flowEntityId:item.flowEntityId
                     })
                     */
                     var str = '';
                     res.datas.forEach(aaaa=>{
                          if(aaaa.flowStageName)      str+='<p>环节名称:'+aaaa.flowStageName        +'</p>';
                          if(aaaa.flowEntityTime)     str+='<p>提交时间:'+aaaa.flowEntityTime       +'</p>';
                          if(aaaa.flowDoTime)         str+='<p>办理时间:'+aaaa.flowDoTime           +'</p>';
                          if(aaaa.flowStageDoStateStr)str+='<p>办理状态:'+aaaa.flowStageDoStateStr  +'</p>';
                          if(aaaa.flowTranName)       str+='<p>办理结果:'+aaaa.flowTranName         +'</p>';
                          str+='<br>'
                     })

                    //alert(str);
                    $('#ysq'+item.flowEntityId).html(str);

                  })
            }
            //alert(JSON.stringify(item));
        })


    },
    reflash() {
      var me = this
      this.loading = true

      rest.post(this.user, {flowOwnerId: this.user.rcId, start: 0,limit: 50}, '/flowengine/run/full/entityPage').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)
         this.listCache = res.datas

         if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
           me.list = me.listCache
         }
         setTimeout(function() {
           me.getStageList();
        }, 300)

      })


      Object.keys(this.filter).forEach(key => {
        var value = JSON.parse(localStorage.getItem(key))
        rest.get(this.user, {flowId: this.filter[key].flowId}, this.filter[key].tranListUrl).then(res => {
          if (!res.success) return Materialize.toast(res.message, 4000)
          me.filter[key].tranList = res.datas
          localStorage.setItem(key, JSON.stringify(res.datas))
          if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
            this.loading = false
            me.list = me.listCache
          }
        })
        // if (!value) {
        //
        // }
        // else {
        //   me.filter[key].tranList = value
        //
        //   if (me.filter['/rccore/Rcrd/flowUI'].tranList && me.filter['/rccore/Shjt/flowUI'].tranList && me.filter['/rccore/Zx/flowUI'].tranList && me.filter['/rccore/Rcpo/flowUI'].tranList && me.filter['/rccore/Poxx/flowUI'].tranList && me.filter['/rccore/SettledAddress/flowUI'].tranList && me.listCache.length) {
        //     this.loading = false
        //     me.list = me.listCache
        //   }
        // }
      })
    }
  },
  attached () {
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    })

    setTimeout(function() {
      $('ul.tabs').tabs()
    }, 300)

    $('#sidenav-overlay').remove()
  //   $('.button-collapse').sideNav({
  //    menuWidth: 300, // Default is 240
  //    edge: 'left', // Choose the horizontal origin
  //    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  //    }
  //  )
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
    this.$parent.index = true
    this.reflash()
    this.getStageList()
  },
  mounted(){
    this.getStageList()
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
  animation-delay: 300ms;
  -wekbit-animation: fadeInUp 600ms cubic-bezier(.55,0,.1,1) forwards;
  -wekbit-animation-delay: 300ms;
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
</style>
