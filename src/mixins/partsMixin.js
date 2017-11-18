import $config from 'config'

export default {
  data () {
    return {
      isLoading: false,
      isShowLoadMore: true,
      niceLinksArr: [],
      tableControl: {
        // default no classify.
        // classify: -1,
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
    drawAjaxParams (params = {}) {
      Object.assign(params, this.$_.cloneDeep(this.tableControl))

      params.userId = this.userInfo && this.userInfo._id || ''
      if (this.$route.params.tags) {
        params.tags = decodeURIComponent(this.$route.params.tags)
      }

      if (this.$route.params.theme) {
        params.theme = decodeURIComponent(this.$route.params.theme)
        params.theme = params.theme.firstUpperCase()
      }
      return params
    },

    fetchSearch (params = {}, isLoadMore) {
      params = this.drawAjaxParams(params)
      let apiName = params.tags ? 'getLinksByTag' : 'getNiceLinks'

      this.isLoading = true
      this.$apis[apiName](params).then(result => {
        this.isLoading = false
        if (!result || result.length <= 0) {
          this.isShowLoadMore = false
          return
        }
        this.niceLinksArr = isLoadMore ? this.niceLinksArr.concat(result) : result
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(`${error}`)
        this.niceLinksArr = $config.default
      }).finally(() => {
        this.isLoading = false
      })
    },

    onSwitchTabs (item = {}) {
      this.tableControl.pageCount = 1
      this.tableControl.sortTarget = item.sortTarget
      this.tableControl.sortType = item.sortType
      this.fetchSearch()
    }
  }
}
