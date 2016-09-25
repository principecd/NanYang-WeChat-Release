<template lang="jade">
.row
  v-loading(:show='loading')

  form.col.s12
    .input-field.col.s12
      input.validate(type="text" v-model='basic.xm' placeholder='', v-bind:disabled.once='basic.xm')
      label.active 用户名
    .col.s12
      label.active 性别
      v-select(:value.sync='basic.xb', :options='xb')
    .input-field.col.s12
      input.validate(type='month', v-model='basic.csny' placeholder='')
      label.active 出生年月
    .input-field.col.s12
      input(type="text" v-model='basic.sfz' placeholder='', v-bind:disabled.once='basic.sfz')
      label.active 身份证（护照）
    .input-field.col.s12
      input(type="text" v-model='basic.zym' placeholder='')
      label.active 曾用命
    .input-field.col.s12
      input(type="text" v-model='basic.mz' placeholder='')
      label.active 民族
    .input-field.col.s12
      input(type="text" v-model='basic.jg' placeholder='')
      label.active 籍贯
    .col.s12
      label.active 政治面貌
      v-select(v-bind:value.sync='basic.zzmm', v-bind:options='zzmm')
    .col.s12(style='border: 1px solid #ddd;padding: 20px 10px;')
      .input-field.col.s12
        input(type="text" v-model='basic.csxl' placeholder='')
        label.active 初始学历学位
      .input-field.col.s12
        input(type="text" v-model='basic.csxlyx' placeholder='')
        label.active 毕业学院
      .input-field.col.s12
        input(type="text" v-model='basic.csxlzy' placeholder='')
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
        input(type="text" v-model='basic.zgxlxl' placeholder='')
        label.active 专业
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#zgxl985(type="checkbox" v-model='basic.zgxl985' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='zgxl985') 985学院
      .col.s12(style='position: relative; margin: 7px 0; ')
        input#zgxl211(type="checkbox" v-model='basic.zgxl211' v-bind:true-value='"Y"' v-bind:false-value='"N"')
        label(for='zgxl211') 211学院
    .input-field.col.s12
      input(type="text" v-model='basic.xgzdw' placeholder='')
      label.active 现工作单位
    .input-field.col.s12
      input(type="text" v-model='basic.xgzzw' placeholder='')
      label.active 职务
    .col.s12
      label.active 企业所属乡镇
      v-select(:value.sync='basic.xgzdwxz', :options='xgzdwxz')
    .input-field.col.s12
      input(type="text" v-model='basic.sjhm' placeholder='')
      label.active 手机号码
    .input-field.col.s12
      input(type="text" v-model='basic.dzyj' placeholder='')
      label.active E-mail
    .input-field.col.s12
      input(type="text" v-model='basic.yb' placeholder='')
      label.active 邮编
    .col.s12
      label.active 人才类别
      v-select(:value.sync='basic.rclbs', :options='rclbs')
    .col.s12
      br
      button(class="btn waves-effect waves-light" name="action" v-on:click='submitData') 保存
</template>

<script>
import rest from '../rest'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'

var localStorage = window.localStorage

export default {
  // vuex: {
  //   getters: {
  //     user: getUser
  //   }
  // },
  data () {
    return {
      loading: false,
      xb: [
        {value: '1', label: '男'},
        {value: '0', label: '女'}
      ],
      basic: {
      },
      xgzdwxz: [],
      zzmm: [],
      rclbs: []
    };
  },
  computed: {
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
  ready () {
    var me = this
    this.loading = true
    rest.post(this.user, {}, '/rccore/Rcxx/get').then(res => {
      me.loading = false
      me.basic = res.data
    })
  },
  attached () {
  },
  methods: {
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
      var me = this
      this.basic.isAdd = false
      this.loading = true

      rest.post(this.user, this.basic, '/rccore/Rcxx/save').then(res => {
        if (!res.success) return Materialize.toast(res.message, 4000)

        this.basic = res.data
        Materialize.toast('保存成功', 2000)
        this.loading = false
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
</style>
