<template>
  <strong class="countup"></strong>
</template>

<style scoped>
.countup{
  font-size: 5rem;
}
</style>

<script>
  import CountUpJs from 'countup'

  export default {
    name: 'CountUp',

    props: {
      start: {
        type: Number,
        required: false,
        default: 0
      },
      end: {
        type: Number,
        required: true
      },
      decimals: {
        type: Number,
        required: false,
        default: 0
      },
      duration: {
        type: Number,
        required: false,
        default: 2
      },
      options: {
        type: Object,
        required: false
      }
    },

    data () {
      return {
        instance: null
      }
    },

    computed: {
    },

    watch: {
      end: {
        handler: function (value) {
          if (this.instance && this.instance.update) {
            this.instance.update(value)
          }
        },
        deep: false
      }
    },

    methods: {
      init () {
        if (!this.instance) {
          const dom = this.$el
          this.instance = new CountUpJs(
            dom,
            this.start,
            this.end,
            this.decimals,
            this.duration,
            this.options
          )
          this.instance.start(() => {
            this.$emit('callback', this.instance)
          })
        }
      },
      destroy () {
        this.instance = null
      }
    },

    mounted () {
      this.init()
    },

    beforeDestroy () {
      this.destroy()
    },

    destroyed () {
    },

    start (callback) {
      if (this.instance && this.instance.start) {
        this.instance.start(function () {
          callback && callback(this.instance)
        })
      }
    },

    pauseResume () {
      if (this.instance && this.instance.pauseResume) {
        this.instance.pauseResume()
      }
    },

    reset () {
      if (this.instance && this.instance.reset) {
        this.instance.reset()
      }
    },

    update (newEndVal) {
      if (this.instance && this.instance.update) {
        this.instance.update(newEndVal)
      }
    }
  }
</script>
