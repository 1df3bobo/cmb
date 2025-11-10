<template>
	<view>
		<navbar :service-btn="false" showBack bg-color="#f8f8f8">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:'#111111'}">
					<view class="search">
						<input v-model="value" class="search-input" type="text" placeholder="流水打印" />
						<image class="nav-search-icon" src="/static/icon/yuyin.png"></image>
						<view class="search-btn">搜索</view>
					</view>
				</view>
			</slot>
		</navbar>
		<view class="pages" v-if="resultContent">
			<view class="content" @click="go">

			</view>
			<image class="pages-image" :src="resultContent.image" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo
	} from '../../../utils'
	export default {
		data() {
			return {
				value: '',
				resultContent: null
			}
		},
		onLoad(op) {
			if (op.value) {
				let value = op.value
				this.value = value
				let resultContent = null
				if (value.includes("转账")) {
					resultContent = {
						path: '/pages/transfer/index/index',
						image: '/static/pages/search-zz.png'
					}
				}
				if (value.includes("收支")) {
					resultContent = {
						path: '/pages/bill/bill',
						image: '/static/pages/search-sz.png'
					}
				}
				if (value.includes("流水")) {
					resultContent = {
						path: '/pages/water/water/water',
						image: '/static/pages/search-ls.png'
					}
				}
				this.resultContent = resultContent
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		methods: {
			go() {
				navigateTo({
					url: this.resultContent.path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.pages {
		width: 750rpx;
		height: auto;
		position: relative;

		.content {
			width: 100%;
			position: absolute;
			top: 200rpx;
			left: 0;
			height: 300rpx;

			z-index: 10;
		}

		.pages-image {
			width: 750rpx;
		}
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		color: #FFFFFF;
		font-weight: 400;
		position: absolute;
		padding-right: 27rpx;
		padding-left: 80rpx;
		box-sizing: border-box;


		.search {
			flex: 1;
			height: 74rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			border: 2rpx solid #E84A55;
			color: #111;
			padding-right: 7rpx;
			font-size: 26rpx;
			box-sizing: border-box;

			.search-input {
				flex: 1;
				font-size: 26rpx;
			}

			.search-btn {
				width: 98rpx;
				height: 60rpx;
				background: #FFE1E1;
				border-radius: 30rpx 30rpx 30rpx 30rpx;
				text-align: center;
				line-height: 60rpx;
				color: #E84A55;
				margin-left: 10rpx;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}


	}
</style>