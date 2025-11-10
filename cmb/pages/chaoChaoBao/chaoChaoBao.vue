<template>
	<view>
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'" :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`" title="朝朝宝"
			     :title-color="`rgba(${255*opacity},${255*opacity},${255*opacity},1)`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:opacity >0.5?'#ffffff':'#111111'}">
					<image class="nav-customer"
						:src="opacity<1?'/static/icon/customer-black.png':'/static/icon/customer-white.png'"></image>
					<text>管理</text>
				</view>
			</slot>
		</navbar>
		<view class="pages"></view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				opacity: 1
			}
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
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-right: 36rpx;
		}


	}

	.pages {
		width: 750rpx;
		height: 1624rpx;
		background-image: url(/static/pages/chaochaobao.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 1624rpx;
	}
</style>