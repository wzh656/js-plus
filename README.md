# js+ (js-plus)

js+ 是一个js的拓展库，根据实践经验在原生js的基础上添加、重写了一些函数，并借鉴了一些其他语言的函数，使得编程更加便捷。（部分函数改编自网络）

## 运行(Run)

> 建议先clone至本地再引用

+ script标签引用：
	```html
	<script src="./js-plus/src/js_plus.min.js"></script>
	```
+ node.js require
	```javascript
	require("./js-plus/src/js_plus");
	```

## 函数列表(Functions)

> 本文档中尖括号（<>）内表示参数或返回值类型  
> Tip: <Any> 代表任意类型，<Array Number[]> 代表数字类型的数组

+ 字符串(String)
	+ `<String> String.prototype.padStart(<Number>targetLength, <Number>padString)`  
	    字符串前补位（ES6+）
	+ `<String> String.prototype.padEnd(<Number>targetLength, <Number>padString)`  
	    字符串后补位（ES6+）
	+ `<String> String.random(<Number>len, <Array String[]>prevent=[])`  
	    随机字符串：生成不包含`prevent`（通常是已生成的随机字符串）的长度为`len`的随机字符串

+ 数(Number)
	+ `<String> Number.prototype.padding(<Number>start, <Number>end)`  
	    小数点前后补位：补全至小数点前`start`位，后`end`位

+ 数学(Math)
	+ `<Number> Math.floor(<Number>num=0, <Number>accuracy)`  
	    函数重写：将`num`向下取整到`10^(-accuracy)`精度
	+ `<Number> Math.round(<Number>num=0, <Number>accuracy)`  
	    函数重写：将`num`四舍五入到`10^(-accuracy)`精度
	+ `<Number> Math.ceil(<Number>num=0, <Number>accuracy)`  
	    函数重写：将`num`向上取整到`10^(-accuracy)`精度
	+ `<Number> Math.random(<Number>start=1, <Number>end, <Number>step)`  
	    函数重写：生成范围在`[start, end)`内，步长为`10^(-step)`的随机数
	+ `<Number> Math.randomError(<Number>range=0.1, <Number>center=0)`  
	    随机误差：生成范围在`center-range`到`center+range`内的随机数
	+ `<Number> Math.randomND(<Number>mean=0, <Number>stdev=1)`  
	    随机取样：生成均值为`mean`，标准差为`stdev`的随机正态取样
	+ `<Number> Math.limitRange(<Number>num, <Number>min, <Number>max, <Number>step)`  
	    范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于取`max`，小于取`min`）
	+ `<Number> Math.modRange(<Number>num, <Number>min, <Number>max, <Number>step)`  
	    取余范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于则减，小于则加，直至在范围内）
	+ `<Number> Math.sum(...<Number>num)`  
	    求和：将输入参数相加（自动除去`NaN`）
	+ `<Number> Math.avg(...<Number>num)`  
	    求平均值：将输入参数相加并除以总数量（自动除去`NaN`）
	+ `<Number> Math.toRad(<Number>deg)`  
	    转弧度：将`deg`角度转为弧度
	+ `<Number> Math.toDeg(<Number>rad)`  
	    转角度：将`rad`弧度转为角度

+ 对象(Object)
	+ `<Object> Object.map(<Object>object, <Function>f=(v, i, object)=>v)`  
	    类似`Array.map`：用函数`f(v, i, object)`遍历`object`对象
	+ `<Object> Object.some(<Object>object, <Function>f=(v, i, object)=>v)`  
	    类似`Array.some`：用函数`f(v, i, object)`遍历`object`对象，若函数`f`返回`true`则停止并返回`true`，否则返回`false`
	+ `<Object> Object.every(<Object>object, <Function>f=(v, i, object)=>v)`  
	    类似`Array.every`：用函数`f(v, i, object)`遍历`object`对象，若函数`f`返回`false`则停止并返回`false`，否则返回`true`
	+ `<Object> Object.and(<Object>obj1={}, <Object>obj2={}, <Object>index=obj2)`  
	    对象与操作：以`index`的键值为基准对`obj1`和`obj2`每个项目进行与(&&)操作
	+ `<Object> Object.or(<Object>obj1={}, <Object>obj2={}, <Object>index=obj2)`  
	    对象或操作：以`index`的键值为基准对`obj1`和`obj2`每个项目进行或(||)操作 （可用于设置默认值）

