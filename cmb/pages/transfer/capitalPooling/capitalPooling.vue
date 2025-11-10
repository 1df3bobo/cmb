<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" left-icon="/static/icon/back.png" title="他行卡转入">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<text>管理</text>
					<image class="nav-customer" src="/static/icon/customer-black.png"></image>
				</view>
			</slot>
		</navbar>
		<view class="header">
			<view class="btn" @click="go"></view>
		</view>
		<view class="content"></view>
		<view class="footer"></view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		redirectTo
	} from '@/utils/index.js'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['navBarHeight'])
		},
		methods: {
			go() {
				redirectTo({
					url: '/pages/transfer/single/single'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #111;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 36rpx;
		}


	}

	.header {
		width: 750rpx;
		height: 107rpx;
		background-image: url(/static/pages/thkzr_1.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;

		.btn {
			position: absolute;
			width: 300rpx;
			height: 107rpx;
			left: 20rpx;
		}
	}

	.content {
		width: 750rpx;
		height: 813rpx;
		background-image: url(/static/pages/thkzr_2.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		margin-top: 60rpx;
	}

	.footer {
		width: 750rpx;
		height: 128rpx;
		background-image: url(/static/pages/thkzr_3.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;
		position: fixed;
		bottom: 0;
	}
</style>