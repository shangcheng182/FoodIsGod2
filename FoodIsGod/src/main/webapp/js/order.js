//全局变量
		//json数组
		//样例数据
		//菜品分类列表
		var dishSortList = [{
			"sortId": 1,
			"sortName": "热销"
		}, {
			"sortId": 2,
			"sortName": "爆款"
		}, {
			"sortId": 3,
			"sortName": "其他"
		}];
		// 所有菜品列表
		var allDIsh = [{
			"mealsId": 1001,
			"sortId": 1,
			"mealsName": "牛肉1",
			"mealsPrice": 1,
			"mealsRepresent": "好吃美味牛肉",
			"mealsPicture": "麻婆豆腐.jpg",
			"mealsSales": 50
		}, {
			"mealsId": 1002,
			"sortId": 2,
			"mealsName": "果蔬2",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1003,
			"sortId": 3,
			"mealsName": "果蔬3",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1004,
			"sortId": 1,
			"mealsName": "果蔬1",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1005,
			"sortId": 2,
			"mealsName": "果蔬2",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1006,
			"sortId": 3,
			"mealsName": "果蔬3",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1007,
			"sortId": 3,
			"mealsName": "麻婆豆腐3",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "麻婆豆腐.jpg",
			"mealsSales": 50
		}, {
			"mealsId": 1008,
			"sortId": 3,
			"mealsName": "回锅肉3",
			"mealsPrice": 45,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}, {
			"mealsId": 1009,
			"sortId": 3,
			"mealsName": "水煮牛肉3",
			"mealsPrice": 25,
			"mealsRepresent": "好吃美味果蔬",
			"mealsPicture": "商品.png",
			"mealsSales": 50
		}];
		// 购物车
		var shoppingCarts = [];

		// function createDishSort(sortId,sortName) {
		//     var o = new Object();
		//     o.sortId = sortId;
		//     o.sortName = sortName;
		//     return o;
		// }


		var spc1 = new shoppingCart(123, 1001, 2);
		var spc2 = new shoppingCart(123, 1002, 1);
		var spc3 = new shoppingCart(123, 1003, 2);
		shoppingCarts.push(spc1);
		shoppingCarts.push(spc2);
		shoppingCarts.push(spc3);
		// console.log(shoppingCarts);


		// 构造函数
		// 类别
		function dishSort(sortId, sortName) {
			this.sortId = sortId;
			this.sortName = sortName;
		}
		// 构造函数
		// 购物车
		function shoppingCart(userId, mealsId, mealsNum) {
			this.userId = userId;
			this.mealsId = mealsId;
			this.mealsNum = mealsNum;
		}
		// 构造函数
		// 菜品
		function dish(mealsId, sortId, mealsName,
			mealsPrice, mealsRepresent, mealsPicture, mealsSales) {
			this.mealsId = mealsId;
			this.sortId = sortId;
			this.mealsName = mealsName;
			this.mealsPrice = mealsPrice;
			this.mealsRepresent = mealsRepresent;
			this.mealsPicture = mealsPicture;
			this.mealsSales = mealsSales;
		}

		// 减少数量
		function dec() {
			var num = document.getElementById("num");
			b = parseInt(num.innerHTML);
			if (b == 1) {
				num.innerHTML = 1;
			} else {
				num.innerHTML = b - 1;
			}
		}

		// 提交购物车
		function submitShoppingCart() {
			// ajax请求获取分类数据
			axios.post('/shoppingCart', shoppingCarts

				)
				.then(function(response) {
					if (response.code == 100) {
						dishSortList = response.extend;
					} else if (response.code == 200) {
						console.log(response.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		// 增加数量
		function add() {
			var a = document.getElementById("num");
			b = parseInt(a.innerHTML) + 1;
			a.innerHTML = b;
		}

		// 加入购物车
		function join() {
			var num = document.getElementById("num");
			b = parseInt(num.innerHTML);
			var n = document.getElementById("allDishNum");
			a = parseInt(n.innerHTML);
			n.innerHTML = a + b;
			num.innerHTML = 1;
		}

		// 修改模态框信息
		function demo(dishNum) {
			var n = document.getElementById("demo");
			n.innerHTML = 1;


		}


		// 桌号相关操作开始 ////////////////

		//获取URL里面的名为name的参数
		function getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			//URL里无此参数，返回空
			return null;
		}

		//tbm桌号
		var tbm = getQueryString("tableNumer");
		if (tbm != null) {
			writeTableNumber(tbm);
			writeStorage(tbm);
		} else { // URL里没有桌号，去浏览器缓存读取
			writeTableNumber(readStorage());
		}

		//桌号写入浏览器缓存
		function writeStorage(tbm) {
			if (typeof(Storage) !== "undefined") {
				if (tbm == "") {
					sessionStorage.tableNumer = "未知";
				} else {
					sessionStorage.tableNumer = tbm;
				}
			}
		}

		//读浏览器缓存中的桌号
		function readStorage() {
			if (typeof(Storage) !== "undefined") {
				if (sessionStorage.tableNumer) {
					return sessionStorage.tableNumer;
				}
				return "未知";
			}
		}

		//打印桌号
		function writeTableNumber(tbm) {
			document.getElementById("table_Numer").innerText = tbm;
		}
		// 桌号相关操作结束 /////////////////


		// 插入分类信息
		function insertLeftNav() {
			var target = document.getElementById("left_navbar");
			var dish_category_content = document.getElementById("dish_category_content");
			// 请求到的json渲染到页面上

			for (var i = 0; i < dishSortList.length; i++) {
				var temp = "<li class='order-li'>" +
					"<a href='#hot" + dishSortList[i].sortId + "' class='order-li-a'>" +
					"<span class='text-center order-a-font'>" + dishSortList[i].sortName + "</span></a></li>";

				target.innerHTML += temp;

				var temp2 = "<div class='order-category' id='dish_category" + dishSortList[i].sortId + "'>" +
					"<span class='order-font' id='hot" + dishSortList[i].sortId + "'>" + dishSortList[i].sortName +
					"</span></div>";

				dish_category_content.innerHTML += temp2;
			}
		}

		insertLeftNav();

		// 加载菜品类别
		function loadLeftNav() {
			// ajax请求获取分类数据
			axios.post('/meals', {
					"sort": 1
				})
				.then(function(response) {
					if (response.code == 100) {
						dishSortList = response.data.extend;
					} else if (response.code == 200) {
						console.log(response.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		loadLeftNav();
		loadDish();
		// 加载菜品
		function loadDish() {
			// ajax请求获取菜品数据
			axios.post('/sort', {
					"mealsId": 1
				})
				.then(function(response) {
					if (response.code == 100) {
						allDIsh = response.data.extend;
					} else if (response.code == 200) {
						console.log(response.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
		insertDish();
		// 插入菜品信息
		function insertDish() {
			// 请求到的json渲染到页面上

			for (var i = 0; i < allDIsh.length; i++) {
				var target = document.getElementById("dish_category" + allDIsh[i].sortId);

				var temp = "<div class='order-dishes'><img alt='' class='avatar' src='images/" + allDIsh[i].mealsPicture +
					"' class='order-dishes-img'>" +
					"<div class='order-dishes-price'><label class='order-label'>" + allDIsh[i].mealsName + "</label>" +
					"<span class='dishes-price'> ￥" + allDIsh[i].mealsPrice + ".00</span>" +
					"</div><button class='order-button' data-toggle='modal' data-target='#myModal' onclick='demo(" +
					allDIsh[i].mealsId + ")'>选规格</button></div>";

				target.innerHTML += temp;
			}
		}

		// 游客模式生成随机用户名并写入本地
		function writeUserName2Storage() {
			if (localStorage.userName) {} else {
				localStorage.userName = random("游客_", 10);
			}
		}

		// 游客模式userId写入本地
		function writeUserId2Storage(userId) {
			if (localStorage.userId) {
				localStorage.userId = userId;
			} else {
				localStorage.userId = userId;
			}
		}

		// 设置cookie
		function setCookie(name, value, daysToLive) {
			// 对 cookie 值进行编码以转义其中的分号、逗号和空格
			var cookie = name + "=" + encodeURIComponent(value);

			if (typeof daysToLive === "number") {
				/* 设置 max-age 属性 */
				cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
			}
			document.cookie = cookie;
		}

		// 获取cookie
		function getCookie(name) {
			var cookies = document.cookie;
			var list = cookies.split("; "); // 解析出名/值对列表

			for (var i = 0; i < list.length; i++) {
				var arr = list[i].split("="); // 解析出名和值
				if (arr[0] == name)
					return decodeURIComponent(arr[1]); // 对cookie值解码
			}
			return "";
		}

		// 游客身份登录
		function visitor2login(){
			// ajax请求
			// 注册游客身份
			axios.post('/user', {
					"userName": localStorage.userName
				})
				.then(function(response) {
					if (response.code == 100) {
						writeUserId2Storage(response.data.extend.user.userId);
					} else if (response.code == 200) {
						console.log(response.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}

		// 检查登录
		function checkLogin() {
			// 检查cookie
			var loginCookie = getCookie("userId");
			if(loginCookie==""){
				console.log("cookie不存在");
				visitor2login();
			}
		}

		// 随机生成用户名
		function random(prefix, randomLength) {
			// 兼容更低版本的默认值写法
			prefix === undefined ? prefix = "游客_" : prefix;
			randomLength === undefined ? randomLength = 8 : randomLength;

			// 设置随机用户名
			// 用户名随机词典数组
			let nameArr = [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				["a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
					"v", "w", "x", "y", "z"
				]
			]
			// 随机名字字符串
			let name = prefix;
			// 循环遍历从用户词典中随机抽出一个
			for (var i = 0; i < randomLength; i++) {
				// 随机生成index
				let index = Math.floor(Math.random() * 2);
				let zm = nameArr[index][Math.floor(Math.random() * nameArr[index].length)];
				// 如果随机出的是英文字母
				if (index === 1) {
					// 则百分之50的概率变为大写
					if (Math.floor(Math.random() * 2) === 1) {
						zm = zm.toUpperCase();
					}
				}
				// 拼接进名字变量中
				name += zm;
			}
			// 将随机生成的名字返回
			return name;
		}
