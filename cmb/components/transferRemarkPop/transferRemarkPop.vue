<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close">
			<view class="main">
				<view class="title">
					<view class="title-btn" @click="close">取消</view>
					<view class="title-btn active" @click="confirm">确定</view>
				</view>
				<view class="content">
					<textarea class="content-text" v-model="value" placeholder="请填写转账附言，收款双方可见，若不填写默认为“转账" focus
						auto-focus cols="30" rows="10"></textarea>
				</view>
				<view class="list">
					<view class="item" @click="select(item)" v-for="(item,index) in list">
						{{item.text0+item.text+item.text1}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "transferRemarkPop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				value: '',
				list: [{
					text0: '',
					text: '工资',
					text1: '',
					id: '1'
				}, {
					text0: '',
					text: '还钱给',
					text1: '_',
					id: '2'
				}, {
					text0: '',
					text: '借钱给',
					text1: '_',
					id: '3'
				}, {
					text0: '',
					text: '往来款',
					id: '4',
					text1: '',
				}, {
					text0: '_',
					text: '月房租',
					id: '5',
					text1: '',
				}, {
					text0: '',
					text: '还贷款',
					id: '6',
					text1: '',
				}]
			};
		},
		methods: {
			close() {
				this.$emit('close')
			},
			select(item) {
				this.value = item.text
			},
			confirm() {
				this.$emit('confirm', this.value)
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		padding-bottom: 30rpx;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 30rpx;
		height: 150rpx;
		color: #999;
		font-size: 36rpx;
		box-sizing: border-box;
	}

	.active {
		color: #5499D9;
	}

	.content {
		width: 690rpx;
		margin: auto;
		border: 1rpx solid #f8f8f8;
		height: 130rpx;
		border-radius: 16rpx;
		padding: 20rpx 10rpx 10rpx 20rpx;
		box-sizing: border-box;

		.content-text {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 50rpx;

		.item {
			width: 200rpx;
			margin-right: 30rpx;
			height: 60rpx;
			background-color: #f8f8f8;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50rpx;
			color: #333;
			font-size: 28rpx;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}
</style>