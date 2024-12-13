<template>
  <!-- 免费试用弹窗 -->
  <el-dialog
    :visible.sync="showDialog"
    :append-to-body="true"
    width="524px"
    top="28vh"
    @close="handleClose"
  >
    <div class="title-dialog">免费试用</div>
    <div class="free-intro-dialog">填写一下资料即可免费试用</div>
    <el-form
      :rules="rules"
      :model="form"
      ref="form"
      label-position="right"
      label-width="90px"
    >
      <el-row>
        <el-col :span="23">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23" class="code-box">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
            <el-button type="text" class="code-btn" @click="getCodeClick"
              >获取验证码</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="free-commit-dialog" type="primary" @click="handleSubmit"
      >确认提交</el-button
    >
  </el-dialog>
</template>

<style lang="scss">
.el-popup-parent--hidden {
  overflow-x: scroll;
}
.code-box {
  position: relative;
  .code-btn {
    position: absolute;
    top: 2px;
    right: 12px;
    width: 70px;
    font-family: Abel-Regular, Abel;
    font-weight: 400;
    color: $commonColor;
    z-index: 1;
  }
}
.el-dialog {
  border-radius: 8px;
  .title-dialog {
    font-size: 36px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    line-height: 44px;
    text-align: center;
  }
  .free-intro-dialog {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 24px;
    text-align: center;
    margin: 16px 0px;
  }
  .free-tel-dialog {
    font-size: 20px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    line-height: 28px;
    margin-top: 24px;
    text-align: center;
  }
  .free-commit-dialog {
    width: 448px;
    height: 46px;
    background: linear-gradient(180deg, #88b2ff 0%, #5f98ff 100%);
    border-radius: 4px 4px 4px 4px;
    font-size: 16px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    line-height: 24px;
    margin-left: 18px;
  }
}
.consult-box {
  position: fixed;
  right: 58px;
  bottom: 58px;
  width: 94px;
  height: 306px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
  .img-box {
    width: 94px;
    height: 97px;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      width: 130%;
      height: 130%;
    }
  }
  .free-box {
    width: 68px;
    height: 204px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $commonColor;
    border-radius: 5px;

    > .free-item {
      width: 68px;
      height: 68px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      .line {
        position: absolute;
        top: 0;
        width: 45px;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.35);
      }
      > img {
        width: 18px;
        height: 18px;
      }
      > span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
        line-height: 22px;
        margin-top: 5px;
      }
    }
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

export default Vue.extend({
  name: 'freeTry',
  props: {
    freeTryVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 控制弹出框显示隐藏
      showDialog: false,
      form: {
        name: '',
        phone: '',
        code: '',
        area_code: '+86',
      },
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur',
          },
          { min: 10, max: 12, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {},
  methods: {
    //回到顶部
    handleTop() {
      scrollTo(0, 0)
    },
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.showDialog = false
      this.$emit('changeShow', 'false')
    },
    //获取验证码
    async getCodeClick() {
      if (this.form.phone.length == 11) {
        const res = await request.POST<IData<ICode>>('/send_sms_code', {
          phone: this.form.phone,
          type: 'render_try',
          platform: 'web',
          area_code: '+86',
        })
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
        this.$message({
          message: '手机号输入有误!',
          type: 'error',
        })
      }
    },
    //提交信息
    async handleSubmit() {
      let flag = true
      Object.keys(this.form).forEach((k) => {
        const from: any = this.form
        if (!from[k]) {
          flag = false
        }
      })
      if (!flag) return this.$message.error('请填写完整信息！')
      const res = await request.POST<IData<ICode>>(
        '/website/render/apply_coupon',
        {
          name: this.form.name,
          phone: this.form.phone,
          code: this.form.code,
          area_code: '+86',
        }
      )
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
      this.showDialog = false
    },
  },
  watch: {
    // 监听 freeTryVisible 改变
    freeTryVisible(oldVal, newVal) {
      this.showDialog = this.freeTryVisible
    },
  },
})
</script>
