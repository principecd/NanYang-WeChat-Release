<template lang="jade">
div
  h1 404
</template>

<script>
export default {
  data () {
    return {
      i: []
    }
  },
  computed: {},
  ready () {
    for(var i = 0; i < 100; ++i) {
      this.i.push(i)
    }
  },
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css" scoped>
</style>
