import { $util } from 'helper'

export default {
  $vuexSetUserInfo (state, info) {
    if (!info || !state) {
      return
    }
    state.userInfo = info
    $util.setSessionStorage('userInfo', info)
  }
}
