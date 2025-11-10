<template>
	<view>
		<view class="nav-pl" :style="{height:statusBarHeight+'px',width:'750rpx'}"></view>
		<view :style="{height:statusBarHeight+'px',width:'750rpx'}"></view>
		<scroll-view class="app" :style="{height:`calc(100vh - ${statusBarHeight}px)`}" scroll-y
			:scroll-into-view="scrollIntoView">
			<view class="main">
				<view class="index-list">
					<view :class="['index-item',(isEnlarged&&item.letter === scrollIntoView)?'enlarge ':'']"
						@click="change(item)" v-for="(item,index) in groupedNames" :key="index">
						{{item.letter}}
					</view>
				</view>
				<view class="hot">
					<view class="title">热门银行</view>
					<view class="hot-list">
						<view class="item" v-for="(item,index) in hotList" :key="index" @click="select(item)">
							<image class="bank-icon" :src="item.icon" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="bank-list">
					<view class="bank" v-for="(item,index) in groupedNames" :key="index">
						<view class="title" :id="item.letter">{{item.letter}}</view>
						<view class="bank-item" v-for="(el,i) in item.names" :key="i" @click="select(el)">
							<image class="bank-item-icon" :src="el.icon" mode=""></image>
							<text>{{el.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="tips" v-show="isEnlarged">
			{{scrollIntoView}}
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getBankList
	} from '@/api/index.js'
	import {
		navigateBack,
		redirectTo
	} from '@/utils/index.js'
	import pinyin from 'pinyin';
	export default {
		data() {
			return {
				bankList: [],
				hotList: [],
				groupedNames: [],
				scrollIntoView: '',
				isEnlarged: false, // 控制文字是否放大
			}
		},
		onLoad() {
			this.getBankList()
		},
		computed: {
			...mapState(['statusBarHeight']),
		},
		methods: {
			...mapMutations(['change_select_bank_info']),
			change(item) {
				this.scrollIntoView = item.letter
				// 点击时添加放大效果
				this.isEnlarged = true;

				// 1秒后恢复原大小
				setTimeout(() => {
					this.isEnlarged = false;
				}, 1000);
			},
			select(el) {
				this.change_select_bank_info({
					selectBankInfo: el
				})
				navigateBack()
			},
			getBankList() {
				getBankList().then((res) => {
					if (res.code === 200) {
						this.bankList = res.data.bankList
						this.hotList = res.data.hotList
						this.groupByFirstLetter(res.data.bankList);
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
		height: 100vh;
	}

	.nav-pl {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #ffffff;
		z-index: 100;
	}

	.tips {
		width: 150rpx;
		height: 150rpx;
		border-radius: 120rpx;
		background-color: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 56rpx;
		font-weight: 700;
	}

	.enlarge {
		font-size: 28rpx;
		color: #111111;
	}

	.main {
		width: 750rpx;

		.title {
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 24rpx;
			font-size: 24rpx;
			color: #333;
			background: #F1F4F9;
		}

		.index-list {
			position: fixed;
			right: 10rpx;
			top: 200rpx;
			color: #999;
			font-size: 24rpx;

			.index-item {
				height: 40rpx;
			}
		}

		.hot-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 50rpx 20rpx 50rpx;
			box-sizing: border-box;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				width: 120rpx;
				text-align: center;
				margin-right: 30rpx;
				color: #333;
				margin-bottom: 40rpx;

				&:nth-child(4n) {
					margin-right: 0;
				}

				.bank-icon {
					width: 78rpx;
					height: 78rpx;
					margin-bottom: 16rpx;
				}

			}
		}

		.bank-list {
			width: 100%;

			.bank {
				width: 100%;

				.bank-item {
					width: 100%;
					height: 126rpx;
					border-bottom: 1rpx solid #f2f2f2;
					display: flex;
					align-items: center;
					padding: 0 32rpx;
					box-sizing: border-box;
					font-size: 30rpx;

					.bank-item-icon {
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>