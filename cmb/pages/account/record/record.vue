<template>
  <view class="app">
    <navbar title="资产时光机" bgColor="#f7f7f8" ai-btn></navbar>
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
          <text class="big">{{ amountInt }}</text>
          <text class="small">.{{ amountDecimal }}</text>
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
      <view class="analysis-summary" v-if="analysisFlag">
        <view class="summary-item">
          <text class="label">净流入</text>
          <text class="value">{{ netInflow.toFixed(2) }}</text>
        </view>
        <view class="summary-item">
          <text class="label">区间收益</text>
          <text class="value">{{ intervalIncome.toFixed(2) }}</text>
        </view>
      </view>
      <view class="charts-container">
        <!-- 自定义tooltip - 在图表内部虚线顶部 -->
        <view
          class="custom-tooltip"
          v-if="showTooltip"
          :style="{ left: tooltipPercent + '%' }"
        >
          <image
            class="tooltip-icon"
            src="/static/icon/icon13.png"
            mode="aspectFit"
          ></image>
          <text>{{ tooltipDate }}</text>
        </view>
        <!-- 变动分析时的数值标签 -->
        <view
          class="point-value-tag"
          :class="tagPositionClass"
          v-if="analysisFlag"
          :style="{ left: endPointPercent + '%', top: endPointTop + 'rpx' }"
        >
          <text>{{ totalAmount.toFixed(2) }}</text>
        </view>
        <view class="charts">
          <l-echart ref="chartRef" @finished="initChart"></l-echart>
        </view>
      </view>
      <view class="time">
        <view class="startTime">
          <text>{{ startDate }}</text>
          <text class="dropdown-icon">▼</text>
        </view>
        <view class="endTime">{{ endDate }}</view>
      </view>
      <view class="desc">当前所展示的资产数据仅供参考，不作为对账凭证。</view>
      <view class="module">
        <view class="module-title">{{
          analysisFlag ? "区间交易" : "当日交易"
        }}</view>
        <view
          class="module-desc"
          v-if="!analysisFlag || transactions.length === 0"
          >当日暂无交易</view
        >
        <view class="transaction-list" v-else>
          <view
            class="transaction-item"
            v-for="(item, index) in transactions"
            :key="index"
          >
            <text class="name">{{ index + 1 }}. {{ item.name }}</text>
            <text class="amount" :class="{ negative: item.amount < 0 }">
              {{ item.amount > 0 ? "+" : "" }}{{ item.amount.toFixed(2) }}
            </text>
          </view>
        </view>
      </view>
      <view class="module">
        <view class="module-title">{{
          analysisFlag ? "区间收益" : "当日收益"
        }}</view>
        <view class="module-desc">{{ analysisFlag ? "选中区间内暂无收益":"当日暂无收益" }}</view>
      </view>
      <view class="module">
        <view class="module-header">
          <view class="module-title">资产构成</view>
          <view class="legend" v-if="analysisFlag">
            <view class="legend-item">
              <view class="dot start"></view>
              <text>起始日</text>
            </view>
            <view class="legend-item">
              <view class="dot end"></view>
              <text>终点日</text>
            </view>
          </view>
        </view>
        <view>
          <view class="module-content">
            <view class="module-desc">活钱</view>
            <view class="module-desc amount">{{ totalAmount.toFixed(2) }}</view>
          </view>
          <view class="progress-bar">
            <view class="progress-fill" :style="{ width: '100%' }"></view>
          </view>
          <view class="amount-detail" v-if="analysisFlag">
            <text>0.00</text>
          </view>
        </view>
      </view>
      <u-modal
        :show="tipsPopShow"
        confirmText="我知道了"
        @confirm="tipsPopShow = false"
      >
        <view class="tips-content">
          <view class="tips-title">温馨提示</view>
          <view
            >总资产是指您在招商银行持有的各类产品当日日终总市值，不含未分配收益、纸质存单、保险、实物金、境外分行、三方存管等资产。汇率、金价、分红等波动均可能导致资产变动，<text class="bold"
              >资产数据仅供参考，不作对账凭证。</text
            ></view
          >
        </view>
      </u-modal>
      <u-picker :show="show" :columns="columns"></u-picker>
    </view>
  </view>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      chart: null,
      currentDate: "2025.10.08",
      todayDate: "2025.12.18",
      analysisFlag: false,
      totalAmount: 93.14,
      netInflow: 0.0,
      intervalIncome: 0.0,
      startDate: "2025.09.20",
      endDate: "2025.12.18",
      showTooltip: true,
      tooltipDate: "2025.11.02",
      tooltipPercent: 50, // tooltip位置百分比
      endPointPercent: 50,
      endPointTop: 120,
      tagPosition: 'top-right', // 标签位置：top-left, top-right, bottom-left, bottom-right
      selectedIndex: 5, // 默认选中的数据点索引
      startPointIndex: 0,
      endPointIndex: 9,
      isDragging: false, // 是否正在拖动
      lastUpdateTime: 0, // 上次更新时间（用于节流）
      transactions: [
        { name: "微信转账", amount: -3000.0 },
        { name: "支付宝支付科技有限公司", amount: 3000.0 },
      ],
      // 模拟数据：从2025.09.20到2025.12.18的资产变化
      chartData: [
        { date: "2025.09.20", value: 10 },
        { date: "2025.09.25", value: 15 },
        { date: "2025.10.01", value: 30 },
        { date: "2025.10.08", value: 93.14 },
        { date: "2025.10.15", value: 93.14 },
        { date: "2025.10.22", value: 93.14 },
        { date: "2025.11.01", value: 93.14 },
        { date: "2025.11.15", value: 93.14 },
        { date: "2025.12.01", value: 93.14 },
        { date: "2025.12.18", value: 93.14 },
      ],
      tipsPopShow: false,
    };
  },
  computed: {
    title() {
      if (this.analysisFlag) return "资产变动(元)";
      return this.currentDate == this.todayDate
        ? "总资产(元)"
        : "历史总资产(元)";
    },
    amountInt() {
      if (this.analysisFlag) return "0";
      return Math.floor(this.totalAmount);
    },
    amountDecimal() {
      if (this.analysisFlag) return "00";
      return (this.totalAmount % 1).toFixed(2).substring(2);
    },
    tagPositionClass() {
      return `tag-${this.tagPosition}`;
    },
  },
  watch: {
    analysisFlag(val) {
      if (val) {
        this.totalAmount = 0.0;
        this.selectedIndex = 6; // 设为一个中间值
        this.tooltipDate = "2025.11.02";
      } else {
        this.totalAmount = 93.14;
        this.selectedIndex = 3;
        this.tooltipDate = "2025.10.08";
      }
      this.$nextTick(() => {
        this.initChart();
        this.updateTooltipPosition();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    async initChart() {
      // chart 图表实例不能存在data里
      this.chart = await this.$refs.chartRef.init(echarts);

      const dates = this.chartData.map((item) => item.date);
      const values = this.chartData.map((item) => item.value);

      const option = {
        grid: {
          top: 30,
          left: "3%",
          right: "3%",
          bottom: 10,
          containLabel: false,
        },
        xAxis: {
          show: false,
          boundaryGap: false,
          type: "category",
          data: dates,
        },
        tooltip: {
          show: false,
        },
        visualMap: this.analysisFlag
          ? {
              show: false,
              dimension: 0,
              pieces: [
                {
                  gt: -1,
                  lte: this.selectedIndex,
                  color: "transparent", // 左侧透明
                },
                {
                  gt: this.selectedIndex,
                  lte: this.chartData.length - 1,
                  color: "rgba(232, 90, 93, 0.8)", // 选中点到终点更深的红色
                },
              ],
            }
          : null,
        yAxis: {
          show: true,
          type: "value",
          min: 0,
          max: function (value) {
            return value.max * 1.2;
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "#f0e8e8",
              type: [5, 5],
              dashOffset: 5,
            },
          },
        },
        series: [
          {
            type: "line",
            smooth: 0.3,
            lineStyle: {
              width: 2,
              color: "#e85a5d",
            },
            areaStyle: {
              opacity: 0.8,
              color: this.analysisFlag
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(232, 90, 93, 0.6)",
                    },
                    {
                      offset: 1,
                      color: "rgba(247, 247, 248, 0.1)",
                    },
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(232, 90, 93, 0.4)",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(232, 90, 93, 0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(247, 247, 248, 0.1)",
                    },
                  ]),
            },
            symbol: "circle",
            symbolSize: (value, params) => {
              if (this.analysisFlag) {
                // 变动分析时只显示当前选中的大圆点
                return params.dataIndex === this.selectedIndex ? 10 : 0;
              }
              // 只在选中的点显示大圆点
              return params.dataIndex === this.selectedIndex ? 10 : 0;
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#e85a5d",
              borderWidth: 3,
            },
            // 使用markLine来显示垂直虚线（贯穿整个图表，穿过小圆点）
            markLine: {
              silent: true,
              symbol: ["none", "none"],
              animation: false,
              data: [
                {
                  xAxis: this.selectedIndex,
                },
              ],
              lineStyle: {
                color: "#e85a5d",
                type: [4, 4],
                width: 1,
              },
              label: {
                show: false,
              },
            },
            data: values,
          },
          // 变动分析模式下，添加第二个系列用于显示选中点到终点的深色区域
          ...(this.analysisFlag
            ? [
                {
                  type: "line",
                  smooth: 0.3,
                  lineStyle: {
                    width: 0, // 不显示线条
                    color: "transparent",
                  },
                  areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(232, 90, 93, 0.9)", // 更深的渐变色
                      },
                      {
                        offset: 0.5,
                        color: "rgba(232, 90, 93, 0.6)",
                      },
                      {
                        offset: 1,
                        color: "rgba(232, 90, 93, 0.3)",
                      },
                    ]),
                  },
                  symbol: "none",
                  data: values.map((value, index) => {
                    // 只显示选中点到终点的数据，其他位置设为 null
                    if (index < this.selectedIndex) {
                      return null;
                    }
                    return value;
                  }),
                  z: 1, // 确保在第一个系列之上
                },
              ]
            : []),
        ],
      };

      this.chart.setOption(option);

      const zr = this.chart.getZr();

      // 监听拖动开始
      zr.on("mousedown", (params) => {
        this.isDragging = true;
        this.onChartTouch(params, true);
      });

      // 监听拖动移动（使用节流优化性能）
      zr.on("mousemove", (params) => {
        if (this.isDragging) {
          const now = Date.now();
          // 节流：至少间隔 16ms（约60fps）
          if (now - this.lastUpdateTime >= 16) {
            this.lastUpdateTime = now;
            this.onChartTouch(params, false);
          }
        }
      });

      // 监听拖动结束
      zr.on("mouseup", () => {
        this.isDragging = false;
      });

      // 监听鼠标/手指离开
      zr.on("mouseout", () => {
        this.isDragging = false;
      });

      // 计算tooltip位置
      this.$nextTick(() => {
        this.updateTooltipPosition();
      });
    },

    // 处理图表触摸/拖动事件 - 定位到最近的数据点x轴
    onChartTouch(params, immediate = false) {
      const pointInPixel = [params.offsetX, params.offsetY];

      // 将像素坐标转换为数据坐标（即使不在grid内也计算，以便边缘拖动）
      const pointInGrid = this.chart.convertFromPixel(
        { seriesIndex: 0 },
        pointInPixel
      );

      if (!pointInGrid) return;

      // 找到最近的数据点索引
      let nearestIndex = Math.round(pointInGrid[0]);

      // 边界检查
      nearestIndex = Math.max(
        0,
        Math.min(nearestIndex, this.chartData.length - 1)
      );

      if (nearestIndex === this.selectedIndex) return;

      const oldIndex = this.selectedIndex;

      // 更新选中索引
      this.selectedIndex = nearestIndex;

      // 更新tooltip日期
      this.tooltipDate = this.chartData[nearestIndex].date;
      this.currentDate = this.chartData[nearestIndex].date;

      // 更新显示金额（变动分析模式下不更新总金额，显示0.00）
      if (!this.analysisFlag) {
        this.totalAmount = this.chartData[nearestIndex].value;
      }

      // 更新tooltip位置
      this.updateTooltipPosition();

      // 更新图表选中状态（只更新必要的部分）
      this.updateChartSelection(oldIndex);
    },

    // 更新图表选中状态（圆点和虚线位置）
    updateChartSelection(oldIndex) {
      if (!this.chart) return;

      const updateOption = {
        series: [
          {
            symbolSize: (value, params) => {
              return params.dataIndex === this.selectedIndex ? 10 : 0;
            },
            markLine: {
              animation: false,
              data: [
                {
                  xAxis: this.selectedIndex,
                },
              ],
            },
          },
        ],
      };

      // 变动分析模式下，同时更新 visualMap 和第二个系列的数据
      if (this.analysisFlag) {
        updateOption.visualMap = {
          show: false,
          dimension: 0,
          pieces: [
            {
              gt: -1,
              lte: this.selectedIndex,
              color: "transparent", // 左侧透明
            },
            {
              gt: this.selectedIndex,
              lte: this.chartData.length - 1,
              color: "rgba(232, 90, 93, 0.8)", // 选中点到终点更深的红色
            },
          ],
        };

        // 更新第二个系列的数据（只显示选中点到终点的数据）
        const values = this.chartData.map((item) => item.value);
        updateOption.series[1] = {
          data: values.map((value, index) => {
            // 只显示选中点到终点的数据，其他位置设为 null
            if (index < this.selectedIndex) {
              return null;
            }
            return value;
          }),
        };
      }

      // 使用 lazyUpdate 减少重绘
      this.chart.setOption(updateOption, { lazyUpdate: true });
    },

    updateTooltipPosition() {
      // 根据选中的数据点计算tooltip位置（使用百分比）
      // grid left/right 各 3%，所以图表区域是从 3% 到 97%
      const gridLeft = 3; // grid左边距 3%
      const gridRight = 3; // grid右边距 3%
      const chartAreaPercent = 100 - gridLeft - gridRight; // 图表区域宽度百分比 94%
      const dataLength = this.chartData.length;

      // 计算数据点在容器中的百分比位置
      // 位置 = gridLeft + (索引 / (数据长度-1)) * 图表区域宽度
      let percent =
        gridLeft + (this.selectedIndex / (dataLength - 1)) * chartAreaPercent;

      this.tooltipPercent = percent;

      // 变动分析模式下，更新数值标签的位置
      if (this.analysisFlag) {
        // 计算当前数据点对应的 top 值
        const maxValue = Math.max(...this.chartData.map((d) => d.value)) * 1.2;
        const currentValue = this.chartData[this.selectedIndex].value;
        const chartHeight = 360; // rpx
        // top 值 = (1 - 当前值/最大值) * 图表高度 + grid top 补偿 + 标签偏移（避免被遮挡）
        this.endPointTop = (1 - currentValue / maxValue) * chartHeight + 20 + 15;
        this.endPointPercent = percent;
        
        // 计算标签位置，优先显示在圆点左上
        // 优先选择左上，只有在圆点太靠左或太靠上时才调整位置
        const horizontalRatio = (percent - gridLeft) / chartAreaPercent; // 0-1
        const verticalRatio = (this.endPointTop - 20) / chartHeight; // 0-1
        
        let horizontalPos = 'left'; // 优先选择左侧
        let verticalPos = 'top'; // 优先选择上方
        
        // 水平位置判断：尽量在左侧，只有太靠左时才在右侧
        if (horizontalRatio < 0.15) {
          // 圆点太靠左，标签显示在右侧避免超出边界
          horizontalPos = 'right';
        } else {
          // 其他情况都显示在左侧
          horizontalPos = 'left';
        }
        
        // 垂直位置判断：尽量在上方，只有太靠上时才在下方
        if (verticalRatio < 0.15) {
          // 圆点太靠上，标签显示在下方避免超出边界
          verticalPos = 'bottom';
        } else {
          // 其他情况都显示在上方
          verticalPos = 'top';
        }
        
        this.tagPosition = `${verticalPos}-${horizontalPos}`;
      }
    },

    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}.${month}.${day}`;
    },

    showTips() {
      this.tipsPopShow = true;
    },
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
  color: #999999;
  font-size: 26rpx;

  .tips-icon {
    width: 28rpx;
    height: 28rpx;
    margin-left: 8rpx;
    opacity: 0.6;
  }
}

.amount-statis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-top: 16rpx;

  .big {
    font-size: 56rpx;
    font-weight: 400;
    color: #000000;
  }

  .small {
    font-size: 36rpx;
    font-weight: 400;
    color: #000000;
  }

  .analysis-menu {
    color: #666666;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    font-weight: normal;
    gap: 12rpx;

    .analysis-switch {
      border: 1px solid #e0e0e0;
      border-radius: 50rpx;
    }
  }
}

.analysis-summary {
  display: flex;
  background-color: #fffbfb;
  padding: 20rpx 30rpx;
  margin-top: 20rpx;
  border-radius: 8rpx;
  gap: 40rpx;

  .summary-item {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 8rpx;

    .label {
      font-size: 24rpx;
      color: #999999;
    }

    .value {
      font-size: 28rpx;
      color: #333333;
      font-weight: 500;
    }
  }
}

.charts-container {
  position: relative;
  margin-top: 20rpx;
  overflow: hidden;
}

.charts {
  width: 100%;
  height: 360rpx;
}

.point-value-tag {
  position: absolute;
  background-color: transparent;
  color: #999999;
  font-size: 24rpx;
  z-index: 5;
  transition: all 0.1s ease-out;
  pointer-events: none;
  white-space: nowrap;
  
  // 左上
  &.tag-top-left {
    transform: translateX(-100%) translateY(-100%);
    margin-top: -5rpx;
    margin-left: -20rpx;
  }
  
  // 右上
  &.tag-top-right {
    transform: translateY(-100%);
    margin-top: -5rpx;
    margin-left: 20rpx;
  }
  
  // 左下
  &.tag-bottom-left {
    transform: translateX(-100%);
    margin-top: 20rpx;
    margin-left: -20rpx;
  }
  
  // 右下
  &.tag-bottom-right {
    transform: translate(0, 0);
    margin-top: 20rpx;
    margin-left: 20rpx;
  }
}

.custom-tooltip {
  position: absolute;
  top: 0rpx;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: linear-gradient(135deg, #e85a5d 0%, #d94a4d 100%);
  color: #ffffff;
  font-size: 22rpx;
  padding: 10rpx 16rpx;
  border-radius: 20rpx;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 4rpx 12rpx rgba(232, 90, 93, 0.3);
  transition: left 0.1s ease-out;
  will-change: left;

  .tooltip-icon {
    width: 24rpx;
    height: 24rpx;
    filter: brightness(10);
  }
}

.time {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: #666666;
  font-size: 24rpx;
  margin-top: 16rpx;

  .startTime {
    display: flex;
    align-items: center;
    gap: 6rpx;

    .dropdown-icon {
      font-size: 16rpx;
      color: #999999;
    }
  }
}

.desc {
  font-size: 24rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  color: #666666;
}

.module {
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  padding: 32rpx;
  margin-bottom: 24rpx;

  .module-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .module-title {
      margin-bottom: 0;
    }

    .legend {
      display: flex;
      gap: 20rpx;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 24rpx;
        color: #999999;

        .dot {
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;

          &.start {
            background-color: #e85a5d;
          }
          &.end {
            background-color: #ccc;
          }
        }
      }
    }
  }

  .module-title {
    color: #000000;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 24rpx;
  }

  .module-desc {
    color: #666666;
    font-size: 28rpx;
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        font-size: 28rpx;
        color: #333333;
      }

      .amount {
        font-size: 28rpx;
        color: #333333;
        font-weight: 500;

        &.negative {
          color: #333333;
        }
      }
    }
  }

  .module-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .amount {
      color: #333333;
      font-weight: 500;
    }
  }

  .progress-bar {
    height: 6rpx;
    background-color: #f5f5f5;
    border-radius: 3rpx;
    margin-top: 12rpx;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #e85a5d 0%, #d94a4d 100%);
      border-radius: 3rpx;
    }
  }

  .amount-detail {
    margin-top: 10rpx;
    font-size: 24rpx;
    color: #999999;
    text-align: right;
  }
}

.tips-content {
  width: 100%;
  font-size: 32rpx;
  color: #000000;
  font-weight: normal;

  .tips-title {
    margin-bottom: 10rpx;
  }

  .bold {
    font-weight: bold;
  }
}
</style>
