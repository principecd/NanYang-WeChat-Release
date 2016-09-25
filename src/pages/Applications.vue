<template lang="jade">
div
  ul.itemList
    li
      a.waves-effect(style='height: 60px')
    //- li
    //-   a.waves-effect(v-link="{ path: '/User' }")
    //-     span.fa.fa-user
    //-     span(style='margin-left: 15px') 人才基本信息
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
</template>

<script>
export default {
  data() {
    return {
    };
  },
  init() {

  },
  computed: {},
  ready() {

  },
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="css" scoped>
html, body {
  background: #f3f3f3;
}
.itemList {
  color: #666;
  padding-left: 30px;
  font-size: 30px;
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
</style>
