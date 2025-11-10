<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" :service-btn="false" showBack>
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:'#111111'}">
					<view :class="['search','search-fix']">
						<image class="nav-search-icon" src="/static/icon/search-grey.png"></image>
					</view>
					<image src="/static/icon/message.png" class="nav-customer" mode=""></image>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="jingxuan">
				<view class="item" @click="go(item)" v-for="(item,index) in jingxuan" :key="index">

				</view>
			</view>
			<view class="tabs">
				<view class="item" @click="go(item)" v-for="(item,index) in tabs" :key="index">

				</view>
			</view>
			<view class="caifu">
				<view class="item" @click="go(item)" v-for="(item,index) in caifu" :key="index">

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
		navigateTo
	} from '../../utils';
	export default {
		data() {
			return {
				jingxuan: [{
						url: '/pages/account/account/account'
					},
					{
						url: '/pages/transfer/index/index'
					},
					{
						url: ''
					},
					{
						url: ''
					},
					{
						url: '/pages/bill/bill'
					},
					{
						url: `/pages/commonPages/commonPages?pageImage=/static/pages/xyksq.png&title=招商银行信用卡申请&serviceBtn=${false}`
					},
					{
						url: `/pages/common/common?pageImage=/static/pages/grylj.png&serviceBtn=${false}&moreBtn=${false}`
					},
					{
						url: `/pages/commonPages/commonPages?pageImage=/static/pages/ybm.png&title=医保码&serviceBtn=${false}`
					}
				],
				tabs: [{
						url: '/pages/account/account/account'
					},
					{
						url: `/pages/bill/bill`
					},
					{
						url: ``
					},
					{
						url: ``
					}
				],
				caifu: [{
						url: '/pages/chaoChaoBao/chaoChaoBao'
					},
					{
						url: `/pages/chaoChaoBao/chaoChaoBao`
					},
					{
						url: `/pages/chaoChaoBao/chaoChaoBao`
					},
					{
						url: ``
					}
				]
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		methods: {
			go(item) {
				navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: 400;
		position: absolute;
		padding-left: 100rpx;
		box-sizing: border-box;

		.address {
			display: flex;
			align-items: center;
			margin-right: 30rpx;

			.address-icon {
				width: 24rpx;
				height: 24rpx;
				margin-left: 10rpx;
			}
		}

		.search {
			flex: 1;
			height: 50rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			border: 1rpx solid #fff;
			margin-right: 10rpx;

			&.search-fix {
				border: 1rpx solid #ccc;
				color: #ccc;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
				padding-right: 16rpx;
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
		padding-top: 16rpx;

		.jingxuan {
			width: 750rpx;
			height: 435rpx;
			background-image: url(/static/home/allMenu1.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 435rpx;
			margin-bottom: 16rpx;
			display: flex;
			flex-wrap: wrap;
			padding: 80rpx 40rpx 0;
			box-sizing: border-box;

		}

		.item {
			width: 25%;
			height: 160rpx;
		}

		.tabs {
			width: 750rpx;
			height: 316rpx;
			background-image: url(/static/home/allMenu2.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 316rpx;
			display: flex;
			flex-wrap: wrap;
			padding: 80rpx 40rpx 0;
			box-sizing: border-box;
		}

		.caifu {
			width: 750rpx;
			height: 537rpx;
			background-image: url(/static/home/allMenu3.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 537rpx;
			margin-bottom: 16rpx;
			display: flex;
			flex-wrap: wrap;
			padding: 80rpx 40rpx 0;
			box-sizing: border-box;
		}

		.pages {
			width: 750rpx;
			height: 4434rpx;
			background-image: url(/static/home/allMenu4.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 4434rpx;
			margin-bottom: 16rpx;
		}
	}
</style>