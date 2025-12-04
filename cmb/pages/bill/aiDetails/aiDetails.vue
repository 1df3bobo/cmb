<template>
  <view class="app">
    <view class="pages">
      <image
        class="page-image"
        src="/static/pages/ai-detail-bg.png"
        mode="widthFix"
      ></image>
      <view class="back" @click="goBack"></view>
      <view class="info">
        <view class="info-type">
          <image class="info-type-icon" :src="details.icon" mode=""></image>
          {{ details.excerpt }}
        </view>
        <view class="info-money">
          <text>{{ momneyStr }}</text>
        </view>
      </view>
      <view class="time">{{ details.transactionTime }}</view>
      <view class="channel">{{ details.transactionChannel }}</view>
    </view>
  </view>
</template>

<script>
import { formatAmount, navigateBack, repeatCardNumber } from "@/utils/index.js";
export default {
  data() {
    return {
      details: {},
      repeatCardNumber: repeatCardNumber,
      show: false,
      showPop: false,
      classifyPopShow: false,
      icon: "",
      classify: {
        icon: "/static/icon/billCate/touzishouyi.png",
        name: "投资收益",
      },
    };
  },
  onLoad(op) {
    if (op.details) {
      this.details = JSON.parse(op.details);
      this.classify = {
        icon: this.details.categoryIcon,
        name: this.details.transactionCategory,
      };
    }
  },
  computed: {
    momneyStr() {
      let num = parseFloat(this.details.amount);
      if (num > 0) {
        return `￥${formatAmount(num.toFixed(2))}`;
      } else {
        return `-￥${formatAmount(Math.abs(num).toFixed(2))}`;
      }
    },
  },
  methods: {
    goBack() {
      navigateBack();
    },
  },
};
</script>

<style lang="scss">
.app {
  width: 750rpx;
  min-height: 100vh;
}

.pages {
  width: 750rpx;
  height: auto;
  position: relative;

  .page-image {
    width: 750rpx;
    height: auto;
  }

  .back {
    position: absolute;
    top: 60rpx;
    left: 0;
    width: 100rpx;
    height: 100rpx;
  }

  .info {
    width: 100%;
    padding-top: 57rpx;
    box-sizing: border-box;
    margin-bottom: 80rpx;
    position: absolute;
    top: 268rpx;

    .info-type {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 26rpx;
      margin-bottom: 28rpx;

      .info-type-icon {
        width: 44rpx;
        height: 44rpx;
        margin-right: 9rpx;
      }
    }

    .info-money {
      font-size: 50rpx;
      color: #383838;
      text-align: center;
      line-height: 55rpx;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .time {
    position: absolute;
    top: 505rpx;
    right: 100rpx;
    font-size: 28rpx;
  }

  .channel {
    position: absolute;
    top: 560rpx;
    right: 100rpx;
    font-size: 28rpx;
  }
}
</style>
