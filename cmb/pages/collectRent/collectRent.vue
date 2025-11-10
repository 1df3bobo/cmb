<template>
	<view>
		<navbar :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`" title="收租宝" service-btn more-btn>
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
		height: 1586rpx;
		background-image: url(/static/pages/collectRent.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 1586rpx;
	}
</style>