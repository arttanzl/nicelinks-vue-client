<template>
  <div class="wrapper" id="nice-links">
    <div class="panel-default" v-loading="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <sub-head :theme-list="themeList" @fetch-search="$fetchSearch"></sub-head>
            <operate-tabs @switch-tabs="$onSwitchTabs"></operate-tabs>
            <links-list :pdata="niceLinksArr" :is-loading="isLoading"></links-list>
            <load-more></load-more>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'
import partsMixin from 'mixins/partsMixin.js'

export default {
  name: 'nicelinks',

  mixins: [partsMixin],

  data () {
    return {
      themeList: []
    }
  },

  components: {
  },

  watch: {
    '$route': function (to, from) {
      // 只是别名变化, Vue 无法监听到 @17-07-18;
    }
  },

  created () {
    this.$bus.on('inject-success', this.$fetchSearch)
    this.$bus.on('fetch-search', this.$fetchSearch)
  },

  mounted () {
    let currentClassify = this.$route.params.classify
    let currentItem = $config.classify.find(item => {
      return currentClassify === item.name
    })

    if (currentItem && currentItem['value']) {
      this.tableControl.classify = currentItem && currentItem['value']
    }
    this.themeList = $config.theme[this.tableControl.classify]
    this.$fetchSearch()
  },

  methods: {
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import "../assets/scss/variables.scss";
.entry-list{
}
</style>
