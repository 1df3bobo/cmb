<template>
  <view class="app">
    <view class="pages">
      <image
        class="page-image"
        src="/static/pages/jieqian.png"
        mode="widthFix"
      ></image>
      <view class="back" @click="goBack"></view>
      <view class="address">{{ userInfo.city }}</view>
    </view>
  </view>
</template>

<script>
import { navigateBack } from "@/utils/index.js";
import {
  mapState,
 } from 'vuex'
export default {
  data() {
    return {
      details: {},
    };
  },
  computed: {
    ...mapState(['userInfo']),
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
    top: 670rpx;
    right: 100rpx;
    font-size: 30rpx;
  }
}
</style>
