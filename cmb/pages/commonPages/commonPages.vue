<template>
	<view class="app" :style="{backgroundColor:bgColor}">
		<navbar :title="title" :service-btn="serviceBtn" :bg-color="bgColor" :ai-btn="aiBtn" :more-btn='moreBtn'>
		</navbar>
		<view class="pages">
			<image class="page-image" :src="pageImage" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageImage: '',
				title: '',
				bgColor: "#f8f8f8",
				serviceBtn: true,
				moreBtn: true,
				aiBtn: false,

			};
		},
		onLoad(options) {
			if (options.pageImage) {
				this.pageImage = options.pageImage
				this.title = options.title
				const {
					bgColor,
					serviceBtn,
					moreBtn,
					aiBtn
				} = options;
				this.bgColor = bgColor ? bgColor : this.bgColor;
				this.serviceBtn = serviceBtn !== undefined ? serviceBtn !== 'false' : this.serviceBtn;
				this.moreBtn = moreBtn !== undefined ? moreBtn !== 'false' : this.moreBtn;
				this.aiBtn = aiBtn !== undefined ? aiBtn !== 'false' : this.aiBtn;
			}
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