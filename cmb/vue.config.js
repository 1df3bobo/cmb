// 导入fs模块
const fs = require('fs')
const manifestPath = `${__dirname}/manifest.json`
let Manifest = fs.readFileSync(manifestPath, {
	encoding: 'utf-8'
})

function replaceManifest(path, value) {
	const arr = path.split('.')
	const len = arr.length
	const lastItem = arr[len - 1]

	let i = 0
	let ManifestArr = Manifest.split(/\n/)

	for (let index = 0; index < ManifestArr.length; index++) {
		const item = ManifestArr[index]
		if (new RegExp(`"${arr[i]}"`).test(item)) ++i
		if (i === len) {
			const hasComma = /,/.test(item)
			ManifestArr[index] = item.replace(
				new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
				`"${lastItem}": ${value}${hasComma ? ',' : ''}`
			)
			break
		}
	}

	Manifest = ManifestArr.join('\n')
}
fs.writeFileSync(manifestPath, Manifest, {
	flag: 'w'
})
module.exports = {
	chainWebpack: config => {
		config
			.plugin('define')
	},
	devServer: {
    proxy: {
      '/api': {
        target: 'http://api.chinajianse.com', // 你要请求的目标服务器地址
        changeOrigin: true, // 是否改变源
        secure: false, // 是否允许跨协议
        pathRewrite: {
          '^/api': '' // 重写路径，去掉 /api 部分
        }
      }
    }
  }
}