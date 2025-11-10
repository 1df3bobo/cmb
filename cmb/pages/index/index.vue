<template>
	<view class="app">
		<navbar :showBack="false" :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<image class="nav-scan"
						:src="opacity<1?'/static/icon/scan-black.png':'/static/icon/scan-white.png'"></image>
					<view class="nav-search" @click="goSearch"
						:style="{border:opacity<1?'1rpx solid #ccc': '1rpx solid #F8888E'}">
						<image class="nav-search-icon"
							:src="opacity<1?'/static/icon/search-black.png':'/static/icon/search.png'"></image>
						<swiper class="search-swiper" :style="{color:opacity<1?'#ccc': '#ffffff'}" circular vertical
							autoplay>
							<swiper-item class="swiper-item">
								<view class="swiper-item">家校有招</view>
							</swiper-item>
							<swiper-item class="swiper-item">
								<view class="swiper-item">持仓赢好礼</view>
							</swiper-item>
							<swiper-item class="swiper-item">
								<view class="swiper-item">流水打印</view>
							</swiper-item>
						</swiper>
					</view>
					<image class="nav-customer" @click="goCustomer"
						:src="opacity<1?'/static/icon/icon5.png':'/static/icon/icon5-w.png'">
					</image>
					<image @click="goMessage" class="nav-message"
						:src="opacity<1?'/static/icon/msg-black.png':'/static/icon/msg-white.png'"></image>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="cate"
				:style="{height:`${px2rpx(navBarHeight)+px2rpx(statusBarHeight)+203}rpx`,paddingTop:`${navBarHeight+statusBarHeight}px`}">
				<view class="item" @click="goCate(item)" v-for="(item,index) in cateList" :key="index">
					<image class="icon" :src="item.icon"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="projects">
				<view class="item" @click="goProjects(item)" v-for="(item,index) in projects" :key="index">
					<image class="icon" :src="item.icon"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="notice">
				<swiper class="notice-swiper" circular vertical autoplay>
					<swiper-item class="swiper-item">
						<view class="swiper-item">理财收益受那些市场因素影响？</view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<view class="swiper-item">小招有财：2元现金红包待领取</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="banner">
				<swiper class="banner-swiper" circular autoplay>
					<swiper-item class="swiper-item">
						<image class="icon" src="/static/home/banner.png"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="footer-page">
				<!-- 财富精选 -->
				<view class="caifu" @click="caifu"></view>
				<!-- 借钱 -->
				<view class="jieqian" @click="jieqian"></view>
				<!-- 特色榜单 -->
				<view class="specialtyList" @click="specialtyList"></view>
				<!-- 生活特惠 -->
				<view class="shenghuo" @click="shenghuo"></view>
				<!-- 看点情报 -->
				<view class="qingbao" @click="qingbao"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		px2rpx,
		navigateTo
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				px2rpx: px2rpx,
				opacity: 1,
				cateList: [{
					name: '朝朝宝',
					icon: '/static/home/chaoChaoBao.png',
					path: '/pages/chaoChaoBao/chaoChaoBao'
				}, {
					name: '借钱',
					icon: '/static/home/borrowMoney.png',
					path: '/pages/borrowMoney/borrowMoney'
				}, {
					name: '转账',
					icon: '/static/home/transferAccounts.png',
					path: '/pages/transfer/index/index'
				}, {
					name: '账户总览',
					icon: '/static/home/account.png',
					path: '/pages/account/account/account'
				}],
				projects: [{
						name: '信用卡',
						icon: '/static/home/kingOne.png',
						path: `/pages/commonPages/commonPages?pageImage=/static/pages/xyksq.png&title=招商银行信用卡申请&serviceBtn=${false}`
					}, {
						name: '收支明细',
						icon: '/static/home/kingTwo.png',
						path: '/pages/bill/bill'
					}, {
						name: '他行卡转入',
						icon: '/static/home/kingNine.png',
						path: '/pages/transfer/single/single'
					}, {
						name: '医保码',
						icon: '/static/home/kingThree.png',
						path: `/pages/commonPages/commonPages?pageImage=/static/pages/ybm.png&title=医保码&serviceBtn=${false}`
					}, {
						name: '热门活动',
						icon: '/static/home/kingFive.png',
						path: `/pages/commonPages/commonPages?pageImage=/static/pages/rmhd.png&title=热门活动&serviceBtn=${false}`
					},
					{
						name: '流水导出',
						icon: '/static/home/flowExport.png',
						path: '/pages/water/water/water'
					}, {
						name: '养老金融',
						icon: '/static/home/kingSix.png',
						path: `/pages/common/common?pageImage=/static/pages/grylj.png&serviceBtn=${false}&moreBtn=${false}`
					},
					{
						name: 'M+会员',
						icon: '/static/home/kingSix.png',
						path: '/pages/mMember/mMember'
					}, {
						name: '影票',
						icon: '/static/home/kingEight.png',
						path: '/pages/movieTicket/movieTicket'
					},
					{
						name: '全部',
						icon: '/static/home/kingTen.png',
						path: '/pages/allMenu/allMenu'
					},
				]

			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onLoad() {

		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.navBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.navBarHeight)
		},

		methods: {
			goSearch() {
				navigateTo({
					url: `/pages/search/search`
				})
			},
			caifu() {
				navigateTo({
					url: `/pages/commonPages/commonPages?pageImage=/static/pages/cfjx.png&title=财富精选&serviceBtn=${false}`
				})
			},
			jieqian() {
				navigateTo({
					url: `/pages/borrowMoney/borrowMoney`
				})
			},
			specialtyList() {
				navigateTo({
					url: `/pages/index/specialtyList/specialtyList`
				})
			},
			shenghuo() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/shth.png&serviceBtn=${false}&moreBtn=${false}`
				})
			},
			qingbao() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/tj.png&serviceBtn=${false}&moreBtn=${false}`
				})
			},
			goCate(item) {
				if (item.path) {
					navigateTo({
						url: item.path
					})
				}
			},
			goProjects(item) {
				if (item.path) {
					navigateTo({
						url: item.path
					})
				}
			},
			goCustomer() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/kefu.png&serviceBtn=${false}&title=小招-客服门户&gradient=2`
				})
			},
			goMessage() {
				navigateTo({
					url: `/pages/messageCenter/messageCenter`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		height: 100%;
	}

	.main {
		width: 100%;
		min-height: 400rpx;
		position: relative;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		padding: 0 0 0 36rpx;
		box-sizing: border-box;

		.nav-scan,
		.nav-customer,
		.nav-message {
			width: 40rpx;
			height: 40rpx;
		}

		.nav-customer {
			margin-right: 46rpx;
		}

		.nav-search {
			width: 445rpx;
			height: 58rpx;
			margin: 0 34rpx;
			box-sizing: border-box;
			border-radius: 30rpx 30rpx 30rpx 30rpx;
			border: 1rpx solid #F8888E;
			display: flex;
			align-items: center;
			padding-left: 20rpx;

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.search-swiper {
				flex: 1;
				height: 58rpx;
				display: flex;
				align-items: center;
				margin-left: 10rpx;
				color: #FFFFFF;

				.swiper-item {
					height: 58rpx;
					display: flex;

					font-size: 28rpx;
					font-weight: 400;
					align-items: center;
				}
			}
		}
	}

	.cate {
		width: 100%;
		display: flex;
		padding-left: 54rpx;
		padding-right: 43rpx;
		box-sizing: border-box;
		justify-content: space-between;
		background-image: url(/static/home/headerTop.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #FFFFFF;
			font-size: 26rpx;
			padding-top: 36rpx;
			box-sizing: border-box;
			line-height: 1;

			.icon {
				width: 62rpx;
				height: 62rpx;
				margin-bottom: 17rpx;
			}
		}
	}

	.projects {
		width: 100%;
		height: 294rpx;
		background-color: #FFFFFF;
		margin-top: -32rpx;
		border-radius: 32rpx 32rpx 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx 30rpx 0;
		box-sizing: border-box;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			font-weight: 700;
			color: #333;
			width: 120rpx;
			margin-bottom: 50rpx;
			font-weight: 400;

			.icon {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.notice {
		width: 750rpx;
		height: 93rpx;
		background-image: url(/static/home/notice-bg.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;
		padding-left: 179rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.notice-swiper {
			width: 100%;
			height: 100%;
			color: #383838;
			font-size: 28rpx;

			.swiper-item {
				height: 100%;
				display: flex;
				align-items: center;

			}
		}
	}

	.banner {
		width: 750rpx;
		height: 305rpx;

		.banner-swiper {
			width: 750rpx;
			height: 305rpx;

			.swiper-item,
			.icon {
				width: 750rpx;
				height: 305rpx;
			}
		}
	}

	.footer-page {
		width: 750rpx;
		height: 5605rpx;
		background-image: url(/static/home/page.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 5605rpx;

		.caifu {
			width: 100%;
			height: 890rpx;
		}

		.jieqian {
			width: 100%;
			height: 390rpx;
		}

		.specialtyList {
			width: 100%;
			height: 590rpx;
			margin-top: 60rpx;

		}

		.shenghuo {
			width: 100%;
			height: 690rpx;
			margin-top: 60rpx;
		}

		.qingbao {
			width: 100%;
			height: 2590rpx;
			margin-top: 60rpx;
		}
	}
</style>