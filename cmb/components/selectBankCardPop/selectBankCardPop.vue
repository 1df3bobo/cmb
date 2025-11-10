<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close" closeable>
			<view class="main">
				<view class="title">选择银行卡</view>
				<view class="list">
					<view class="item" v-for="(item,index) in list" @click="change(item)">
						<image class="icon" :src="item.icon" mode=""></image>
						<view class="name">{{item.name}}</view>
						<image v-if="item.id === id" class="active-icon" src="/static/transfer/checked.png" mode="">
						</image>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		name: "selectBankCardPop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				id: '1',
			};
		},
		computed: {
			...mapState(['userInfo']),
			list() {
				let bankInfo = this.userInfo.bankList[0]
				return [{
						id: '1',
						name: '全部账户',
						icon: '/static/transfer/wallet.png'
					},
					{
						id: '2',
						name: `${bankInfo.bankName}(${bankInfo.bankCard.slice(-4)})`,
						icon: '/static/transfer/zsLogo.png'
					},
				]
			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			change(item) {
				if (item.id === this.id) return
				this.id = item.id
				this.$emit('change', item)
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		min-height: 600rpx;

		.title {
			padding-top: 28rpx;
			font-size: 36rpx;
			color: #333333;
			text-align: center;
		}

		.list {
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;

			.item {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				color: #333333;
				border-bottom: 1rpx solid #F7F7F7;
				height: 110rpx;

				&:last-child {
					border: none;
				}

				.name {
					flex: 1;
				}

				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}

				.active-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>