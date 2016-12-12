<template lang="jade">
.row
  v-loading(:show='loading')

  form.col.s12
    .input-field.col.s12
      input.validate(type="text" v-model='basic.xm' placeholder='', v-bind:disabled.once='basic.xm'  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.xm }")
      label.active 姓名
    .col.s12( @click='uploadImg')
      label.active(v-if='!meida' )
        span(style='font-size: 30px' ).fa.fa-cloud-upload
        span(style='margin-left: 10px') 头像
      img(v-bind:src='media', v-if='meida', style='width: 50%')
      hr
    .col.s12
      label.active 性别
      v-select(:value.sync='basic.xb', :options='xb' ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.xb }")
    .input-field.col.s12
      input.validate(type='month', v-model='basic.csny' placeholder='' ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.csny }")
      label.active 出生年月
    .input-field.col.s12
      input(type="text" v-model='basic.sfz' placeholder='', v-bind:disabled.once='basic.sfz' ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.sfz }")
      label.active {{basic.zjlx === 'sfz' ? '身份证' : '护照'}}
    .input-field.col.s12
      input(type="text" v-model='basic.zym' placeholder='')
      label.active 曾用名
    .input-field.col.s12
      input(type="text" v-model='basic.mz' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.mz }")
      label.active 民族
    .input-field.col.s12
      input(type="text" v-model='basic.jg' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.jg }")
      label.active 籍贯
    .col.s12
      label.active 政治面貌
      v-select(v-bind:value.sync='basic.zzmm', v-bind:options='zzmm'  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.zzmm }")
    .col.s12(style='border: 1px solid #ddd;padding: 20px 10px;')
      .input-field.col.s12
        input(type="text" v-model='basic.csxl' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.csxl }")
        label.active 初始学历学位
      .input-field.col.s12
        input(type="text" v-model='basic.csxlyx' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.csxlyx }")
        label.active 毕业学院
      .input-field.col.s12
        input(type="text" v-model='basic.csxlzy' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.csxlzy}")
        label.active 专业
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#csxl985(type="checkbox" v-model='basic.csxl985' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='csxl985') 985学院
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#csxl211(type="checkbox" v-model='basic.csxl211' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='csxl211') 211学院
    .col.s12(style='border: 1px solid #ddd;padding: 20px 10px;margin-top: 10px;margin-bottom: 20px')
      .input-field.col.s12
        input(type="text" v-model='basic.zgxl' placeholder='')
        label.active 最高学历学位
      .input-field.col.s12
        input(type="text" v-model='basic.zgxlyx' placeholder='')
        label.active 毕业学院
      .input-field.col.s12
        input(type="text" v-model='basic.zgxlzy' placeholder='')
        label.active 专业
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#zgxl985(type="checkbox" v-model='basic.zgxl985' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='zgxl985') 985学院
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#zgxl211(type="checkbox" v-model='basic.zgxl211' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='zgxl211') 211学院
    .input-field.col.s12
      input(type="text" v-model='basic.xgzdw' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.xgzdw}")
      label.active 现工作单位
    .input-field.col.s12
      input(type="text" v-model='basic.xgzzw' placeholder=''  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.xgzzw}")
      label.active 职务
    .col.s12
      label.active 企业所属乡镇
      v-select(:value.sync='basic.xgzdwxz', :options='xgzdwxz'  ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.xgzdwxz}")
    .input-field.col.s12
      input(type="text" v-model='basic.sjhm' placeholder='' ,v-bind:class="{ 'vf-invalid-required': startvl&&!basic.sjhm}")
      label.active 手机号码
    .input-field.col.s12
      input(type="text" v-model='basic.dzyj' placeholder='')
      label.active E-mail
    .input-field.col.s12
      input(type="text" v-model='basic.yb' placeholder='')
      label.active 邮编
    .col.s12
      label.active 人才类别
      //- h1 {{basic.rclbs}}
      //- .selectValue {{rclbsShow}}
      //- select(v-model='rclbsCache', style='color: transparent')
      //-   option(v-for='item in rclbs', :value='item.value + "|" + item.label') {{item.label}}
      div(v-for="item in rclbs")
        input(type="checkbox"   id="rcfw{{item.value}}" value='{{item.value}}' v-model="rclbsCache"  )
        label(for="rcfw{{item.value}}") {{item.label}}
      //- span Checked names: {{ rclbsCache }}
      //- br
      //- span basic.rclbs: {{basic.rclbs}}
      //- br
      //- span rclbs:  {{rclbs}}
    .col.s12
      br
      button(class="btn waves-effect waves-light" name="action" v-on:click='submitData') 保存
</template>

<script>
import rest from '../rest'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'
import { uploadImage } from '../rest'
import { chooseImage } from '../rest'
import sha1 from 'sha1'
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
    /*'rclbsCache': function(newVal, val) {
      let i = newVal.split('|')
      if (this.basic.rclbs && this.basic.rclbs.length) {
        if (typeof this.basic.rclbs === 'string') this.basic.rclbs = this.basic.rclbs.split(',')
        let e = this.basic.rclbs.indexOf(i[0])
        if (e > -1) {
          this.basic.rclbs.splice(e, 1)
        } else {
          this.basic.rclbs.push(i[0])
        }
      } else {
        this.basic.rclbs = []
        this.basic.rclbs.push(i[0])
      }
    }*/
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
      this.startvl=false;
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
    uploadImg () {
          let formData = {
            'Encoding': 'utf-8',
            'Rpencoding': 'utf-8',
            '_x-requested-with': true,
            'rcId': this.user.rcId,
            'useType': 'RCXXZP'
          }
          let vm = this
          rest.resetConfig(window.location.href,function(){

                chooseImage()
                  .then(localId => {
                    vm.loading = true

                    vm.media=localId;
                    vm.meida=true;
                    return uploadImage(localId)
                  })
                  .then(serverId => {
                    return rest.postFile(vm.user, formData, serverId, '/rccore/RcxxFile/insert')
                  })
                  .then(res => {
                    if (!res.success) return Materialize.toast(res.message, 4000)
                    vm.loading = false
                  })
          });
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
    },
    submitData (e) {
      e.preventDefault()
      if(!this.startvl){
            this.startvl=true;
      }
      if(!this.basic.xm||!this.basic.xb||!this.basic.csny||!this.basic.sfz||!this.basic.mz||!this.basic.jg||!this.basic.zzmm||!this.basic.csxl||!this.basic.csxlyx||!this.basic.csxlzy||!this.basic.xgzdw||!this.basic.xgzzw||!this.basic.xgzdwxz||!this.basic.sjhm){
        return;
      }
      if(this.rclbsCache.length<=0){
        alert('人才类别不能为空');
        return;
      }
      this.startvl=false;
      var me = this
      this.basic.isAdd = false
      this.loading = true

      this.basic.rclbs=this.rclbsCache

      this.basic.rclbs = this.basic.rclbs.toString()

      rest.post(this.user, this.basic, '/rccore/Rcxx/save').then(res => {
        this.loading = false

        if (!res.success) return Materialize.toast(res.message, 4000)

        this.basic = res.data
        Materialize.toast('保存成功', 2000)
         return this.$router.go('/')
      })
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
</style>
