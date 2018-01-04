<template>
  <div id="inject-links-dlg">
    <el-dialog stripe :title="$t('injectLinks')"
      v-model="isShowDlgFlag" size="small" v-loading.body="isLoading">
      <div class="form form-horizontal">
        <el-form :model="fillForm" :rules="rules" ref="fillForm">
          <div class="form-group">
            <label class="col-sm-3 control-label">
                {{ $t('linkAddressStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="urlPath">
                <el-input
                  v-model="fillForm.urlPath"
                  @blur="getLinkPageData"
                  :placeholder="$t('pleaseEnter') + $t('linkAddressStr')">
                </el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ $t('linkNameStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="title">
                <el-input
                  v-model="fillForm.title"
                  :placeholder="$t('pleaseEnter') + $t('linkNameStr')"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ $t('linkClassifyStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="classify">
                <el-select class="wrap-block" v-model="fillForm.classify"
                  :placeholder="$t('pleaseSelect') + $t('linkClassifyStr')">
                  <el-option
                    v-for="item in classifyList" :key="item.value"
                    :label="$t(item.name)"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ $t('linkThemeStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="theme">
                <el-select class="wrap-block" v-model="fillForm.theme"
                  :placeholder="$t('pleaseSelect') + $t('linkThemeStr')">
                  <el-option
                    v-for="item in themeList"
                    :key="item.key"
                    :label="$getCurrentLang() === 'en' ? item.value : item.key"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ $t('linkTagsStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="tags">
                <el-select class="wrap-block"
                  v-model="fillForm.tags" allow-create multiple filterable
                  :multiple-limit="3"
                  :placeholder="$t('pleaseSelect') + $t('linkTagsStr')">
                  <el-option v-for="(item, index) in tagsList" :key="index"
                    :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 control-label"> {{ $t('linkDescStr') }} <em>*</em>：</label>
            <div class="col-sm-8">
              <el-form-item prop="desc">
                <el-input type="textarea" :maxlength="360" :autosize="{ minRows: 3, maxRows: 10}"
                  :placeholder="$t('pleaseSelect') + $t('linkDescStr')"
                  v-model="fillForm.desc">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDlgFlag = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="onCommitClick">{{ this.$t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $config from 'config'

export default {
  name: 'InjectDialog',

  data () {
    return {
      isShowDlgFlag: false,
      isLoading: false,
      fillForm: {
        urlPath: '',
        title: '',
        desc: '',
        classify: '',
        theme: '',
        tags: []
      },
      themeList: [],
      tagsList: $config.tags,
      classifyList: $config.classify,
      rules: {
        urlPath: [
          { required: true, validator: this.$verifyUrl, trigger: 'change,blur' }
        ],
        title: [
          { required: true, message: this.$t('pleaseEnter') + this.$t('linkNameStr'), trigger: 'change,blur' }
        ],
        theme: [
          { required: true, message: this.$t('pleaseSelect') + this.$t('linkThemeStr'), trigger: 'change,blur' }
        ],
        classify: [
          { required: true, message: this.$t('pleaseSelect') + this.$t('linkClassifyStr'), trigger: 'change,blur' }
        ]
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  },

  watch: {
    value (val) {
      this.isShowDlgFlag = val
    },
    isShowDlgFlag (val) {
      this.$emit('input', val)
    },
    'fillForm.classify': function (val) {
      this.themeList = $config.theme[this.fillForm.classify] || []
    }
  },

  methods: {
    getLinkPageData () {
      if (!this.fillForm.urlPath) return

      this.$apis.crawlLinksInfo({url: this.fillForm.urlPath}).then(result => {
        this.fillForm.title = result.title
        this.fillForm.desc = result.desc
      }).catch((error) => {
        this.$message.error(`${error}`)
      })
    },

    onCommitClick () {
      this.$refs.fillForm.validate((valid) => {
        if (valid) {
          this.isLoading = true

          let params = this.$_.clone(this.fillForm, true)
          params.userId = this.userInfo && this.userInfo._id
          params.role = this.userInfo && this.userInfo.role
          params.createdBy = this.userInfo && this.userInfo.username

          this.$apis.addNiceLinks(params).then(result => {
            this.isLoading = false
            this.isShowDlgFlag = false
            this.$message({
              message: this.$t('successAddTip'),
              type: 'success'
            })
            this.$refs.fillForm.resetFields()
            this.$bus.emit('inject-success')
          }).catch((error) => {
            console.log(error)
            this.isLoading = false
            this.$message.error(`${error}`)
          })
        }
      })
    }
  },

  locales: {
    en: {
      successAddTip: 'Well, you have successfully added the link，Pending audit.'
    },
    zh: {
      successAddTip: '很好，您已成功添加该链接，正在待审核中.'
    }
  }
}
</script>
