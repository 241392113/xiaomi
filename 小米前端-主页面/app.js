
var express = require('express');
var bodyparser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var cookieParser = require('cookie-parser')
var form = multer();

var app = express();
app.use(express.static('wwwroot'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());


var storage = multer.diskStorage({
	destination: 'wwwroot/uploads',
	filename: function(req,res,callback){
		var username = req.cookies.username;
//		console.log('1111')
		callback(null,username + '.jpg')
	}
});

var upload = multer({storage});


/*-------注册接口----------*/
app.post('/register',function(req,res){
	
	fs.exists('users',function(exist){
		if(exist){
			//直接写入数据
			writeFile();
		}else{
			//创建文件夹 ,写入数据
			fs.mkdirSync('users',function(err){
				if(err){
					//创建失败
					res.status(200).json({code:0,message:'系统错误,文件夹创建失败..'})
				}else{
					//创建成功,写入数据
					writeFile();
				}
			})
		}
	})
	
	function writeFile(){
		var fileName = 'users/' + req.body.username + '.txt';
		fs.exists(fileName,function(exist){
			if(exist){
				//用户存在
				res.status(200).json({code:1,message:'用户已存在,请重新注册'})
			}else{
				//可以注册
				req.body.ip = req.ip;
				req.body.time = new Date();
				fs.writeFile(fileName,JSON.stringify(req.body),function(err,data){
					if(err){
						//文件写入失败
						res.status(200).json({code:2,message:'系统错误,文件写入失败..'})
					}else{
						//注册成功
						res.status(200).json({code:3,message:'恭喜您,注册成功'})
					}
				})
			}
		})
	}
});

/*-----------登录接口---------------*/
app.post('/login',function(req,res){
	var fileName = 'users/' + req.body.username + '.txt';
	fs.exists(fileName,function(exist){
		if(!exist){
			//用户不存在
			res.status(200).json({code:0,message:'用户不存在,请注册'})
		}else{
			//用户存在
			fs.readFile(fileName,function(err,data){
				if(err){
					//读取失败
					res.status(200).json({code:1,message:'系统错误,读取失败'})
				}else{
					//读取成功
					var user = JSON.parse(data);
					if(user.password == req.body.password){
						//登录成功
						//保存登录记录 cookie
						var expires = new Date();
						expires.setMonth(expires.getMonth() + 1);
						res.cookie('username',req.body.username,{expires});
						
						res.status(200).json({code:3,message:'登录成功'})
					}else{
						//登录失败
						res.status(200).json({code:2,message:'密码错误,登录失败..'})
					}
				}
			})
		}
	})
	
})

/*------------处理退出登录接口-----------------------*/
app.get('/logout',function(req,res){
	res.clearCookie('username');
	res.status(200).json({code:1,message:'退出成功'});
})

/*-----------处理购物车接口-----------------------*/
app.post('/buy',function(req,res){
	if(!req.cookies.username){
		res.status(200).json({code:2,message:'登录异常,请重新登录'})
		return;
	}
	
	fs.exists('shops',function(exist){
		if(exist){
			//文件夹存在,写入数据
			readShops();
		}else{
			//文件夹不存在,创建文件夹
			fs.mkdirSync('shops');
			writeShops()
		}
	})
	
	var fileName = 'shops/' + req.cookies.username + '.txt';
	
	
	function readShops(){
		fs.readFile(fileName,function(err,data){
			if(err){
				writeShops();
			}else{
				var result = '[' + data;
				result = result.substr(0,result.length - 1);
				result = result + ']';
					
				var shops = JSON.parse(result);
				
				
				var repeat = false;
				for(var i=0;i<shops.length;i++){
					if(req.body.content.length ==0){
						res.status(200).json({code:4,message:'您未选择商品...'})
						return;
					}
					else if(req.body.content == shops[i].content){
						res.status(200).json({code:3,message:'商品已加入购物车'})
						repeat = true;
					}
				}
				if(repeat == false){
					writeShops();
				}
			}
		})
		
	}
	
	
	function writeShops(){
		var content = req.body.content;
		
		
			var buyShops = {
				content:content
			}
			
			fs.appendFile(fileName,JSON.stringify(buyShops)+',',function(err){
				if(err){
					res.status(200).json({code:0,message:'加入购物车,失败!!!'});
				}else{
					if(JSON.stringify(buyShops).length == 0){
						res.status(200).json({code:4,message:'您未选择商品...'})
						return;
					}else{
						res.status(200).json({code:1,message:'恭喜!!!加入购物车,成功'});
					}
				}
			})
	}
})



/*----------获取商品接口-------------------*/
app.get('/join',function(req,res){
	
	var fileName = 'shops/' + req.cookies.username + '.txt';
	fs.exists(fileName,function(exist){
		if(exist){
			//
			fs.readFile(fileName,'utf8',function(err,data){
				if(err){
					res.status(200).json({code:2,message:'读取失败'})
				}else{
//					var result = JSON.parse(data)
					var result = '[' + data;
					result = result.substr(0,result.length - 1);
					result = result + ']';
					
					res.status(200).send(result);
				}
			})
		}else{
			//文件不存在
			res.status(200).json({code:1,message:'系统异常,文件不存在'})
		}
	})
})


//------------------------删除商品---------------------
app.post('/remove',function(req,res){
	 var filepath = 'shops/' + req.cookies.username + '.txt';
	 var b = 0;
	 fs.readFile(filepath,function(err,data){
	 	if(!err){
	 		var result = '[' + data;
	 		result = result.substr(0,result.length-1);
	 		result = result + ']'
	 		
	 		var results = JSON.parse(result)
	 		var x = '';
	 		for(var i=0;i<results.length;i++){
	 			var shops = results[i];
	 			if(req.body.content == shops.content){
	 				x = i;
	 			}
	 		}
	 		results.splice(x,1)
	 		res.send(results)
	 		b=1
	 	}
	 	if(b=1){
	 		fs.unlink(filepath,function(){
	 			
	 		})
	 	}
	})
})

app.post('/add',function(req,res){
	var filepath = 'shops/' + req.cookies.username + '.txt';
	
	fs.appendFile(filepath,JSON.stringify(req.body)+',',function(){
		res.status(200).send({code:1,message:'删除成功..'})
	})
	
})

//-------------------------提交留言功能-----------------------------
app.post('/ask',function(req,res){
	if(!req.cookies.username){
		res.status(200).json({code:0,message:'登录异常,请重新登录'})
		return;
	}
	
	fs.exists('questions',function(exist){
		if(exist){
			//写入数据
			writeFile()
		}else{
			fs.mkdirSync('questions')
			//写入数据
			writeFile()
		}
	})
	
	//封装写入数据的方法 writeFile
	//封装写入问题的方法
	function writeFile(){
		//生成提问问题的文件名
		var date = new Date();
		var fileName = 'questions/' + date.getTime() + '.txt';
		//生成储存信息
		req.body.username = req.cookies.username;
		req.body.ip = req.ip;
		req.body.time = date;
		// 防止跨网站攻击
		req.body.content = req.body.content.replace(/</g,'&lt;')	
		req.body.content = req.body.content.replace(/>/g,'&gt;')	
		
		//写入文件
		fs.writeFile(fileName,JSON.stringify(req.body),function(err){
			if(err){
				//写入失败
				res.status(200).json({
					code:2,
					message:'系统错误,写入失败'
				})
			}else{
				//写入成功
				res.status(200).json({
					code:3,
					message:'问题提交成功'
				})
			}
		})
	}
	
	
})

//-------------------------------论坛数据接口-----------------------
app.get('/all',function(req,res){
	//返回所有的文件
	fs.readdir('questions',function(err,files){
		if(err){
			//读取文件失败
			res.status(200).json({
				code:0,
				message:'系统错误,读取文件失败'
			})
		}else{
			//读取文件成功
			//数组反序,目的:让最新提问的问题排在最前面
			files = files.reverse();
			//创建一个数组容器,存放所有问题的对象
			var questions = [];
			//--------方法一:用for循环来遍历文件,用同步的方式读取文件内容
//			for(var i=0;i<files.length;i++){
//				var file = files[i];
//				//拼接文件的路径
//				var filePath = 'questions/' + file;
//				//readFile : 是一个一步读取文件的方法,可能会导致的结果是,还没有读取完成就res了,导致没有数据返回
//				//readFileSync : 同步读取文件
//				var data = fs.readFileSync(filePath);
//				//把字符串转换成对象,然后存到数组中
//				var obj = JSON.parse(data);
//				questions.push(obj);
//			}
//			res.status(200).json(questions);
		
		/*-------方法二:用异步读取文件---------*/
			var i=0;
			function readFile(){
				if(i<files.length){
					var file = files[i];
					//拼接文件的路径
					var filePath = 'questions/' + file;
					fs.readFile(filePath,function(err,data){
						if(!err){
							var obj = JSON.parse(data);
							questions.push(obj);
							i++;
							readFile(); 
						}else{
							
						}
					});
				}else{
					//响应数据
					res.status(200).json(questions)		
				}
			}
			readFile();
		}
	});
});

//-------------------------回复接口----------------------
app.post('/answer',function(req,res){
	//判断登录的状态
	var username = req.cookies.username
	if(!username){
		res.status(200).json({code:0,message:'登录异常,请重新登录'})
		return;
	}
	
	//先取出要回答问题的内容
	//找到要回答问题的文件
	var question = req.cookies.question;
	var filePath = 'questions/' + question + '.txt';
	
	fs.readFile(filePath,function(err,data){
		if(!err){
			var dataObj = JSON.parse(data);
			//判断当前文件是否有回复
			if(!dataObj.answers){
				//次数组存放回复内容用的
				dataObj.answers =[];
			}
			
			req.body.content = req.body.content.replace(/</g,'&lt;');	
			req.body.content = req.body.content.replace(/>/g,'&gt;');
			req.body.ip = req.ip;
			req.body.question = question;
			req.body.time = new Date();
			req.body.username = username;
			
			//将回复放到数组中
			dataObj.answers.push(req.body);
			
			fs.writeFile(filePath,JSON.stringify(dataObj),function(err){
				if(err){
					//写入失败:
					res.status(200).json({code:1,message:'系统错误,写入失败...'})
				}else{
					//写入成功
					res.status(200).json({code:3,message:'回复成功'})
				}
			})
			
		}
		
	});
	
})


//-------------------图片上传----------------
app.post('/user/photo',upload.single('photo'),function(req,res){
	res.status(200).json({code:3,message:'上传头像成功'})
})


app.listen(3000,function(){
	console.log('服务器启动完成...')
})




