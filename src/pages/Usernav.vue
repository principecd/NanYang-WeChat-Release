<template lang="jade">
.row
  v-loading(:show='loading')
  div
    .col.s6
      ul.itemList1(style='height: 160px;')
        li
          span 姓名 &nbsp;&nbsp;&nbsp;&nbsp;{{basic.xm}}
        li
          span 性别 &nbsp;&nbsp;&nbsp;&nbsp;{{basic.xb === 0?'女' : '男'}}
        li
          span 出生日期 &nbsp;&nbsp;&nbsp;&nbsp;
          br
          span {{basic.csny}}
    .col.s6
        img(v-bind:src='media', v-if='meida', style='width: 100%')
    .col.s12
      span(style='margin: 0 10px; color: #666;') {{basic.zjlx === 'sfz' ? '身份证' : '护照'}} &nbsp;&nbsp;{{basic.sfz}}
ul.itemList
  li
    a.waves-effect(v-link="{ path: '/User/UserInfo' }"  ) 基本信息
    //-  i.fa.fa-graduation-cap(style='margin:0 15px 0 20px; font-size: 20px')

  li
    a.waves-effect(v-link="{ path: '/User/UserProfessor' }"  ) 专业职称
    //-  i.fa.fa-graduation-cap(style='margin:0 15px 0 20px; font-size: 20px')

  li
    a.waves-effect(v-link="{ path: '/User/UserProSkill' }"  ) 专业技能
    //-  i.fa.fa-magic(style='margin:0 20px 0 20px; font-size: 20px')

  li
    a.waves-effect(v-link="{ path: '/User/UserHonor' }"  ) 荣誉称号
    //-  i.fa.fa-book(style='margin:0 20px 0 20px; font-size: 20px')

  li
    a.waves-effect(v-link="{ path: '/User/UserResults' }"  ) 人才业绩成果
    //-  i.fa.fa-road(style='margin:0 20px 0 20px; font-size: 20px')

  li
    a.waves-effect(v-link="{ path: '/User/UserOtherFileList' }"  ) 其他附件
    //-  i.fa.fa-file(style='margin:0 20px 0 20px; font-size: 20px')

</template>

<script>
import rest from '../rest'
import VLoading from './VLoading.vue'
import sha1 from 'sha1'
import vSelect from './VSelect.vue'

var localStorage = window.localStorage

