# About
页面暂存JS库，极简的一句话，即可给你的表单赋予暂存功能

# Home Page
http://leochan2017.github.io/jQueryZeptoLocalStorage

# Started
1. 引入jQuery 或者 zepto
2. 引入jQueryZeptoLocalStorage.js

# Example
<pre>
$('#youForm').initLocalStorage();
</pre>
or
<pre>
$('#youForm').initLocalStorage({
	storageNamePerfix: 'leo',
	storageEvents: ['change', 'input'],
	loadCallback: function() {
		// do something
	},
	saveCallback: function() {
		// do something
	},
	removeCallback: function() {
		// do something
	},
	debug: true
});
</pre>

# DEMO
http://www.leojs.com/demo/jQueryZeptoLocalStorage/demo2.html

# API
| 参数 | 类型 | 说明 |
|:-------------:|:-------------|:-------------|
| storageNamePerfix | String	| 暂存的前缀, 默认为当前URL+元素名字+@ |
| storageEvents		| Array		| 触发暂存保存的事件 |
| loadCallback		| Function	| 暂存加载完毕回调 |
| saveCallback		| Function	| 暂存保存完毕回调 |
| removeCallback	| Function	| 暂存删除完毕回调 |

# Global API
<pre>
// 全局函数，调用时清空localStorage
window.removeLocalStorage();
</pre>