<template>
  <div>
    <div class="introduction">
      <h2 class="medium-font">{{ $t('forFindMoreTitle') }}</h2>
      <section class="desc" v-html="$t('forFindMoreDesc')"></section>
    </div>
    <div class="introduction share-more">
      <h2 class="medium-font">{{ $t('forShareMoreTitle') }}</h2>
      <section class="desc" v-html="$t('forShareMoreDesc')"></section>
    </div>
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
      forFindMoreTitle: 'Explore a wider world for you',
      forFindMoreDesc: 'In the information world, massive messages may make you worry about missing her at a loss; efforts to learn at the same time, it may miss more;<a href="/explore/all">「NICE LINKS」</a>, that is for you to solve this kind of problem; here, you can browse all kinds of global crystallization of wisdom; rich vision at the same time, can be marked or share your love of the site, which can also provide reference for more people to dig the message.',
      forShareMoreTitle: 'Share, for your favorite websites.',
      forShareMoreDesc: `In today's information age, even small individuals have their own brands. "chain of the city" as an open platform, encourage you to create your personal brand to gain more; If you do, you can share it here and let more people know. Of course, you can also share your favorite websites and let your insights benefit more people.`
    },
    zh: {
      forFindMoreTitle: '探索更广阔的世界，为您',
      forFindMoreDesc: `在这个信息化的世界，海量的讯息可能让您不知所措；担心错过她而努力汲取的同时，却可能错过更多；<br><a href="/explore/all">「倾城之链」</a>的存在，即是为您解决这种困扰；在这里，您可以浏览全球各类智慧的结晶；<br>丰富视野的同时，可以标注抑或分享您喜欢的站点，从而为更多挖掘讯息的人提供建设性参考。`,
      forShareMoreTitle: '分享，为您所欢喜的网站',
      forShareMoreDesc: '在当今这信息化时代，即便是再小的个体，也当有自己的品牌。<a href="/explore/all">「倾城之链」</a>作为一个开放平台，鼓励您创造属于您的个人品牌，以获得更多；如果您已经这样做了，您可以尽情分享在这里，让更多人知道，且从中受益。当然，您也可以分享出您欢喜的其他有意思站点，让您的见识惠及更多人。'
    }
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import './../../assets/scss/mixins.scss';

.introduction{
  width: 100%;
  height: $section-height;
  padding: 0 15%;
  @include flex-box-center(column);
  color: $white;
  background-color: $black;
  .desc{
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    line-height: 2.6rem;
  }
}
.share-more{
  color: $black;
  background-color: $white;
}

@media (max-width: 768px) {
  .introduction{
    padding: 0 1.8rem;
    .desc{
      text-align: left;
      font-size: 1.8rem;
      line-height: 2rem;
      br{
        line-height: 3rem;
      }
    }
  }
}

@media (max-width: 375px) {
  .introduction{
    padding: 0 1.6rem;
    .desc{
      font-size: 1.6rem;
    }
  }
}
</style>
