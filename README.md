# js+ (js-plus)

js+ 是一个js的拓展库，根据实践经验在原生js的基础上添加、重写了一些函数，并借鉴了一些其他语言的函数，使得编程更加便捷。

## 运行(Run)

> 建议先clone至本地再引用

+ script标签引用：
    ```html
    <script src="https://wzh656.github.io/js-plus/src/js_plus.min.js"></script>
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
        随机字符串：生成除`prevent`外长度为`len`的随机字符串

+ 数(Number)
    + `Number.prototype.padding(start, end)`
        小数点前后补位：补全至小数点前`start`位，后`end`位

+ 数学(Math)
    + `Math.round(num=0, accuracy)`
        函数重写：将`num`四舍五入到`10^(-accuracy)`精度
    + `Math.random(start=1, end, step)`
        函数重写：生成范围在`[start, end)`内，步长为`10^(-step)`的随机数
    + `Math.limitRange(num, min, max, step)`
        范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于取`max`，小于取`min`）
    + `Math.modRange(num, min, max, step)`
        取余范围限制：将`num`限制在`[min, max)`内，步长为`10^(-step)`（大于则减，小于则加，直至在范围内）
    + `Math.sum(...num)`
        求和：将输入参数相加（除去`NaN`）
    + `Math.avg(...num)`
        求平均值：将输入参数相加并除以总数量（除去`NaN`）

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
    + `Array.range(start, end, step=1)`
        生成范围在`[start, end)`内，步长为`10^(-step)`的数组 （仿`python`的`range`函数）
    + `Array.random(length, start, end, step)`
        生成长度为`length`并用`Math.random(start, end, step)`填充的数组 （仿`python`的`numpy.random`函数）
    + `Array.prototype.sum()`
        自身求和：对自身进行`Math.sum(...this)`
    + `Array.prototype.avg()`
        自身求平均值：对自身进行`Math.avg(...this)`

+ 日期与时间(Date)
    + `Date.prototype.format(fmt)`
        日期格式化：`yyyy`年，`MM`月，`dd`日，`q`季度，`hh`时，`mm`分，`ss`秒，`SS`毫秒 （摘自网络）

+ 网址(location)
    + `location.getQueryString(name)`
        获取网址中的`GET`参数 （摘自网络）
