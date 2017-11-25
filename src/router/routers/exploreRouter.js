import Frame from 'partials/Frame'
import { $util } from 'helper'

export default {
  path: '/explore',
  component: Frame,
  children: [{
    path: 'all',
    alias: ['/', 'resource', 'info', 'skill', 'life'],
    meta: {
      title: $util.setTitleLang('NICE LINKS', '倾城之链')
    },
    component: resolve => require(['views/Nicelinks'], resolve)
  }]
}
