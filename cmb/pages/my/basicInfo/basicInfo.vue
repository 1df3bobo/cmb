<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" title="基本信息" service-btn more-btn>
		</navbar>
		<view class="main">
			<view class="card">
				<image class="user-header" src="/static/home/head-image.png" mode=""></image>
				<view class="user-phone">{{showPhoneNo(userInfo.phone)}}</view>
			</view>
			<view class="card2">
				<view class="real-name">{{replaceWithAsterisks}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		showPhoneNo
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				showPhoneNo: showPhoneNo
			}
		},
		computed: {
			...mapState(['userInfo']),
			replaceWithAsterisks(str) {
				let realName = this.userInfo.realName
				if (!realName) return
				if (realName.length <= 1) {
					return realName;
				}
				return realName.slice(0, -1).replace(/./g, '*') + realName.slice(-1);
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;

		.main {
			width: 750rpx;

			.card2 {
				width: 750rpx;
				height: 836rpx;
				background-image: url(/static/pages/jbxx_2.png);
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
				position: relative;

				.real-name {
					color: #383838;
					font-size: 30rpx;
					position: absolute;
					right: 100rpx;
					top: 43rpx;
				}
			}

			.card {
				width: 750rpx;
				height: 553rpx;
				background-image: url(/static/pages/jbxx_1.png);
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center;
				position: relative;

				.user-header {
					width: 100rpx;
					height: 100rpx;
					position: absolute;
					left: 50rpx;
					top: 40rpx;
				}

				.user-phone {
					color: #383838;
					font-size: 30rpx;
					position: absolute;
					right: 100rpx;
					bottom: 156rpx;
				}
			}

		}
	}
</style>