<template>
<div class="links-list">
  <div class="moudle" v-if="pdata.length <= 0">
    <div class="content">
      <el-card class="tip-box-card" v-if="!isLoading">
        <div slot="header" class="clearfix">
          <h4>{{ $t('warmReminder') }}</h4>
        </div>
        <div class="no-result-tip" v-html="$t('noResultTip')"></div>
      </el-card>
      <content-placeholder v-else slot="link-desc" :rows="placeholderRows">
      </content-placeholder>
      <content-placeholder v-else slot="link-desc" :rows="placeholderRows">
      </content-placeholder>
    </div>
  </div>

  <div class="moudle" v-for="(item, index) in pdata" v-if="pdata.length > 0">
    <div class="content" @click="onMoudleClick(item)">
      <div class="meta">
        <span class="item classify"
          @click.stop="onThemeClick(item.theme)">
          {{ fillThemeName(item.classify, item.theme) }}
        </span>
        <span class="item" @click.stop="onUserClick(item.createdBy)">
          {{ item.createdBy || '' }}
        </span>
        <span >{{ item.created | dateOffset }}</span>
        <span class="tag"
          v-for="(item, index) in item.tags" :key="index"
          @click.stop="onTagClick(item)"> {{ item }}
        </span>
      </div>
      <h3 class="title">
        <a class="title-link" @click.stop="onLinkClick(item)"
          href="javascript:;" target="_blank">{{ item.title }}
        </a>
      </h3>
      <div class="abstract" v-if="isAbstract">
        {{ item.abstract || $util.interceptString(item.desc) }}
      </div>
      <slot name="link-desc"></slot>
      <div class="action-list">
        <div class="action-item" @click.stop="onLikeClick(item)">
          <icon class="icons" :name="item.isLikes ? 'likes-down' : 'likes'"></icon>
          <span class="item-num">{{ item.likes }}</span>
        </div>
        <div class="action-item" @click.stop="onDislikeClick(item)">
          <icon class="icons" :name="item.isDislikes ? 'dislike-down' : 'dislike'"></icon>
          <span class="item-num">{{ item.dislikes }}</span>
        </div>
      </div>
      <slot name="link-share"></slot>
    </div>
  </div>
</div>
</template>

<script>
import ContentPlaceholder from 'vue-content-placeholder'
import $config from 'config'

export default {
  name: 'LinksList',
  data () {
    return {
      classifyList: $config.classify,
      themeList: $config.theme,
      tagsList: $config.tags,
      placeholderRows: [
        {
          height: '2rem',
          boxes: [[0, '30%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '1rem',
          boxes: [[0, 0]]
        },
        {
          height: '1rem',
          boxes: [['3rem', '88%']]
        },
        {
          height: '2rem',
          boxes: [[0, 0]]
        },
        {
          height: '2rem',
          boxes: [[0, '88%']]
        }
      ]
    }
  },

  props: {
    pdata: {
      type: [Array, Object],
      default: []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isAbstract: {
      type: Boolean,
      default: false
    }
  },

  components: {
    ContentPlaceholder
  },

  created () {
  },

  methods: {
    dispatchAction (row, action) {
      if (!this.$isLogin()) {
        this.$router.push('/login')
        return
      }

      let params = {
        'userId': this.userInfo._id,
        '_id': row._id,
        'action': action
      }
      this.$apis.dispatchAction(params).then(result => {
        row[action] = result.count
        let actionIdx = action === 'likes' ? 'isLikes' : 'isDislikes'
        row[actionIdx] = !row[actionIdx]
      }).catch((error) => {
        this.$message.error(`${error}`)
      })
    },

    queryTagsArr (classify, tags) {
      let checkTagsArr = this.tagsList[classify]
      let resultArr = []
      checkTagsArr.map(obj => {
        tags.map(item => {
          if (item === obj.value) {
            resultArr.push({
              'key': obj.key,
              'value': obj.value
            })
          }
        })
      })
      return resultArr
    },

    fillThemeName (classify, theme) {
      let result = ''
      this.themeList[classify].map(item => {
        if (item.value === theme) {
          result = item.key
        }
      })
      return result
    },

    onMoudleClick (item) {
      let linkId = item._id
      this.$router.push(`/post/${linkId}`)
    },

    onThemeClick (theme) {
      this.$switchRouteByTheme(theme)
    },

    onTagClick (tag) {
      this.$router.push(`/tags/${tag}`)
    },

    onUserClick (username) {
      let userName = username || this.userInfo.username
      this.$router.push(`/member/${userName}`)
    },

    onLinkClick (item) {
      window.open(item.urlPath, item.title)
    },

    onLikeClick (row) {
      this.dispatchAction(row, 'likes')
    },

    onDislikeClick (row) {
      this.$confirm(this.$t('dislikesTips'), this.$t('warmReminder'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.dispatchAction(row, 'dislikes')
      }).catch(() => {
      })
    }
  }
}
</script>

<style media="screen" lang="scss">
@import "./../assets/scss/variables.scss";
@import './../assets/scss/mixins.scss';

.links-list{
  .moudle{
    margin: 10px;
    padding: 1.5rem 2rem;
    text-align: left;
    border-bottom: 1px solid $item-border-color;
    .content{
      margin: 5px;
      .title{
        margin: .4em 0;
        .title-link{
          font-size: 1.8rem;
          font-weight: 600;
          line-height: 1.2;
          text-decoration: none;
          color: $link-title;
          &:hover{
            color: $link-title-hover;
          }
        }
      }
      .abstract{
        width: 100%;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: $black-grey;
        line-height: 1.5;
        letter-spacing: .02rem;
      }
      .meta{
        font-size: 1.314rem;
        color: $meta-item-color;
        .item{
          cursor: pointer;
          &:after{
            content: "\B7";
            margin: 0 .4em;
          }
        }
        .tag{
          cursor: pointer;
          &:hover{
            color: $blue;
          }
        }
        .tag + .tag{
          &:before{
            margin: 0 .1em;
            content: "/";
            color: $meta-item-color;
          }
        }
        .classify{
          color: $meta-classify-color;
          font-size: 500;
        }
      }
      .action-list{
        display: inline-flex;
        display: -webkit-flex;
        .action-item{
          @include flex-box-center();
          cursor: pointer;
          padding: .2rem .8rem;
          height: 100%;
          text-align: center;
          min-width: 3.6rem;
          border: 1px solid $item-border-color;
          .icons{
            width: 1.6rem;
            height: 1.6rem;
          }
          .icon-green{
            color: #ff0
          }
          .item-num{
            margin-left: .2em;
            font-weight: 700;
          }
        }
        .action-item + .action-item{
          border-left: none;
        }
      }
    }
  }
}
</style>
