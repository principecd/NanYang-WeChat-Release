<template lang="jade">
.shadow(v-if='show')
  //- .preloader-wrapper.small.active(v-show='show')
  //-   .spinner-layer.spinner-red
  //-     .circle-clipper.left
  //-       .circle
  //-     .gap-patch
  //-       .circle
  //-     .circle-clipper.right
  //-       .circle
  .loading-content
    r-loader(:loading="loading", :color="color", :size="size")
  //- pulse-loader(:loading="show", :color="color", :size="size")
  //- grid-loader(:loading="show", :color="color", :size="size")
  //- clip-loader(:loading="show", :color="color", :size="size")
  //- rise-loader(:loading="show", :color="color", :size="size")
  //- beat-loader(:loading="show", :color="color", :size="size")
  //- sync-loader(:loading="show", :color="color", :size="size")
  //- rotate-loader(:loading="show", :color="color", :size="size")
  //- pacman-loader(:loading="show", :color="color", :size="size")
  //- square-loader(:loading="show", :color="color", :size="size")
  //- skew-loader(:loading="show", :color="color", :size="size")
  //- moon-loader(:loading="show", :color="color", :size="size")
  //- ring-loader(:loading="show", :color="color", :size="size")
  //- bounce-loader(:loading="show", :color="color", :size="size")
  //- dot-loader(:loading="show", :color="color", :size="size")
  //- .svg(v-bind:style='{opacity: show ? 0.6 : 0.3}')
  //-   svg(class="demo__top-svgBg" viewBox="0 0 366 256")
  //-     g(class="svgBg__objects")
  //-       path(class="svgBg__bg svgBg__bg1" v-bind:style="{fill: show ? '#86D7DB' : '#a4b3b3'}" d="M0,143 88,107 224,153 348,109 366,123 366,256 0,256z" )
  //-       path(class="svgBg__bg svgBg__bg2" v-bind:style="{fill: show ? '#3C929A' : '#959c9c'}" d="M0,156 106,136 272,172 342,124 366,144 366,256 0,256z" )
  //-       path(class="svgBg__bg svgBg__bg3" v-bind:style="{fill: show ? '#416175' : '#788383'}" d="M0,170 62,160 235,148 305,145 366,153 366,256 0,256z" )
  //-     g(class="svgBg__tree svgBg__tree-1 m--left" data-id="1")
  //-       path(class="svgBg__tree-leafs svgBg__tree-part svgBg__tree-part1", v-bind:style="{fill: show ? '#389296' : '#819696'}" d="M54,127 C77,127 62,95 54,63 C46,95 31,127 54,127")
  //-       path(class="svgBg__tree-trunk svgBg__tree-part" d="M56,147 Q55,115 54,83 Q53,115 52,146")
  //-     g(class="svgBg__tree svgBg__tree-2 m--left" data-id="2")
  //-       path(class="svgBg__tree-leafs svgBg__tree-part" v-bind:style="{fill: show ? '#389296' : '#819696'}" d="M67,124 C90,124 75,92 67,59 C59,92 44,124 67,124")
  //-       path(class="svgBg__tree-trunk svgBg__tree-part" d="M69,144 Q68,112 67,80 Q66,112 65,143")
  //-     g(class="svgBg__tree svgBg__tree-3 m--right" data-id="3")
  //-       path(class="svgBg__tree-leafs svgBg__tree-part" v-bind:style="{fill: show ? '#389296' : '#819696'}" d="M264,129 C287,129 272,97 264,64 C256,97 241,129 264,129")
  //-       path(class="svgBg__tree-trunk svgBg__tree-part" d="M266,149 Q265,117 264,85 Q263,117 262,148")
  //-     g(class="svgBg__tree svgBg__tree-4 m--right" data-id="4")
  //-       path(class="svgBg__tree-leafs svgBg__tree-part" v-bind:style="{fill: show ? '#207277' : '#819696'}" d="M287,128 C310,128 295,96 287,63 C279,96 264,128 287,128")
  //-       path(class="svgBg__tree-trunk svgBg__tree-part" d="M289,148 Q288,116 287,84 Q286,116 285,147")
  //-     g(class="svgBg__tree svgBg__tree-5 m--right" data-id="5")
  //-       path(class="svgBg__tree-leafs svgBg__tree-part" v-bind:style="{fill: show ? '#389296' : '#819696'}" d="M313,128 C336,128 321,96 313,63 C305,96 290,128 313,128")
  //-       path(class="svgBg__tree-trunk svgBg__tree-part" d="M315,148 Q314,116 313,84 Q312,116 311,147")
</template>

<script>
import Vue from 'vue'
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import SkewLoader from 'vue-spinner/src/SkewLoader.vue'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import DotLoader from 'vue-spinner/src/DotLoader.vue'
function RLoader() {
  var cool = [
    ClipLoader,

    FadeLoader,
    // PacmanLoader,
    SquareLoader,
    ScaleLoader,
    SkewLoader,
    MoonLoader,
    RingLoader,
    BounceLoader,
    DotLoader
  ]
  var random = Math.floor(Math.random() * cool.length)

  return cool[random]
}

export default {
  data () {
    return {
      svgOpacity: 1,
      color: '#26a69a',
      size: '35px',
      loading: true
    }
  },
  props: ['show'],
  computed: {},
  ready () {},
  attached() {},
  methods: {
  },
  components: {
    GridLoader,
    ClipLoader,

    FadeLoader,
    ScaleLoader,
    SkewLoader,
    MoonLoader,
    RingLoader,
    BounceLoader,
    DotLoader,
    RLoader: RLoader()
  },
  watch: {
    show: (old, newVal) => {
      if (newVal === true) {

      }
    }
  }
}
</script>

<style lang="css" scoped>

.shadow {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9988888999;
}
.svg {
  opacity: 0.6;
  z-index: -1;
}
.loading-content {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9988888999998;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  color: #26a69a
}

.preloader-wrapper {
  position: fixed;
  z-index: 999999;
  top: calc(50% - 16px);
  left: calc(50% - 16px);
}
.svgFadeOut {
  -webkit-animation: svgOut 500ms ease-in-out forwards;
}

@-wekbit-keyframes svgOut {
  0% {
    opacity: 0.6
  }
  100% {
    opacity: 0.3
  }
}
</style>
