<template>
	<view class="app">
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">个人流水数据授权</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="contair">
      <view>
        <view class="title">授权记录</view>
        <view class="content">无</view>
      </view>
      <view class="add">新 增 授 权</view>
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
    display: flex;
    flex-direction: column;
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
    background-color: #fff;

		.nav-right {
			width: 172rpx;
			height: 72rpx;
		}

		.nav-home {
			width: 44rpx;
			height: 44rpx;

		}

	}

  .contair {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30rpx 30rpx 40rpx;

    .title{
      height: 90rpx;
      line-height: 90rpx;
      background-color: #fff;
      text-align: center;
      font-weight: 500;
      font-size: 37rpx;
      border-radius: 10rpx;
    }

    .content {
      height: 90rpx;
      line-height: 90rpx;
      background-color: #fff;
      text-align: center;
      font-weight: 500;
      font-size: 37rpx;
      margin-top: 30rpx;
      color: red;
      border-radius: 10rpx;
    }

    .add {
      height: 90rpx;
      line-height: 90rpx;
      background-color: #2c7cf6;
      text-align: center;
      font-size: 36rpx;
      margin-top: 20rpx;
      color: #fff;
      border-radius: 10rpx;
      margin: 0 40rpx;
    }
  }



</style>