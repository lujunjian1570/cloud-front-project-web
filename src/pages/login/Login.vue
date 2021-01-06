<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img
          alt="logo"
          class="logo"
          src="../../assets/img/logo.png"
        >
        <span class="title">{{ systemName }}</span>
      </div>
    </div>
    <div class="login">
      <a-form
        :form="form"
        @submit="onSubmit"
      >
        <a-tabs
          size="large"
          :tab-bar-style="{textAlign: 'center'}"
          style="padding: 0 2px;"
        >
          <a-tab-pane
            key="1"
            tab="账户密码登录"
          >
            <!--<a-alert
              type="error"
              :closable="true"
              v-show="error"
              :message="error"
              showIcon
              style="margin-bottom: 24px;"
            />-->
            <a-form-item>
              <a-input
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}],initialValue:'admin'}]"
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}],initialValue:'123456'}]"
                size="large"
                placeholder="123456"
                autocomplete="autocomplete"
                type="password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div style="display: none;">
          <a-checkbox :checked="true">
            自动登录
          </a-checkbox>
          <a style="float: right;">忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            id="submit"
            :loading="logging"
            style="width: 100%; margin-top: 24px;"
            size="large"
            html-type="submit"
            type="primary"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
// import {login, getRoutesConfig} from '@/services/user'
import { setAuthorization, getAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit: function(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = false
          this.setUser({
            name: 'admin',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
          })
          setAuthorization({
            token: 'token'
          })
          const routesConfig = [{
            router: 'root',
            children: [
              {
                router: 'index',
                name: '首页',
                icon: 'home'
              },
              {
                router: 'setting',
                name: '系统设置',
                redirect: '/setting/skin',
                icon: 'setting',
                children: [
                  {
                    router: 'skin',
                    name: '换肤设置'
                  },
                  {
                    router: 'editSkin',
                    name: '新增/编辑'
                  },
                  {
                    router: 'banner',
                    name: '轮播图管理'
                  },
                  {
                    router: 'version',
                    name: '版本管理'
                  }
                ]
              },
              {
                router: 'demo',
                name: '系统监控',
                redirect: '/demo/parent1',
                icon: 'dashboard',
                children: [
                  {
                    router: 'kibana',
                    name: 'Kibana',
                    icon: 'info-circle',
                    link: 'http://192.168.1.243:5601'
                  },
                  {
                    router: 'parent2',
                    name: '文档中心'
                  },
                  {
                    router: 'exception',
                    name: '文件中心'
                  }
                ]
              },
              {
                router: 'task',
                name: '任务中心',
                redirect: '/task/task1',
                icon: 'warning',
                children: [
                  {
                    router: 'task1',
                    name: '任务管理'
                  },
                  {
                    router: 'task2',
                    name: '调试日志'
                  },
                  {
                    router: 'task3',
                    name: '执行器管理'
                  }
                ]
              },
              {
                router: 'antdv',
                name: '外链',
                icon: 'file-word',
                link: 'https://www.antdv.com'
              }
            ]
          }]

          loadRoutes(routesConfig)
          this.$router.push('/index')
        }
      })
    },
    afterLogin(loginRes) {
      this.logging = false
      /* const loginRes = {
        code: 0,
        message: "上午好，欢迎回来",
        data: {
          user: {
            name: "LUIS",
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
            address: "安康市",
            position: {
              CN: "前端工程师 | 蚂蚁金服-计算服务事业群-REACT平台",
              HK: "前端工程師 | 螞蟻金服-計算服務事業群-REACT平台",
              US:
                "Front-end engineer | Ant Financial - Computing services business group - REACT platform",
            },
          },
          token: "Authorization:0.20325324620389718",
          expireAt: new Date(new Date().getTime() + 30 * 60 * 1000),
          permissions: [
            {
              id: "queryForm",
              operation: ["add", "edit"],
            },
          ],
          roles: [
            {
              id: "admin",
              operation: ["add", "edit", "delete"],
            },
          ],
        },
      };*/
      if (loginRes.msgCode === this.$Common.sucCode) {
        // const { user, permissions, roles } = loginRes.data;
        // this.setUser(user);
        // this.setPermissions(permissions);
        // this.setRoles(roles);
        setAuthorization({
          token: loginRes.result.accessToken,
          expireAt: loginRes.result.expiresIn / 24 / 60 / 60
        })
        // 获取路由配置
        /* getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes({router: this.$router, store: this.$store, i18n: this.$i18n}, routesConfig)
          this.$router.push('/index')
          this.$message.success(loginRes.message, 3)
        })*/

        const param = {
          token: getAuthorization()
        }
        this.$Http.postAction(this.$Api.checkToken, param).then((res) => {
          if (res.msgCode === this.$Common.sucCode) {
            this.setUser({
              name: res.result.user_name,
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
            })
            const routesConfig = [{
              router: 'root',
              children: [
                {
                  router: 'index',
                  name: '首页',
                  icon: 'home'
                },
                {
                  router: 'setting',
                  name: '系统设置',
                  redirect: '/setting/skin',
                  icon: 'setting',
                  children: [
                    {
                      router: 'skin',
                      name: '换肤设置'
                    },
                    {
                      router: 'editSkin',
                      name: '新增/编辑'
                    },
                    {
                      router: 'banner',
                      name: '轮播图管理'
                    },
                    {
                      router: 'version',
                      name: '版本管理'
                    }
                  ]
                },
                {
                  router: 'demo',
                  name: '系统监控',
                  redirect: '/demo/parent1',
                  icon: 'dashboard',
                  children: [
                    {
                      router: 'kibana',
                      name: 'Kibana',
                      icon: 'info-circle',
                      link: 'http://192.168.1.243:5601'
                    },
                    {
                      router: 'parent2',
                      name: '文档中心'
                    },
                    {
                      router: 'exception',
                      name: '文件中心'
                    }
                  ]
                },
                {
                  router: 'task',
                  name: '任务中心',
                  redirect: '/task/task1',
                  icon: 'warning',
                  children: [
                    {
                      router: 'task1',
                      name: '任务管理'
                    },
                    {
                      router: 'task2',
                      name: '调试日志'
                    },
                    {
                      router: 'task3',
                      name: '执行器管理'
                    }
                  ]
                },
                {
                  router: 'antdv',
                  name: '外链',
                  icon: 'file-word',
                  link: 'https://www.antdv.com'
                }
              ]
            }]

            loadRoutes(routesConfig)
            this.$router.push('/index')
            // this.$message.success(loginRes.message, 3);
          }/* else {
            this.$message.error(res.msgInfo);
          }*/
        })
      }/* else {
        this.error = loginRes.message;
      }*/
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout{
  .top{
    text-align: center;
    .header{
      height: 44px;
      margin-bottom: 60px;
      line-height: 44px;
      a{
        text-decoration: none;
      }
      .logo{
        height: 44px;
        margin-right: 16px;
        vertical-align: top;
      }
      .title{
        position: relative;
        top: 2px;
        color: @title-color;
        font-weight: 600;
        font-size: 33px;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      }
    }
  }
  .login{
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px){
      width: 95%;
    }
    @media screen and (max-width: 320px){
      .captcha-button{
        font-size: 14px;
      }
    }
    .icon{
      margin-left: 16px;
      color: @text-color-second;
      font-size: 24px;
      vertical-align: middle;
      cursor: pointer;
      transition: color .3s;
      &:hover{
        color: @primary-color;
      }
    }
  }
}
::v-deep .ant-tabs-nav-wrap{
  display: none;
}
</style>
