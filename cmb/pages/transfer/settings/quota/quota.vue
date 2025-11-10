<template>
	<view class="app">
		<navbar moreBtn bg-color="#f8f8f8"   service-btn title="转账限额">
		</navbar>
		<view class="main">
			<view class="card" v-if="userInfo.bankList">
				<text>一卡通</text>
				<view class="content">
					<text>{{repeatCardNumber(userInfo.bankList[0].bankCard)}}</text>
					<image class="arrow-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
				</view>
			</view>
			<view class="pages">
				<image class="page-image" src="/static/home/zzxe.png" mode="widthFix"></image>
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
		showPhoneNo,
		repeatCardNumber
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				showPhoneNo: showPhoneNo,
				repeatCardNumber: repeatCardNumber
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
		position: relative;

		.card {
			width: 750rpx;
			height: 120rpx;
			margin-bottom: 30rpx;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;
			font-size: 34rpx;
			color: #333;

			.content {
				display: flex;
				align-items: center;
				font-weight: 700;

				.arrow-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.pages {
			width: 750rpx;
			height: auto;
			position: relative;

			.page-image {
				width: 750rpx;
				height: auto;
			}

		}
	}
</style>