class Tool{
	constructor(){}
	// 1、取消冒泡
	stopPropagation(e){
		var e = e || window.event
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
	}
	// 2、取消默认事件
	preventDefault(e){
		var e = e || window.event
		e.preventDefault ? e.preventDefault() : e.returnValue = false
	}
	// 3、取消鼠标右键默认事件,dom为节点，不传默认document 
	oncontextmenu(dom){
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
	getScrollTop(dom){
		if(dom){
			return (dom).scrollTop
		}else{
			return document.documentElement.scrollTop || document.body.scrollTop
		}
		
	}
	// 5、滚动条左侧距离scrollLeft
	getScrollLeft(dom){
		if(dom){
			return (dom).scrollLeft
		}else{
			return document.documentElement.scrollLeft || document.body.scrollLeft
		}
		
	}
	// 6、兼容byClassName（obj为document或者dom节点）
	byClassName(obj,className){
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
	setClassName(dom){
		return dom.getAttribute('className') ? dom.getAttribute('className') : dom.getAttribute('class')
	}
	// 8、获取非行内样式，obj：dom节点，attr：属性名
	getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,1)[attr];
	}
	// 9、获取事件对象的兼容
	setEvent(e){
		return e || window.event
	}
	// 10、获取鼠标按键编码值的兼容，
	// evt事件对象，设置（左0，中1，右2）
	getButton(evt){
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
	getKeyCode(e){
		return e.keyCode || e.which || e.charCode
	}
	// 12、添加事件监听兼容
	// obj：dom节点，
	// evt：事件名(不带on)，
	// fun回调方法，
	// boo：是否冒泡(true -事件句柄在捕获阶段执行，false- 默认。事件句柄在冒泡阶段执行)
	addEventListen(obj,evt,fun,boo){
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
	removeEventListen(obj,evt,fn,boo){
		if(obj.removeEventListener){
			obj.removeEventListener(evt,fn,boo);
		}else{
			obj.detachEvent('on' + evt,fn);
		}
	}
	// 14、获取事件源的兼容
	getTarget(e){
		return e.target || e.srcElement
	}
}



