<template>
  <view class="app">
    <view class="pages">
      <image
        class="page-image"
        src="/static/pages/hotMovie.png"
        mode="widthFix"
      ></image>
      <view class="back" @click="goBack"></view>
      <view class="address">深圳</view>
    </view>
  </view>
</template>

<script>
import { navigateBack } from "@/utils/index.js";
export default {
  data() {
    return {
      details: {},
    };
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

  .address {
    position: absolute;
    top: 88rpx;
    left: 100rpx;
    font-size: 32rpx;
  }
}
</style>
