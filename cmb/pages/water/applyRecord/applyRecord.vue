<template>
	<view class="app">
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">流水打印</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-contnt">
					<view class="label card-num">{{item.bankCard}}</view>
					<view class="content">{{item.status}}</view>
				</view>
				<view class="item-contnt">
					<view class="label">申请时间</view>
					<view class="content">{{item.createTime}}</view>
				</view>
				<view class="item-contnt">
					<view class="label">时间区间</view>
					<view class="content">{{item.dateTimeRange}}</view>
				</view>
				<view class="item-contnt">
					<view class="label code">解压码</view>
					<view class="content code-content">{{item.code}}</view>
				</view>
				<view class="item-contnt">
					<view class="label">申请邮箱</view>
					<view class="content">{{item.email}}</view>
				</view>
			</view>
			<u-loadmore :status="status" loading-text="正在加载..." />
		</view>
	</view>
</template>

<script>
	import {
		flowExportRecordList
	} from '@/api/index.js'
	import {
		repeatCardNumber
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				list: [],
				totalPage: 1,
				status: 'loading'

			}
		},
		onLoad() {
			this.flowExportRecordList()
		},
		computed: {
			statusText() {
				return (status) => { //  0处理中 1已寄出 2已完成
					if (status == 0) return '处理中'
					if (status == 1) return '已发送'
					if (status == 2) return '已发送'
				}
			}
		},
		methods: {
			flowExportRecordList() {
				flowExportRecordList({
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}).then(res => {
					if (res.code === 200) {
						this.list = [...this.list, ...res.data.list]
						this.totalPage = res.data.pages
						this.status = 'loadmore'
					}else{
						this.status = 'loadmore'
					}

				})
			},
			onReachBottom() {
				if (this.pageNum == this.totalPage) {
					this.status = 'nomore'
					return;
				}
				this.pageNum = this.pageNum + 1,
					this.status = 'loading'

				this.flowExportRecordList();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 36rpx;
		padding-left: 126rpx;
		padding-right: 26rpx;
		box-sizing: border-box;

		.nav-right {
			width: 172rpx;
			height: 72rpx;
		}

		.nav-home {
			width: 44rpx;
			height: 44rpx;

		}

	}

	.list {
		width: 750rpx;
		background-color: #ffffff;
		padding: 0 30rpx;
		box-sizing: border-box;

		.item {
			width: 100%;
			height: 340rpx;
			border-bottom: 1rpx solid #eee;
			padding-top: 30rpx;
			box-sizing: border-box;


			.item-contnt {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #666;
				font-size: 28rpx;
				margin-bottom: 24rpx;

				.code {
					color: #111;
				}

				.code-content {
					color: #111;
					font-weight: 700;
				}

				.card-num {
					font-size: 30rpx;
					color: #111;
				}
			}
		}
	}
</style>