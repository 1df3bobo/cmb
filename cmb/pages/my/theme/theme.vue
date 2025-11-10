<template>
	<view class="app">
		<navbar title="主题中心" :title-color="`rgba(${255*opacity},${255*opacity},${255*opacity},1)`"
			:left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`"
			:more-btn-icon="opacity >0.5?'/static/icon/icon3-w.png':'/static/icon/icon3.png'">
			<view class="nav">
				<view class="nav-item">
					<image class="search-icon" src="/static/pages/zhuti.png" mode=""></image>
					<text>我的主题</text>
				</view>
				<view class="nav-item">
					<image class="search-icon" src="/static/pages/sousuo_bai.png" mode=""></image>
					<text>搜索</text>
				</view>
			</view>
		</navbar>
		<view class="pages">
			<image class="page-image" :src="pageImage" mode="widthFix"></image>
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
				pageImage: '/static/pages/ztzx.png',
				opacity: 1,

			};
		},
		onLoad(options) {

		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.statusBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
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

	.nav {
		width: 500rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		right: 30rpx;
		position: absolute;
		box-sizing: border-box;
		z-index: 100;

		.nav-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 20rpx;
			margin-left: 40rpx;
		}

		.search-icon {
			width: 44rpx;
			height: 44rpx;
			margin-bottom: 6rpx;
		}

	}

	.pages {
		width: 750rpx;
		height: auto;

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>