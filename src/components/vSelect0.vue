<template lang="jade">
select(v-model='value')
  option(v-for='item in options', :value='item.itemNameB') {{item.itemNameB}}元
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['options', 'value'],
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css" scoped>
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
</style>