Array.prototype.unique = function()
{
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (!n[this[i]]) //如果hash表中没有当前项
		{
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}

export default {
  // vuex: {
  //   getters: {
  //     user: getUser
  //   }
  // },
  data () {
    return {
      startvl:false,
      rclbsCache: [],
      meida: false,
      media:'',
      loading: false,
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      basic: {
        rclbs: []
      },
      xgzdwxz: [],
      zzmm: [],
      rclbs: []
    };
  },
  computed: {
    rclbsShow: function() {
      let report = ''
      if (this.basic.rclbs && typeof this.basic.rclbs !== 'undefined') {
        if (typeof this.basic.rclbs === 'string') this.basic.rclbs = this.basic.rclbs.split(',')
        let arr = this.basic.rclbs
        console.log(arr)
        arr.forEach(i => {
          let a = this.rclbs.filter(k => {
            return k.value === i
          })

          if (report.length) {
            report = report + ',' + a[0].label
          } else {
            report = a[0].label
          }
        })
      }
      return report
    }
  },
  init () {
    var me = this
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    rest.getOptions('rcfw_xgzdwxz').then(res => {
      me.xgzdwxz = this.rebuildOptions(res)
    })
    rest.getOptions('rcfw_rcxmzzmm').then(res => {
      me.zzmm = this.rebuildOptions(res)
    })
    rest.getOptions('rcfw_rclb').then(res => {

      me.rclbs = this.rebuildOptions(res)

    })
  },
  detached () {
  },
  watch: {
  },
  ready () {
     var me = this
     this.loading = true
     rest.post(this.user, {}, '/rccore/Rcxx/get').then(res => {
       me.loading = false
       me.basic = res.data

       me.rclbsCache=me.basic.rclbs.split(',').unique();
       // me.rclbsShow = this.formatVal()
     })
     rest.post(this.user, {useType: 'RCXXZP'}, '/rccore/RcxxFile/fileList').then(res => {
       if(res.datas&&res.datas[0])
       {
         me.meida = true;
         me.media=this.getSrc(res.datas[0].fileId);
       }
     })
  },
  attached () {
    $('#sidenav-overlay').remove()
  },
  methods: {
  getSrc (fileId) {
        var now = Date.now()
        var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
        var timestamp = now
        var nonce = '123332'
        var query = {
          signature : sha1(signature),
          timestamp : timestamp,
          nonce : '123332',
          'ssoOpenId': this.user.ssoOpenId,
          'rcId': this.user.rcId,
          refId: fileId
        }
        var r = rest.basicUrl + '/rccore/RcxxFile/download?'
        Object.keys(query).forEach(key => {

          r = r + key + '=' + query[key] + '&'
        })
        return r
    },
    formatVal() {
        let report = '';
        if (this.basic.rclbs) {
          let arr = this.basic.rclbs.split(',')

          arr.forEach(i => {
            let a = this.rclbs.filter(k => {
              return k.value === i
            })

            if (report.length) {
              report = report + ',' + a[0].label
            } else {
              report = a[0].label
            }
          })
        }
        return report
    },
    rebuildOptions(options) {
      var report = []
      options.forEach(option => {
        var item = {
          label: option.itemName,
          value: option.itemCode
        }
        report.push(item)
      })

      return report
    }
  },
  components: {
    vSelect,
    VLoading
  }
};
</script>

<style lang="css">
  .dropdown-toggle {
    height: 36px;
    margin-bottom: 18px;
  }
  .v-select .dropdown-toggle {
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom-color: #9e9e9e !important;
    border-radius: 0 !important;
  }
  .dropdown-menu li{
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    padding-left: 5px;
  }
  .dropdown-menu li a {
    width: 100%;
  }
  select {
    width: 100%;
    overflow: hidden;
  }
  select {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 1rem;
    margin: 0 0 20px 0;
    padding: 0;
    box-shadow: none;
    box-sizing: content-box;
    transition: all 0.3s;
    display: block;
  }
  .selectValue {
    margin-bottom: -40px;
    margin-top: 25px;
  }
  .vf-invalid-required{
    border-bottom: 1px solid #F44336 !important;
    box-shadow: 0 1px 0 0 #F44336 !important;
  }
  .itemList1 li{
    height: 30px;
    line-height: 30px;
    margin: 20px 0;
    text-align: left;
  }
  .itemList li {
    height: 40px;
    line-height: 30px;
    margin: 20px 0;
    text-align: center;
  }
  .itemList li a {
    margin-bottom: 20px;
    width: 90%;
    margin-left: 5%;
    height: 20px;
    box-sizing: content-box;
    cursor: pointer;
    padding: 5px 0px;
    border: 1px solid #1a1b1c;
    border-radius: 3px;
    font: normal 18px/normal Times New Roman,Times,serif;
    color: #000;
    text-overflow: clip;
    background: -webkit-linear-gradient(-90deg,#fff,#f1f1f1 50%,#e1e1e1 51%,#f6f6f6);
    background: -webkit-linear-gradient(top,#fff,#f1f1f1 50%,#e1e1e1 51%,#f6f6f6);
    background: linear-gradient(180deg,#fff,#f1f1f1 50%,#e1e1e1 51%,#f6f6f6);
    background-position: 50% 50%;
    background-origin: padding-box;
    background-clip: border-box;
    background-size: auto auto;
    box-shadow: 2px 2px 2px 0 rgba(0,0,0,.2);
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
</style>
