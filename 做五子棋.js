window.onload = function fnGobang() {
	var oBox = document.getElementById('box'); //获取div
	var oUl = document.createElement('ul'); //创建一个ul元素
	oUl.id = "pox";   //给ul添加一个ID
	oBox.appendChild(oUl); //把ul添加到div中

 	var size = 50;     //棋格尺寸

	var W = oUl.offsetWidth / size; //横向
	var H = oUl.offsetHeight / size; //纵向

	var blackchess = [];   //放置黑棋子的格子
	var whitechess = [];   //放置白棋子的格子

	var Pass = 0;     //用来冒泡的空
	var noPass = false; //判定条件
	var S = R = L = 1;  
      /*循环创建li，并加入到ul中*/
	for(var i = 0; i < W * H; i++) {
		var oLi = document.createElement('li') 
		oUl.appendChild(oLi)
	}
      
	var oList = oUl.getElementsByTagName('li');//获取所有的li
	/*循环遍历li*/
	for(var j = 0; j < oList.length; j++) {
		oList[j].index = j; //自定义索引
		/*给li添加点击事件*/
		oList[j].onclick = function() {
			if(!this.childNodes[0]) {  //判断li中有没有元素

				if(noPass) {
					whitechess.push(this.index) //把它添加到白棋子数组中

				} else {
					blackchess.push(this.index) //把它添加到黑棋子数组中

				}
                  /*创建span标签*/
				var oSpan = document.createElement('span');

				if(noPass) {
					oSpan.style.background = "#fff";//白棋子
				}
				this.appendChild(oSpan); //添加到点击的li中

				fnTorting(whitechess, Pass); //冒泡排序
				fnTorting(blackchess, Pass); //冒泡排序

				function fnTorting(arr, pa) { //冒泡排序函数;
					for(var j = arr.length; j > 0; j--) {
						if(arr[j] < arr[j - 1]) {
							pa = arr[j];
							arr[j] = arr[j - 1];
							arr[j - 1] = pa;
						}
					}
				}

				if(!noPass) {
					fnWin(blackchess, "黑棋胜！") //黑胜
				} else {
					fnWin(whitechess, "白棋胜！") //白胜
				}
				
			    /*判断胜负的函数*/
				function fnWin(arr,a){ 
					if(arr.length >= 5){
						for(var s=0;s<arr.length;s++){
							/*横向五子*/
							if((arr[s+4]-arr[s]==4)&&((arr[s]+arr[s+1]+arr[s+2]+arr[s+3]+arr[s+4])/5==arr[s+2])){
								alertWin(a)
							}
							/*纵向五子*/
							for(var k= s + 1;k<arr.length;k++){
								if(arr[k]-arr[s] ===S * W){
									if(S==4){
										alertWin(a)
										S=1;
										break;
									}else{
										S++
									}
								}
								/*左斜五子*/
								if(arr[s] % W >= 4) { //边界判定
									if(arr[k] - arr[s] === L * (W - 1)) { //左斜

										if(L == 4) {
											alertWin(a) //判胜
											L = 1;
											break;
										} else {
											L++
										}
									}
								}
								/*右斜五子*/
								if(arr[s] % W <7){ //边界判定
									if(arr[k] -arr[s] === R * (W+1)){ //右斜 
										if(R==4){
											alertWin(a)
											R=1;
											break;
											
										}else{
											R++
										}
									}
								}
								
							}
							S=L=R=1;
						}
					}
				}
				noPass = !noPass;  //用来棋子转换

			}
		}
	}
	function alertWin(a){
//		console.log('sss')
		var oFox=document.createElement("div");
		console.log(oFox)
		oFox.className="oFox";
		var oRox=document.createElement("div");
		oRox.className="oRox";
		
		for(var i=0;i<3;i++){
			var oButton=document.createElement("input")
			oButton.type="button";
			oRox.appendChild(oButton)
		}
		
		var listButt=oRox.getElementsByTagName("input");
		listButt[0].value = a;
		listButt[0].style.cssText="background:none;border: none ;"
		listButt[1].value = "重新开始";
		listButt[2].value = "返回游戏";
		
		for( var i = 1; i < 3; i++) {
			listButt[i].index = i ;
			listButt[i].onclick = function(){
				if(this.index==2){
					oFox.removeChild(oRox);
					oFox.style.background="rgba(0,0,0,0)"
				}else{
					oBox.removeChild(oUl);
					fnGobang()
				}
			}
			
		}
		oFox.appendChild(oRox);
		oUl.appendChild(oFox);
	}
}