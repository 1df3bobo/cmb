<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close">
			<view scroll-y class="main">
				<view class="title">
					<text>选择类别</text>
					<text class="title-btn" @click="confirm">确定</text>
				</view>
				<scroll-view scroll-y class="scroll">
					<view class="content">
						<view class="content-title">
							{{type == 1?'收入':'支出'}}
						</view>
						<view class="list">
							<view class="item" v-for="(item,index) in list" @click="change(item)">
								<image class="icon" :src="item.name === selectd.name?item.activeIcon:item.icon" mode="">
								</image>
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
					<view class="content">
						<view class="content-title">
							本人资金往来
						</view>
						<view class="list">
							<view class="item" v-for="(item,index) in list1" @click="change(item)">
								<image class="icon" :src="item.name === selectd.name?item.activeIcon:item.icon" mode="">
								</image>
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "billClassifyPop",
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
				selectd: {
					icon: '/static/icon/billCate/jijin.png',
					activeIcon: '/static/icon/billCate/jijin01.png',
					name: '基金'
				},
				list1: [{
					icon: '/static/icon/billCate/jijin.png',
					activeIcon: '/static/icon/billCate/jijin01.png',
					name: '基金'
				}, {
					icon: '/static/icon/billCate/zhaiquan.png',
					activeIcon: '/static/icon/billCate/zhaiquan01.png',
					name: '债券'
				}, {
					icon: '/static/icon/billCate/licai.png',
					activeIcon: '/static/icon/billCate/licai01.png',
					name: '理财'
				}, {
					icon: '/static/icon/billCate/dingqi.png',
					activeIcon: '/static/icon/billCate/dingqi01.png',
					name: '定期'
				}, {
					icon: '/static/icon/billCate/waihui.png',
					activeIcon: '/static/icon/billCate/waihui01.png',
					name: '外汇'
				}, {
					icon: '/static/icon/billCate/guijinshu.png',
					activeIcon: '/static/icon/billCate/guijinshu01.png',
					name: '贵金属'
				}, {
					icon: '/static/icon/billCate/gupiao.png',
					activeIcon: '/static/icon/billCate/gupiao01.png',
					name: '股票'
				}, {
					icon: '/static/icon/billCate/qitatouzi.png',
					activeIcon: '/static/icon/billCate/qitatouzi01.png',
					name: '其他投资'
				}, {
					icon: '/static/icon/billCate/zhuanzhanggeiziji.png',
					activeIcon: '/static/icon/billCate/zhuanzhanggeiziji01.png',
					name: '转账给自己'
				}, {
					icon: '/static/icon/billCate/huanzhaohangxinyongka.png',
					activeIcon: '/static/icon/billCate/huanzhaohangxinyongka01.png',
					name: '还招行信用卡'
				}, ],

			};
		},
		computed: {
			list() {
				if (this.type === 2) { // 支出
					return [{
						icon: '/static/icon/billCate/canyin.png',
						activeIcon: '/static/icon/billCate/canyin01.png',
						name: '餐饮'
					}, {
						icon: '/static/icon/billCate/fushimeirong.png',
						activeIcon: '/static/icon/billCate/fushimeirong01.png',
						name: '服饰美容'
					}, {
						icon: '/static/icon/billCate/chongwu.png',
						activeIcon: '/static/icon/billCate/chongwu01.png',
						name: '宠物'
					}, {
						icon: '/static/icon/billCate/qinzi.png',
						activeIcon: '/static/icon/billCate/qinzi01.png',
						name: '亲子'
					}, {
						icon: '/static/icon/billCate/gouwu.png',
						activeIcon: '/static/icon/billCate/gouwu01.png',
						name: '购物'
					}, {
						icon: '/static/icon/billCate/chuxing.png',
						activeIcon: '/static/icon/billCate/chuxing01.png',
						name: '出行'
					}, {
						icon: '/static/icon/billCate/jiudian.png',
						activeIcon: '/static/icon/billCate/jiudian01.png',
						name: '酒店'
					}, {
						icon: '/static/icon/billCate/xiuxianyule.png',
						activeIcon: '/static/icon/billCate/xiuxianyule01.png',
						name: '娱乐休闲'
					}, {
						icon: '/static/icon/billCate/wentijiaoyu.png',
						activeIcon: '/static/icon/billCate/wentijiaoyu01.png',
						name: '文体教育'
					}, {
						icon: '/static/icon/billCate/gongyi.png',
						activeIcon: '/static/icon/billCate/gongyi01.png',
						name: '公益'
					}, {
						icon: '/static/icon/billCate/shenghuoyongpin.png',
						activeIcon: '/static/icon/billCate/shenghuoyongpin01.png',
						name: '生活用品'
					}, {
						icon: '/static/icon/billCate/yiliaobaojian.png',
						activeIcon: '/static/icon/billCate/yiliaobaojian01.png',
						name: '医疗保健'
					}, {
						icon: '/static/icon/billCate/chongzhijiaofei.png',
						activeIcon: '/static/icon/billCate/chongzhijiaofei01.png',
						name: '充值缴费'
					}, {
						icon: '/static/icon/billCate/fangzufangdai.png',
						activeIcon: '/static/icon/billCate/fangzufangdai01.png',
						name: '房租房贷'
					}, {
						icon: '/static/icon/billCate/baoxian.png',
						activeIcon: '/static/icon/billCate/baoxian01.png',
						name: '保险'
					}, {
						icon: '/static/icon/billCate/xianjin.png',
						activeIcon: '/static/icon/billCate/xianjin01.png',
						name: '现金'
					}, {
						icon: '/static/icon/billCate/zhuanzhanggeitaren.png',
						activeIcon: '/static/icon/billCate/zhuanzhanggeitaren01.png',
						name: '转账给他人'
					}, {
						icon: '/static/icon/billCate/hongbao.png',
						activeIcon: '/static/icon/billCate/hongbao01.png',
						name: '红包'
					}, {
						icon: '/static/icon/billCate/shouxufei.png',
						activeIcon: '/static/icon/billCate/shouxufei01.png',
						name: '手续费'
					}, {
						icon: '/static/icon/billCate/huankuan.png',
						activeIcon: '/static/icon/billCate/huankuan01.png',
						name: '还款'
					}, {
						icon: '/static/icon/billCate/qitazhichu.png',
						activeIcon: '/static/icon/billCate/qitazhichu01.png',
						name: '其他支出'
					}]
				} else {
					return [{
							icon: '/static/icon/billCate/xinchou.png',
							activeIcon: '/static/icon/billCate/xinchou01.png',
							name: '薪酬'
						},
						{
							icon: '/static/icon/billCate/jiekuan.png',
							activeIcon: '/static/icon/billCate/jiekuan01.png',
							name: '借款'
						},
						{
							icon: '/static/icon/billCate/baoxiao.png',
							activeIcon: '/static/icon/billCate/baoxiao01.png',
							name: '报销'
						},
						{
							icon: '/static/icon/billCate/tuikuan.png',
							activeIcon: '/static/icon/billCate/tuikuan01.png',
							name: '退款'
						}, {
							icon: '/static/icon/billCate/touzishouyi.png',
							activeIcon: '/static/icon/billCate/touzishouyi01.png',
							name: '投资收益'
						}, {
							icon: '/static/icon/billCate/shebaogongjijin.png',
							activeIcon: '/static/icon/billCate/shebaogongjijin01.png',
							name: '社保公积金'
						}, {
							icon: '/static/icon/billCate/tarenzhuanru.png',
							activeIcon: '/static/icon/billCate/tarenzhuanru01.png',
							name: '他人转入'
						},
						{
							icon: '/static/icon/billCate/xianjin.png',
							activeIcon: '/static/icon/billCate/xianjin01.png',
							name: '现金'
						},
						{
							icon: '/static/icon/billCate/hongbao.png',
							activeIcon: '/static/icon/billCate/hongbao01.png',
							name: '红包'
						},
						{
							icon: '/static/icon/billCate/qitashouru.png',
							activeIcon: '/static/icon/billCate/qitashouru01.png',
							name: '其他收入'
						},
					]
				}

			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			change(item) {
				if (item.name === this.selectd.name) return
				this.selectd = item
			},
			confirm() {
				this.$emit('confirm', this.selectd)
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		height: 67vh;
		position: relative;
		display: flex;
		flex-direction: column;

		.scroll {
			flex: 1;
			height: 100px;

		}

		.content {
			width: 100%;
			margin-top: 78rpx;
			border-bottom: 1rpx solid #f8f8f8;

			.content-title {
				padding-left: 30rpx;
				font-size: 30rpx;
				margin-bottom: 30rpx;
			}

			.list {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.item {
					width: 20%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					font-size: 26rpx;
					margin-bottom: 42rpx;

					.icon {
						width: 68rpx;
						height: 68rpx;
						margin-bottom: 8rpx;
					}
				}
			}
		}

		.title {
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 110rpx;
			font-size: 32rpx;

			.title-btn {
				position: absolute;
				right: 30rpx;
				color: #2F6EE5;
			}

		}
	}
</style>