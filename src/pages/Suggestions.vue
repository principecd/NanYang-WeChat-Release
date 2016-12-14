<template lang="jade">
.row
  v-loading(:show='loading')
  h6(style='margin-top: 15px; color:#666; margin-left: 30px', v-if='today.length') 今天
  ul.collapsible(data-collapsible="accordion", v-if='today.length')
    li(v-for='(index, item) in today')
      .collapsible-header(style='padding: 0')
        .collection
          a.collection-item(style='color:#666') {{item.jyzt}}
            span.badge.new(v-bind:data-badge-caption="item.state_Str", v-bind:class='{blue: item.state_Str === "已回复", yellow: item.state_Str === "已提交", "darken-1": item.state_Str === "已提交"}')
      .collapsible-body
        .me(style='margin-top: 20px')
          span(style='margin-left: 30px; font-size: 15px') {{user.username}}:
          span(style='float: right; margin-right: 30px; font-size: 15px; color: #999')
            //- i.fa.fa-calendar-minus-o
            | {{item.submitTime}}
        p(style='padding-top: 12px') {{item.jyContent}}
        hr(v-if='item.state_Str === "已回复"')
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px; padding-bottom: 5px') {{item.replyContent}}
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px') {{item.replyTime}}

  h6(style='margin-top: 15px; color:#666; margin-left: 30px', v-if='') 三天内
  ul.collapsible(data-collapsible="accordion", v-if='threeDays.length')
    li(v-for='(index, item) in threeDays')
      .collapsible-header(style='padding: 0')
        .collection
          a.collection-item(style='color:#666') {{item.jyzt}}
            span.badge.new(v-bind:data-badge-caption="item.state_Str", v-bind:class='{blue: item.state_Str === "已回复", yellow: item.state_Str === "已提交", "darken-1": item.state_Str === "已提交"}')
      .collapsible-body
        .me(style='margin-top: 20px')
          span(style='margin-left: 30px; font-size: 15px') {{user.username}}:
          span(style='float: right; margin-right: 30px; font-size: 15px; color: #999')
            //- i.fa.fa-calendar-minus-o
            | {{item.submitTime}}
        p(style='padding-top: 12px') {{item.jyContent}}
        hr(v-if='item.state_Str === "已回复"')
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px; padding-bottom: 5px') {{item.replyContent}}
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px') {{item.replyTime}}
  h6(style='margin-top: 15px; color:#666; margin-left: 30px', v-if='thisMonth.length') 本月

  ul.collapsible(data-collapsible="accordion")
    li(v-for='(index, item) in thisMonth')
      .collapsible-header(style='padding: 0')
        .collection
          a.collection-item(style='color:#666') {{item.jyzt}}
            span.badge.new(v-bind:data-badge-caption="item.state_Str", v-bind:class='{blue: item.state_Str === "已回复", yellow: item.state_Str === "已提交", "darken-1": item.state_Str === "已提交"}')
      .collapsible-body
        .me(style='margin-top: 20px')
          span(style='margin-left: 30px; font-size: 15px') {{user.username}}:
          span(style='float: right; margin-right: 30px; font-size: 15px; color: #999')
            //- i.fa.fa-calendar-minus-o
            | {{item.submitTime}}
        p(style='padding-top: 12px') {{item.jyContent}}
        hr(v-if='item.state_Str === "已回复"')
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px; padding-bottom: 5px') {{item.replyContent}}
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px') {{item.replyTime}}
  h6(style='margin-top: 15px; color:#666; margin-left: 30px', v-if='older.length') 更早

  ul.collapsible(data-collapsible="accordion", v-if='older.length')
    li(v-for='(index, item) in older')
      .collapsible-header(style='padding: 0')
        .collection
          a.collection-item(style='color:#666') {{item.jyzt}}
            span.badge.new(v-bind:data-badge-caption="item.state_Str", v-bind:class='{blue: item.state_Str === "已回复", yellow: item.state_Str === "已提交", "darken-1": item.state_Str === "已提交"}')
      .collapsible-body
        .me(style='margin-top: 20px')
          span(style='margin-left: 30px; font-size: 15px') {{user.username}}:
          span(style='float: right; margin-right: 30px; font-size: 15px; color: #999')
            //- i.fa.fa-calendar-minus-o
            | {{item.submitTime}}
        p(style='padding-top: 12px') {{item.jyContent}}
        hr(v-if='item.state_Str === "已回复"')
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px; padding-bottom: 5px') {{item.replyContent}}
        p(v-if='item.state_Str === "已回复"', style='padding-top: 12px') {{item.replyTime}}
  infinite-loading#infinite-loading(:on-infinite="onInfinite", :distance="distance", v-if='list.length < 300 &&  list.length')
  a(v-on:click="modal" class='btn-floating btn-large waves-effect waves-light red btn-add')
    span.fa.fa-plus
  .modal#modal1.col.s12.bottom-sheet
    .modal-content
      .row
        form.col.s12
          .input-field.col.s12
            input.validate(type="text" v-model='postData.jyzt' placeholder='' ,v-bind:class="{ 'vf-invalid-required': startvl&&!postData.jyzt }")
            label.active 主题

          .input-field.col.s12
            textarea.materialize-textarea(v-model='postData.jyContent' placeholder='')
            label.active 内容

    .modal-footer
      a(class="btn waves-effect waves-light" v-on:click='submitData') 提交
      a(class="modal-action modal-close waves-effect waves-green btn-flat") 取消
