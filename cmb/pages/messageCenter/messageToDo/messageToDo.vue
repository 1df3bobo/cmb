<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" title="消息中心">
			<view class="nav">
				<view class="nav-content">
					<image class="nav-clear" src="/static/icon/xiaoxi-icon2.png" mode=""></image>
					<image class="nav-icon" @click="contactPerson" src="/static/icon/lianxiren.png" mode=""></image>
					<image class="nav-icon" src="/static/icon/xiaoxi-icon.png" mode=""></image>
				</view>
			</view>
		</navbar>
		<view class="main">
			<image class="pages-image" src="/static/pages/xxzx_2.png" mode="widthFix"></image>
			<view class="btn" @click="toDo"></view>
		</view>
	</view>
</template>

<script>
	import {
		redirectTo,navigateTo
	} from '../../../utils';

	export default {
		data() {
			return {

			}
		},
		methods: {
			toDo() {
				redirectTo({
					url: '/pages/messageCenter/messageCenter'
				})
			},
			contactPerson(){
				navigateTo({
					url: '/pages/messageCenter/contactPerson/contactPerson'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		height: 100vh;
		overflow: hidden;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
		position: relative;

		.btn {
			position: absolute;
			width: 300rpx;
			height: 100rpx;
			left: 30rpx;
			top: 0;
			z-index: 2;
		}

		.pages-image {
			width: 750rpx;
		}
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

		.nav-clear {
			width: 35rpx;
			height: 35rpx;
			margin-right: 74rpx;
		}

		.nav-icon {
			width: 48rpx;
			height: 48rpx;
			margin-left: 30rpx;
		}

	}
</style>