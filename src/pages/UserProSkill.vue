<template lang="jade">
.col.s12
  div.col.s12
    .row
      v-loading(:show='loading')
      .col.s12(v-for='item in list')
        .card
          .card-content(@click='edit(item)')
            table
              thead
              tbody
                tr(v-if='item.zyStr')
                  th.col.s4 专业
                  td.col.s6 {{item.zyStr}}
                tr(v-if='item.zydjStr')
                  th.col.s4 等级
                  td.col.s6 {{item.zydjStr}}
                tr(v-if='item.zgbmStr')
                  th.col.s4 主管部门
                  td.col.s6 {{item.zgbmStr}}
          .card-action
            a(@click='deleteItem(item.zyjnId)') 删除
    a(v-on:click="modal" class='btn-floating btn-large waves-effect waves-light red btn-add')
      span.fa.fa-plus
    .modal#modal1.col.s12.bottom-sheet
      .modal-content
        .row
          form.col.s12
            .col.s12
              label.active 专业
              v-select(:options='zy', :value.sync='postData.zy')
            .col.s12
              label.active 等级
              v-select(:options='zydj', :value.sync='postData.zydj')
            .col.s12
              label.active 主管部门
              v-select(:options='zgbmId', :value.sync='postData.zgbmId')
      .modal-footer
        a(class="btn waves-effect waves-light" v-on:click='submitData') 保存
        a(class="modal-action modal-close waves-effect waves-green btn-flat", @click='clear') 取消
</template>
<script>
import rest from '../rest'
import randomToken from 'random-token'
import vSelect from './VSelect.vue'
import VLoading from './VLoading.vue'

var localStorage = window.localStorage
export default{
  data(){
    return {
      loading: false,
      zy: [],
      zydj: [],
      zgbmId: [],
      zyjnId: {},
      postData: {
      },
      list: []
    }
  },
  init () {
    var me = this
    this.user = JSON.parse(localStorage.getItem('baseInfo'))

    rest.getOptions('rczyjn_zy').then(res => {
      me.zy = this.rebuildOptions(res)
    })
    rest.getOptions('rczyjn_dj').then(res => {
      me.zydj = this.rebuildOptions(res)
    })
    rest.getOptions('rczyjn_zgbm').then(res => {
      me.zgbmId = this.rebuildOptions(res)
    })

  },
  ready () {
    var me = this

    this.loading = true

    rest.post(this.user, {}, '/rccore/Rczyjn/list').then(res => {
      me.loading = false
      me.list = res.datas
    })
  },
  attached () {
  },
  methods: {
    clear() {
      this.postData = {}
    },
    edit(item) {
      this.postData = item
      $('#modal1').openModal()
    },
    deleteItem(id) {
      rest.delete(this.user, {zyjnId: id}, '/rccore/Rczyjn/delete').then(res => {

        this.getList()
      })
    },
    getList () {
      var me = this
      rest.post(this.user, {}, '/rccore/Rczyjn/list').then(res => {
        me.list = res.datas
      })
    },
    rebuildOptions (options) {
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
      this.loading = true

      this.postData.isAdd = this.postData.zyjnId ? 'false' : 'true'
      this.postData.zyjnId = this.postData.zyjnId || randomToken(32)
      $('#modal1').closeModal()
      rest.post(this.user, this.postData, '/rccore/Rczyjn/save').then(res => {
        this.loading = false
        me.postData = {}
        if (!res.success) return Materialize.toast(res.message, 4000)

        me.getList()
        Materialize.toast('保存成功', 2000)
      })
    },
    modal () {
      $('#modal1').openModal()
    }
  },
  components:{
    vSelect,
    VLoading
  }
}
</script>
<style scoped>

.card-image {
  text-align: center;
  min-height: 150px;
  padding-top: 55px;
}
.fileupload-button {
  background-color: #666 !important;
  width: 100%;
}
.btn-add {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.modal {
  width: 100%;
}
table{
table-layout:fixed;
}
table td{
  word-wrap:break-word;
}
</style>
