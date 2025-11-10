<template>
	<view class="app">
		<navbar title="选择转账伙伴" title-color="#333333" bg-color="#F8F8F8">
			<slot>
				<view class="nav-content">
					<text>批量删除</text>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="tabs">
				<view @click="changeTab(item)" :class="['tab',tab===item.id?'active':'']" v-for="(item,index) in tabs"
					:key="index">
					{{item.name}}
				</view>
			</view>
			<view class="search">
				<text>银行名/账户/户名/手机号</text>
				<image class="search-icon" src="/static/icon/search@2x.png" mode=""></image>
			</view>
			<view class="add" v-if="tab == 1">
				<text class="add-text">+</text>
				<text>添加新伙伴</text>
			</view>
			<view class="list">
				<view class="item" @click="isMoreList = !isMoreList">
					<image class="user-icon" src="/static/transfer/user-icon.png" mode=""></image>
					<view class="user-name">{{userInfo.realName}}</view>
					<view class="user-num">0</view>
					<image :class="['user-arrow',isMoreList?'user-arrow-acitive':'']" src="/static/icon/arrow-top.png"
						mode="">
					</image>
				</view>
				<view class="contacts-list">
					<view class="contacts-item" v-for="(item,index) in groupedNames" :key="index">
						<view class="title">{{item.letter}}</view>
						<view class="item" v-for="(el,i) in item.names" @click="select(el)">
							<image class="user-icon" :src="el.icon" mode=""></image>
							<view class="contacts-info">
								<view>
									{{el.name}}
								</view>
								<view class="bank-name-text">{{el.bankName}}<text>({{el.bankCard.slice(-4)}})</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="explain">
				<text>说明：</text>
				<text>{{tab == 1?'1、“转出”转账伙伴是您近期转过账的收款账户信息。':'1、“转入转账伙伴是您近期转账的（部分）付款账户信息，您可以通过“左滑”操作删除这些转账伙伴。'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import pinyin from 'pinyin';
	import {
		getContactsList
	} from '@/api/index.js'
	import {
		redirectTo
	} from '../../../utils';
	export default {
		data() {
			return {
				contactsList: [],
				groupedNames: [],
				isMoreList: false,
				tab: '1',
				tabs: [{
					name: '转出',
					id: '1'
				}, {
					name: '转入',
					id: '2'
				}]
			}
		},
		onLoad() {
			this.getContactsList()
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			select(el) {
				redirectTo({
					url: '/pages/transfer/bank/bank?contactsInfoStr=' + JSON.stringify(el)
				})
			},
			changeTab(item) {
				if (this.tab === item.id) return
				this.tab = item.id
			},
			// 获取最近转账伙伴 
			getContactsList() {
				getContactsList().then((res) => {
					if (res.code === 200) {
						this.contactsList = res.data
						this.groupByFirstLetter(res.data);
					}

				})
			},
			// 获取拼音首字母
			getFirstLetter(chinese) {
				if (!chinese) return "";
				// 使用 pinyin 库来获取拼音首字母
				const pinyinArr = pinyin(chinese, {
					style: pinyin.STYLE_FIRST_LETTER, // 获取首字母
					heteronym: false // 只获取标准拼音
				});
				return pinyinArr[0][0].toUpperCase(); // 返回大写字母
			},

			// 按拼音首字母分组
			groupByFirstLetter(arr) {
				const result = {};
				const indexList = []; // 用于存储字母索引

				arr.forEach(item => {
					const name = item.name; // 从每个对象中提取名字字段
					if (name) {
						const firstLetter = this.getFirstLetter(name[0]); // 获取名字的首字母
						if (!result[firstLetter]) {
							result[firstLetter] = [];
							indexList.push(firstLetter); // 添加新字母到索引列表
						}
						result[firstLetter].push(item); // 将对象按首字母分组
					}
				});

				// 按字母排序并返回分组结果
				this.groupedNames = indexList.sort().map(letter => ({
					letter,
					names: result[letter]
				}));
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #F8F8F8;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #333333;
		font-size: 28rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-right: 36rpx;
		}
	}

	.main {
		width: 100%;

		.tabs {
			width: 710rpx;
			height: 68rpx;
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			border: 1rpx solid #707070;
			margin: 60rpx auto 0;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			.tab {
				flex: 1;
				text-align: center;
				line-height: 68rpx;
				color: #565656;
				font-size: 34rpx;

				&.active {
					color: #FFFFFF;
					background: #565656;
					border-radius: 4rpx 4rpx 4rpx 4rpx;
				}
			}
		}

		.search {
			width: 710rpx;
			height: 68rpx;
			background: #FFFFFF;
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			margin: 24rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 111rpx 0 21rpx;
			box-sizing: border-box;
			color: #A1A1A1;
			font-size: 26rpx;

			.search-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.add {
			width: 750rpx;
			height: 92rpx;
			background: #FFFFFF;
			color: #769ADC;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			padding-left: 27rpx;

			.add-text {
				font-weight: 700;
				font-size: 46rpx;
				margin-right: 18rpx;
			}
		}

		.list {
			width: 100%;
			margin-top: 20rpx;

			.title {
				color: #666666;
				font-size: 28rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				margin-top: 40rpx;
				margin-bottom: 9rpx;
				line-height: 1K;
			}

			.item {
				width: 100%;
				display: flex;
				align-items: center;
				height: 128rpx;
				position: relative;
				background-color: #FFFFFF;
				padding: 0 23rpx;
				box-sizing: border-box;

				.user-icon {
					width: 56rpx;
					height: 56rpx;
					margin-right: 20rpx;
				}



				.contacts-info {
					color: #333333;
					font-size: 28rpx;

					.bank-name-text {
						color: #666666;
						font-size: 26rpx;
						margin-top: 8rpx;
					}
				}

				.user-arrow-acitive {
					transform: rotate(180deg)
				}

				.user-name {
					color: #666666;
					font-size: 28rpx;
				}

				.bank-name {
					display: flex;
					flex-direction: column;

					.bank-name-text {
						color: #999999;
						font-size: 22rpx;
						margin-top: 10rpx;
					}
				}

				.user-num {
					width: 40rpx;
					height: 40rpx;
					background: #F7F7F7;
					border-radius: 22rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #666666;
					font-size: 30rpx;
					margin: 0 20rpx;
				}


				.user-arrow {
					width: 50rpx;
					height: 50rpx;
					margin-left: auto;
				}

			}
		}

		.explain {
			margin-top: 42rpx;
			padding: 0 104rpx 0 27rpx;
			box-sizing: border-box;
			color: #999999;
			font-size: 24rpx;
			line-height: 34rpx;
		}
	}
</style>