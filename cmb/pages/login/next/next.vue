<template>
	<view>
		<navbar ai-btn></navbar>
		<view class="main">
			<view class="title">尊敬的用户，中午好</view>
			<view class="phone">请输入用户{{showPhoneNo(username)}}的密码</view>
			<view class="input">
				<input placeholder="请输入密码" placeholder-class="placeholder" v-model="password" />
			</view>
			<view :class="['btn',password?'active':'']" @click="login">登录</view>
			<view class="tips">
				快速找回密码
			</view>
		</view>
	</view>
</template>

<script>
	import {
		showPhoneNo,
		redirectTo,
		switchTab,
		reLaunch
	} from '@/utils/index.js'
	import toast from '../../../utils/toast'
	import {
		login
	} from '@/api/index.js'
	import {
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				username: '',
				showPhoneNo: showPhoneNo,
				password: '',
				path: ''
			}
		},
		onLoad(options) {
			if (options.username) {
				this.username = options.username
			}
			if (options.path) {
				this.path = decodeURIComponent(options.path)
			}
		},
		methods: {
			...mapMutations(['change_login_state', 'init_token']),
			...mapActions(['get_user_info']),
			login() {
				if (!this.password) return
				login({
					username: this.username,
					password: this.password,
				}).then(res => {
					if (res.code === 200) {
						this.init_token({
							token: res.data.access_token
						})
						this.change_login_state({
							state: true
						})
						this.get_user_info().then(() => {
							reLaunch({
								url: '/' + this.path,
								fail: () => {
									switchTab({
										url: '/' + this.path,
									})
								}
							});
						})
					} else {
						toast.msgBox(res.msg)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 100%;
		padding-top: 92rpx;

		.title {
			padding: 0 50rpx;
			box-sizing: border-box;
			color: #000000;
			font-size: 60rpx;
			font-weight: bold;
		}

		.input {
			width: 680rpx;
			margin: 170rpx auto 107rpx;
			padding: 22rpx 10rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #D9D9D9;
			color: #333333;
			font-size: 38rpx;
		}

		.phone {
			padding: 0 50rpx;
			box-sizing: border-box;
			color: #5C5C5C;
			font-size: 36rpx;
			margin-top: 31rpx;
		}

		.placeholder {
			color: #727272;
		}

		.btn {
			width: 264rpx;
			height: 86rpx;
			background: #E74A55;
			border-radius: 43rpx;
			margin: auto;
			text-align: center;
			line-height: 86rpx;
			color: #fff;
			font-size: 32rpx;
			opacity: 0.5;

			&.active {
				opacity: 1;
			}
		}

		.tips {
			color: #565656;
			font-size: 26rpx;
			text-align: center;
			margin-top: 55rpx;
		}
	}
</style>