+ 数组(Array)
	+ `<Array Any[]> Array.new(<Any>value, ...<Array Number[]>len)`  
		生成任意维度数组：即生成`len[0]*len[1]*…*len[n]`的n维数组，并用`value`（可为函数）填充每一项
	+ `<Array Number[]> Array.range(<Number>start, <Number>end, <Number>step=1)`  
	    生成范围在`[start, end)`内，步长为`10^(-step)`的数组 （仿`python`的`range`函数）
	+ `<Array Number[]> Array.random(<Number>length, <Number>start, <Number>end, <Number>step)`  
	    生成长度为`length`并用`Math.random(<Number>start, <Number>end, <Number>step)`填充的数组 （仿`python`的`numpy.random`函数）
	+ `<Number> Array.prototype.sum()`  
	    元素求和：对自身进行`Math.sum(...this)`
	+ `<Number> Array.prototype.avg()`  
	    元素求平均值：对自身进行`Math.avg(...this)`
	+ `<Number> Array.prototype.min()`  
	    元素取最小值：对自身进行`Math.min(...this)`
	+ `<Number> Array.prototype.max()`  
	    元素取最大值：对自身进行`Math.max(...this)`
	+ `<Bool> Array.prototype.include(<Any>item)`
	    是否包括某项：查找自身是否包括某项
	+ `<Any> Array.prototype.randomSelect(<Array Number[]>probability)`  
	    按概率随机选择：随机选择自身的一个元素，如有`probability`则第`i`项被选择的概率为`probability[i]`
	+ `<Array> Array.prototype.shuffle()`  
	    打乱数组：将数组原地打乱

+ 日期与时间(Date)
	+ `<String> Date.prototype.format(<String>fmt)`  
	    日期格式化：`yyyy`年，`MM`月，`dd`日，`q`季度，`hh`时，`mm`分，`ss`秒，`SS`毫秒

+ 网址(location)
	+ `<String> location.getQueryString(<String>name)`  
	    获取网址`GET`参数中`name`对应的值

+ 数据操作(URL)
	+ `<Promise String> URL.image2base64(url, type="image/png")`  
	    图片url 转 base64链接（返回`Promise`）
	+ `<String> URL.blob2url(<Blob>blob)`  
	    blob 转 临时url链接
	+ `<String> URL.blob2base64(<Blob>blob)`  
	    blob 转 base64链接（返回`Promise`）
	+ `<Blob> URL.base64ToBlob(<String>url)`  
	    base64链接 转 blob

+ 设备(navigator)
	+ `<Number> navigator.device`  
		设备环境属性代码：`-2`代表移动端`html5plus`环境，`-1`代表移动端其他环境，`2`代表桌面端`Electron`环境，`1`代表桌面端其他环境

+ 调试(console)
	+ `<Void> console.time(<String>name, <Function>func)`  
		函数重写：调试中对函数运行时间计时（计时自动结束）

+ 全局对象(gloalThis)
	+ `<Object> gloalThis`  
		表示当前的全局对象（ES6+）：浏览器环境返回`Window`，`node.js`环境返回`global`，否则返回`this`
	+ `<Any> OR(...<Any>values)`  
		取有效默认值：在`values`中找到第一个有效真值（除`undefined`和`null`外的值），用于代替`||`运算符，相当于使用`??`运算符（ES6+）
	+ `<Any> ATTR(<Object>obj, ...<String>attrNames)`
		取有效属性：返回`obj[attrName1][attrName2]...`，若不存在则返回`undefined`,相当于使用`?.`运算符（ES6+）
	+ `<Bool> NEAR(<Number>a, <Number>b, <Number>r=1e-8)`  
		判断实数是否接近：比较`a`和`b`的大小是否超过精度`r` （常用于比较实数/小数是否相等）
