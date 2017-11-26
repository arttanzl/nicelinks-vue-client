<template>
<div class="side-nav">
  <el-menu :default-openeds="['1']" default-active="1" class="el-menu-vertical-demo"
    @open="handleOpen" @close="handleClose" theme="light">
    <el-submenu index="1">
      <template slot="title">
        <i class="sidenav-icon el-icon-menu"></i>{{ $t('niceLinksStr') }}
      </template>
      <el-menu-item v-for="(item, index) in navList"
        :key="item.value" @click="handleClick(item)" :index="item.name">
        {{ $t(item.name) }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="2" @click="onActivateInjectDlg">
      <i class="sidenav-icon el-icon-plus"></i>{{ $t('injectLinks') }}
    </el-menu-item>
    <el-menu-item index="3" @click="onThemeClick">
      <icon class="sidenav-icon" name="theme"></icon>{{ $t('themeCollection') }}
    </el-menu-item>
    <el-menu-item index="4" @click="onTagsClick">
      <icon class="sidenav-icon" name="tag"></icon>{{ $t('tagsCollection') }}
    </el-menu-item>
    <el-menu-item index="5" @click="onSwitchLangClick">
      <icon class="sidenav-icon" name="switch-lang"></icon>{{ $t('switchLang') }}
    </el-menu-item>
    <el-submenu index="6" v-if="isAdminFlag">
      <template slot="title">
        <i class="sidenav-icon el-icon-setting"></i>{{ $t('management') }}
      </template>
      <el-menu-item v-for="(item, index) in $util.getManageList()" :key="index"
        @click="handleManageClick(item)" :index="item.path">
        {{ $t(item.name) }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
import $config from 'config'

export default {
  name: 'SideNav',
  data () {
    return {
      navList: $config.classify
    }
  },

  components: {
  },

  computed: {
    isAdminFlag () {
      if (this.userInfo) {
        return this.userInfo && this.userInfo.role === 'Admin'
      }
    }
  },

  mounted () {
  },

  methods: {
    onActivateInjectDlg () {
      this.$bus.emit('activate-inject-dlg')
      this.triggerSideNav()
    },

    onThemeClick () {
      this.$router.push('/collections/theme')
      this.triggerSideNav()
    },

    onTagsClick () {
      this.$router.push('/collections/tags')
      this.triggerSideNav()
    },

    onSwitchLangClick () {
      this.$switchLang()
      this.triggerSideNav()
    },

    onManageClick () {
      this.$router.push('/manage')
      this.triggerSideNav()
    },

    handleClick (item) {
      this.$switchRouteByExplore(item.name)
      this.$bus.emit('fetch-search', {
        'classify': item.value
      })
      this.triggerSideNav()
    },

    handleManageClick (item) {
      this.$router.push(`/manage/${item.path}`)
      this.triggerSideNav()
    },

    triggerSideNav () {
      this.$bus.$emit('trigger-sidenav')
    },

    handleOpen () {
    },

    handleClose () {
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
  .side-nav{
    text-align: left;
    width: $side-nav-width;
    height: calc(100% - 80px);
    position: fixed;
    overflow-y: scroll;
    top: $header-height;
    z-index: 1000;
    background-color: $white;
    box-shadow: 0 0 1000px 1000px rgba(0,0,0,.6);
    &::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
    &:hover::-webkit-scrollbar {
      background: transparent;
      width: 0px;
    }
    .el-menu-item{
      display: flex;
      align-items: center;
    }
    .sidenav-icon{
      width: 16px;
      height: 16px;
      margin-right: 10px;
      color: #130c0e;
    }
    &:after{
      content: "";
      position: absolute;
      top: 0;
      left: 100%;
      display: block;
      width: calc(100vw - 100%);
      height: 100%;
    }
  }
</style>
