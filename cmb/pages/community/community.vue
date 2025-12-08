<template>
	<view class="app">
		<view class="header">
			<view class="user-info" @click="goSet">
				<image class="user-info-header" src="/static/icon/header-icon.png" mode=""></image>
				<text>{{ replaceWithAsterisks }}</text>
			</view>
			<view class="search" @click="goSearch">

			</view>
		</view>
		<view class="pages">

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

			}
		},
    computed: {
			...mapState(['userInfo']),
			replaceWithAsterisks() {
				let realName = this.userInfo.realName
				if (!realName) return
				if (realName.length <= 1) {
					return realName;
				}
				return realName.slice(0, -1).replace(/./g, '*') + realName.slice(-1);
			}
		},
		methods: {
			goSearch() {
				navigateTo({
					url: `/pages/search/search`
				})
			},
      goSet() {
				navigateTo({
					url: `/pages/my/set/set`
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		position: relative;
		padding-top: 253rpx;
	}

	.header {
		width: 750rpx;
		height: 253rpx;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url(/static/pages/community.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 253rpx;
		padding-top: 120rpx;
		padding-left: 30rpx;
		box-sizing: border-box;

		.search {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 30rpx;
			bottom: 100rpx;
		}

		.user-info {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #333;

			.user-info-header {
				width: 50rpx;
				margin-right: 8rpx;
				height: 50rpx;
			}
		}
	}

	.pages {
		width: 750rpx;
		height: 8409rpx;
		background-image: url(/static/pages/community2.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 8409rpx;
	}
</style>