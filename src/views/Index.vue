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
          <h1 class="large-font">{{ $t('niceLinksStr') }}</h1>
          <p>
            {{ $t('niceLinksDesc') }}
            <br>
            <router-link to="/explore/all">{{ $t('exploreNice') }}</router-link>
          </p>
        </section>
      </section>
    </section>
  </section>
  <LinkCountup></LinkCountup>
</div>
</template>

<script>
import './../assets/css/flower.css'
import LinkCountup from 'components/homepage/LinkCountup'

export default {
  name: 'Index',

  data () {
    return {
    }
  },

  components: {
    LinkCountup
  },

  created () {
  },

  methods: {
  },

  locales: {
    en: {
      exploreNice: 'Explore Nice',
      niceLinksDesc: 'Collection of excellent web sites around the world so that people can see and learn more interesting and useful things'
    },
    zh: {
      exploreNice: '发现美好',
      niceLinksDesc: '云集全球优秀网站，让人们可以从中，见识和学习更多有趣且有用的事物'
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

.flower-container h1 {
  font-weight: bold;
  position: absolute;
  text-align: center;
  left: -10em;
  right: -10em;
  top: calc(50% - 2em);
  text-shadow: 0 0 2em #fff
}

.flower-container p {
  text-align: center;
  position: absolute;
  left: -10em;
  right: -10em;
  top: 50%;
  text-shadow: 0 0 2em #fff
}

.flower-container a {
  box-sizing: border-box;
  border: 1px solid #2c85ff;
  padding: 0.25em 1em;
  color: #2c85ff;
  font-weight: bold;
  line-height: 3em;
  border-radius: 2em;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .flower-container .flower {
    font-size: 1.8rem !important;
  }
  .flower-container .flower p {
    font-size: 2.2rem;
    padding: 0px 10px;
    line-height: 2.2rem;
    left: -6em;
    right: -6em;
  }
}
@media (max-width: 560px) {
  .flower-container .flower p {
    font-size: 2.1rem;
    padding: 0px 10px;
    line-height: 2.1rem;
    left: -4em;
    right: -4em;
  }
}

@media (max-width: 414px) {
  .flower-container .flower {
    font-size: 1.6rem !important;
  }
  .flower-container .flower p {
    font-size: 1.8rem;
    padding: 0px 10px;
    line-height: 1.8rem;
    left: -4em;
    right: -4em;
  }
}

@media (max-width: 375px) {
  .flower-container .flower {
    font-size: 1.3rem !important;
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
  visibility: visible;
  animation-name: fade-in;
}

.animated.infinite {
  animation-iteration-count: infinite;
}
.animated.hinge {
  animation-duration: 6s;
}
</style>
