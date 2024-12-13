<template>
  <div class="bg-white h100vh w100vw flex flex-main--center flex-cross--center">
    <div class="absolute" style="left: 44px; top: 44px">
      <div class="flex flex-cross--center cursor-pointer" @click="handleBack">
        <img
          style="height: 20px; width: 20px"
          src="~/static/img/login/chevron-left.png"
        />
        <div class="ml4 color-o-6 fs16">返回</div>
      </div>
      <div class="flex flex-cross--center" style="margin: 44px 0 0 28px">
        <img
          src="~/static/img/web-logo.png"
          class="mr18"
          :style="{ height: '88px', width: '88px' }"
        />
        <div>
          <div class="bold" style="font-size: 32px; color: #3b426b">
            顺风耳设计 SFE
          </div>
          <div class="fs20" style="color: #97a3b7; line-height: 44px">
            设计要好看，沟通要方便
          </div>
        </div>
      </div>
    </div>
    <div style="width: 520px">
      <div style="margin-bottom: 62px">
        <div class="blod align-center" style="font-size: 32px; color: #3b426b">
          {{
            pageStatus == 'register'
              ? '注册新用户'
              : pageStatus == 'login'
              ? '登录账号'
              : '忘记密码'
          }}
        </div>
      </div>
      <div class="flex flex-dir--top" style="gap: 30px">
        <div class="input-item">
          <gAreaCode
            :areaCode="areaCode"
            class="mr12"
            @changeareaCode="changeareaCode"
          ></gAreaCode>
          <input
            :placeholder="pageStatus == 'login' ? '请输入账号' : '请输入手机号'"
            v-model="phone"
          />
        </div>
        <div class="input-item">
          <el-input
            :placeholder="
              pageStatus == 'login' || pageStatus == 'register'
                ? '请输入密码'
                : '请输入新密码'
            "
            v-model="password"
            show-password
            @keyup.enter.native="handleLoginClick"
          ></el-input>
        </div>
        <div class="input-item" v-if="pageStatus != 'login'">
          <el-input
            :placeholder="
              pageStatus == 'register' ? '请再次输入密码' : '请再次输入新密码'
            "
            v-model="repeat_password"
            show-password
            @keyup.enter.native="handleLoginClick"
          ></el-input>
        </div>
        <div v-if="pageStatus == 'register'" class="input-item">
          <span style="width: 80px">客户类型</span>
          <el-select
            class="flex-box--1"
            v-model="customerType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="input-item" v-if="pageStatus == 'register'">
          <span style="width: 80px">用途</span>
          <el-select
            class="flex-box--1"
            v-model="userType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="input-item" v-if="pageStatus != 'login'">
          <input v-model="code" placeholder="请输入验证码" />
          <span class="cursor-pointer" @click="handleSendCodeClick"
            >获取验证码</span
          >
        </div>
        <div class="input-item" v-if="pageStatus == 'register'">
          <input placeholder="请输入邀请码 (选填)" v-model="invitation_code" />
        </div>
      </div>
      <div
        class="flex flex-main--justify flex-cross--center mt20 fs16"
        style="color: #7787a2"
        v-if="pageStatus == 'login'"
      >
        <el-checkbox v-model="isRememberPassword">记住密码</el-checkbox>
        <div>
          没有账号，<span
            class="cursor-pointer"
            style="color: #4597f7"
            @click="handleRegisterClick"
            >注册新用户</span
          >
        </div>
      </div>
      <div
        class="mb20 pv12 align-center cursor-pointer color-f br8"
        style="margin-top: 64px; background-color: #4597f7"
        @click="handleLoginClick"
      >
        {{
          pageStatus == 'register'
            ? '注册'
            : pageStatus == 'forgetPassword'
            ? '修改密码'
            : '登录'
        }}
      </div>
      <div class="flex flex-main--justify">
        <div
          v-if="pageStatus == 'login'"
          class="cursor-pointer"
          style="color: #4597f7"
          @click="handleForgetPassword"
        >
          忘记密码
        </div>
        <div
          v-if="pageStatus == 'login'"
          class="color-o-6 align-right cursor-pointer"
          @click="handleToSfe"
        >
          可使用顺风耳账号登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getParams } from '@/util/utils'
