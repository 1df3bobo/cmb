<template>
  <view class="app" :style="{ backgroundColor: bgColor }">
    <navbar
      v-if="gradient == 1"
      :left-icon="
        opacity > 0.5 ? '/static/icon/return@2x.png' : '/static/icon/back.png'
      "
      :placeholder="false"
      :title="title"
      :service-btn="serviceBtn"
      :service-btn-icon="
        opacity > 0.5
          ? '/static/icon/customer-w.png'
          : '/static/icon/customer-black.png'
      "
      :bg-color="`rgba(255,255,255,${1 - opacity})`"
      :ai-btn="aiBtn"
      :aiBtnIcon="
        opacity > 0.5 ? '/static/icon/icon5-w.png' : '/static/icon/icon5.png'
      "
      :more-btn="moreBtn"
      :more-btn-icon="
        opacity > 0.5 ? '/static/icon/icon3-w.png' : '/static/icon/icon3.png'
      "
      :title-color="`rgba(${255 * opacity},${255 * opacity},${
        255 * opacity
      },1)`"
    >
    </navbar>
    <navbar
      v-else
      :placeholder="false"
      :title="title"
      title-color="#000"
      :service-btn="serviceBtn"
      :bg-color="`rgba(255,255,255,${1 - opacity})`"
      :ai-btn="aiBtn"
      :more-btn="moreBtn"
    >
    </navbar>
    <view class="pages" :class="gradient == 2 ? 'pages-1':''">
      <image class="page-image" :src="pageImage" mode="widthFix"></image>
      <view class="bank-name">
        <text>{{ bankInfo.branchBelongs.slice(0, bankInfo.branchBelongs.length-2) }}营业部</text>
        <image
          class="arrow-right-icon"
          src="/static/icon/arrow-gray-right.png"
          mode=""
        ></image>
      </view>
      <view class="open-status">
        <text>营业中</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageImage: "",
      title: "网点",
      bgColor: "#fff",
      serviceBtn: true,
      moreBtn: true,
      aiBtn: false,
      opacity: 1,
      gradient: 1,
    };
  },
  onLoad(options) {
    if (options.gradient) {
      this.gradient = options.gradient;
      if ("gradient" in options) {
        this.pageImage = options.gradient == '1' ? '/static/pages/wdwd.png':'/static/pages/wd.png';
      }
    }
  },
  computed: {
    ...mapState(["navBarHeight", "statusBarHeight", "userInfo"]),
    bankInfo() {
      if (this.userInfo.bankList.lengtn <= 0) return {};
      return this.userInfo.bankList[0];
    },
  },
  onPageScroll(e) {
    var scrollTop = e.scrollTop;
    if (scrollTop == 0) {
      this.opacity = 1;
      return;
    } else if (scrollTop >= this.statusBarHeight) {
      this.opacity = 0;
      return;
    }
    this.opacity = 1 - scrollTop / this.statusBarHeight;
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

  .arrow-right-icon {
    width: 40rpx;
    height: 40rpx;
  }

  .open-status {
    position: absolute;
    left: 70rpx;
    top: 435rpx;
    font-size: 26rpx;
    color: #00c100;
  }

  .bank-name {
    position: absolute;
    left: 60rpx;
    top: 220rpx;
    font-size: 44rpx;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
}
.pages-1 {
  .open-status {
    top: 467rpx;
  }

  .bank-name {
    top: 240rpx;
  }
}
</style>
