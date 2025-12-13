<template>
  <view class="app">
    <page-meta :page-style="'overflow:' + (showPageTwo ? 'hidden' : 'visible')" />
    <navbar
      :showBack="false"
      :placeholder="false"
      :bg-color="`rgba(255,255,255,${1 - opacity})`"
    >
      <slot>
        <view class="nav-content" :style="{ height: `${navBarHeight}px` }">
          <image
            class="nav-scan"
            :src="
              opacity < 1
                ? '/static/icon/scan-black.png'
                : '/static/icon/scan-white.png'
            "
          ></image>
          <view
            class="nav-search"
            @click="goSearch"
            :style="{
              border: opacity < 1 ? '1rpx solid #ccc' : '1rpx solid #fff',
            }"
          >
            <image
              class="nav-search-icon"
              :src="
                opacity < 1
                  ? '/static/icon/search-black.png'
                  : '/static/icon/search.png'
              "
            ></image>
            <swiper
              class="search-swiper"
              :style="{ color: opacity < 1 ? '#ccc' : '#ffffff' }"
              circular
              vertical
              autoplay
            >
              <swiper-item class="swiper-item">
                <view class="swiper-item">家校有招</view>
              </swiper-item>
              <swiper-item class="swiper-item">
                <view class="swiper-item">持仓赢好礼</view>
              </swiper-item>
              <swiper-item class="swiper-item">
                <view class="swiper-item">流水打印</view>
              </swiper-item>
            </swiper>
          </view>
          <image
            class="nav-customer"
            @click="goCustomer"
            :src="
              opacity < 1
                ? '/static/icon/icon5.png'
                : '/static/icon/icon5-w.png'
            "
          >
          </image>
          <image
            @click="goMessage"
            class="nav-message"
            :src="
              opacity < 1
                ? '/static/icon/msg-black.png'
                : '/static/icon/msg-white.png'
            "
          ></image>
        </view>
      </slot>
    </navbar>
    <view
      class="main"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="{ transform: `translateY(${touchMoveDistance}px)` }"
    >
      <image
        class="header"
        src="/static/home/srollview-header.png"
        mode="widthFix"
      ></image>
      <!-- <view class="cate" :style="{height:`${px2rpx(navBarHeight)+px2rpx(statusBarHeight)+440}rpx`,paddingTop:`${navBarHeight+statusBarHeight}px`}"> -->
      <view
        class="cate"
        :style="{
          height: `${px2rpx(navBarHeight) + px2rpx(statusBarHeight) + 430}rpx`,
          paddingTop: `${navBarHeight + statusBarHeight}px`,
        }"
      >
        <view
          class="item"
          @click="goCate(item)"
          v-for="(item, index) in cateList"
          :key="index"
        >
          <image class="icon" :src="item.icon"></image>
          <text>{{ item.name }}</text>
        </view>
        <view class="main-banner" @click="mainBanner"></view>
      </view>
      <view class="projects">
        <view
          class="item"
          @click="goProjects(item)"
          v-for="(item, index) in projects"
          :key="index"
        >
          <image class="icon" :src="item.icon"></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
      <view class="notice">
        <swiper class="notice-swiper" circular vertical autoplay>
          <swiper-item class="swiper-item">
            <view class="swiper-item">理财收益受那些市场因素影响？</view>
          </swiper-item>
          <swiper-item class="swiper-item">
            <view class="swiper-item">小招有财：2元现金红包待领取</view>
          </swiper-item>
        </swiper>
      </view>
      <view class="banner">
        <swiper class="banner-swiper" circular autoplay>
          <swiper-item
            class="swiper-item"
            v-for="item in bannarList"
            :key="item.id"
            @click="goBanner(item)"
          >
            <image class="icon" :src="item.icon"></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="footer-page">
        <!-- 财富精选 -->
        <view class="caifu" @click="caifu"></view>
        <!-- 借钱 -->
        <view class="jieqian" @click="jieqian"></view>
        <!-- 特色榜单 -->
        <view class="specialtyList" @click="specialtyList"></view>
        <!-- 生活特惠 -->
        <view class="shenghuo">
          <!-- 热映大片 -->
          <view class="movie" @click="goHotMovie"></view>
          <view class="module-row">
            <!-- 碳寻星空 -->
            <view class="tanxunxingkong" @click="goTanxunxingkong"></view>
            <!-- 曹操出行 -->
            <view class="caocaochuxing" @click="goCaocaochuxing"></view>
          </view>
        </view>
        <!-- 看点情报 -->
        <view class="qingbao" @click="qingbao"></view>
        <!-- pk话题 -->
        <view class="pkht"></view>
        <!-- 上证指数 -->
        <view class="other">
          <!-- 稳健人集合 -->
          <view class="wjrjg" @click="goWjrjg"></view>
          <view style="width: 50%">
            <!-- 热门板块 -->
            <view class="other-right" @click="goRmbk"></view>
            <!-- 备老乘早 -->
            <view class="other-right" @click="goBlcz"></view>
          </view>
        </view>
        <!-- 热议话题 -->
        <view class="ryht" @click="reyi"></view>
      </view>
    </view>
    <u-popup mode="top" :show="showPageTwo" @close="pageClose" @open="pageOpen">
      <view class="pages">
        <image
          class="page-image"
          src="/static/pages/home-page-2.png"
          mode="widthFix"
        ></image>
        <image
          class="page-back"
          src="/static/icon/back.png"
          mode="widthFix"
          @click="pageClose"
        ></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { px2rpx, navigateTo } from "@/utils/index.js";
