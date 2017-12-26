<template>
  <div class="wrapper">
    <HomeLotus></HomeLotus>
    <Introduction></Introduction>
    <LinkCountup></LinkCountup>
  </div>
</template>

<script>
import './../assets/css/flower.css'
import HomeLotus from 'components/homepage/HomeLotus'
import Introduction from 'components/homepage/Introduction'
import LinkCountup from 'components/homepage/LinkCountup'

export default {
  name: 'Index',

  data () {
    return {
    }
  },

  components: {
    HomeLotus,
    Introduction,
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
