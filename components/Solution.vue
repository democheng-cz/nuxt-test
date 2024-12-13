<template>
  <div class="solution-box">
    <div class="solution-item" v-for="item in solutionList" :key="item.id">
      <img :src="item.imgUrl" alt="" />
      <div>{{ item.title }}</div>
      <span>{{ item.intro }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.solution-box {
  width: 1040px;
  height: 360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .solution-item {
    width: 220px;
    height: 160px;
    > img {
      width: 40px;
      height: 40px;
    }
    > div {
      height: 28px;
      font-size: 20px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #3b426b;
      line-height: 28px;
      margin-top: 18px;
    }
    > span {
      display: block;
      height: 24px;
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(59, 66, 107, 0.6);
      line-height: 24px;
      margin-top: 8px;
    }
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      solutionList: [
        {
          id: 'SO001',
          imgUrl: require('~/static/img/solution/solution1.png'),
          title: '场景模板应用',
          intro: '为设计效果图保驾护航',
        },
        {
          id: 'SO002',
          imgUrl: require('~/static/img/solution/solution2.png'),
          title: '海量模型库',
          intro: '500+模型随意搭配',
        },
        {
          id: 'SO003',
          imgUrl: require('~/static/img/solution/solution3.png'),
          title: '模型编辑自由度高',
          intro: '模型随意编辑不变形',
        },
        {
          id: 'SO004',
          imgUrl: require('~/static/img/solution/solution4.png'),
          title: '房间灯光效果调整',
          intro: '光强色温氛围感十足',
        },
        {
          id: 'SO005',
          imgUrl: require('~/static/img/solution/solution5.png'),
          title: '房间外景调整',
          intro: '白天夜晚随意切换外景效果',
        },
        {
          id: 'SO006',
          imgUrl: require('~/static/img/solution/solution6.png'),
          title: '个性化方案',
          intro: '设计方案保存调用更方便',
        },
        {
          id: 'SO007',
          imgUrl: require('~/static/img/solution/solution7.png'),
          title: '活动卡券',
          intro: '次数券、体验卡使用更实惠',
        },
        {
          id: 'SO008',
          imgUrl: require('~/static/img/solution/solution8.png'),
          title: '分辨率升级',
          intro: '多种分辨率满足不同需求',
        },
      ],
    }
  },
}
</script>
