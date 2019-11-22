requirejs.config({
  baseUrl:'../js',
  paths:{
      'jquery':'jquery-2.1.1.min'
  }
});
// 引入jq
require(['jquery'],function(myJq){
	// console.log($('#maopao'))
});
