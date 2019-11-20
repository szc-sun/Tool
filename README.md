# js-Tool
js可以用到的一些基本工具
```
var tool = new Tool()
```
### 1、取消冒泡
### 2、取消默认事件
### 3、取消鼠标右键默认事件,dom为节点，不传默认document 
### 4、滚动条高度scrollTop
### 5、滚动条左侧距离scrollLeft
### 6、兼容byClassName（obj为document或者dom节点）
### 7、获取对象中class属性值的兼容,dom节点名
### 8、获取非行内样式，obj：dom节点，attr：属性名
### 9、获取事件对象的兼容
### 10、获取鼠标按键编码值的兼容，evt事件对象，设置（左0，中1，右2）
### 11、通过onkeypress获取键盘按键编码值的兼容
### 12、添加事件监听兼容
> obj：dom节点，
	evt：事件名(不带on)，
	fun回调方法，
	boo：是否冒泡(true -事件句柄在捕获阶段执行，false- 默认。事件句柄在冒泡阶段执行)
### 13、删除事件监听器的兼容
> obj：dom节点，
	evt：事件名(不带on)，
	fun回调方法，
	boo：是否冒泡(true -事件句柄在捕获阶段执行，false- 默认。事件句柄在冒泡阶段执行)
  ### 14、获取事件源的兼容
  
