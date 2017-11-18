<template>
  <div id="theme-coll-page" class="wrapper">
    <div class="panel-default" v-loading.body="isLoading">
      <div class="panel-body">
        <div class="main-container">
          <div class="entry-list">
            <div v-for="(obj, index) in themeList" :key="index">
              <h3 class="classify-title">{{ classifyList[index]['key'] }}</h3>
              <el-button v-for="item in obj" :key="item.value"
                type="text" @click="onItemClick(item)">
                {{ item.key }}
              </el-button>
            </div>
          </div>
          <aside-list></aside-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'TagsCollections',

  data () {
    return {
      isLoading: false,
      classifyList: $config.classify,
      themeList: $config.theme
    }
  },

  watch: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    onItemClick (item) {
      this.$jumpRouteByTheme(item.value)
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";

#theme-coll-page{
  .entry-list{
    padding: 15px;
    .classify-title{
      margin: 15px auto;
    }
  }
}
</style>
