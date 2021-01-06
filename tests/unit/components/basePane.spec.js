
import Vue from 'vue'
import Antd from 'ant-design-vue'
Vue.use(Antd)
import { shallowMount } from '@vue/test-utils'
import pane from '@/components/pane/BasePane.vue'

describe('点击事件', () => {
  it('点击事件', (done) => {
    const wrapper = shallowMount(pane, {
      data() {
        return {
          paneAppList: [
            {
              typeName: 'APP',
              appList: [{
                id: 1,
                appName: '智慧校园'
              },
              {
                id: 2,
                appName: '智慧食堂'
              }]
            },
            {
              typeName: 'Web',
              appList: []
            }
          ]
        }
      }
    })
    wrapper.vm.$nextTick(() => {
      // const paneCont = wrapper.findAll('.card-container')
      // console.log(paneCont.at(0).html())
      const appName = wrapper.find('#app-name-2')
      expect(appName.text()).toEqual('智慧食堂')
      wrapper.find('#app-name-2').trigger('click')
      expect(wrapper.vm.curIndex).toEqual(2)
      expect(typeof wrapper.vm.callback).toBe('function')
      wrapper.vm.callback(1)
      expect(wrapper.vm.key).toBe(1)
      done()
    })
  })
})
