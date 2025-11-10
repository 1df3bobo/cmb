<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" title="设置" ai-btn more-btn>
		</navbar>
		<view class="main">
			<view class="user-info">
				<image class="user-header" @click="commonPages('/pages/my/basicInfo/basicInfo')"
					src="/static/home/head-image.png" mode=""></image>
				<view class="user-content">
					<view class="user-name">
						<text>{{replaceWithAsterisks}}</text>
						<image @click="commonPages('/pages/my/home/home')" class="user-name-label"
							src="/static/home/set-label.png" mode=""></image>
					</view>
					<view class="user-phone">{{showPhoneNo(userInfo.phone)}}</view>
				</view>
				<image class="user-arrow" src="/static/home/set-arrow.png" mode=""></image>
			</view>
			<view class="card">
				<view class="theme" @click="commonPages('/pages/my/theme/theme')">

				</view>
				<view class="collect"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/sczx.png&title=收藏中心&serviceBtn=false&moreBtn=false')">

				</view>
				<view class="message"
					@click="commonPages('/pages/common/common?pageImage=/static/pages/xxszzx.png&title=消息设置中心&serviceBtn=false')">

				</view>
			</view>
			<view class="card1">
				<view class="item" @click="commonPages('/pages/my/loginManagement/loginManagement')"></view>
				<view class="item" @click="commonPages('/pages/bankCard/bankCard')"></view>
				<view class="item" @click="commonPages('/pages/password/password')"></view>
				<view class="item" @click="commonPages('/pages/transfer/settings/settings')"></view>
			</view>
			<view class="card2">
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/xzyyhx.png&title=小招语音唤醒&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/xfzqybh.png&title=消费者权益保护&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/yjfk.png&title=意见反馈&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/common/common?pageImage=/static/pages/fyzs.png&title=AI翻译助手&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/common/common?pageImage=/static/pages/szsc.png&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/kjfssz.png&title=快捷方式设置&serviceBtn=false')">
				</view>
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/wdcfsh.png&title=招商银行:我的财富生活&serviceBtn=false')">
				</view>
				<view class="item"></view>
				<view class="item"
					@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/gyapp.png&title=关于APP&serviceBtn=false')">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
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
			replaceWithAsterisks(str) {
				let realName = this.userInfo.realName
				if (!realName) return
				if (realName.length <= 1) {
					return realName;
				}
				return realName.slice(0, -1).replace(/./g, '*') + realName.slice(-1);
			}
		},
		methods: {
			commonPages(url) {
				navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 100%;
		padding-top: 50rpx;

		.card {
			width: 750rpx;
			height: 559rpx;
			background-image: url(/static/home/set1.png);
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			position: relative;

			.theme {
				position: absolute;
				width: 330rpx;
				height: 530rpx;
				left: 30rpx;
			}

			.collect {
				position: absolute;
				width: 330rpx;
				height: 260rpx;
				right: 30rpx;
			}

			.message {
				position: absolute;
				width: 330rpx;
				height: 260rpx;
				right: 30rpx;
				top: 280rpx;
			}

		}

		.card1 {
			width: 750rpx;
			height: 288rpx;
			background-image: url(/static/home/set2.png);
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 50rpx;
			box-sizing: border-box;


			.item {
				width: 20%;
				height: 150rpx;
			}
		}


		.card2 {
			width: 750rpx;
			height: 1785rpx;
			background-image: url(/static/home/set3.png);
			background-size: cover;
			background-repeat: no-repeat;
			background-position: top;
			padding-top: 490rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				height: 90rpx;
				margin-bottom: 16rpx;

			}
		}

		.user-info {
			display: flex;
			padding: 0 45rpx 0 58rpx;
			box-sizing: border-box;
			align-items: center;
			margin-bottom: 53rpx;

			.user-header {
				width: 110rpx;
				height: 110rpx;
				margin-right: 17rpx;
			}

			.user-arrow {
				width: 50rpx;
				height: 50rpx;
			}

			.user-content {
				height: 110rpx;
				display: flex;
				flex-direction: column;
				flex: 1;
				justify-content: center;

				.user-name {
					display: flex;
					align-items: center;
					color: #383838;
					font-size: 36rpx;

					.user-name-label {
						width: 134rpx;
						height: 40rpx;
						margin-left: 15rpx;
					}


				}

				.user-phone {
					color: #929292;
					font-size: 30rpx;
					margin-top: 6rpx;
				}

			}

		}

	}
</style>