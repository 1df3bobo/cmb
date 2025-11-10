<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close">
			<view class="main">

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "billLedger",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		height: 637rpx;
		background-image: url(/static/home/jizhangben.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>