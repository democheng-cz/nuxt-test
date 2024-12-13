<template>
  <div class="bottom-box">
    <div class="contact">
      <div class="title">联系我们</div>
      <ul>
        <li><a href="tel://400-1567-080">客服电话：400-1567-080</a></li>
        <li>公司：成都亿格人居科技有限公司</li>
        <li><a href="https://www.eggrj.com/">官网：www.eggrj.com </a></li>
        <li>地址：成都高新区天府大道中段801号B区5栋2楼203号</li>
        <li>总部：江苏新格尔人居科技有限公司</li>
        <li><a href="https://www.thinkerx.com/">官网：www.thinkerx.com </a></li>
        <li>地址：无锡市经开区太湖新城秀水坊2号楼</li>
      </ul>
    </div>
    <div class="blogroll">
      <div class="title">友情链接</div>
      <a href="https://www.eggrj.com/">柜柜APP</a>
      <a href="http://lbl.eggi.cn/">老板良</a>
      <a href="http://www.seeyard.cn/">四合院</a>
      <a href="https://windowcc.com/home">画门窗</a>
    </div>
    <div class="guigui">
      <div class="title">顺风耳公众号</div>
      <img src="~/static/img/sfrQR.jpg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-box {
  box-sizing: border-box;
  width: 100%;
  height: 448px;
  background: #071331;
  display: flex;
  justify-content: center;
  padding: 70px 0px;
  .contact {
    width: 594px;
    > ul {
      margin-top: 12px;
      > li {
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.55);
        line-height: 40px;
      }
    }
  }
  .blogroll {
    width: 284px;
    > a {
      &:nth-of-type(1) {
        margin-top: 12px;
      }
    }
  }
  .guigui {
    width: 150px;
    > img {
      margin-top: 18px;
      width: 140px;
      height: 140px;
    }
  }
}
.title {
  font-size: 20px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 28px;
}
a {
  display: block;
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  line-height: 40px;
  text-decoration: none;
}
</style>
