<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" title="联系人">
			<view class="nav">
				<view class="nav-content">
					<text>添加</text>
				</view>
			</view>
		</navbar>
		<view class="main">
			<image class="pages-image" src="/static/pages/lxr.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		redirectTo
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
			font-size: 28rpx;
		}

	}
</style>