</template>

<script>
import rest from '../rest'
import VLoading from '../components/VLoading.vue'
import _ from 'lodash'
import Loadmore from '../components/loadmore.vue'
// import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import InfiniteLoading from 'vue-infinite-loading'
import randomToken from 'random-token'
import { getData } from '../vuex/getters'
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
      dataValue: getData
    }
  },
  props: ['index'],
  data () {
    return {
    startvl:false,
      today: [],
      threeDays: [],
      thisMonth: [],
      older: [],
      distance: 100,
      translate: '0',
      postData: {},
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
  watch: {
    today: (newVal, old) => {
      $('.collapsible').collapsible({
        accordion : false
      })
    },
    threeDays(newVal, old) {
      $('.collapsible').collapsible({
        accordion : false
      })
    },
    thisMonth(newVal, old) {
      $('.collapsible').collapsible({
        accordion : false
      })
    },
    older(newVal, old) {
      $('.collapsible').collapsible({
        accordion : false
      })
    }
  },
  methods: {
    isMargin(index) {
      // console.log(index)
      return index % 4 === 0 ? true : false
    },
    modal() {
      $('#modal1').openModal()

    },
    submitData() {
       if(!this.startvl){
            this.startvl=true;
      }
      if(!this.postData.jyzt){
        return;
      }
      this.startvl=false;

      var me = this

      this.loading = true
      this.postData.jyId = randomToken(32)
      this.postData.isAdd = true
      $('#modal1').closeModal()

      rest.post(this.user, this.postData, '/rccore/Yjjy/insert').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)
        this.loading = true

        rest.post(this.user, {start: 0, limit: 50}, '/rccore/Yjjy/page').then(res => {
          this.loading = false
          this.list = []
          if (!res.success) return Materialize.toast(res.message, 4000)
          var now = new Date().getTime()

          this.list = res.datas

          this.today = []
          this.threeDays = []
          this.thisMonth = []
          this.older = []

          this.list.forEach(i => {
            var replyTime = new Date(i.replyTime || i.submitTime).getTime()
            var submitTime = new Date(i.submitTime).getTime()
            var oneDay = 1000 * 60 * 60* 24
            var threeDays = 1000 * 60 * 60 * 24 * 3
            var oneMonth = 1000 * 60 * 60 * 24 * 30
            var a = Number(now) - Number(replyTime)
            var b = Number(now) - Number(submitTime)
            console.log(a / oneDay)
            if (a < oneDay || b < oneDay) {
              this.today.push(i)
            }
            else if (a < threeDays || b < threeDays ) {
              this.threeDays.push(i)
            }
            else if (a < oneMonth || b < oneMonth ) {
              this.thisMonth.push(i)
            }
            else {
              this.older.push(i)
            }
          })
        })

      })
    },
    redirect(item) {
      if (!item.detail) return
      var name = this.filter[item.flowEntityUI]
      return this.$router.go({name: name, query: item.detail})
    },
    onInfinite() {
      var start = this.list.length
      if (!start) return
      rest.post(this.user, {flowOwnerId: this.user.rcId, start: start,limit: 50}, '/rccore/Yjjy/page').then(res => {
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

        return me.$router.go({name: name, query: item.detail})
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
      accordion : false
    })
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
  ready() {
  this.$parent.index = false
  this.startvl=false;
    var me = this
    this.loading = true
    rest.post(this.user, {start: 0, limit: 50}, '/rccore/Yjjy/page').then(res => {
      this.loading = false
      if (!res.success) return Materialize.toast(res.message, 4000)
      var now = new Date().getTime()

      this.list = res.datas
      this.list.forEach(i => {
        console.log(i)
        var replyTime = new Date(i.replyTime || i.submitTime).getTime()
        var submitTime = new Date(i.submitTime).getTime()
        var oneDay = 1000 * 60 * 60* 24
        var threeDays = 1000 * 60 * 60 * 24 * 3
        var oneMonth = 1000 * 60 * 60 * 24 * 30
        var a = Number(now) - Number(replyTime)
        var b = Number(now) - Number(submitTime)
        console.log(a / oneDay)
        if (a < oneDay || b < oneDay) {
          this.today.push(i)
        }
        else if (a < threeDays || b < threeDays ) {
          this.threeDays.push(i)
        }
        else if (a < oneMonth || b < oneMonth ) {
          this.thisMonth.push(i)
        }
        else {
          this.older.push(i)
        }
      })
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
.btn-add {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.bottom-sheet {
  min-height: 60%;
}
body {
  font-family: Helvetica, sans-serif;
  background: #fafafa;
  display: block;
}
.marginBtn {
  margin-bottom: 12px;
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
hr {
  width: 90%;
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
.vf-invalid-required{
 border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
}
</style>
