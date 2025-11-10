<template>
	<view class="app" :style="{backgroundColor:bgColor}">
		<navbar v-if="gradient == 1" :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'"
			:placeholder="false" :title="title" :service-btn="serviceBtn"
			:service-btn-icon="opacity >0.5?'/static/icon/customer-w.png':'/static/icon/customer-black.png'"
			:bg-color="`rgba(255,255,255,${1-opacity})`" :ai-btn="aiBtn"
			:aiBtnIcon="opacity >0.5?'/static/icon/icon5-w.png':'/static/icon/icon5.png'" :more-btn='moreBtn'
			:more-btn-icon="opacity >0.5?'/static/icon/icon3-w.png':'/static/icon/icon3.png'"
			:title-color="`rgba(${255*opacity},${255*opacity},${255*opacity},1)`">
		</navbar>
		<navbar v-else :placeholder="false" :title="title" title-color="#000" :service-btn="serviceBtn"
			:bg-color="`rgba(255,255,255,${1-opacity})`" :ai-btn="aiBtn" :more-btn='moreBtn'>
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
			if (options.pageImage) {
				this.pageImage = options.pageImage
				this.title = options.title
				if ('bgColor' in options) {
					this.bgColor = options.bgColor;
				}
				if ('serviceBtn' in options) {
					this.serviceBtn = JSON.parse(options.serviceBtn);
				}
				if ('moreBtn' in options) {
					this.moreBtn = JSON.parse(options.moreBtn);
				}
				if ('aiBtn' in options) {
					this.aiBtn = JSON.parse(options.aiBtn);
				}
				if ('gradient' in options) {
					this.gradient = JSON.parse(options.gradient);
				}
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

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>