<template>
	<view>
		<navbar left-icon="/static/icon/back.png" more-btn :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:opacity >0.5?'#ffffff':'#111111'}">
					<text>全部等级</text>
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
		padding-right: 120rpx;
		color: #111 !important;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;



	}

	.pages {
		width: 750rpx;
		height: 2715rpx;
		background-image: url(/static/pages/m+hy.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 2715rpx;
	}
</style>