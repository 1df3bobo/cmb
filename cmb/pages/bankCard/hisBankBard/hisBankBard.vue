<template>
	<view class="app">
		<navbar title="查询我的他行卡" more-btn service-btn bg-color="#F8F8F8"></navbar>
		<view class="main">
			<view class="item" @click="relatedCard"></view>
			<view class="item" @click="show = true"></view>
		</view>
		<u-modal :show="show" @confirm="show = false" @cancel="show = false" showCancelButton confirmText="确定">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '../../../utils';

	export default {
		data() {
			return {
				show: false,
				content: `<div style="color:#3F3F3F;font-size:38rpx">即将离开招商银行<span style="font-weight: 700;">APP</span>，打开“云闪付”</div>`
			}
		},
		methods: {
			relatedCard() {
				navigateTo({
					url: '/pages/bankCard/relatedCard/relatedCard'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {

		height: 460rpx;
		width: 750rpx;
		box-sizing: border-box;
		background-image: url(/static/pages/cc.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 460rpx;
		box-sizing: border-box;

		.item {
			width: 100%;
			height: 200rpx;
			margin-bottom: 30rpx;
		}
	}
</style>