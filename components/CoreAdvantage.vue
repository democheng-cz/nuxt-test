<template>
  <div class="core-advantage-box">
    <div
      class="core-advantage-item"
      v-for="item in coreAdvantageList"
      :key="item.id"
    >
      <img :src="item.imgUrl" alt="" />
      <span>{{ item.titltSmall }}</span>
      <span>{{ item.introOne }}</span>
      <span>{{ item.introTwo }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.core-advantage-box {
  width: 1060px;
  height: 210px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .core-advantage-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    > img {
      width: 40px;
      height: 40px;
    }
    > span {
      &:nth-of-type(1) {
        width: 100px;
        height: 28px;
        font-size: 20px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #3b426b;
        line-height: 26px;
        margin-top: 28px;
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #7a7d8d;
        line-height: 24px;
      }
      &:nth-of-type(2) {
        margin-top: 8px;
      }
    }
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      coreAdvantageList: [
        {
          id: 'CA001',
          imgUrl: require('~/static/img/core/core1.png'),
          titltSmall: '傻瓜式操作',
          introOne: '操作简单，手机也能用',
          introTwo: '降低设计师培养成本',
        },
        {
          id: 'CA002',
          imgUrl: require('~/static/img/core/core2.png'),
          titltSmall: '使用成本低',
          introOne: '渲染价格友好',
          introTwo: '没有年费，终身使用',
        },
        {
          id: 'CA003',
          imgUrl: require('~/static/img/core/core3.png'),
          titltSmall: '打通生产端',
          introOne: '门窗、柜子自由设计',
          introTwo: '发送到工厂，无需重复画图',
        },
        {
          id: 'CA004',
          imgUrl: require('~/static/img/core/core4.png'),
          titltSmall: '签单率提高',
          introOne: '真实还原场景',
          introTwo: '利于线下设计谈单',
        },
      ],
    }
  },
}
</script>
