<template>
	<view class="app" :style="{backgroundColor:bgColor}">
		<view class="pages">
			<image class="page-image" :src="pageImage" mode="widthFix"></image>
      <view class="back" @click="goBack"></view>
		</view>
	</view>
</template>

<script>
  import { navigateBack } from "@/utils/index.js";
	export default {
		data() {
			return {
				pageImage: '',
				bgColor: "#f8f8f8",
			};
		},
		onLoad(options) {
			if (options.pageImage) {
				this.pageImage = options.pageImage
				this.title = options.title
				const { bgColor } = options;
				this.bgColor = bgColor ? bgColor : this.bgColor;
			}
		},
    methods: {
      goBack() {
        navigateBack();
      },
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

		.page-image {
			width: 750rpx;
			height: auto;
		}

    .back {
      position: absolute;
      top: 60rpx;
      left: 0;
      width: 100rpx;
      height: 100rpx;
    }
	}
</style>