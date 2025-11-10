<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" service-btn title="向多人转账">
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/xdrzz.png" mode="widthFix"></image>
			<view class="select" @click="select">

			</view>
			<view class="select-1" @click="select1">

			</view>
			<view class="select-2" @click="select2">
			
			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '../../../utils';

	export default {
		data() {
			return {

			}
		},
		methods: {
			select() {
				navigateTo({
					url: '/pages/transfer/multiple/select/select'
				})
			},
			select1() {
				navigateTo({
					url: '/pages/transfer/multiple/group/group'
				})
			},
			select2() {
				navigateTo({
					url: '/pages/transfer/multiple/Invite/Invite'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.pages {
		width: 750rpx;
		height: auto;
		position: relative;

		.select {
			width: 750rpx;
			height: 200rpx;
			position: absolute;
			top: 0;
		}

		.select-1 {
			width: 750rpx;
			height: 200rpx;
			position: absolute;
			top: 200rpx
		}
		.select-2{
			width: 750rpx;
			height: 200rpx;
			position: absolute;
			top: 400rpx
		}
		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>