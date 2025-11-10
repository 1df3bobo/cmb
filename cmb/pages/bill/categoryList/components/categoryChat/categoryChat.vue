<template>
	<view class="container">
		<scroll-view scroll-x="true" style="width:100%; height:300px;">
			<canvas id="lineChart" style="width:1800px; height:300px;" canvas-id="lineChart"></canvas>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trendList: [{
						"income": 10,
						"dateTime": "2025-10-30"
					},
					{
						"income": 20,
						"dateTime": "2025-10-29"
					},
					{
						"income": 30,
						"dateTime": "2025-10-28"
					},
					{
						"income": 40,
						"dateTime": "2025-10-27"
					},
					{
						"income": 50,
						"dateTime": "2025-10-26"
					},
					{
						"income": 60,
						"dateTime": "2025-10-25"
					},
					{
						"income": 70,
						"dateTime": "2025-10-24"
					},
					{
						"income": 80,
						"dateTime": "2025-10-23"
					},
					{
						"income": 90,
						"dateTime": "2025-10-22"
					},
					{
						"income": 100,
						"dateTime": "2025-10-21"
					}
				],
				visibleDataCount: 6, // 每次显示的最大数据点数
			};
		},
		onReady() {
			this.drawLineChart();
		},
		methods: {
			drawLineChart() {
				const ctx = uni.createCanvasContext('lineChart', this);

				// 获取当前可视数据范围
				const startIdx = 0; // 你可以通过动态调整来控制当前显示的数据区间
				const visibleTrendList = this.trendList.slice(startIdx, startIdx + this.visibleDataCount);

				// 格式化日期和收入数据
				const labels = visibleTrendList.map(item => item.dateTime);
				const incomeData = visibleTrendList.map(item => item.income);

				// 设置图表尺寸
				const padding = 30; // canvas 的内边距
				const width = 1800; // canvas 宽度，注意这里要足够大以便展示更多数据
				const height = 250; // canvas 高度
				const chartWidth = width - padding * 2;
				const chartHeight = height - padding * 2;

				// 计算 Y 轴的最大值和最小值
				const maxIncome = Math.max(...incomeData);
				const minIncome = Math.min(...incomeData);

				// 绘制背景
				ctx.setFillStyle('#fff');
				ctx.fillRect(0, 0, width, height);

				// 绘制 X 轴和 Y 轴的坐标轴 (这里只绘制 X 轴)
				ctx.setStrokeStyle('#aaa');
				ctx.beginPath();
				ctx.moveTo(padding, padding); // Y 轴
				ctx.lineTo(padding, height - padding); // 画出 Y 轴
				ctx.lineTo(width - padding, height - padding); // 画出 X 轴
				ctx.stroke();

				// 绘制折线图
				ctx.setStrokeStyle('#007aff');
				ctx.setLineWidth(2);
				ctx.beginPath();

				// 绘制数据点
				incomeData.forEach((income, index) => {
					const x = padding + (index / (incomeData.length - 1)) * chartWidth;
					const y = padding + (1 - (income - minIncome) / (maxIncome - minIncome)) * chartHeight;

					if (index === 0) {
						ctx.moveTo(x, y); // 移动到第一个点
					} else {
						ctx.lineTo(x, y); // 绘制到下一个点
					}
				});

				ctx.stroke();

				// 绘制 X 轴上的日期标签
				labels.forEach((label, index) => {
					const x = padding + (index / (labels.length - 1)) * chartWidth;
					const y = height - padding + 10;
					ctx.setFontSize(12);
					ctx.setFillStyle('#000');
					ctx.fillText(label, x - 20, y); // 日期标签显示在 X 轴下方
				});

				// 完成绘制
				ctx.draw();
			}
		}
	};
</script>

<style scoped>
	.container {
		padding: 20px;
		background-color: #f0f0f0;
	}
</style>