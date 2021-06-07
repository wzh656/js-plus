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
			if (isNaN( Number(part[0].charAt(0)) )){
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
		
		//Math.round 保留小数位数
		const round = Math.round;
		Math.round = function(num=0, accuracy){
			if (accuracy !== undefined) //有范围
				return round(num * 10**accuracy) / 10**accuracy;
			return round(num);
		};
		
		//Math.random 随机数范围
		const random = Math.random;
		Math.random = function(start=1, end, step){
			if (end !== undefined){ //有end 双参数
				if (step !== undefined) //有范围 三参数
					return Math.round( random()*(end-start)+start, step );
				return random() * (end - start) + start;
			};
			//start => end 单参数
			return random() * start;
		};
		
		//Math.limitRange 限制范围（超出直接返回）
		Math.limitRange = function(num, min, max, step){
			if (num <= min) return min;
			if (num >= max) return max;
			return Math.round(num, step);
		};
		
		//Math.modRange 限制范围（超出求余）
		Math.modRange = function(num, min, max, step){
			// 范围： [min ,max)
			const range = max - min;
			if (num > max) return (num - min) % range + min;
			if (num < min) return max - ( (max - num) % range || max); //保证不取max
			return Math.round(num, step);
		}
		
		//Math.sum 求和
		Math.sum = function(...num){
			let sum = 0;
			for (const v of num)
				if ( !isNaN(v) )
					sum += v;
			return sum;
		}
		
		//Math.avg 求平均值
		Math.avg = function(...num){
			return Math.sum(...num) / num.filter(v => !isNaN(v)).length;
		}
		
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
		
		//Array.prototype.avg 求.平均数
		Array.prototype.avg = function(){
			return Math.avg(...this);
		}
		
	}
	
	
	/* Date */
	if (typeof Date != "undefined"){
		
		//Date.prototype.format 格式化日期
		Date.prototype.format = function(fmt){
			const o = {	 
				"M+": this.getMonth()+1,					//月份
				"d+": this.getDate(),						//日
				"h+": this.getHours(),						//小时
				"m+": this.getMinutes(),					//分
				"s+": this.getSeconds(),					//秒
				"q+": Math.floor((this.getMonth()+3)/3),	//季度
				"S": this.getMilliseconds()					//毫秒
			};	 
			if ( /(y+)/.test(fmt) )	 
				fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));	 
			for (const k in o)	 
				if ( new RegExp("("+ k +")").test(fmt) )
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));	 
			return fmt;	 
		};
		
	}
	
	
	/* location */
	if (typeof location != "undefined"){
		
		//location.getQueryString 获取url queryString
		location.getQueryString = function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null) return decodeURIComponent(r[2]); return null;
		};
		
	}
	
})();