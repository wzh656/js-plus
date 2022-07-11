/*!
 * js_plus.js
 * https://github.com/wzh656/js-plus/
 * Version: 1.0
 * Copyright © 2021 wzh
 * Released under the MIT license
 * https://github.com/wzh656/js-plus/blob/main/LICENSE
 */
(function(){
	/* String */
	if (typeof String != "undefined"){
		
		//String.prototype.padStart 前补位
		if (!String.prototype.padStart){
			String.prototype.padStart = function(targetLength, padString){
				targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
				padString = String( typeof padString !== "undefined" ? padString : " " );
				if (this.length > targetLength){
					return String(this);
				}else{
					targetLength = targetLength - this.length;
					if (targetLength > padString.length){
						padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
					}
					return padString.slice(0, targetLength) + String(this);
				}
			};
		};
		
		//String.prototype.padStart 后补位
		if (!String.prototype.padEnd) {
			String.prototype.padEnd = function(targetLength, padString){
				targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
				padString = String( typeof padString !== "undefined" ? padString: "" );
				if (this.length > targetLength){
					return String(this);
				}else{
					targetLength = targetLength - this.length;
					if (targetLength > padString.length){
						padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
					}
					return String(this) + padString.slice(0, targetLength);
				}
			};
		}

		//String.random 随机字符串
		String.random = function(len, prevent=[]){
			let str = "";
			if ( !(prevent instanceof Array) )
				prevent = Object.keys(prevent)
			
			if (len === undefined){
				do{
					str = Math.random().toString(36).substr(2);
				}while( prevent.some(v => v == str) ) //重复
			}else{
				do{
					while (str.length < len)
						str += Math.random().toString(36).substr(2);
					str = str.slice(0, len)
				}while( prevent.some(v => v == str) ) //重复
			}
			return str;
		};
		
	}
	
	
	/* Number */
	if (typeof Number != "undefined"){
		
		//Number.prototype.padding 小数点前后补位
		Number.prototype.padding = function(start, end){
			var part = String(this).split(".");
			var symbol = "";
			if (isNaN( +part[0].charAt(0) )){
				symbol = part[0].charAt(0);
				part[0] = part[0].slice(1);
			}
			while (part[0].length+symbol.length < start)
				part[0] = "0"+part[0];
			part[1] = part[1] || "";
			while (part[1].length < end)
				part[1] += "0";
			return symbol + part[0] + (part[1] ?"." + part[1] :"");
		};
		
	}
	
	
	/* Math */
	if (typeof Math != "undefined"){
		
		//Math.floor 向下取整 保留小数位数
		const floor = Math.floor;
		Math.floor = function(num=0, accuracy){
			if (accuracy !== undefined) //有范围
				return floor(num * 10**accuracy) / 10**accuracy;
			return floor(num);
		};
		
		//Math.round 四舍五入 保留小数位数
		const round = Math.round;
		Math.round = function(num=0, accuracy){
			if (accuracy !== undefined) //有范围
				return round(num * 10**accuracy) / 10**accuracy;
			return round(num);
		};
		
		//Math.ceil 向上取整 保留小数位数
		const ceil = Math.ceil;
		Math.ceil = function(num=0, accuracy){
			if (accuracy !== undefined) //有范围
				return ceil(num * 10**accuracy) / 10**accuracy;
			return ceil(num);
		};
		
		//Math.random 随机数范围
		const random = Math.random;
		Math.random = function(start=1, end, step){
			if (end !== undefined){ //有end 双参数
				if (step !== undefined) //有范围 三参数
					return Math.floor( random()*(end-start)+start, step );
				return random() * (end - start) + start;
			};
			//start => end 单参数
			return random() * start;
		};
		
		//Math.randomError 随机误差
		Math.randomError = function(r=0.1){
			return Math.random(1-r, 1+r);
		};
		
		//Math.limitRange 限制范围（超出直接返回）
		Math.limitRange = function(num, min, max, step){
			if (num <= min) return min;
			if (num >= max) return max;
			return step? Math.round(num, step): num;
		};
		
		//Math.modRange 限制范围（超出求余）
		Math.modRange = function(num, min, max, step){
			// 范围： [min ,max)
			const range = max - min;
			if (num > max){
				const ret = (num - min) % range + min;
				return step? Math.round(ret, step): ret;
			}
			if (num < min){
				const ret = max - (max - num) % range;
				return step? Math.round(ret, step): ret;
			}
			if (num == max){ //保证不取max
				const ret = min;
				return step? Math.round(ret, step): ret;
			}
			return step? Math.round(num, step): num;
		};
		
		//Math.sum 求和
		Math.sum = function(...num){
			let sum = 0;
			for (const v of num)
				if ( !isNaN(v) )
					sum += v;
			return sum;
		};
		
		//Math.avg 求平均值
		Math.avg = function(...num){
			return Math.sum(...num) / (num.filter(v => !isNaN(v)).length || 1);
		};
		
		const degToRad = Math.PI/180,
			radToDeg = 180/Math.PI;
		
		// Math.rad 角度转弧度
		Math.rad = function(deg){
			return deg * degToRad;
		};
		
		// Math.deg 弧度转角度
		Math.deg = function(rad){
			return rad * radToDeg;
		};
	}
	
	
	/* Object */
	if (typeof Object != "undefined"){
		
		//Object.map map遍历Object
		Object.map = function(object, f=v=>v){
			const obj = {};
			for (const [i,v] of Object.entries(object))
				obj[i] = f(v, i, object);
			return obj;
		};
		
		//Object.some some遍历Object
		Object.some = function(object, f=v=>v){
			const obj = {};
			for (const [i,v] of Object.entries(object))
				if ( f(v, i, object) )
					return true;
			return false;
		};
		
		//Object.every every遍历Object
		Object.every = function(object, f=v=>v){
			const obj = {};
			for (const [i,v] of Object.entries(object))
				if ( !f(v, i, object) )
					return false;
			return true;
		};
		
		//对每个项目进行与and(&&)操作
		Object.and = function(obj1={}, obj2={}, index=obj2){
			for (const [i,v] of Object.entries(index))
				obj1[i] = obj1[i] && obj2[i];
			return obj1;
		}
		
		//对每个项目进行或or(||)操作
		Object.or = function(obj1={}, obj2={}, index=obj2){
			for (const [i,v] of Object.entries(index))
				obj1[i] = obj1[i] || obj2[i];
			return obj1;
		}
		
	}
	
	
	/* Array */
	if (typeof Array != "undefined"){
		
		//Array.new 生成任意维数组
		Array.new = function(value, len, ...num){
			if (num.length == 0){ //递归结束
				if (value instanceof Function){ //函数
					if (typeof len == "object"){ //长度为数组
						const arr = [];
						for (const i of Array.range(...len))
							arr[i] = value();
						return arr;
					}else{
						return Array.from({ //长度为值
							length: len
						}, value);
					}
					
				}else{ //数值
					if (typeof len == "object"){ //长度为数组
						const arr = [];
						for (const i of Array.range(...len))
							arr[i] = value;
						return arr;
					}else{
						return Array.from({
							length: len
						}, ()=>value);
					}
					
				}
				
			}else{ //下一轮递归
				if (typeof len == "object"){ //长度为数组
					const arr = [];
					for (const i of Array.range(...len))
						arr[i] = Array.new(value, ...num);
					return arr;
				}else{
					return new Array(len).fill( Array.new(value, ...num) );
				}
			}
		};
		
		//Array.range 生成范围数组[start, end)
		Array.range = function(start, end, step=1){
			if (end === undefined) //单参数
				[start, end] = [0, start];
			
			return Array.from({
				length: Math.ceil( (end - start) / step )
			}, (_, i) => start + i * step);
		};
		
		//Array.random 生成随机数组
		Array.random = function(length, start, end, step){
			return Array.from({
				length
			}, () => Math.random(start, end, step));
		};
		
		//Array.prototype.sum 求和
		Array.prototype.sum = function(){
			return Math.sum(...this);
		}
		
		//Array.prototype.avg 求平均数
		Array.prototype.avg = function(){
			return Math.avg(...this);
		}
		
		//Array.prototype.min 求最小值
		Array.prototype.min = function(){
			return Math.min(...this);
		}
		
		//Array.prototype.max 求最大值
		Array.prototype.max = function(){
			return Math.max(...this);
		}
		
		//Array.prototype.randomSelect 按概率随机选择
		Array.prototype.randomSelect = function(probability){
			if (probability){
				const random = Math.random(0, probability.sum());
				let num = 0;
				for (let i=0; i<this.length; i++){
					num += probability[i];
					if (random < num)
						return this[i];
				}
			}else{
				return this[~~(Math.random() * this.length)];
			}
		}
		
	}
	
	
	/* Date */
	if (typeof Date != "undefined"){
		
		//Date.prototype.format 格式化日期
		Date.prototype.format = function(fmt){
			const o = {
				"y+": this.getFullYear(),					//年
				"M+": this.getMonth()+1,					//月
				"d+": this.getDate(),						//日
				"h+": this.getHours(),						//时
				"m+": this.getMinutes(),					//分
				"s+": this.getSeconds(),					//秒
				"q+": Math.floor((this.getMonth()+3)/3),	//季度
				"S": this.getMilliseconds()					//毫秒
			};
			/* if ( /(y+)/.test(fmt) )
				fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); */
			for (const [i,v] of Object.entries(o))
				if ( new RegExp("("+ i +")").test(fmt) )
					fmt = fmt.replace(RegExp.$1, (v+"").padStart(RegExp.$1.length, "0")); //(RegExp.$1.length==1)? v: ("00"+ v).substr((""+ v).length)
			return fmt;
		};
		
	}
	
	
	/* location */
	if (typeof location != "undefined"){
		
		//location.getQueryString 获取url queryString
		location.getQueryString = function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = location.search.substr(1).match(reg);
			if(r!=null) return decodeURIComponent(r[2]);
		};
		
	}
	
	
	/* URL */
	if (typeof URL != "undefined"){

		//URL.image2base64 图片url 转 base64链接
		URL.image2base64 = function(url, type="image/png"){
			return new Promise((resolve, reject)=>{
				const img = new Image();
				img.onload = function(){
					const canvas = document.createElement("canvas");
					canvas.width = this.naturalWidth,
					canvas.height = this.naturalHeight;
					canvas.getContext("2d").drawImage(this, 0, 0); //将图片插入画布并开始绘制
					resolve( canvas.toDataURL(type) );
				};
				img.onerror = reject; //图片加载失败的错误处理	
				img.setAttribute("crossOrigin", "Anonymous"); //CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
				img.src = url;
			});
		};
		
		//URL.blob2url blob 转 临时url链接
		URL.blob2url = function(blob){
			return URL.createObjectURL(blob);
		};
		
		//URL.blob2base64 blob 转 base64链接
		URL.blob2base64 = function(blob){
			return new Promise((resolve, reject) => {
				const fileReader = new FileReader();
				fileReader.onload = (e)=>{
					resolve( e.target.result );
				};
				fileReader.onerror = reject;
				fileReader.readAsDataURL(blob); //readAsDataURL
			});
		};
		
		//URL.base64ToBlob base64链接 转 blob
		URL.base64ToBlob = function(url){
			let arr = url.split(','),
				mime = arr[0].match(/:(.*?);/)[1], //mime类型
				bstr = atob(arr[1]), //base64字符串
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--)
				u8arr[n] = bstr.charCodeAt(n);
			return new Blob([u8arr], {type: mime});
		};
		
	}
	
	
	/* navigator */
	if (typeof navigator != "undefined"){
		
		//navigator.device 判断手机电脑
		if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
				navigator.userAgent.toLowerCase()
			)
		){ //手机(-)
			if ( navigator.userAgent.toLowerCase().indexOf("html5plus") != -1 ){ //html5+
				navigator.device = -2;
			}else{ //浏览器
				navigator.device = -1;
			}
			
		}else{ //电脑(+)
			if (typeof require != "undefined"){ //electron
				navigator.device = +2;
			}else{ //浏览器
				navigator.device = +1;
			}
		}
		
	}
	
	
	/* 全局对象 */
	if (typeof gloalThis == "undefined"){
		
		gloalThis = (typeof window !== "undefined"? window
			: (typeof process === "object" &&
				typeof require === "function" &&
				typeof global === "object")? global
			: this);
		
	}
	
	/* OR 取有效默认值 */
	gloalThis.OR = function(...values){
		for (const v of values)
			if (v !== undefined && v !== null)
				return v;
		return values[values.length-1];
	};
	
	/* NEAR 判断实数是否接近 */
	gloalThis.NEAR = function(a, b, r=1e-8){
		if (Math.abs(a-b) >= r) //超过范围
			return false;
		return true;
	};
	
})();
