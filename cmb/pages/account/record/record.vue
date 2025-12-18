<template>
  <view class="app">
    <navbar title="资金时光机" bgColor="#f7f7f8" ai-btn></navbar>
    <view class="pages">
      <view class="title">
        <text>{{ title }}</text>
        <image
          @click="showTips()"
          class="tips-icon"
          src="/static/icon/icon13.png"
          mode=""
        ></image>
      </view>
      <view class="amount-statis">
        <view>
          <text class="big">80</text>
          <text class="small">.34</text>
        </view>
        <view class="analysis-menu">
          <text>变动分析</text>
          <view class="analysis-switch">
            <u-switch
              v-model="analysisFlag"
              inactiveColor="#f7f7f8"
              activeColor="#000000"
              size="20"
            ></u-switch>
          </view>
        </view>
      </view>
      <view class="charts">
        <l-echart ref="chartRef" @finished="init"></l-echart>
      </view>
      <view class="time">
        <view class="startTime">
          <text>2025-11-01</text>
        </view>
        <view class="endTime">2025-11-01</view>
      </view>
      <view class="desc">当前所展示的资产数据仅供参考，不作为对账凭证。</view>
      <view class="module">
        <view class="module-title">当日交易</view>
        <view class="module-desc">当日暂无交易</view>
      </view>
      <view class="module">
        <view class="module-title">当日收益</view>
        <view class="module-desc">当日暂无收益</view>
      </view>
      <view class="module">
        <view class="module-title">资产构成</view>
        <view>
          <view class="module-content">
            <view class="module-desc">活钱</view>
            <view class="module-desc">0.14</view>
          </view>
          <view class="line"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import * as echarts from "echarts";
import { rpx2px } from "@/utils";

export default {
  data() {
    return {
      chart: null,
      currentDate: "",
      todayDate: "",
      analysisFlag: false,
      list: [
        { date: "2025-11-01", money: 10 },
        { date: "2025-11-02", money: 10 },
        { date: "2025-11-03", money: 10 },
        { date: "2025-11-04", money: 10 },
        { date: "2025-11-05", money: 10 },
        { date: "2025-11-06", money: 10 },
        { date: "2025-11-07", money: 10 },
      ],
    };
  },
  computed: {
    title() {
      return this.currentDate == this.todayDate
        ? "总资产(元)"
        : "历史总资产(元)";
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init({
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%",
        },
        xAxis: [
          {
            show: false,
            type: "category",
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: true, // 显示刻度线
              alignWithLabel: true,
              lineStyle: {
                color: "#999999",
                type: "dashed", // 虚线刻度线
              },
            },
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 1,
              color: "rgb(237, 52, 11)",
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(237, 52, 11)",
                },
                {
                  offset: 1,
                  color: "rgb(225, 124, 101)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
        ],
      });
    });
  },
  methods: {
    async init(data = {}) {
      // chart 图表实例不能存在data里
      this.chart = await this.$refs.chartRef.init(echarts);
      console.log(this.chart, this.$refs.chartRef);
      let chart = this.chart;
      chart.setOption(data);
    },
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}.${month}.${day}`;
    },
    showTips() {},
  },
};
</script>

<style scoped lang="scss">
.app {
  width: 750rpx;
  min-height: 100vh;
  background-color: #f7f7f8;
}
.pages {
  padding: 30rpx;
}
.title {
  display: flex;
  align-items: center;
  color: #666666;
  font-size: 28rpx;

  .tips-icon {
    width: 30rpx;
    height: 30rpx;
    margin-left: 6rpx;
  }
}
.amount-statis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-top: 10rpx;

  .big {
    font-size: 40rpx;
  }

  .small {
    font-size: 28rpx;
  }

  .analysis-menu {
    color: #666666;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    font-weight: normal;
    gap: 10rpx;

    .analysis-switch {
      border: 1px solid #c1c0c0;
      border-radius: 50cap;
    }
  }
}

.charts {
  width: 100%;
  height: 400rpx;
  margin-top: 30rpx;
}

.time {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: #666666;
  font-size: 24rpx;
  margin-top: 20rpx;
}
.desc {
  font-size: 24rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  color: #333333;
}
.module {
  background-color: #ffffff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.01);
  padding: 30rpx;
  margin-bottom: 30rpx;

  .module-title {
    color: #000000;
    font-size: 30rpx;
    font-weight: 500;
    margin-bottom: 30rpx;
  }

  .module-desc {
    color: #333333;
    font-size: 28rpx;
  }

  .module-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line {
    background-color: rgb(237, 52, 11);
    height: 4rpx;
    border-radius: 50cap;
    margin-top: 6rpx;
    width: 70%;
    margin-bottom: 10rpx;
  }
}
</style>
