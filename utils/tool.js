
function Tool(name){
	this.name = name || 'Tool'
	// 1、取消冒泡
	this.stopPropagation = function(e){
		var e = e || window.event
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
	}
	// 2、取消默认事件
	this.preventDefault = function(e){
		var e = e || window.event
		e.preventDefault ? e.preventDefault() : e.returnValue = false
	}
	// 3、取消鼠标右键默认事件,dom为节点，不传默认document 
	this.oncontextmenu = function(dom){
		if(dom){
			dom.oncontextmenu = function(){
				return false;
			}
		}else{
			document.oncontextmenu = function(){
				return false;
			}
		}
	}
	// 一些兼容
	// 4、滚动条高度scrollTop
	this.getScrollTop = function(dom){
		if(dom){
			return (dom).scrollTop
		}else{
			return document.documentElement.scrollTop || document.body.scrollTop
		}
		
	}
	// 5、滚动条左侧距离scrollLeft
	this.getScrollLeft = function(dom){
		if(dom){
			return (dom).scrollLeft
		}else{
			return document.documentElement.scrollLeft || document.body.scrollLeft
		}
		
	}
	// 6、兼容byClassName（obj为document或者dom节点）
	this.byClassName = function(obj,className){
		if(obj.getElementsByClassName){
			return obj.getElementsByClassName(className);
		}else{
			var arr = [];
			var ele = obj.getElementsByTagName('*');
			for(var i = 0,len = ele.length;i < len;i ++){
				if(ele[i].className == className){
					arr.push(ele[i]);
				}
			}
			return arr;
		}
	}
	// 7、获取对象中class属性值的兼容,dom节点名
	this.setClassName = function(dom){
		return dom.getAttribute('className') ? dom.getAttribute('className') : dom.getAttribute('class')
	}
	// 8、获取非行内样式，obj：dom节点，attr：属性名
	this.getStyle = function(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,1)[attr];
	}
	// 9、获取事件对象的兼容
	this.setEvent = function(e){
		return e || window.event
	}
	// 10、获取鼠标按键编码值的兼容，
	// evt事件对象，设置（左0，中1，右2）
	this.getButton = function(evt){
		var e = evt || window.event;
		if(evt){
			return e.button;
		}else if(window.event){
			switch(e.button){
				case 1 : return 0;
				case 4 : return 1;
				case 2 : return 2;
			}
		}
	}
	// 11、通过onkeypress获取键盘按键编码值的兼容
	this.getKeyCode = function(e){
		return e.keyCode || e.which || e.charCode
	}
	// 12、添加事件监听兼容
	// obj：dom节点，
	// evt：事件名(不带on)，
	// fun回调方法，
	// boo：是否冒泡(true -事件句柄在捕获阶段执行，false- 默认。事件句柄在冒泡阶段执行)
	this.addEventListen = function(obj,evt,fun,boo){
		if(obj.attachEvent){
			obj.attachEvent('on' + evt,fun);
		}else{
			obj.addEventListener(evt,fun,boo);
		}
	}
	// 13、删除事件监听器的兼容
	// obj：dom节点，
	// evt：事件名(不带on)，
	// fun回调方法，
	// boo：是否冒泡(true -事件句柄在捕获阶段执行，false- 默认。事件句柄在冒泡阶段执行)
	this.removeEventListen = function(obj,evt,fn,boo){
		if(obj.removeEventListener){
			obj.removeEventListener(evt,fn,boo);
		}else{
			obj.detachEvent('on' + evt,fn);
		}
	}
	// 14、获取事件源的兼容
	this.getTarget = function(e){
		return e.target || e.srcElement
	}
	// 15、计算字符串 字节长度
	this.byteLength = function(str){
		var count = 0;
		for(var i=0;i<str.length;i++){
			if(str.charCodeAt(i)>255){
				count+=2;
			}else{
				count++;
			}
		}
		return count;
	}
	// 16、js计算字符串的 字节数方法
	//(一)blob获取字符串的字节
	this.sizeofBlob = function(str){
		var blob = new Blob([str],{type : 'text/plain'})
		return blob.size
	}
	//(二)
	/**
     * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
     * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
     * 
     * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
     * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
     * 000800 - 00D7FF 
       00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
     * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
     * 
     * 注: Unicode在范围 D800-DFFF 中不存在任何字符
     * {@link http://zh.wikipedia.org/wiki/UTF-8}
     * 
     * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
     * 000000 - 00FFFF  两个字节
     * 010000 - 10FFFF  四个字节
     * 
     * {@link http://zh.wikipedia.org/wiki/UTF-16}
     * @param  {String} str 
     * @param  {String} charset utf-8, utf-16
     * @return {Number}
     */
	this.sizeof = function(str, charset){
		var total = 0,
					charCode,
					i,
					len;
			charset = charset ? charset.toLowerCase() : '';
			if(charset === 'utf-16' || charset === 'utf16'){
					for(i = 0, len = str.length; i < len; i++){
							charCode = str.charCodeAt(i);
							if(charCode <= 0xffff){
									total += 2;
							}else{
									total += 4;
							}
					}
			}else{
					for(i = 0, len = str.length; i < len; i++){
							charCode = str.charCodeAt(i);
							if(charCode <= 0x007f) {
									total += 1;
							}else if(charCode <= 0x07ff){
									total += 2;
							}else if(charCode <= 0xffff){
									total += 3;
							}else{
									total += 4;
							}
					}
			}
			return total;
	}
	// 17、数据双向绑定,obj对象，dom节点，key键值,设置的值setValue，state:'get'获取值，'set'设置值
	this.dataBind = function(obj,dom,key,setValue,state){
		Object.defineProperty(obj, key, {
			get: function(){
					return dom.innerHTML;
			},
			set: function(setValue){
					dom.innerHTML = setValue;
			}
		});
		if(state === 'set'){
			obj[key] = setValue
		}else{
			return obj[key]
		}	
	}
	// 18、解析URL成一个对象
	this.urlQueryString = function(url){
		var urlArr = []
		if((/\?/).test(url)){
			urlArr = url.split('?')
		}
		var urlData = []
		if(urlArr[1]){
			urlData = urlArr[1].split('&')
		}
		var len = urlData.length
		this.url = {}
		urlData.forEach(val=>{
			var tmp = val.split('=')
			var key = tmp[0]
			var value = tmp[1]
			this.url[key] = value
		})
		return this.url
	}
	// 19、弹窗
	this.dialog = function(){
		var that = this
		if(!this.dialog.instance){
			this.dialog.instance = {
				ele: document.createElement('div'),
				init: function(obj){
					var str = obj.html
					this.ele.innerHTML = str
					document.body.appendChild(this.ele);
					this.ele.style.cssText = obj.css;
					
				},
				hide: function(){
					this.ele.parentNode.removeChild(this.ele)
				}
			}
		}
		return this.dialog.instance;
	}
}
// 原型方法
Tool.prototype.getName = function(){
	return this.name
}




