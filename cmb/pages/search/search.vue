<template>
	<view>
		<navbar :service-btn="false" showBack bg-color="#f8f8f8">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:'#111111'}">
					<view class="search">
						<input v-model="value" class="search-input" type="text" placeholder="流水打印" />
						<image class="nav-search-icon" src="/static/icon/yuyin.png"></image>
						<view class="search-btn" @click="doSearch">搜索</view>
					</view>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="history">
				<view class="history-title">
					<view>
						搜索历史
					</view>
					<image class="history-icon" src="/static/icon/del.png"></image>
				</view>
				<view class="history-list">
					<view class="item" @click="select(item)" v-for="(item,index) in historyList" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="pages">

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo,
		redirectTo
	} from '../../utils';
	export default {
		data() {
			return {
				value: '',
				historyList: [{
						name: '转账',
						path: '/pages/transfer/index/index'
					},
					{
						name: '收支',
						path: '/pages/bill/bill'
					}, {
						name: '流水',
						path: '/pages/water/water/water'
					}
				]
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		methods: {
			select(item) {
				this.value = item.name
				this.doSearch()
			},
			doSearch() {
				redirectTo({
					url: '/pages/search/result/result?value=' + this.value
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		color: #FFFFFF;
		font-weight: 400;
		position: absolute;
		padding-right: 27rpx;
		padding-left: 100rpx;
		box-sizing: border-box;


		.search {
			flex: 1;
			height: 74rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			border: 2rpx solid #E84A55;
			color: #111;
			padding-right: 7rpx;
			font-size: 26rpx;
			box-sizing: border-box;

			.search-input {
				flex: 1;
				font-size: 26rpx;
			}

			.search-btn {
				width: 98rpx;
				height: 60rpx;
				background: #FFE1E1;
				border-radius: 30rpx 30rpx 30rpx 30rpx;
				text-align: center;
				line-height: 60rpx;
				color: #E84A55;
				margin-left: 10rpx;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}


	}

	.main {
		width: 750rpx;
		background-color: #FFFFFF;
		padding-top: 27rpx;

		.pages {
			width: 750rpx;
			height: 2245rpx;
			margin-top: 27rpx;
			background-image: url(/static/pages/search.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 2245rpx;
		}

		.history {
			width: 100%;
			padding: 0 36rpx 0 26rpx;
			box-sizing: border-box;

			.history-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #000000;
				font-size: 28rpx;
				margin-bottom: 32rpx;

				.history-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.history-list {
				display: flex;
				align-items: center;

				.item {
					width: 84rpx;
					height: 49rpx;
					background: #F8F8F8;
					border-radius: 25rpx 25rpx 25rpx 25rpx;
					text-align: center;
					line-height: 49rpx;
					color: #000000;
					font-size: 24rpx;
					margin-right: 20rpx;

				}

			}
		}

	}
</style>