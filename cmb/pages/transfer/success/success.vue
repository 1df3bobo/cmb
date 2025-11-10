<template>
	<view>
		<navbar more-btn service-btn="" bg-color="#F8F8F8"></navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/zzcg.png" mode="widthFix"></image>
			<view @click="goRecord" class="record-btn"></view>
			<view @click="doKeep" class="keep-btn"></view>
			<view @click="finish" class="finish-btn"></view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo,
		redirectTo,
		switchTab
	} from '../../../utils';
	export default {
		data() {
			return {

			};
		},
		methods: {
			doKeep() {
				redirectTo({
					url: '/pages/transfer/index/index'
				})
			},
			goRecord() {
				redirectTo({
					url: '/pages/transfer/record/record'
				})
			},
			finish() {
				switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		width: 750rpx;
		height: auto;
		position: relative;

		.page-image {
			width: 750rpx;
			height: auto;
		}

		.record-btn {
			width: 100rpx;
			height: 30rpx;
			position: absolute;
			top: 360rpx;
			left: 170rpx;
		}

		.keep-btn {
			width: 100rpx;
			height: 30rpx;
			position: absolute;
			top: 360rpx;
			left: 300rpx;
		}

		.finish-btn {
			width: 320rpx;
			height: 80rpx;
			position: absolute;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>