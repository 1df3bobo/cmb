<template>
	<view>
		<navbar ai-btn more-btn :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<view class="nav-search" :style="{border:opacity<1?'1rpx solid #DBD9D9': '1rpx solid #DBD9D9'}">
						<image class="nav-search-icon" :src="'/static/icon/search-grey.png'"></image>
						<text>’–…Ã¿Ì≤∆</text>
					</view>
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
		height: 3334rpx;
		background-image: url(/static/pages/lc.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 3334rpx;
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
			background-image: url(/static/pages/lc_2.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 162rpx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		padding: 0 0 0 56rpx;
		box-sizing: border-box;

		.nav-scan,
		.nav-customer,
		.nav-message {
			width: 40rpx;
			height: 40rpx;
		}

		.nav-customer {
			margin-right: 46rpx;
		}

		.nav-search {
			width: 445rpx;
			height: 58rpx;
			margin: 0 34rpx;
			box-sizing: border-box;
			border-radius: 30rpx 30rpx 30rpx 30rpx;
			border: 1rpx solid #DBD9D9;
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			color: #AEAFB0;
			font-size: 30rpx;

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 22rpx;
				;
			}

		}
	}
</style>