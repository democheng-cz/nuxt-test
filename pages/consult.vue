<template>
  <div class="consult-box">
    <div class="img-box">
      <img src="~/static/img/consult.png" alt="" />
    </div>
    <div class="free-box">
      <div class="free-item free-tel">
        <img src="~/static/img/phone-t.png" alt="" />
        <span>咨询电话</span>
        <div class="telphone-mask">
          <div class="telphone">
            <div>
              <img src="~/static/img/tel.png" alt="" />
            </div>
            <div>
              <div>联系电话</div>
              <span><a href="tel://400-1567-080">400-1567-080</a></span>
              <div
                :plain="true"
                class="copy-tel"
                data-clipboard-text="400-1567-080"
                @click="copy"
              >
                <img src="~/static/img/file-copy.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="free-item" @click="show">
        <img src="~/static/img/pen.png" alt="" />
        <span>免费试用</span>
        <div class="line"></div>
      </div>
      <div
        class="free-item free-tel"
        @mouseout="handleMouseenter"
        @mouseleave="handleMouseover"
      >
        <img src="~/static/img/downLoadApp.png" alt="" />
        <span>下载APP</span>
        <div class="line"></div>
      </div>
      <div class="free-item" @click="handleTop">
        <img src="~/static/img/top.png" alt="" />
        <span>TOP</span>
        <div class="line"></div>
      </div>
    </div>

    <!-- 免费试用弹窗 -->
    <FreeTry
      :freeTryVisible="freeTryVisible"
      @changeShow="showFreeTry"
      ref="addOrUpdateRef"
    />
  </div>
</template>
<style lang="scss">
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
  bottom: 208px;
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
    > .free-tel {
      &:hover .telphone-mask {
        display: block;
      }
    }

    > .free-item {
      width: 68px;
      height: 68px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      .telphone-mask {
        position: absolute;
        width: 198px;
        top: 0;
        right: 50px;
        z-index: 3;
        height: 70px;
        display: none;
      }
      .telphone {
        position: absolute;
        width: 198px;
        top: 0;
        right: 38px;
        z-index: 4;
        height: 70px;
        width: 198px;
        border-radius: 3px 3px 3px 3px;
        background: #f3f5ff;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.12),
          0px 4px 5px 0px rgba(0, 0, 0, 0.08),
          0px 1px 10px 0px rgba(0, 0, 0, 0.05);

        > div {
          &:nth-of-type(1) {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 20px;
            left: 15px;
          }
          &:nth-of-type(2) {
            width: 116px;
            margin-left: 10px;
            position: absolute;
            top: 15px;
            left: 40px;
            > div {
              font-size: 12px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.9);
              line-height: 20px;
            }
            > span {
              font-size: 14px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #508aff;
              line-height: 22px;
            }
            .copy-tel {
              float: right;
              width: 16px;
              height: 16px;
              margin-top: 4px;
            }
          }
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
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

<!-- <script src="//www1.pcauto.com.cn/zt/rjk/2109/clipboard.min.js"></script> -->
<script>
//引入点击复制插件
import Clipboard from 'clipboard'
import FreeTry from '~/components/freeTry.vue'

export default {
  data() {
    return {
      // 控制免费试用弹窗的显示与隐藏
      freeTryVisible: false,
      telphone: false,
    }
  },
  mounted() {},
  methods: {
    handleMouseenter() {
      this.$parent.isMoveApp = true
    },
    handleMouseover() {
      this.$parent.timer = setTimeout(() => {
        this.$parent.isMoveApp = false
      }, 800)
    },
    handleTop() {
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      })
    },
    show() {
      this.freeTryVisible = true
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用true
    showFreeTry(data) {
      if (data === 'false') {
        this.freeTryVisible = false
      } else {
        this.freeTryVisible = true
      }
    },
    //复制电话
    copy() {
      var clipboard = new Clipboard('.copy-tel')
      clipboard.on('success', (e) => {
        this.$message({
          showClose: true,
          message: '复制成功',
          type: 'success',
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$message({
          showClose: true,
          message: '该浏览器不支持自动复制',
          type: 'error',
        })
        // 释放内存
        clipboard.destroy()
      })
    },
  },
  components: { FreeTry },
}
</script>
