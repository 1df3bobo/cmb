<template>
  <view class="app">
    <navbar title="转账记录查询" bg-color="#f8f8f8" more-btn ai-btn> </navbar>
    <view class="pages">
      <image
        class="page-image"
        src="/static/pages/skmp.png"
        mode="widthFix"
      ></image>
      <view class="card-name">{{ userInfo.realName }}</view>
      <view class="card-number">{{ bankCard }}</view>
    </view>
  </view>
</template>

<script>
import { navigateTo, repeatCardNumber } from "@/utils/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageImage: "",
      info: {},
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    bankCard() {
      if(this.userInfo.bankList.length > 0) {
        const bankCard = this.userInfo.bankList[0].bankCard;
        return repeatCardNumber(bankCard);
      }
      return '';
    }
  },
  onLoad(options) {
    this.info = JSON.parse(options.info);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.app {
  width: 750rpx;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.pages {
  width: 750rpx;
  height: auto;
  position: relative;

  .page-image {
    width: 750rpx;
    height: auto;
  }

  .card-name {
    position: absolute;
    left: 69rpx;
    top: 50rpx;
    font-weight: bold;
    font-size: 34rpx;
  }

  .card-number {
    position: absolute;
    left: 210rpx;
    top: 132rpx;
    font-weight: bold;
    font-size: 30rpx;
  }
}
</style>
