import $config from 'config'

const getValueByName = (source = [], name = '') => {
  let result = source.filter(item => {
    return item.name === name
  })[0]
  return result && result['value']
}

export default {
  data () {
    return {
      isLoading: false,
      isShowLoadMore: true,
      niceLinksArr: [],
      tableControl: {
        pageCount: 1,
        pageSize: 15,
        sortType: -1,
        sortTarget: 'likes'
      }
    }
  },

  computed: {
  },

  methods: {
    drawAjaxParams () {
      let params = this.$_.cloneDeep(this.tableControl)
      params.active = true
      params.userId = this.userInfo && this.userInfo._id || ''

      let classifyVal = getValueByName($config.classify, this.$route.params.classify)
      if (this.$route.params.classify && classifyVal) {
        params.classify = classifyVal
      }

      if (this.$route.params.theme) {
        params.theme = decodeURIComponent(this.$route.params.theme)
        params.theme = params.theme.firstUpperCase()
      }

      if (this.$route.params.tags) {
        params.tags = decodeURIComponent(this.$route.params.tags)
      }
      return params
    },

    $fetchSearch (params = {}, isLoadMore = false) {
      Object.assign(this.tableControl, params)

      params = this.drawAjaxParams()
      let apiName = params.tags ? 'getLinksByTag' : 'getNiceLinks'

      this.isLoading = true
      this.$apis[apiName](params).then(result => {
        this.isLoading = false
        if (!result || result.length <= 0) {
          this.niceLinksArr = []
          this.isShowLoadMore = false
          return
        } else {
          this.niceLinksArr = isLoadMore ? this.niceLinksArr.concat(result) : result
        }
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
        this.niceLinksArr = $config.default
      }).finally(() => {
        this.isLoading = false
      })
    },

    $onSwitchTabs (item = {}) {
      this.tableControl.pageCount = 1
      this.tableControl.sortTarget = item.sortTarget
      this.tableControl.sortType = item.sortType
      this.$fetchSearch()
    }
  }
}
