# js+ (js-plus)

js+ 是一个js的拓展库，根据实践经验在原生js的基础上添加、重写了一些函数，并借鉴了一些其他语言的函数，使得编程更加便捷。

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

+ 字符串(String)
    + `String.prototype.padStart(targetLength, padString)`
        字符串前补位（ES6）
    + `String.prototype.padStart(targetLength, padString)`
        字符串后补位（ES6）
    + `String.random(len, prevent=[])`
        随机字符串：生成不包含`prevent`的长度为`len`的随机字符串

+ 数(Number)
    + `Number.prototype.padding(start, end)`
        小数点前后补位：补全至小数点前`start`位，后`end`位

+ 数学(Math)
    + `Math.floor(num=0, accuracy)`
        函数重写：将`num`向下取整到`10^(-accuracy)`精度
    + `Math.round(num=0, accuracy)`
        函数重写：将`num`四舍五入到`10^(-accuracy)`精度
    + `Math.ceil(num=0, accuracy)`
        函数重写：将`num`向上取整到`10^(-accuracy)`精度
    + `Math.random(start=1, end, step)`
        函数重写：生成范围在`[start, end)`内，步长为`10^(-step)`的随机数
    + `Math.randomError(r=0.1)`
        随机误差：生成范围在`1-r`到`1+r`内的随机数
    + `Math.limitRange(num, min, max, step)`
        范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于取`max`，小于取`min`）
    + `Math.modRange(num, min, max, step)`
        取余范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于则减，小于则加，直至在范围内）
    + `Math.sum(...num)`
        求和：将输入参数相加（除去`NaN`）
    + `Math.avg(...num)`
        求平均值：将输入参数相加并除以总数量（除去`NaN`）
    + `Math.rad(deg)`
        转弧度：将`deg`角度转为弧度
    + `Math.deg(rad)`
        转角度：将`rad`弧度转为角度

+ 对象(Object)
    + `Object.map(object, f=(v, i, object)=>v)`
        类似`Array.map`：用函数`f(v, i, object)`遍历`object`对象
    + `Object.some(object, f=(v, i, object)=>v)`
        类似`Array.some`：用函数`f(v, i, object)`遍历`object`对象，若函数`f`返回`true`则停止并返回`true`，否则返回`false`
    + `Object.every(object, f=(v, i, object)=>v)`
        类似`Array.every`：用函数`f(v, i, object)`遍历`object`对象，若函数`f`返回`false`则停止并返回`false`，否则返回`true`
    + `Object.and(obj1={}, obj2={}, index=obj2)`
        对象与操作：以`index`的键值为基准对`obj1`和`obj2`每个项目进行与(&&)操作
    + `Object.or(obj1={}, obj2={}, index=obj2)`
        对象或操作：以`index`的键值为基准对`obj1`和`obj2`每个项目进行或(||)操作 （可用于设置默认值）

+ 数组(Array)
    + `Array.new(value, ...len)`
		生成任意维度数组：即生成`len[0]*len[1]*…`的数组，并用`value`（可为函数）填充每一项
    + `Array.range(start, end, step=1)`
        生成范围在`[start, end)`内，步长为`10^(-step)`的数组 （仿`python`的`range`函数）
    + `Array.random(length, start, end, step)`
        生成长度为`length`并用`Math.random(start, end, step)`填充的数组 （仿`python`的`numpy.random`函数）
    + `Array.prototype.sum()`
        元素求和：对自身进行`Math.sum(...this)`
    + `Array.prototype.avg()`
        元素求平均值：对自身进行`Math.avg(...this)`
    + `Array.prototype.min()`
        元素取最小值：对自身进行`Math.min(...this)`
    + `Array.prototype.max()`
        元素取最大值：对自身进行`Math.max(...this)`
    + `Array.prototype.randomSelect(probability)`
        按概率随机选择：随机选择自身的一个元素，如有`probability`则第`i`项被选择的概率为`probability[i]`

+ 日期与时间(Date)
    + `Date.prototype.format(fmt)`
        日期格式化：`yyyy`年，`MM`月，`dd`日，`q`季度，`hh`时，`mm`分，`ss`秒，`SS`毫秒 （摘自网络）

+ 网址(location)
    + `location.getQueryString(name)`
        获取网址中的`GET`参数 （摘自网络）

+ 数据操作(URL)
    + `URL.image2base64(url, type="image/png")`
        图片url 转 base64链接（返回`Promise`）
    + `URL.blob2url(blob)`
        blob 转 临时url链接
    + `URL.blob2base64(blob)`
        blob 转 base64链接（返回`Promise`）
    + `URL.base64ToBlob(url)`
        base64链接 转 blob

+ 全局对象(gloalThis)
	表示当前的全局对象：浏览器环境返回`Window`，`node.js`环境返回`global`，否则返回`this`
	+ `OR(...values)`
		取有效默认值：在`values`中找到第一个真值（除`undefined`和`null`外的值），用于代替`||`运算符，相当于使用`??`运算符
	+ `NEAR(a, b, r=1e-8)`
		判断实数是否接近：比较`a`和`b`的大小是否超过精度`r` （常用于比较实数/小数是否相等）
