<template>
  <div class="number-box">
    <div class="number-item">
      <div>
        <span id="my-number-one">67</span>
        <span>万+</span>
      </div>
      <div>注册用户</div>
    </div>
    <div class="number-item number-right">
      <div>
        <span id="my-number-two">1000</span>
        <span>个+</span>
      </div>
      <div>日均方案数</div>
    </div>
    <div class="number-item">
      <div>
        <span id="my-number-three">190</span>
        <span>万张+</span>
      </div>
      <div>渲染图总量</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-box {
  background-color: $commonColor;
  width: 100%;
  height: 234px;
  display: flex;
  justify-content: center;
  align-items: center;
  .number-item {
    width: 300px;
    > div {
      &:nth-of-type(1) {
        > span {
          &:nth-of-type(1) {
            font-size: 64px;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.9);
            line-height: 44px;
          }
          &:nth-of-type(2) {
            width: 33px;
            height: 28px;
            font-size: 20px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.9);
            line-height: 28px;
          }
        }
      }
      &:nth-of-type(2) {
        font-size: 20px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.9);
        line-height: 28px;
        margin-top: 24px;
      }
    }
  }
  .number-right {
    margin-right: 20px;
  }
}
</style>

<script>
var Interval
export default {
  data() {
    return {}
  },
  mounted() {
    window.addEventListener('scroll', this.windowScrollListener)
  },
  methods: {
    //数字增长
    addNumber(start, end, id, add) {
      var o = document.getElementById(id)
      let i = start
      if (i < end) {
        Interval = setInterval(function () {
          i += add // 设置每次增加的动态数字，可调整
          if (i > end) {
            clearInterval(Interval) // 清除setInterval的time
            o.innerHTML = end.toLocaleString() // 此赋值是为了避免最后一次增加过后的数据和真实数据不同
          } else {
            o.innerHTML = i.toLocaleString()
          }
        }, 50) // 数据跳转的速度控制
      }
    },
    //开启定时器
    handleInterval() {
      this.addNumber(1, 67, 'my-number-one', 10)
      this.addNumber(0, 1000, 'my-number-two', 50)
      this.addNumber(0, 190, 'my-number-three', 20)
      //清除事件监听
      window.removeEventListener('scroll', this.windowScrollListener)
    },
    windowScrollListener() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop >= 2166 && scrollTop <= 2200) {
        this.handleInterval() //大于2166时开启
      }
    },
  },
}
</script>
