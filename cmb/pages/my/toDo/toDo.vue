<template>
	<view class="app">
		<navbar :placeholder="false" bg-color="transparent" :title="title">
			<view class="nav">
				<view class="nav-content">
					<image class="nav-icon" src="/static/icon/jia.png" mode=""></image>
					<image class="nav-icon" src="/static/icon/liebiao.png" mode=""></image>
				</view>
			</view>
		</navbar>
		<view class="main">
			<view class="pl" :style="{height:(navBarHeight+statusBarHeight)+'px'}"></view>
			<z-calendar @month-change="monthChange" :firstDayOfWeek="1" v-model="checkDate"
				:dotDates="ondutys"></z-calendar>
			<view class="tips">今日无事项</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				title: '2025年9月',
				currentDate: new Date(),
				checkDate: new Date(),
				ondutys: [{
					date: "2021-10-11"
				}],
			}
		},
		onLoad() {


		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		methods: {
			monthChange(e) {
				const date = new Date(e);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				this.title = `${year}年${month}月`

			},

		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav {
		width: 500rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: absolute;
		right: 30rpx;
		box-sizing: border-box;
		z-index: 100;

		.nav-content {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nav-icon {
			width: 44rpx;
			height: 44rpx;
			margin-left: 36rpx;
		}

	}

	.main {
		width: 100%;
		background-image: url(/static/home/rili.png);
		background-size: 750rpx 382rpx;
		min-height: 382rpx;
		background-position: top;
		background-repeat: no-repeat;

		.tips {
			margin-top: 300rpx;
			color: #666;
			font-size: 28rpx;
			text-align: center;
		}

		.pl {
			width: 100%;
			margin-bottom: 52rpx;
		}

		.calendar-container {
			width: 100%;
			padding: 20px;
		}

		.week-days {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
		}

		.week-day {
			width: 13%;
			text-align: center;
			font-weight: bold;
		}

		.month-swiper {
			width: 100%;
			height: 300px;
		}

		.month-view {
			padding: 10px;
		}

		.month-name {
			font-size: 18px;
			text-align: center;
			margin-bottom: 10px;
		}

		.dates-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}

		.date-item {
			width: 40px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 5px;
			background-color: #f0f0f0;
			border-radius: 5px;
		}

		.date-item text {
			font-size: 14px;
		}
	}
</style>