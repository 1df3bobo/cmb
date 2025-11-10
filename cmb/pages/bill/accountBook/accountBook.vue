<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn ai-btn></navbar>
		<view class="main">

		</view>
		<view class="footer">
			<view class="footer-pl"></view>
			<view class="footer-tabs">
				<view class="footer-tab-item" @click="bill"></view>
				<view class="footer-tab-item"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		redirectTo
	} from '@/utils/index.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			bill() {
				redirectTo({
					url: '/pages/bill/bill'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
		height: 1276rpx;
		background-image: url(/static/pages/zb.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.footer {
		width: 750rpx;
		position: relative;

		.footer-pl {
			width: 750rpx;
			height: 162rpx;
		}

		.footer-tabs {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 162rpx;
			background-image: url(/static/pages/zb_tab.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.footer-tab-item {
				width: 30%;
				height: 100%;

			}
		}
	}
</style>