import md5 from 'js-md5'
import gAreaCode from '~/components/g-area-code.vue'
import { request, guiguiBaseUrl, sfeUrl } from '~/util/config'

export default {
  name: 'WindWebLogin',
  props: {
    priceToLogin: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    if (localStorage.getItem('loginInfoRemember')) {
      let { phone, password } = JSON.parse(
        localStorage.getItem('loginInfoRemember')
      )
      this.phone = phone
      this.password = password
      this.isRememberPassword = true
    }
  },
  data() {
    return {
      password: '',
      phone: '',
      pageStatus: 'login',
      repeat_password: '',
      code: '',
      invitation_code: '',
      customerType: '',
      areaCode: '+86',
      customerList: [
        {
          label: '工厂',
          id: 1,
        },
        {
          label: '门店',
          id: 2,
        },
        {
          label: '业主',
          id: 3,
        },
        {
          label: '设计师',
          id: 4,
        },
        {
          label: '木工',
          id: 5,
        },
        {
          label: '其他',
          id: 6,
        },
      ],
      userType: '',
      userList: [
        {
          label: '了解软件',
          id: 1,
        },
        {
          label: '了解材料',
          id: 2,
        },
        {
          label: '了解定制柜',
          id: 3,
        },
      ],
      isRememberPassword: false,
    }
  },
  methods: {
    handleBack() {
      if (this.pageStatus == 'login') {
        if (location.href.indexOf('login/') != -1) {
          window.location.href = location.href.replace('login/', '')
        }
        this.$emit('handleBack')
      } else {
        this.pageStatus = 'login'
        this.password = ''
        this.repeat_password = ''
        this.code = ''
        this.customerType = ''
        this.userType = ''
        this.invitation_code = ''
      }
    },
    handleForgetPassword() {
      this.pageStatus = 'forgetPassword'
      this.password = ''
    },
    handleRegisterClick() {
      this.pageStatus = 'register'
      this.password = ''
    },
    handleSendCodeClick() {
      request
        .POST('/py/send_sms_code', {
          phone: this.phone,
          area_code: this.areaCode,
          type: this.pageStatus == 'register' ? 'sign_in' : 'reset_password',
          platform: 'guigui_web',
        })
        .then((res) => {
          this.$message({
            message: res.status == 1 ? '发送验证码成功' : res.msg,
            type: res.status == 1 ? 'success' : 'error',
          })
        })
    },
    handleLoginClick() {
      if (this.phone == '') {
        this.$message({
          message:
            this.pageStatus == 'forgetPassword' ? '请输入手机号' : '请输入账号',
          type: 'warning',
        })
        return
      }
      if (this.password == '') {
        this.$message({
          message:
            this.pageStatus == 'forgetPassword' ? '请输入新密码' : '请输入密码',
          type: 'warning',
        })
        return
      }
      if (this.pageStatus != 'login') {
        if (this.repeat_password == '') {
          this.$message({
            message: '请再次输入新密码',
            type: 'warning',
          })
          return
        }
        if (this.password != this.repeat_password) {
          this.$message({
            message: '请两次输入密码相同',
            type: 'warning',
          })
          return
        }
        if (this.code == '') {
          this.$message({
            message: '请输入验证码',
            type: 'warning',
          })
          return
        }
      }
      if (this.pageStatus == 'login') {
        request
          .POST('/py/login_guigui', {
            phone: this.phone,
            password: md5(this.password),
            version: 1,
            area_code: this.areaCode,
          })
          .then((res) => {
            this.$message({
              message: res.msg,
              type: res.status == 1 ? 'success' : 'error',
            })
            if (res.status == 1) {
              if (this.isRememberPassword) {
                localStorage.setItem(
                  'loginInfoRemember',
                  JSON.stringify({
                    phone: this.phone,
                    password: this.password,
                  })
                )
              } else {
                localStorage.removeItem('loginInfoRemember')
              }
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              setTimeout(() => {
                let mode = guiguiBaseUrl.indexOf('test') != -1 ? '-dev' : ''
                // 千里眼跳转
                if (
                  this.$route.query.from === 'qly' &&
                  this.$route.query.to !== 'undefined'
                ) {
                  const { rid, uid, oid, gVersion } = getParams(
                    this.$route.query.to,
                    ';',
                    ':'
                  )
                  if (rid) {
                    window.location.href = `https://webcg${mode}.thinkerx.com/home?openType=eyeH5&time=${Date.now()}&xxfParams=tar:xxf;rid:${rid};oid:${oid};gToken:${
                      res.data.token
                    };uid:${uid};gVersion:${gVersion}`
                  }
                  return
                }
                // 顺风耳设计分享
                if (this.$route.query.from === 'xxfShare') {
                  var urlParams = decodeURIComponent(location.search)
                  const info = urlParams.split('info=')[1]
                  window.open(
                    `https://webcg${mode}.thinkerx.com${info}&uid=${res.data.id}&token=${res.data.token}&haslogin=true`
                  )
                  return
                }
                if (this.priceToLogin != 0) {
                  let baseUrl =
                    guiguiBaseUrl.indexOf('test') != -1
                      ? 'https://www.test-api.eggrj.com'
                      : 'https://www.eggrj.com'

                  window.open(
                    `${baseUrl}/#/order?id=${this.priceToLogin}&uid=${res.data.id}&name=${res.data.name}`
                  )
                } else {
                  // 登录跳转
                  window.open(
                    // 本地调试
                    // `http://192.168.60.113:5173/auth?uid=${res.data.id}&token=${res.data.token}`
                    `https://webcg${mode}.thinkerx.com/auth?uid=${res.data.id}&token=${res.data.token}`
                  )
                }
              }, 500)
            }
          })
      } else if (this.pageStatus == 'forgetPassword') {
        request
          .POST('/py/reset_guigui_password', {
            phone: this.phone,
            area_code: this.areaCode,
            password: md5(this.password),
            repeat_password: md5(this.repeat_password),
            platform: 'guigui_web',
            sms_code: String(this.code),
          })
          .then((res) => {
            if (res.status == 1) {
              this.$message({
                message: '修改密码成功',
                type: 'success',
              })
              this.pageStatus = 'login'
              this.repeat_password = ''
              this.code = ''
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
              })
            }
          })
      } else {
        if (!this.customerType) {
          this.$message({
            message: '请选择客户类型',
            type: 'warning',
          })
          return
        }
        if (!this.userType) {
          this.$message({
            message: '请选择用途',
            type: 'warning',
          })
          return
        }
        request
          .POST('/py/sign_in_guigui_account', {
            phone: this.phone,
            area_code: this.areaCode,
            password: md5(this.password),
            repeat_password: md5(this.repeat_password),
            register_identity: this.customerType,
            register_purpose: this.userType,
            sms_code: String(this.code),
            invitation_code: this.invitation_code,
            platform: 'guigui_web',
          })
          .then((res) => {
            this.$message({
              message: res.status == 1 ? '注册成功' : res.msg,
              type: res.status == 1 ? 'success' : 'error',
            })
            this.pageStatus = 'login'
          })
      }
    },
    changeareaCode(code) {
      this.areaCode = code
    },
    handleToSfe() {
      let url = sfeUrl + '/sfeLogin?from=xxf_web'
      window.open(url)
    },
  },
  components: {
    gAreaCode,
  },
}
</script>

<style scoped lang="scss">
.input-item {
  background-color: #f4f5f7;
  border-radius: 8px;
  height: 54px;
  display: flex;
  align-items: center;
  padding: 5px 24px;
  box-sizing: border-box;

  input {
    background-color: #f4f5f7;
    border: none;
    flex: 1;
    height: 100%;
    outline: none;
    border-radius: 8px;
  }
}

:deep(.input-item .el-input__inner) {
  background-color: transparent;
  border: none;
}
</style>
