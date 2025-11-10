<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn service-btn title="转账设置">
		</navbar>
		<view class="main">
			<view class="pages">
				<image class="page-image" src="/static/pages/zzsz.png" mode="widthFix"></image>
				<view class="phone" v-if="userInfo.phone">
					{{showPhoneNo(userInfo.phone)}}
				</view>
				<view class="item" @click="go('/pages/transfer/contactList/contactList')">

				</view>
				<view class="item item1" @click="go('/pages/transfer/settings/quota/quota')">

				</view>
				<view class="item item2" @click="go('/pages/transfer/settings/phonePayment/phonePayment')">

				</view>
				<view class="item item3" @click="common">

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo,
		showPhoneNo
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				showPhoneNo: showPhoneNo
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			go(url) {
				navigateTo({
					url: url
				})
			},
			common() {
				navigateTo({
					url: '/pages/commonPages/commonPages?pageImage=/static/home/reserve.png&title=预留手机号说明'
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
		width: 750rpx;
		position: relative;


		.pages {
			width: 750rpx;
			height: auto;
			position: relative;

			.page-image {
				width: 750rpx;
				height: auto;
			}

			.item {
				width: 100%;
				height: 101rpx;
				position: absolute;
				top: 0;
			}

			.item1 {
				top: 101rpx;
			}

			.item2 {
				top: 202rpx;
			}

			.item3 {
				top: 303rpx;
			}

			.phone {
				position: absolute;
				top: 360rpx;
				right: 70rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #111;
				text-align: right;
			}
		}
	}
</style>