<template>
  <div class="wrapper">
    <HomeLotus></HomeLotus>
    <LinkCountup></LinkCountup>
  </div>
</template>

<script>
import './../assets/css/flower.css'
import HomeLotus from 'components/homepage/HomeLotus'
import LinkCountup from 'components/homepage/LinkCountup'

export default {
  name: 'Index',

  data () {
    return {
    }
  },

  components: {
    HomeLotus,
    LinkCountup
  },

  created () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';
</style>
