<template>
	<view class="app" :style="{backgroundColor:bgColor}">
		<navbar :placeholder="false" title="我的积分" title-color="#000" :service-btn="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`" more-btn>
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/wdjf.png" mode="widthFix"></image>
			<view class="points">
				{{userInfo.points}}
			</view>
			<view class="points-sm">
				{{userInfo.points}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				pageImage: '',
				title: '',
				bgColor: "#fff",
				serviceBtn: true,
				moreBtn: true,
				aiBtn: false,
				opacity: 1,
				gradient: 1, //  标题的内容和图片是否发生渐变  1渐变  0 不变

			};
		},
		onLoad(options) {

		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight', 'userInfo']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop == 0) {
				this.opacity = 1
				return
			} else if (scrollTop >= this.statusBarHeight) {
				this.opacity = 0
				return
			}
			this.opacity = 1 - (scrollTop / this.statusBarHeight)
		},
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
	}

	.pages {
		width: 750rpx;
		height: auto;
		position: relative;

		.points {
			position: absolute;
			top: 240rpx;
			left: 54rpx;
			color: #591B00;
			font-size: 72rpx;
			font-weight: 700;
			z-index: 10;

		}

		.points-sm {
			position: absolute;
			width: 90rpx;
			text-align: right;
			top: 324rpx;
			left: rpx;
			color: #591B00;
			font-size: 24rpx;
			font-weight: 400;
			z-index: 10;
		}

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>