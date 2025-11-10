<template>
	<view>
		<navbar more-btn :placeholder="false" title="跨境金融" :bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<image class="nav-search-icon" :src="'/static/icon/search@2x.png'"></image>
				</view>
			</slot>
		</navbar>
		<view class="pages"></view>
		<view class="footer">
			<view class="footer-pl"></view>
			<view class="footer-content" @click="goBack"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateBack
	} from '../../../utils';
	export default {
		data() {
			return {
				opacity: 1,
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.navBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.navBarHeight)
		},
		methods: {
			goBack() {
				navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.pages {
		width: 750rpx;
		height: 4706rpx;
		background-image: url(/static/pages/kjjr.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 4706rpx;
	}

	.footer {
		width: 750rpx;

		.footer-pl {
			width: 750rpx;
			height: 162rpx;
		}

		.footer-content {
			width: 750rpx;
			height: 162rpx;
			background-image: url(/static/pages/kjjr2.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 162rpx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}

	.nav-content {
		width: 550rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 120rpx;
		right: 0;
		box-sizing: border-box;
		position: absolute;

		.nav-search-icon {
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>