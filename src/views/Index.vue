<template>
<div class="wrapper">
  <section class="wow fade-in animated"
    style="visibility: visible;animation-name:fade-in;">
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
            <a class="" href="/explore">{{ $t('exploreNice') }}</a>
          </p>
        </section>
      </section>
    </section>
  </section>
</div>
</template>

<script>
import './../assets/css/flower.css'

export default {
  name: 'Index',

  data () {
    return {
    }
  },

  components: {
  },

  methods: {
  },

  locales: {
    en: {
      exploreNice: 'Explore Nice',
      niceLinksDesc: 'Gather as many nice websites as possible in the world so that people can see and learn more interesting and useful things'
    },
    zh: {
      exploreNice: '发现美好',
      niceLinksDesc: '尽可能云集世间优秀的网站，让人们可以从中，见识和学习更多有趣且有用的事物'
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 550px) {
  .twelve.columns {
    width: 100%;
    margin-left: 0
  }
}

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
}

.animated.infinite {
  animation-iteration-count: infinite;
}
.animated.hinge {
  animation-duration: 6s;
}
</style>
