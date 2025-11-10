<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn title="密码管理"></navbar>
		<view class="main">
			<view class="item" @click="common"></view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '../../utils';

	export default {
		data() {
			return {

			}
		},
		methods: {
			common() {
				navigateTo({
					url: `/pages/commonPages/commonPages?pageImage=/static/pages/xgdlmm.png&title=修改登录密码`
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

		.main {
			width: 100%;
			min-height: 340rpx;
			background-position: top;
			background-size: 750rpx 340rpx;
			background-repeat: no-repeat;
			background-image: url('/static/pages/mmgl.png');

			.item {
				width: 750rpx;
				height: 110rpx;
			}
		}
	}
</style>