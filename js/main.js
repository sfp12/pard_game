$(document).ready(function(){
	window.onload = function() {
		var myObject = (function() {
			//文档中定义的变量
			var picdistance = 60;    //图片之间的宽度
			var picpositionX = 0;   //图片左移的位置
			var picpositionY = 0;   //图片上移的位置
			var intertime = 2 * 1000;    //音频1到2的间隔时间
			var intertime_34 = 1 * 1000;    //音频3到4的间隔时间
			var intertime_3_n = 1 * 1000;    //选择后到下次游戏时的间隔，正式阶段

			//自己定义的变量
			var pic_w = 220;   //图片的宽度
			var pic_h = 170;	//图片的高度
			var pic_b = 2;      //图片的边框宽度
			var path = '';    //需要播放的音频路径
			var set_2 = '';    //播放音频2的函数
			var set_3 = '';    //播放音频3的函数
			var set_3_n = '';    //选择后到下次游戏的函数
			var set_4 = '';    //播放音频4的函数
			var set_45 = '';    //选择后到音频5播放时的函数
			var set_5 = '';    //播放音频5的函数
			var audio_4_s = 0;    //音频4开始播放的时间
			var click_t = 0;     //点击的时间
			var reaction_t = 0;         //反应时间
			var choose = 1;      //选择的图片，1表示左边的，2表示右边的。
			var c = 0;    //练习阶段的练习次数，因为要做两道题，播放的音频不同，所有需要变量来处理
			var prac = 0;    //表示练习阶段，1表示正式测试阶段。
			var answer = [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2];    //答案
			var result = 0;     //反应正确，0表示错误，1表示正确。
			var result_c = 0;     //累计4次就退出程序
			var click_s = 0;    //0表示可以点击，1表示不能点击

	 		//需要记录的字段
			var buttonset="";
			var numset="";
			var timeset="";
			var stimidset="";		
			var correctanswerset="";		

			//程序开始前的准备工作
			var prepare = function() {
				$('#begin_again').click(function(){
					if(click_s == 0){
						$("#begin_again").css('display','none');
						start();
					}			 	
				});
				$('#begin_stand').click(function(){
					if(click_s == 0){
						$("#begin_stand").css('display','none');
						start();
					}				
				});
				$("#pic_left").click(function(){
					if(click_s == 0){
						$('body').css({cursor: 'none'});
						click_t=new Date();
						reaction_t = click_t - audio_4_s - 10*1000;
						choose = 1;
						$("#pic_con").css("display","none");
						if(prac == 0){
							set_45 = setTimeout(function(){     //播放第五个音频							
								$("#audio_5").css("display","block");
								path = 'audio/p'+(c+5)+'.mp3';
								$('#foot').html(createAudio(path));
								set_5 = setTimeout(function(){     //播放第五个音频							
									phase();
								},5 * 1000)   //音频5的时长 
							},intertime_34)   //选择后到5的时间，用的是3到4的时间 						
						}else{                     //正式阶段
							set_3_n = setTimeout(function(){     //播放第五个音频							
								phase();
							},intertime_3_n)   //每个回合的间隔时间					
						}
					}								
				});	
				$("#pic_right").click(function(){                        //和left一样的
					if(click_s == 0){
						$('body').css({cursor: 'none'});
						click_t=new Date();
						reaction_t = click_t - audio_4_s - 10*1000;
						choose = 2;
						$("#pic_con").css("display","none");
						if(prac == 0){
							set_45 = setTimeout(function(){     //播放第五个音频							
								$("#audio_5").css("display","block");
								path = 'audio/p'+(c+5)+'.mp3';
								$('#foot').html(createAudio(path));
								set_5 = setTimeout(function(){     //播放第五个音频							
									phase();
								},5 * 1000)   //音频5的时长 
							},intertime_34)   //选择后到5的时间，用的是3到4的时间 
						}else{               //正式阶段
							set_3_n = setTimeout(function(){     //播放第五个音频							
								phase();
							},intertime_3_n)   //每个回合的间隔时间
						}	
					}				
				});	
				start();
			}		

			//开始运行程序
			var start = function() {
				click_s = 1;
				$('body').css({cursor: 'none'});
				$("#container").css('display','block');
				$("#pic_con").css('display','block');

				//调整容器的位置
				picpositionX = (pic_w*2 + picdistance)/2;
				picpositionY = (pic_h)/2;
				$("#container").css('width',pic_w*2 + picdistance+'px');
				$("#pic_con").css('width',pic_w*2 + picdistance+'px');
				$("#container").css('margin-left','-'+picpositionX+'px');
				$("#container").css('margin-top','-'+picpositionY+'px');

				//呈现图片
				if(prac == 0){
					$("#pic_left img").attr('src','images/1-a.png');
					$("#pic_right img").attr('src','images/1-b.png');
				}else{
					$("#pic_left img").attr('src','images/'+(c/3+1)+'-a.png');
					$("#pic_right img").attr('src','images/'+(c/3+1)+'-b.png');
				}			
				//播放音频
				if(prac == 1){
					path = 'audio/'+(c+1)+'.mp3';
				}else{
					path = 'audio/p'+(c+1)+'.mp3';
				}
				$('#foot').html(createAudio(path));
				$('#pic_left').css('border','3px solid red');
				
				
				set_2 = setTimeout(function(){    //播放第二个音频
					$('#pic_right').css('border','3px solid red');
					$('#pic_left').css('border','');
					if(prac == 1){
						path = 'audio/'+(c+2)+'.mp3';
					}else{
						path = 'audio/p'+(c+2)+'.mp3';
					}
					$('#foot').html(createAudio(path));
					
					set_3 = setTimeout(function(){   //播放第三个音频
						$('#pic_right').css('border','');					                
						if(prac == 1){
							path = 'audio/'+(c+3)+'.mp3';
						}else{
							path = 'audio/p'+(c+3)+'.mp3';
						}
						$('#foot').html(createAudio(path));	
						set_4 = setTimeout(function(){   //播放第四个音频
							if(prac == 0){
								click_s = 0;							
								if(prac == 1){
									path = 'audio/'+(c+4)+'.mp3';
								}else{
									path = 'audio/p'+(c+4)+'.mp3';
								}
								$('#foot').html(createAudio(path));	
								audio_4_s = new Date();
								$('body').css({cursor: 'default'});
							}else{
								click_s = 0;
								audio_4_s = new Date();
								$('body').css({cursor: 'default'});
							} 						
						},intertime_34);    //intertime_34为音频3的时长
					},intertime);				
				},intertime);			
			};

			/**
			 * 一个回合结束后的操作
			 * @param 
			 * @return 
			 */
			 var phase = function(){
			 	if(prac == 0){                                       //练习阶段,p=0
			 		if(c == 0){
			 			c = c+5;
			 			$('#audio_5').css('display','none');
					 	$('#container').css('display','none');
					 	$('#begin_again').css('display','block');
					 	$('body').css({cursor: 'default'});
			 		}else{
			 			c = 0;
			 			$('#audio_5').css('display','none');
					 	$('#container').css('display','none');
					 	$('#begin_stand').css('display','block');
					 	$('body').css({cursor: 'default'});
					 	prac = 1;
			 		}
			 	}else{                                                //正式测试,p=1	
			 		
		 			if(choose == answer[c/3]){             //反应正确
			 			result = 1;
			 			result_c = 0;
			 		}else{                                 //反应错误
			 			result = 0;
			 			result_c++;
			 		}
			 		//记录字段
			 		numset += result+';';                    
			 		buttonset += choose+';';
			 		timeset += reaction_t+';';
			 		stimidset += (c/3+1)+';';
			 		correctanswerset += answer[c/3]+';'; 
			 				 		
				 	$('body').css({cursor: 'default'});
				 	c = c+3;
				 	if(result_c == 4){
			 			endOperate();	
			 		}else{
			 			if(c >= 48){
					 		endOperate();
					 	}else{
					 		start();
					 	}	
			 		}
			 	}		 	
			 };		

			/**
			 * 游戏结束时的操作
			 * @param 
			 * @return 
			 */
			var endOperate=function(){
				$('.ele25').css('display','none');
				$('.container').css('backgroundColor','white');
				var result='';

				numset=numset.substring(0,numset.length-1);    
				buttonset=buttonset.substring(0,buttonset.length-1);    
				timeset=timeset.substring(0,timeset.length-1);         
				stimidset=stimidset.substring(0,stimidset.length-1);
				correctanswerset=correctanswerset.substring(0,correctanswerset.length-1);
						

				result+='numset:'+numset+'<br>';
				result+='buttonset:'+buttonset+'<br>';
				result+='timeset:'+timeset+'<br>';
				result+='stimidset:'+stimidset+'<br>';
				result+='correctanswerset:'+correctanswerset+'<br>';
				
				$('#record').html(result);
				$('#record').css('display','block');
			};

			/**
			 * 创建音频
			 * @param 
			 * @return 
			 */
			var createAudio = function(a){	
				var result='';
				if(navigator.userAgent.indexOf("Chrome") > -1){ 
					//如果是Chrome： 
					result='<audio src='+a+' type="audio/mp3" autoplay=”autoplay” hidden="true"></audio>'; 
					}else if(navigator.userAgent.indexOf("Firefox")!=-1){ 
					//如果是Firefox： 
					result='<embed src='+a+' type="audio/mp3" hidden="true" loop="false" mastersound></embed>'; 
					}else if(navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all){ 
					//如果是IE(6,7,8): 
					result='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95"><param name="AutoStart" value="1" /><param name="Src" value='+a+' /></object>'; 
					}else if(navigator.appName.indexOf("Opera")!=-1){ 
					//如果是Oprea： 
					result='<embed src='+a+' type="audio/mpeg" loop="false"></embed>';
					}else{ 
					result='<embed src='+a+' type="audio/mp3" hidden="true" loop="false" mastersound></embed>'; 
					} 
				return result;
			}

			return {
				prepare : prepare,
			}
		})();

		$("#begin_prac").click(function(){	
			$('#begin_prac').css('display','none');
			$('#container').css('display','block');
			$('body').css({cursor: 'none'});
			myObject.prepare();
		});	
	}
});






