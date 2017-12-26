<template>
  <div class="homepage-introduction">
    <h2 class="medium-font">{{ $t('introductionTitle') }}</h2>
    <section class="desc" v-html="$t('introductionDesc')"></section>
  </div>
</template>

<script>
export default {
  name: 'Introduction',

  data () {
    return {
      isMobile: window.innerWidth <= 960
    }
  },

  components: {
  },

  created () {
  },

  methods: {
  },

  locales: {
    en: {
      introductionTitle: 'Explore a wider world for you',
      introductionDesc: 'In the information world, massive messages may make you worry about missing her at a loss; efforts to learn at the same time, it may miss more;City chain, that is for you to solve this kind of problem; here, you can browse all kinds of global crystallization of wisdom; rich vision at the same time, can be marked or share your love of the site, which can also provide reference for more people to dig the message.'
    },
    zh: {
      introductionTitle: '探索更广阔的世界，为你',
      introductionDesc: '在这个信息化的世界，海量的讯息可能让你不知所措；担心错过她而努力汲取的同时，却可能错过更多；<br>倾城之链的存在，即是为您解决这种困扰；在这里，您可以浏览全球各类智慧的结晶；<br>丰富视野的同时，可以标注抑或分享您喜欢的站点，从而也可以为更多的人挖掘讯息提供参考。'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

.homepage-introduction{
  width: 100%;
  height: $section-height;
  padding: 0 15%;
  @include flex-box-center(column);
  background: #20a0ff;
  background: -webkit-linear-gradient(to top, #20a0ff, #ffffff);
  background: linear-gradient(to top, #20a0ff, #ffffff);
  .desc{
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
  }
}

@media (max-width: 768px) {
  .homepage-introduction{
    padding: 0 1.8rem;
    .desc{
      font-size: 1.8rem;
    }
  }
}

@media (max-width: 375px) {
  .homepage-introduction{
    padding: 0 1.6rem;
    .desc{
      font-size: 1.6rem;
    }
  }
}
</style>