export default {
  data() {
    return {
      px2rpx: px2rpx,
      maxPullDistance: 300, // 最大下拉距离
      touchMoveDistance: "0",
      showPageTwo: false,
      opacity: 1,
      bannarList: [
        {
          id: "111",
          icon: "/static/home/home-banner-1.png",
          path: "/pages/commonPages/commonPages?pageImage=/static/pages/bannerPage1.png&title=掌上商城福利专区&&shareBtn=true&&serviceBtn=false&&moreBtn=false",
        },
        {
          id: "222",
          icon: "/static/home/home-banner-2.png",
          path: "/pages/commonPages/commonPages?pageImage=/static/pages/bannerPage2.png&title=月月支付抽锦鲤&&serviceBtn=false",
        },
        {
          id: "333",
          icon: "/static/home/home-banner-3.png",
          path: "/pages/commonPages/commonPages?pageImage=/static/pages/bannerPage3.png&title=网点&&serviceBtn=false&&showNav=false",
        },
        {
          id: "444",
          icon: "/static/home/home-banner-4.png",
          path: "/pages/commonPages/commonPages?pageImage=/static/pages/bannerPage4.png&title=暖冬健康季&&serviceBtn=false",
        },
        {
          id: "555",
          icon: "/static/home/home-banner-5.png",
          path: "/pages/commonPages/commonPages?pageImage=/static/pages/bannerPage5.png&title=招商银行亲自金融服务介绍&&serviceBtn=false",
        },
      ],
      cateList: [
        {
          name: "朝朝宝",
          icon: "/static/home/chaoChaoBao.png",
          path: "/pages/chaoChaoBao/chaoChaoBao",
        },
        {
          name: "借钱",
          icon: "/static/home/borrowMoney.png",
          path: "/pages/borrowMoney/borrowMoney",
        },
        {
          name: "转账",
          icon: "/static/home/transferAccounts.png",
          path: "/pages/transfer/index/index",
        },
        {
          name: "账户总览",
          icon: "/static/home/account.png",
          path: "/pages/account/account/account",
        },
      ],
      projects: [
        {
          name: "申请信用卡",
          icon: "/static/home/kingOne.png",
          path: `/pages/commonPages/commonPages?pageImage=/static/pages/xyksq.png&title=招商银行信用卡申请&serviceBtn=${false}`,
        },
        {
          name: "收支明细",
          icon: "/static/home/kingTwo.png",
          path: "/pages/bill/bill",
        },
        {
          name: "他行卡转入",
          icon: "/static/home/kingThree.png",
          path: "/pages/transfer/single/single",
        },
        {
          name: "医保码",
          icon: "/static/home/kingFour.png",
          path: `/pages/commonPages/commonPages?pageImage=/static/pages/ybm.png&title=医保码&serviceBtn=${false}`,
        },
        {
          name: "热门活动",
          icon: "/static/home/kingFive.png",
          path: `/pages/commonPages/commonPages?pageImage=/static/pages/rmhd.png&title=热门活动&serviceBtn=${false}`,
        },
        {
          name: "流水打印",
          icon: "/static/home/kingSix.png",
          path: "/pages/water/water/water",
        },
        {
          name: "养老金融",
          icon: "/static/home/kingSeven.png",
          path: `/pages/common/common?pageImage=/static/pages/grylj.png&serviceBtn=${false}&moreBtn=${false}`,
        },
        {
          name: "M+会员",
          icon: "/static/home/kingEight.png",
          path: "/pages/mMember/mMember",
        },
        {
          name: "影票",
          icon: "/static/home/kingNight.png",
          path: "/pages/movieTicket/movieTicket",
        },
        {
          name: "全部",
          icon: "/static/home/kingTen.png",
          path: "/pages/allMenu/allMenu",
        },
      ],
    };
  },
  computed: {
    ...mapState(["navBarHeight", "statusBarHeight"]),
  },
  onLoad() {},
  onPageScroll(e) {
    var scrollTop = e.scrollTop;
    if (scrollTop >= this.navBarHeight) {
      this.opacity = 0;
      return;
    } else if (scrollTop == 0) {
      this.opacity = 1;
      return;
    }
    this.opacity = 1 - scrollTop / this.navBarHeight;
  },

  methods: {
    onTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },

    onTouchMove(e) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - this.startY;

      if (diff > 0) {
        // 阻止默认滚动
        e.preventDefault && e.preventDefault();

        // 阻尼效果
        let dampedDiff = this.damping(diff);

        if (dampedDiff - 50 < 0) dampedDiff = 0;

        this.touchMoveDistance = dampedDiff;
      }
    },
    onTouchEnd() {
      if (this.touchMoveDistance >= 250) {
        this.pageOpen();
      }
      this.touchMoveDistance = 0;
    },
    // 阻尼函数
    damping(x) {
      const max = this.maxPullDistance;
      return max * (1 - Math.exp(-x / max / 0.5));
    },
    pageClose() {
      this.showPageTwo = false;
    },
    pageOpen() {
      this.showPageTwo = true;
    },
    goSearch() {
      navigateTo({
        url: `/pages/search/search`,
      });
    },
    caifu() {
      navigateTo({
        url: `/pages/commonPages/commonPages?pageImage=/static/pages/cfjx.png&title=财富精选&serviceBtn=${false}`,
      });
    },
    jieqian() {
      // navigateTo({
      //   url: `/pages/borrowMoney/borrowMoney`,
      // });
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/jieqian.png`,
      });
    },
    specialtyList() {
      // navigateTo({
      //   url: `/pages/index/specialtyList/specialtyList`,
      // });
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/tsbd.png`,
      });
    },
    shenghuo() {
      navigateTo({
        url: `/pages/common/common?pageImage=/static/pages/shth.png&serviceBtn=${false}&moreBtn=${false}`,
      });
    },
    qingbao() {
      // navigateTo({
      //   url: `/pages/common/common?pageImage=/static/pages/tj.png&serviceBtn=${false}&moreBtn=${false}`,
      // });
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/kdqb.png`,
      });
    },
    reyi() {
      // navigateTo({
      //   url: `/pages/common/common?pageImage=/static/pages/tj.png&serviceBtn=${false}&moreBtn=${false}`,
      // });
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/ryht.png`,
      });
    },
    goWjrjg() {
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/wjrhj.png`,
      });
    },
    goRmbk() {
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/rmbk.png`,
      });
    },
    goBlcz() {
      navigateTo({
        url: `/pages/commonNoNavPages/commonNoNavPages?pageImage=/static/pages/blcz.png`,
      });
    },
    mainBanner() {
      navigateTo({
        url: `/pages/commonPages/commonPages?pageImage=/static/pages/homeMainBanner.png&title=省心省力 稳健增值&serviceBtn=${false}`,
      });
    },
    goBanner(item) {
      if (item.path) {
        navigateTo({
          url: item.path,
        });
      }
    },
    goCate(item) {
      if (item.path) {
        navigateTo({
          url: item.path,
        });
      }
    },
    goProjects(item) {
      if (item.path) {
        navigateTo({
          url: item.path,
        });
      }
    },
    goCustomer() {
      navigateTo({
        url: `/pages/common/common?pageImage=/static/pages/kefu.png&serviceBtn=${false}&title=小招-客服门户&gradient=2`,
      });
    },
    goMessage() {
      navigateTo({
        url: `/pages/messageCenter/messageCenter`,
      });
    },
    goHotMovie() {
      navigateTo({
        url: `/pages/index/hotMovie/hotMovie`,
      });
    },
    goCaocaochuxing() {
      navigateTo({
        url: `/pages/commonPages/commonPages?pageImage=/static/pages/caocaochuxing.png&title=曹操出行周周有礼&serviceBtn=${false}`,
      });
    },
    goTanxunxingkong() {
      navigateTo({
        url: `/pages/commonPages/commonPages?pageImage=/static/pages/tanxunxingkong.png&title=碳寻星空&serviceBtn=${false}&shareBtn=${true}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  min-height: 400rpx;
  position: relative;
  background-color: #f8f8f7;
}

.header {
  width: 100vw;
  transform: translateY(-100%);
  // top: 50%;
  top: 0;
  position: absolute;
  z-index: 1000;
}

.nav-content {
  width: 750rpx;
  display: flex;
  align-items: center;
  padding: 0 0 0 36rpx;
  box-sizing: border-box;

  .nav-scan,
  .nav-customer,
  .nav-message {
    width: 40rpx;
    height: 40rpx;
  }

  .nav-customer {
    margin-right: 46rpx;
  }

  .nav-search {
    width: 445rpx;
    height: 58rpx;
    margin: 0 34rpx;
    box-sizing: border-box;
    border-radius: 30rpx 30rpx 30rpx 30rpx;
    border: 1rpx solid #f8888e;
    display: flex;
    align-items: center;
    padding-left: 20rpx;

    .nav-search-icon {
      width: 40rpx;
      height: 40rpx;
    }

    .search-swiper {
      flex: 1;
      height: 58rpx;
      display: flex;
      align-items: center;
      margin-left: 10rpx;
      color: #ffffff;

      .swiper-item {
        height: 58rpx;
        display: flex;

        font-size: 28rpx;
        font-weight: 400;
        align-items: center;
      }
    }
  }
}

.cate {
  width: 100%;
  display: flex;
  padding-left: 54rpx;
  padding-right: 43rpx;
  box-sizing: border-box;
  justify-content: space-between;
  background-image: url(/static/home/home-header-bg.png);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    font-size: 26rpx;
    padding-top: 36rpx;
    box-sizing: border-box;
    line-height: 1;
    height: 160rpx;
    width: 25%;

    .icon {
      width: 62rpx;
      height: 62rpx;
      margin-bottom: 17rpx;
    }
  }

  .main-banner {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 260rpx;
  }
}

.projects {
  width: 100%;
  height: 294rpx;
  background-color: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30rpx 30rpx 0;
  box-sizing: border-box;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 22rpx;
    font-weight: 700;
    color: #333;
    width: 120rpx;
    margin-bottom: 50rpx;
    font-weight: 400;

    .icon {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 20rpx;
    }
  }
}

.notice {
  width: 750rpx;
  height: 93rpx;
  background-image: url(/static/home/notice-bg.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  padding-left: 179rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .notice-swiper {
    width: 100%;
    height: 100%;
    color: #383838;
    font-size: 28rpx;

    .swiper-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.banner {
  width: 750rpx;
  height: 175rpx;
  margin-bottom: 20rpx;

  .banner-swiper {
    width: 750rpx;
    height: 175rpx;

    .swiper-item,
    .icon {
      width: 750rpx;
      height: 175rpx;
    }
  }
}

.footer-page {
  width: 750rpx;
  height: 5605rpx;
  background-image: url(/static/home/page.png);
  background-position: top;
  background-repeat: no-repeat;
  background-size: 750rpx 5605rpx;

  .caifu {
    width: 100%;
    height: 890rpx;
  }

  .jieqian {
    width: 100%;
    height: 390rpx;
  }

  .specialtyList {
    width: 100%;
    height: 590rpx;
    margin-top: 60rpx;
  }

  .shenghuo {
    width: 100%;
    height: 700rpx;
    margin-top: 60rpx;

    .movie {
      height: 490rpx;
    }

    .tanxunxingkong {
      width: 50%;
      height: 210rpx;
    }

    .caocaochuxing {
      width: 50%;
      height: 210rpx;
    }
  }

  .qingbao {
    width: 100%;
    height: 400rpx;
    margin-top: 60rpx;
  }

  .pkht {
    width: 100%;
    height: 350rpx;
    margin-top: 60rpx;
  }

  .other {
    width: 100%;
    height: 500rpx;
    margin-top: 180rpx;
    display: flex;

    .wjrjg {
      height: 100%;
      width: 50%;
    }

    .other-right {
      height: 50%;
      width: 100%;
    }
  }

  .ryht {
    width: 100%;
    height: 470rpx;
    margin-top: 20rpx;
  }

  .module-row {
    display: flex;
  }
}

.pages {
  width: 750rpx;
  height: auto;
  overflow-y: auto;
  position: relative;

  .page-image {
    width: 750rpx;
    height: auto;
  }

  .page-back {
    position: absolute;
    top: 40rpx;
    left: 20rpx;
    width: 70rpx;
  }
}
</style>
