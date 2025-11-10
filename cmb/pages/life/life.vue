<template>
	<view>
		<navbar :placeholder="false" :showBack="false" :bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:opacity >0.5?'#ffffff':'#111111'}">
					<view class="address">
						<text>香港</text>
						<image class="address-icon"
							:src="opacity<1?'/static/icon/greyDown.png':'/static/icon/down_bai.png'"></image>
					</view>
					<view @click="goSearch" :class="['search',opacity<1?'search-fix':'']">
						<image class="nav-search-icon"
							:src="opacity<1?'/static/icon/search-grey.png':'/static/icon/search.png'"></image>
						<text>星巴克笔 笔立减两元起</text>
					</view>
					<image class="nav-customer"
						:src="opacity<1?'/static/icon/customer-black.png':'/static/icon/customer-white.png'"></image>
					<image class="nav-customer"
						:src="opacity<1?'/static/icon/order-black.png':'/static/icon/order.png'"></image>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="list">
				<view class="item" @click="goProjects(item.path)" v-for="(item,index) in projects" :key="index">

				</view>
			</view>
			<view class="meishi" @click="goProjects('/pages/life/voucher/voucher')">

			</view>
			<view class="jiaofei" @click="goProjects( `/pages/common/common?pageImage=/static/pages/shjf_1.png&title=生活缴费&gradient=2`)">

			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '@/utils/index.js'
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				opacity: 1,
				projects: [{
						name: '饭票',
						path: `/pages/life/voucher/voucher`
					}, {
						name: '影票',
						path: '/pages/movieTicket/movieTicket'
					}, {
						name: '出行',
						path: `/pages/life/transportationTravel/transportationTravel`
					}, {
						name: '便民服务',
						path: `/pages/life/convenienceServices/convenienceServices`
					}, {
						name: '生活缴费',
						path: `/pages/common/common?pageImage=/static/pages/shjf_1.png&title=生活缴费&gradient=2`
					},
					{
						name: '话费流量',
						path: `/pages/life/phoneBillData/phoneBillData`
					}, {
						name: '酒店',
						path: `/pages/common/common?pageImage=/static/pages/jd.png&serviceBtn=${false}`
					},
					{
						name: '掌上商城',
						path: `/pages/commonPages/commonPages?pageImage=/static/pages/zssc.png&serviceBtn=${false}&title=掌上商城`
					}, {
						name: '积分',
						path: `/pages/common/common?pageImage=/static/pages/wdjf.png&title=我的积分&serviceBtn=${false}&gradient=2`
					},
					{
						name: '全部',
						path: `/pages/commonPages/commonPages?pageImage=/static/pages/shfwlb.png&serviceBtn=${false}&title=生活服务列表`
					},
				]
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.statusBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.statusBarHeight)
		},
		methods: {
			goProjects(item) {
				if (item) {
					navigateTo({
						url: item
					})
				}
			},
			goSearch() {
				navigateTo({
					url: `/pages/search/search`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;
		padding-left: 40rpx;
		box-sizing: border-box;

		.address {
			display: flex;
			align-items: center;
			margin-right: 30rpx;

			.address-icon {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.search {
			flex: 1;
			height: 50rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			border: 1rpx solid #fff;
			margin-right: 10rpx;

			&.search-fix {
				border: 1rpx solid #ccc;
				color: #ccc;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
				padding-right: 16rpx;
			}
		}

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}


	}

	.main {
		width: 750rpx;
		height: 24342rpx;
		background-image: url(/static/pages/life.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 24342rpx;
		padding-top: 440rpx;

		.list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				height: 120rpx;
				width: 17%;

			}
		}

		.meishi {
			width: 750rpx;
			height: 550rpx;
			margin-top: 130rpx;
		}
		.jiaofei{
			width: 750rpx;
			height: 600rpx;
			margin-top: 50rpx;
		}
	}
</style>