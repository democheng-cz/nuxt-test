<template>
  <div>
    <el-form :model="form" ref="form" class="free-from-box">
      <input
        type="text"
        v-model="form.name"
        placeholder="请输入您所在的公司名称"
      />
      <input type="text" v-model="form.phone" placeholder="请输入电话号码" />
      <input type="text" v-model="form.code" placeholder="请输入短信验证码" />
      <div class="get-code" @click="getCodeClick">获取验证码</div>
      <div class="free-commit-bottom" @click="handleSubmit">立即申请</div>
    </el-form>
  </div>
</template>

<style lang="scss">
.free-from-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  > input {
    box-sizing: border-box;
    width: 270px;
    height: 40px;
    background: #ffffff;
    border-radius: 3px 3px 3px 3px;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 8px 12px;
    ::placeholder {
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      line-height: 24px;
    }
  }
  .get-code {
    position: absolute;
    left: 464px;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #5f98ff;
    line-height: 24px;
    z-index: 2;
    cursor: pointer;
  }
  .free-commit-bottom {
    width: 172px;
    height: 40px;
    background: $commonColor;
    border-radius: 4px 4px 4px 4px;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { IData, request } from '~/util/config'

interface ICode {
  phone: string
  name: string
  id: number
  code: number
}

interface FromType {
  name: string
  phone: string
  code: string
  area_code: string
}

type IFromType = keyof FromType

export default Vue.extend({
  name: 'freeTryBottom',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        code: '',
        area_code: '+86',
      },
    }
  },
  methods: {
    //获取验证码
    async getCodeClick() {
      if (this.form.phone.length == 11) {
        const res = await request.POST<IData<ICode>>(
          '/py/website/agent/send_sms_code',
          {
            phone: this.form.phone,
            platform: 'wind',
          }
        )
        if (res.status == 1) {
          this.$message({
            message: res.msg,
            type: 'success',
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
          })
        }
      } else {
        this.$message.error('手机号输入有误！')
      }
    },
    //提交信息
    async handleSubmit() {
      let flag = true
      Object.keys(this.form).forEach((k) => {
        if (!this.form[k as IFromType]) {
          flag = false
        }
      })
      if (!flag) return this.$message.error('请填写完整信息！')
      const res = await request.POST<IData<ICode>>('/py/website/agent', {
        name: this.form.name,
        phone: this.form.phone,
        code: this.form.code,
        platform: 'wind',
      })
      this.$message({
        message: '提交成功',
        type: 'success',
      })
      //清空输入框
      this.form = {
        name: '',
        phone: '',
        code: '',
        area_code: '+86',
      }
    },
  },
})
</script>
