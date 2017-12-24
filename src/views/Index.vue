<template>
<div class="wrapper">
  <section class="lotus fade-in animated">
    <section class="twelve columns cssanimations">
      <section class="flower-container">
        <section class="flower">
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <span class="part"></span>
          <h1>{{ $t('niceLinksStr') }}</h1>
          <p>
            {{ $t('niceLinksDesc') }}
            <br>
            <router-link to="/explore/all">{{ $t('exploreNice') }}</router-link>
          </p>
        </section>
      </section>
    </section>
  </section>
  <div class="countup-area">
    <p class="countup-text">{{ $t('countupText') }}</p>
    <CountUp
      class="countup-number"
      :start="0"
      :end="theDisplayCount"
      :decimals="0"
      :duration="2.5"
      :options="countUpoptions"
      @callback="onCountUpCallback">
    </CountUp>
  </div>
</div>
</template>

<script>
import './../assets/css/flower.css'
import CountUp from 'components/CountUp'

export default {
  name: 'Index',

  data () {
    return {
      isMobile: window.innerWidth <= 960,
      theDisplayCount: 0,
      totalLinksCount: 0,
      countUpoptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },

  components: {
    CountUp
  },

  created () {
    let params = {active: true}
    this.$apis.getAllLinksCount(params).then(result => {
      this.totalLinksCount = result
      this.handleDisplayCount()
    }).catch((error) => {
      this.totalLinksCount = 99
      this.handleDisplayCount()
      console.log(error)
    })
  },

  methods: {
    handleDisplayCount () {
      if (this.isMobile) {
        this.theDisplayCount = this.totalLinksCount
      } else {
        window.addEventListener('scroll', this.handleScroll)
      }
    },

    handleScroll () {
      if (window.scrollY >= 188 && window.scrollY <= 999) {
        this.theDisplayCount = this.totalLinksCount
      }
    },
    /* -----------------------on***Event----------------------- */
    onCountUpCallback: (ins) => {
      // ins.update(ins.endVal + 100)
    }
  },

  locales: {
    en: {
      exploreNice: 'Explore Nice',
      niceLinksDesc: 'Collection of excellent web sites around the world so that people can see and learn more interesting and useful things',
      countupText: 'The number of high quality websites has been included'
    },
    zh: {
      exploreNice: '发现美好',
      niceLinksDesc: '云集全球优秀网站，让人们可以从中，见识和学习更多有趣且有用的事物',
      countupText: '已经收录优质网站个数'
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';

@media (min-width: 550px) {
  .twelve.columns {
    width: 100%;
    margin-left: 0
  }
}
.lotus{}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
  animation-name: fade-in;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  visibility: visible;
  animation-name: fade-in;
}

.animated.infinite {
  animation-iteration-count: infinite;
}
.animated.hinge {
  animation-duration: 6s;
}

.countup-area{
  .countup-text{
    font-size: 1.8rem;
  }
  .countup-number{
    display: block;
  }
  color: #000;
  width: 100%;
  height: 21.99rem;
  @include flex-box-center(column);
  background: #8e9eab; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #8e9eab, #eef2f3); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #8e9eab, #eef2f3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
