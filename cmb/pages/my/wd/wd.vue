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
    <view class="pages" :class="gradient == 2 ? 'pages-1' : ''">
      <image class="page-image" :src="pageImage" mode="widthFix"></image>
      <view class="bank-name" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <text>{{ wdName }}</text>
        <image
          class="arrow-right-icon"
          src="/static/icon/arrow-gray-right.png"
          mode=""
        ></image>
      </view>
      <view class="bank-address">{{ wdDetail }}</view>
      <view class="status open">
        <text>营业中</text>
      </view>
    </view>
    <u-modal
      title="编辑网点"
      :show="show"
      @confirm="handleSaveWd"
      @cancel="show = false"
      showCancelButton
      confirmText="确定"
    >
      <view style="width: 100%;">
        <view class="form">
          <view class="label">网点名称</view>
          <view class="content">
            <u--input
              placeholder="请输入网点名称"
              v-model="wdName"
            ></u--input>
          </view>
        </view>
        <view class="form" style="margin-top: 20rpx;">
          <view class="label">网点地址</view>
          <view class="content">
            <u--textarea v-model="wdDetail" placeholder="请输入网点地址" autoHeight></u--textarea>
          </view>
        </view>
      </view>
    </u-modal>
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
      show: false,
      wdDetail: "",
      wdName: "",
      timer: null,
    };
  },
  onLoad(options) {
    if (options.gradient) {
      this.gradient = options.gradient;
      if ("gradient" in options) {
        this.pageImage =
          options.gradient == "1"
            ? "/static/pages/wdwd.png"
            : "/static/pages/wd.png";
      }
      this.wdName = uni.getStorageSync('wdName');
      if(!this.wdName || this.wdName.length == 0) {
        this.wdName = this.bankInfo.branchBelongs.slice(0, this.bankInfo.branchBelongs.length - 2) + '营业部';
      }
      this.wdDetail = uni.getStorageSync('wdDetail');
    }
  },
  computed: {
    ...mapState(["navBarHeight", "statusBarHeight", "userInfo"]),
    bankInfo() {
      if (this.userInfo.bankList.lengtn <= 0) return {};
      return this.userInfo.bankList[0];
    },
  },
  methods: {
    handleSaveWd() {
      this.show = false;
      uni.setStorageSync('wdName', this.wdName);
      uni.setStorageSync('wdDetail', this.wdDetail);
    },
    handleTouchStart() {
      this.timer = setTimeout(() => {
        this.show = true;
      }, 6000);
    },
    handleTouchEnd() {
      if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
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

  .status {
    position: absolute;
    left: 60rpx;
    top: 435rpx;
    font-size: 28rpx;
    text-align: center;
    width: 100rpx;
  }

  .open {
    color: #00c100;
  }
  
  .close {
    color: red;
  }


  .bank-name {
    position: absolute;
    left: 60rpx;
    top: 220rpx;
    font-size: 40rpx;
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  .bank-address {
    position: absolute;
    left: 60rpx;
    top: 300rpx;
    font-size: 28rpx;
    width: calc(100vw - 120rpx);
    color: #666666;
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

.form {
  display: flex;
  width: 100%;
}

.label {
  width: 140rpx;
  flex-shrink: 0;
  margin-right: 20rpx;
  margin-top: 14rpx;
}

.content {
  flex: 1;
  border: 1rpx solid #f2f3f5;
  border-radius: 5rpx;
}

</style>
