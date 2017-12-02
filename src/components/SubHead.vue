<template>
  <div class="sub-head">
    <ul class="sub-head-nav">
      <li class="nav-item">
        <el-button type="text" @click="onThemeTagClick('')">
          {{ $t('all') }}
        </el-button>
      </li>
      <li class="nav-item" v-for="(item, index) in themeList" :key="index">
        <el-button type="text" @click="onThemeTagClick(item.value)">
          {{ item.key }}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'SubHead',

  mixins: [partsMixin],

  data () {
    return {
    }
  },

  props: {
    themeList: {
      type: [Array],
      default: () => []
    }
  },

  components: {
  },

  methods: {
    onThemeTagClick (value = '') {
      this.$emit('fetch-search', { theme: value })
    }
  },

  locales: {
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.sub-head{
  width: 100%;
  max-width: 960px;
  overflow: auto;
  text-align: left;
  border-bottom: solid 1px #d1d5da;
  padding: .3rem;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  transition: all .2s;
  transform: translateZ(0);
  .sub-head-nav{
    width: 100%;
    display: flex;
    margin: 0;
    .nav-item{
      margin: auto 0.6rem;
      .el-button{
        color: $black-grey;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }
}

@media screen and (max-width: $mobile-screen) {
  .sub-head{
    max-width: $mobile-screen;
  }
}
</style>
