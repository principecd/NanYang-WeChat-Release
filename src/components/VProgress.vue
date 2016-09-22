<template lang="jade">
.progress-modal
  .progress-content(v-if='uploading')
    h1 {{progress}}
    //- .progress
    //-   .determinate(:style="{width: progress + '%'}")

</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['progress', 'uploading'],
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="css">
/*.progress-modal {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.8);
  z-index: 9999999;
}
.progress-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}*/
progress {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 50px;
  background: radial-gradient(hsl(30,80%,80%), hsl(210,50%,70%) ) no-repeat center;
}
</style>
