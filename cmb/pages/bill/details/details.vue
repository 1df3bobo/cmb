<template>
  <view class="app">
    <navbar bg-color="#f8f8f8" more-btn service-btn title="交易详情"> </navbar>
    <view class="main">
      <view class="container">
        <view class="info">
          <view class="info-type">
            <image class="info-type-icon" :src="details.icon" mode=""></image>
            {{ details.excerpt }}
          </view>
          <view class="info-money">
            <text>{{ momneyStr }}</text>
            <image
              @click="goDetails"
              class="info-money-info"
              src="/static/icon/icon12.png"
              mode=""
            ></image>
          </view>
        </view>
        <view class="cell">
          <view class="label">交易卡号</view>
          <view class="content">{{ repeatCardNumber(details.bankCard) }}</view>
        </view>
        <view class="cell">
          <view class="label">交易时间</view>
          <view class="content">{{ details.transactionTime }}</view>
        </view>
        <view class="cell" v-if="details.oppositeBankName">
          <view class="label">{{ details.type == 1 ? "付款" : "收款" }}银行</view >
          <view class="content">{{
            details.oppositeBankName
          }}</view>
        </view>
        <view class="cell" v-if="details.oppositeAccount">
          <view class="label"
            >{{ details.type == 1 ? "付款" : "收款" }}账号</view
          >
          <view class="content">{{
            repeatCardNumber(details.oppositeAccount)
          }}</view>
        </view>

        <view class="cell" v-if="details.merchantBranch">
          <view class="label">转账附言</view>
          <view class="content">{{ details.merchantBranch }}</view>
        </view>
        <view class="cell">
          <view class="label">银行交易类型</view>
          <view class="content">{{ details.transactionChannel }}</view>
        </view>
      </view>
      <view class="banner"></view>
      <view class="container container2">
        <view class="cell" @click="classifyPopShow = true">
          <view class="label">分类</view>
          <view class="content">
            <image
              class="content-cate-icon"
              :src="classify.icon"
              mode=""
            ></image>
            <text>{{ classify.name }}</text>
            <image
              class="content-cate-arrow"
              src="/static/home/bill-details-icon1.png"
              mode=""
            ></image>
          </view>
        </view>
        <view class="cell" @click="showPop = true">
          <view class="label">所属账本</view>
          <view class="content">
            <text class="content-select">请选择</text>
            <image
              class="content-cate-arrow"
              src="/static/home/bill-details-icon1.png"
              mode=""
            ></image>
          </view>
        </view>
        <view class="cell">
          <view class="label">不计入本月收支</view>
          <view class="content">
            <u-switch
              v-model="show"
              inactiveColor="#D2CFC8"
              activeColor="#316EE5"
              size="24"
            ></u-switch>
          </view>
        </view>
        <view class="remark">
          <view class="label">备注</view>
          <view class="content">
            <input
              class="content-input"
              placeholder-style="color:#C7C7C7"
              placeholder="记录点什么..."
              type="text"
            />
            <image
              class="content-icon"
              src="/static/home/bill-details-icon2.png"
              mode=""
            ></image>
          </view>
        </view>
      </view>
      <view class="footer-pl" v-if="details.oppositeBankId"></view>
      <view class="footer" v-if="details.oppositeBankId">
        <view class="footer-content">
          <view class="footer-btn" @click="goTransfer">给TA转账</view>
          <view class="footer-btn" @click="goRecord">查看往来记录</view>
        </view>
      </view>
    </view>
    <billLedger :show="showPop" @close="showPop = false"></billLedger>
    <billClassifyPop
      @confirm="classifyConfirm"
      :type="details.type"
      :show="classifyPopShow"
      @close="classifyPopShow = false"
    >
    </billClassifyPop>
  </view>
</template>

<script>
import { formatAmount, navigateTo, repeatCardNumber } from "@/utils/index.js";
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
    this.details = uni.getStorageSync('billDetail');
    uni.clearStorageSync();
    // if (op.details) {
    //   this.details = JSON.parse(op.details);
      this.classify = {
        icon: this.details.categoryIcon,
        name: this.details.transactionCategory,
      };
    // }
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
    goDetails() {
      navigateTo({
        url: `/pages/bill/aiDetails/aiDetails?details=${JSON.stringify(
          this.details
        )}`,
      });
    },
    goTransfer() {
      navigateTo({
        url:
          "/pages/transfer/bank/bank?contactsInfoStr=" +
          JSON.stringify({
            bankCard: this.details.oppositeAccount,
            name: this.details.oppositeName,
          }),
      });
    },
    goRecord() {
      navigateTo({
        url:
          "/pages/transfer/record/record?oppositeAccount=" +
          this.details.oppositeAccount,
      });
    },
    classifyConfirm(item) {
      this.classify = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.main {
  width: 100%;
  padding-bottom: 50rpx;

  .footer-pl {
    width: 750rpx;
    height: calc(env(safe-area-inset-bottom) + 116rpx);
  }

  .footer {
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 10;

    .footer-content {
      width: 750rpx;
      height: 116rpx;
      display: flex;
      align-items: center;
      color: #769adc;
      font-size: 30rpx;
      position: relative;

      &:before {
        width: 2rpx;
        height: 60rpx;
        left: 50%;
        top: 50%;
        position: absolute;
        content: "";
        z-index: 10;
        background-color: #f8f8f8;
        transform: translate(-50%, -50%);
      }

      .footer-btn {
        width: 50%;
        text-align: center;
      }
    }
  }

  .banner {
    width: 690rpx;
    height: 92rpx;
    background-image: url(/static/home/bill-details-ht.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin: auto;
  }

  .container2 {
    padding-top: 25rpx;
  }

  .container {
    width: 690rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 19rpx auto;
    padding-bottom: 25rpx;

    .remark {
      padding: 25rpx 29rpx;
      font-size: 26rpx;
      line-height: 1;

      .label {
        color: #999999;
        margin-bottom: 26rpx;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1rpx solid #efefef;
        padding-bottom: 29rpx;

        .content-input {
          font-size: 26rpx;
          line-height: 1;
        }

        .content-icon {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

    .cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25rpx 29rpx;
      font-size: 26rpx;
      line-height: 1;

      .label {
        color: #999999;
      }

      .content {
        color: #383838;
        display: flex;
        align-items: center;

        .content-select {
          color: #999999;
        }

        .content-cate-icon {
          width: 50rpx;
          height: 50rpx;
          margin-right: 12rpx;
        }

        .content-cate-arrow {
          width: 50rpx;
          height: 50rpx;
        }
      }
    }

    .info {
      width: 100%;
      padding-top: 57rpx;
      box-sizing: border-box;
      margin-bottom: 80rpx;

      .info-type {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        font-size: 26rpx;
        margin-bottom: 42rpx;

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

        .info-money-info {
          width: 30rpx;
          height: 30rpx;
          margin-left: 6rpx;
        }
      }
    }
  }
}
</style>
