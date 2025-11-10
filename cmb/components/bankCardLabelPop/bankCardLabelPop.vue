<template>
	<view>
		<u-popup :show="show" @close="close" zIndex="10" :overlayStyle="{zIndex:10}" round="8rpx" mode="center">
			<view class="main">
				<view class="title">
					给银行卡添加一个备注标签，管理方便
				</view>
				<view class="content">
					<input type="text" v-model="value" placeholder="最多可输入6个字，允许为空" />
				</view>
				<view class="list">
					<view class="item" @click="select(item)" v-for="(item,index) in list" v-text="item"></view>
				</view>
				<view class="footer">
					<view class="btn" @click="close">取消</view>
					<view class="btn active" @click="confirm">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "bankCardLabelPop",
		data() {
			return {
				value: '',
				list: ['消费卡', '理财卡', '房贷卡', '网购卡', '工资卡', '车贷卡']
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			...mapState(['bankCardLabel']),
		},
		methods: {
			...mapMutations(['change_bank_card_label']),
			close() {
				this.$emit('close')
			},
			select(item) {
				this.value = item
			},
			confirm() {
				this.change_bank_card_label({
					bankCardLabel: this.value
				})
				this.close()
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 690rpx;
		padding: 20rpx 30rpx 0;
		box-sizing: border-box;

		.title {
			color: #666;
			box-sizing: border-box;
			font-size: 35rpx;
			margin-bottom: 30rpx;
		}

		.list {
			display: flex;
			padding: 0 30rpx;
			flex-wrap: wrap;
			box-sizing: border-box;
			justify-content: space-between;
			margin-top: 30rpx;
			margin-bottom: 40rpx;

			.item {
				background-color: #f8f8f8;
				padding: 12rpx 36rpx;
				margin-bottom: 30rpx;
				margin-right: 100rpx;
				font-size: 24rpx;
				color: #666;

				&:nth-child(2n) {
					margin-right: 0;
				}

			}
		}

		.content {
			padding: 30rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F1f1f1;
			font-size: 30rpx;
		}

		.footer {
			width: 100%;
			height: 110rpx;
			border-top: 1rpx solid #F1f1f1;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #999999;

			.btn {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.active {
				color: #73A5F1;
			}
		}
	}
</style>