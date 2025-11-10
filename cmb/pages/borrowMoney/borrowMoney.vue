<template>
	<view>
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`" title="借钱" service-btn more-btn s
			:service-btn-icon="opacity >0.5?'/static/icon/customer-w.png':'/static/icon/customer-black.png'"
			:more-btn-icon="opacity >0.5?'/static/icon/icon3-w.png':'/static/icon/icon3.png'"
			:title-color="`rgba(${255*opacity},${255*opacity},${255*opacity},1)`">
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
	.pages {
		width: 750rpx;
		height: 8979rpx;
		background-image: url(/static/pages/borrowMoney.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 8979rpx;
	}
</style>