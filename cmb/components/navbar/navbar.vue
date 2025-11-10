<template>
	<view>
		<!--    撑开元素 占位符-->
		<div v-if="placeholder" :style="{width:'100%',height:`${navBarHeight+statusBarHeight}px`}"></div>
		<div class="nav"
			:style="{backgroundColor:bgColor,backgroundImage:bgImage,opacity: opacity,height:`${navBarHeight+statusBarHeight}px`}">
			<!--      导航栏-->
			<div class="nav-bar"
				:style="{paddingTop:`${statusBarHeight}px`,height: `${navBarHeight+statusBarHeight}px`,justifyContent:justifyContent, paddingLeft:justifyContent!=='center'?'88rpx':0}">
				<div :style="{height: `${navBarHeight}px`}" v-if="showBack" class="nav-back">
					<image class="nav-back-icon" :src="leftIcon" @click="goBack" alt="">
				</div>
				<div :style="{color:titleColor}" class="nav-title" v-text="title"></div>
				<slot></slot>
				<view class="nav-right">
					<!-- ai按钮 -->
					<image @click="goCustomer" v-if="aiBtn" class="nav-icon" :src="aiBtnIcon"></image>
					<!-- 客服按钮 -->
					<image @click="goService" v-if="serviceBtn" class="nav-icon" :src="serviceBtnIcon"></image>
					<!-- 更多按钮 -->
					<!-- <image v-if="moreBtn" class="nav-icon" :src="moreBtnIcon"></image> -->
					<zb-popover  v-if="moreBtn" placement="bottom-end" :options="actions" theme="dark" ref="Popover1"
						@handleClick="handleClick" @select="selectPopover" class="item-popover">
						<image class="nav-icon" :src="moreBtnIcon"></image>
					</zb-popover>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		navigateBack,
		navigateTo,
		switchTab
	} from '@/utils/index.js'
	export default {
		name: "navbar",
		props: {
			actions: {
				type: Array,
				default: () => ([{
						text: '首页',
						icon: '/static/icon/fangzi_bai.png',
						path: '/pages/index/index'
					},
					{
						text: '消息',
						icon: '/static/icon/qipao_bai.png',
						path: '/pages/messageCenter/messageCenter'
					},
				])
			},
			aiBtn: {
				type: Boolean,
				default: false
			},
			aiBtnIcon: {
				type: String,
				default: '/static/icon/icon5.png'
			},
			serviceBtn: {
				type: Boolean,
				default: false
			},
			serviceBtnIcon: {
				type: String,
				default: '/static/icon/customer-black.png'
			},
			moreBtn: {
				type: Boolean,
				default: false
			},
			moreBtnIcon: {
				type: String,
				default: '/static/icon/icon3.png'
			},
			showBack: { // 是否展示左侧返回按钮
				type: Boolean,
				default: true
			},
			title: { // 标题
				type: String,
				default: ''
			},
			bgColor: { // 背景颜色
				type: String,
				default: '#fff'
			},
			bgImage: { // 背景图
				type: String,
				default: ''
			},
			titleColor: { // 文字颜色
				type: String,
				default: '#000000'
			},
			justifyContent: { // 布局
				type: String,
				default: 'center'
			},
			opacity: { // 标题透明度
				type: Number,
				default: 1
			},
			placeholder: { // 是否生产占位符
				type: Boolean,
				default: true
			},
			leftIcon: { // 左侧图标
				type: String,
				default: '/static/icon/back.png'
			}
		},
		data() {
			return {};
		},
		computed: {
			...mapState(['statusBarHeight', 'navBarHeight'])
		},
		onLoad() {

		},
		methods: {
			handleClick(e) {
			},
			selectPopover(e) {
				if (e.path === '/pages/index/index') {
					switchTab({
						url: e.path
					})
					return
				}
				navigateTo({
					url: e.path
				})
			},
			goBack() {
				navigateBack()
			},
			goCustomer() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/kefu.png&serviceBtn=${false}&title=小招-客服门户&gradient=2`
				})
			},
			goService() {
				navigateTo({
					url: `/pages/customer/customer`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: 750rpx auto;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;

		.nav-bar {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			color: #111111;
			font-size: 34rpx;
			box-sizing: border-box;
			position: relative;

			.nav-right {
				width: 750rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				box-sizing: border-box;
				padding-right: 56rpx;
				color: #FFFFFF;
				font-size: 26rpx;
				font-weight: 400;
				position: absolute;

				.nav-icon {
					width: 44rpx;
					height: 44rpx;
					margin-left: 30rpx;
				}


			}

			.nav-back {
				position: absolute;
				left: 34rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50rpx;
				box-sizing: border-box;
				height: 100%;
				z-index: 10;

				.nav-back-icon {
					width: 50rpx;
					height: 50rpx;

				}
			}
		}
	}
</style>