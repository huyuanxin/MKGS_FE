<template>
  <div style="overflow: auto">
      <div class="clearfix clear"></div> 
    <div id="test_questions">
        <div class="container">
          <div class="row"></div>
            <div id="list_2" class="test_item">
              <h2>用鼠标双击标识出您疼痛的部位。<!-- ，并在最疼痛的部位作下标记。 --></h2>
              <div id="model_all" class="test_item2">
                <div id="womenormen" class="womenormen">
                  <a href="JavaScript:void(0);" class="men people_model_active" data-sex="1"><p>男</p></a>
                  <a href="JavaScript:void(0);" class="women" data-sex="2"><p>女</p></a>
                </div>
                <div class="magnify">
                  <div class="magnify_glass"> </div>
                  
                    <div id="people_model" class="">
                      <div id="draggable"></div>
                    </div>
                  <div class="element_to_magnify">
                      <img alt="">
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import 'utils/3deye.js' //people model
import 'utils/jquery.jfMagnify.min.js' //轮播插件S


export default {
  name: 'SmartLeadingExamining',
  data() {
    return {
        moveFlag: 0, // 是否移动的flag
    }
  },
  mounted() {
      this.init()
  },
  methods: {
    init() {
        var proto = $.ui.mouse.prototype, _mouseInit = proto._mouseInit;
        $.extend(proto, {
            _mouseInit: function () {
                this.element.bind("touchstart." + this.widgetName, $.proxy(this, "_touchStart"));
                _mouseInit.apply(this, arguments);
            }, _touchStart: function (event) {
                this.element.bind("touchmove." + this.widgetName, $.proxy(this, "_touchMove")).bind("touchend." + this.widgetName, $.proxy(this, "_touchEnd"));
                this._modifyEvent(event);
                $(document).trigger($.Event("mouseup"));
                //reset mouseHandled flag in ui.mouse
                this._mouseDown(event);
                //console.log(this);
                //return false;

                //--------------------touchStart do something--------------------
                // console.log("i touchStart!");

            }, _touchMove: function (event) {
                this.moveFlag = 1;
                this._modifyEvent(event);
                this._mouseMove(event);

                //--------------------touchMove do something--------------------
                // console.log("i touchMove!");

            }, _touchEnd: function (event) {
                // 主动触发点击事件
                if (this.moveFlag == 0) {
                    var evt = document.createEvent('Event');
                    evt.initEvent('click', true, true);
                    // this.handleElement[0].dispatchEvent(evt);
                }
                this.element.unbind("touchmove." + this.widgetName).unbind("touchend." + this.widgetName);
                this._mouseUp(event);
                this.moveFlag = 0;

                //--------------------touchEnd do something--------------------
                // console.log("i touchEnd!");

            }, _modifyEvent: function (event) {
                event.which = 1;
                var target = event.originalEvent.targetTouches[0];
                event.pageX = target.clientX;
                event.pageY = target.clientY;
            }
        });
    


    $(function() {
	//提前请求数据
	var self = (function() {
		function self() {}
		// team.dataObj = {

		// }
		return self;
	})();
	self.selfListObj = {
		list_1: "",
		list_2: "",
		list_3: "",
		list_4: "",
		list_5: "",
		list_6: "",
		list_7: "",
		list_8: "",
		list_9: "",
		list_10: "",
		name: "",
		sex: "",
		age: "",
		mobilePhone: "",
		interflowTime: ""

	};
	// self.selfUserObj = {
	// 	user_name: "",
	// 	user_sex: "",
	// 	user_age: "",
	// 	user_tel: "",
	// 	user_day: ""
	// };
	//插件
	function men_3d() {
		$("#people_model").vc3dEye({
			imagePath: "imgs/men_3d/",
			totalImages: 43,
			imageExtension: "png"
		});
		console.log(2222222222)
		console.dir($("#people_model"))
		var bg_src = $("#people_model").css("background-image").split("\"")[1];
		if (bg_src == undefined) bg_src = $("#people_model").css("backgroundImage").slice(4, -1);
		$(".magnified_element img").attr("src", bg_src);
	};

	function women_3d() {
		$("#people_model").vc3dEye({
			imagePath: "imgs/women_3d/",
			totalImages: 58,
			imageExtension: "png"
		});
		var bg_src = $("#people_model").css("background-image").split("\"")[1];
		if (bg_src == undefined) bg_src = $("#people_model").css("backgroundImage").slice(4, -1);
		$(".magnified_element img").attr("src", bg_src);
	};
	//放大镜
	$(".magnify").jfMagnify();
	men_3d();


	//弹窗进度条
	//百分数增加，0-30时为红色，30-60为黄色，60-90为蓝色，>90为绿色
	function increment(value) {
		value += 1;
		$("#prog").css("width", value + "%");
		if (value >= 0 && value <= 30) {
			$("#prog").addClass("progress-bar-danger");
		} else if (value >= 30 && value <= 60) {
			$("#prog").removeClass("progress-bar-danger");
			$("#prog").addClass("progress-bar-warning");
		} else if (value >= 60 && value <= 90) {
			$("#prog").removeClass("progress-bar-warning");
			$("#prog").addClass("progress-bar-info");
		} else if (value >= 90 && value <= 101) {
			$("#prog").removeClass("progress-bar-info");
			$("#prog").addClass("progress-bar-success");
		} else {
			// setTimeout(reset,3000);
			return;
		}
		// st = setTimeout(increment,time);
	};
	$("#womenormen").find("a").on("click", function() {
		var _this = $(this);
		_this.addClass("people_model_active").siblings().removeClass("people_model_active");
		if (_this.attr("data-sex") == 1) {
			men_3d();
		} else if (_this.attr("data-sex") == 2) {
			women_3d();
		}
	});



	//实现滚动条无法滚动
	var mo = function(e) {
		e.preventDefault();
	};

	/***禁止滑动***/
	function stop() {
		document.body.style.overflow = 'hidden';
		document.addEventListener("touchmove", mo, false); //禁止页面滑动
	}

	/***取消滑动限制***/
	function move() {
		document.body.style.overflow = ''; //出现滚动条
		document.removeEventListener("touchmove", mo, false);
	}

	const BODY1 = [
		//1-7
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":47, "H":60, "X":118, "Y":17},
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":90, "H":23, "X":94, "Y":78}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":73, "H":40, "X":103, "Y":102}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":71, "H":65, "X":104, "Y":143}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":32, "H":107, "X":71, "Y":101},
				{ "W":34, "H":107, "X":176, "Y":101},
				{ "W":44, "H":77, "X":50, "Y":208},
				{ "W":44, "H":77, "X":189, "Y":208}
			]
		},
		{
			"areaName": "生殖器",
			"coordinate": [
				{ "W":93, "H":40, "X":95, "Y":209}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":93, "H":223, "X":95, "Y":250}
			]
		}
	];
	const BODY2=[
		//8-11
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":22, "H":45, "X":110, "Y":15},
				{ "W":6, "H":45, "X":133, "Y":15},
				{ "W":30, "H":61, "X":140, "Y":15}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":20, "H":33, "X":118, "Y":60},
				{ "W":10, "H":8, "X":107, "Y":85},
				{ "W":13, "H":17, "X":138, "Y":76}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":50, "H":53, "X":120, "Y":93}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":50, "H":80, "X":120, "Y":145}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":23, "H":183, "X":97, "Y":93},
				{ "W":15, "H":50, "X":120, "Y":249},
				{ "W":25, "H":45, "X":170, "Y":225}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":50, "H":24, "X":120, "Y":225},
				{ "W":36, "H":51, "X":134, "Y":249},
				{ "W":12, "H":24, "X":108, "Y":276},
				{ "W":51, "H":176, "X":103, "Y":300},
				{ "W":12, "H":53, "X":154, "Y":299},
				{ "W":25, "H":24, "X":154, "Y":429},
				{ "W":12, "H":16, "X":154, "Y":460}
			]
		}
	];
	const BODY3=[
			//12-13
			{
				"areaName": "头部",
				"coordinate": [
					{ "W":65, "H":56, "X":107, "Y":12}
				]
			},
			{
				"areaName": "肩颈部",
				"coordinate": [
					{ "W":51, "H":25, "X":105, "Y":69}
				]
			},
			{
				"areaName": "背部",
				"coordinate": [
					{ "W":40, "H":96, "X":94, "Y":94}
				]
			},
			{
				"areaName": "臀部",
				"coordinate": [
					{ "W":62, "H":60, "X":88, "Y":189},
					{ "W":8, "H":30, "X":150, "Y":219}
				]
			},
			{
				"areaName": "双上肢",
				"coordinate": [
					{ "W":41, "H":96, "X":134, "Y":93},
					{ "W":29, "H":30, "X":150, "Y":189},
					{ "W":27, "H":30, "X":158, "Y":219},
					{ "W":47, "H":47, "X":168, "Y":250}
				]
			},
			{
				"areaName": "双下肢",
				"coordinate": [
					{ "W":76, "H":93, "X":92, "Y":250},
					{ "W":87, "H":125, "X":92, "Y":343}
				]
			}
	];
	const BODY4 = [
		//14
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":59, "H":54, "X":105, "Y":12}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":94, "H":40, "X":88, "Y":66}
			]
		},
		{
			"areaName": "背部",
			"coordinate": [
				{ "W":49, "H":43, "X":97, "Y":106},
				{ "W":54, "H":45, "X":101, "Y":149}
			]
		},
		{
			"areaName": "臀部",
			"coordinate": [
				{ "W":74, "H":61, "X":101, "Y":194}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":11, "H":43, "X":86, "Y":106},
				{ "W":15, "H":111, "X":86, "Y":149},
				{ "W":34, "H":43, "X":146, "Y":106},
				{ "W":36, "H":45, "X":155, "Y":149},
				{ "W":23, "H":53, "X":175, "Y":194},
				{ "W":42, "H":43, "X":182, "Y":247}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":79, "H":97, "X":101, "Y":255},
				{ "W":83, "H":114, "X":98, "Y":352}
			]
		}
	];
	const BODY5=[
		//15-20
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":48, "H":51, "X":118, "Y":13},
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":91, "H":34, "X":96, "Y":63}
			]
		},
		{
			"areaName": "背部",
			"coordinate": [
				{ "W":71, "H":101, "X":106, "Y":96}
			]
		},
		{
			"areaName": "臀部",
			"coordinate": [
				{ "W":89, "H":63, "X":97, "Y":196}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":33, "H":99, "X":72, "Y":97},
				{ "W":44, "H":84, "X":52, "Y":195},
				{ "W":33, "H":99, "X":178, "Y":97},
				{ "W":37, "H":81, "X":187, "Y":195}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":91, "H":205, "X":97, "Y":258}
			]
		}
	];
	const BODY6 = [
		//21-24
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":63, "H":45, "X":111, "Y":13},
				{ "W":24, "H":20, "X":114, "Y":58}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":27, "H":20, "X":138, "Y":58},
				{ "W":67, "H":20, "X":115, "Y":78}
			]
		},
		{
			"areaName": "背部",
			"coordinate": [
				{ "W":49, "H":26, "X":141, "Y":98},
				{ "W":37, "H":52, "X":141, "Y":124},
				{ "W":45, "H":29, "X":133, "Y":176}
			]
		},
		{
			"areaName": "臀部",
			"coordinate": [
				{ "W":55, "H":29, "X":126, "Y":205},
				{ "W":69, "H":24, "X":120, "Y":234},
				{ "W":9, "H":9, "X":111, "Y":249}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":38, "H":78, "X":103, "Y":98},
				{ "W":45, "H":29, "X":88, "Y":176},
				{ "W":46, "H":29, "X":80, "Y":205},
				{ "W":42, "H":15, "X":78, "Y":234},
				{ "W":43, "H":9, "X":68, "Y":249},
				{ "W":47, "H":36, "X":59, "Y":258},
				{ "W":16, "H":81, "X":178, "Y":124},
				{ "W":9, "H":29, "X":181, "Y":205}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":76, "H":155, "X":106, "Y":258}
			]
		}
	];

	const BODY7 = [
		//25
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":30, "H":62, "X":111, "Y":16},
				{ "W":35, "H":45, "X":141, "Y":16}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":24, "H":17, "X":141, "Y":61},
				{ "W":44, "H":16, "X":131, "Y":78}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":14, "H":41, "X":110, "Y":109}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":14, "H":37, "X":110, "Y":150},
				{ "W":7, "H":25, "X":110, "Y":187}
			]
		},
		{
			"areaName": "背部",
			"coordinate": [
				{ "W":25, "H":93, "X":156, "Y":94}
			]
		},
		{
			"areaName": "臀部",
			"coordinate": [
				{ "W":28, "H":35, "X":151, "Y":187},
				{ "W":40, "H":12, "X":139, "Y":222},
				{ "W":42, "H":15, "X":134, "Y":234}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":32, "H":93, "X":124, "Y":94},
				{ "W":12, "H":35, "X":139, "Y":187},
				{ "W":22, "H":47, "X":117, "Y":187},
				{ "W":22, "H":15, "X":112, "Y":234},
				{ "W":10, "H":24, "X":116, "Y":249},
				{ "W":32, "H":49, "X":84, "Y":249}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":45, "H":176, "X":126, "Y":249},
				{ "W":10, "H":78, "X":116, "Y":273},
				{ "W":69, "H":45, "X":103, "Y":425},
				{ "W":5, "H":38, "X":172, "Y":350}
			]
		}
	];

	const BODY8=[
		//26-29
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":20, "H":65, "X":110, "Y":15},
				{ "W":45, "H":45, "X":130, "Y":15},
				{ "W":11, "H":14, "X":130, "Y":60}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":25, "H":14, "X":141, "Y":60},
				{ "W":35, "H":20, "X":130, "Y":74},
				{ "W":8, "H":16, "X":165, "Y":78}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":28, "H":54, "X":109, "Y":94}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":27, "H":71, "X":110, "Y":148}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":13, "H":9, "X":107, "Y":293},
				{ "W":33, "H":96, "X":137, "Y":94},
				{ "W":10, "H":69, "X":170, "Y":94},
				{ "W":32, "H":53, "X":137, "Y":190},
				{ "W":25, "H":23, "X":129, "Y":243},
				{ "W":35, "H":26, "X":107, "Y":267}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":8, "H":41, "X":169, "Y":203},
				{ "W":22, "H":24, "X":115, "Y":219},
				{ "W":14, "H":24, "X":116, "Y":243},
				{ "W":12, "H":198, "X":142, "Y":267},
				{ "W":18, "H":222, "X":154, "Y":243},
				{ "W":22, "H":47, "X":120, "Y":293},
				{ "W":12, "H":198, "X":142, "Y":267},
				{ "W":18, "H":222, "X":154, "Y":243},
				{ "W":12, "H":60, "X":130, "Y":340},
				{ "W":35, "H":47, "X":107, "Y":418}
			]
		}
	];

	const BODY9 =[
		//30
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":58, "H":46, "X":114, "Y":15},
				{ "W":17, "H":16, "X":118, "Y":61},
				{ "W":8, "H":16, "X":135, "Y":61},
				{ "W":8, "H":10, "X":143, "Y":61}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":14, "H":10, "X":151, "Y":61},
				{ "W":22, "H":6, "X":143, "Y":71},
				{ "W":48, "H":22, "X":132, "Y":77}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":42, "H":48, "X":110, "Y":99}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":42, "H":78, "X":110, "Y":147}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":35, "H":150, "X":152, "Y":99},
				{ "W":30, "H":53, "X":142, "Y":249},
				{ "W":20, "H":45, "X":95, "Y":225}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":37, "H":24, "X":115, "Y":225},
				{ "W":27, "H":53, "X":115, "Y":249},
				{ "W":53, "H":46, "X":119, "Y":302},
				{ "W":51, "H":73, "X":128, "Y":348},
				{ "W":70, "H":49, "X":104, "Y":421}
			]
		}
	];
	
	const BODY10 =[
		//31-33
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":54, "H":46, "X":116, "Y":17},
				{ "W":13, "H":15, "X":120, "Y":63},
				{ "W":8, "H":15, "X":133, "Y":63},
				{ "W":7, "H":13, "X":141, "Y":63},
				{ "W":5, "H":8, "X":148, "Y":63}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":9, "H":22, "X":132, "Y":78},
				{ "W":7, "H":24, "X":141, "Y":76},
				{ "W":5, "H":29, "X":148, "Y":71},
				{ "W":15, "H":37, "X":153, "Y":63},
				{ "W":20, "H":14, "X":168, "Y":81},
				{ "W":8, "H":6, "X":124, "Y":94}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":57, "H":46, "X":111, "Y":100}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":57, "H":26, "X":111, "Y":146},
				{ "W":65, "H":42, "X":108, "Y":172}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":29, "H":77, "X":168, "Y":95},
				{ "W":30, "H":1233, "X":173, "Y":172},
				{ "W":16, "H":58, "X":92, "Y":172},
				{ "W":35, "H":45, "X":73, "Y":230}
			]
		},
		{
			"areaName": "生殖器",
			"coordinate": [
				{ "W":65, "H":35, "X":108, "Y":214}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":65, "H":94, "X":108, "Y":249},
				{ "W":12, "H":48, "X":173, "Y":295},
				{ "W":67, "H":83, "X":118, "Y":343},
				{ "W":80, "H":51, "X":98, "Y":426}
			]
		}
	];

	const BODY11 = [
		//34-38(36除外)
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":27, "H":61, "X":118, "Y":16},
				{ "W":5, "H":58, "X":145, "Y":19},
				{ "W":4, "H":51, "X":150, "Y":22},
				{ "W":5, "H":46, "X":154, "Y":23},
				{ "W":7, "H":36, "X":159, "Y":27}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":4, "H":4, "X":150, "Y":73},
				{ "W":5, "H":8, "X":154, "Y":69},
				{ "W":7, "H":14, "X":159, "Y":63},
				{ "W":38, "H":11, "X":128, "Y":77},
				{ "W":68, "H":8, "X":118, "Y":88},
				{ "W":98, "H":11, "X":97, "Y":96}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":63, "H":52, "X":109, "Y":107}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":61, "H":38, "X":111, "Y":159},
				{ "W":7, "H":24, "X":172, "Y":173},
				{ "W":72, "H":17, "X":107, "Y":197}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":35, "H":66, "X":172, "Y":107},
				{ "W":33, "H":63, "X":179, "Y":173},
				{ "W":34, "H":57, "X":185, "Y":236},
				{ "W":21, "H":52, "X":88, "Y":107},
				{ "W":20, "H":38, "X":91, "Y":159},
				{ "W":16, "H":63, "X":75, "Y":171},
				{ "W":16, "H":37, "X":91, "Y":197},
				{ "W":45, "H":49, "X":52, "Y":234}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":8, "H":23, "X":99, "Y":234},
				{ "W":7, "H":21, "X":179, "Y":236},
				{ "W":87, "H":222, "X":99, "Y":257}
			]
		},
		{
			"areaName": "生殖器",
			"coordinate": [
				{ "W":72, "H":43, "X":107, "Y":214}
			]
		}
	];

	const BODY12 = [
		//36
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":24, "H":58, "X":122, "Y":23},
				{ "W":11, "H":53, "X":146, "Y":25},
				{ "W":9, "H":37, "X":157, "Y":31}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":6, "H":22, "X":157, "Y":68},
				{ "W":11, "H":12, "X":146, "Y":78},
				{ "W":16, "H":9, "X":130, "Y":81},
				{ "W":68, "H":11, "X":119, "Y":90},
				{ "W":98, "H":16, "X":99, "Y":101}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":64, "H":37, "X":110, "Y":117}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":64, "H":54, "X":110, "Y":154},
				{ "W":6, "H":29, "X":174, "Y":179}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":31, "H":62, "X":174, "Y":117},
				{ "W":29, "H":55, "X":182, "Y":179},
				{ "W":26, "H":58, "X":192, "Y":234},
				{ "W":15, "H":55, "X":95, "Y":117},
				{ "W":25, "H":36, "X":85, "Y":172},
				{ "W":29, "H":33, "X":75, "Y":208},
				{ "W":36, "H":41, "X":55, "Y":241}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":5, "H":16, "X":99, "Y":241},
				{ "W":4, "H":23, "X":182, "Y":234},
				{ "W":86, "H":225, "X":100, "Y":257}
			]
		},
		{
			"areaName": "生殖器",
			"coordinate": [
				{ "W":78, "H":49, "X":104, "Y":208}
			]
		}
	];

	const BODY13 = [
		//39-43
		{
			"areaName": "头部",
			"coordinate": [
				{ "W":28, "H":59, "X":115, "Y":20},
				{ "W":10, "H":56, "X":143, "Y":23},
				{ "W":10, "H":43, "X":153, "Y":29}
			]
		},
		{
			"areaName": "肩颈部",
			"coordinate": [
				{ "W":4, "H":7, "X":153, "Y":72},
				{ "W":51, "H":11, "X":115, "Y":79},
				{ "W":71, "H":7, "X":105, "Y":90},
				{ "W":107, "H":13, "X":87, "Y":97}
			]
		},
		{
			"areaName": "胸部",
			"coordinate": [
				{ "W":64, "H":41, "X":109, "Y":110}
			]
		},
		{
			"areaName": "腹部",
			"coordinate": [
				{ "W":64, "H":62, "X":109, "Y":151},
				{ "W":2, "H":44, "X":107, "Y":169},
				{ "W":6, "H":40, "X":173, "Y":173}
			]
		},
		{
			"areaName": "双上肢",
			"coordinate": [
				{ "W":31, "H":63, "X":173, "Y":110},
				{ "W":29, "H":44, "X":181, "Y":173},
				{ "W":40, "H":70, "X":191, "Y":217},
				{ "W":32, "H":59, "X":77, "Y":110},
				{ "W":37, "H":44, "X":70, "Y":169},
				{ "W":28, "H":27, "X":66, "Y":213},
				{ "W":38, "H":47, "X":49, "Y":240}
			]
		},
		{
			"areaName": "双下肢",
			"coordinate": [
				{ "W":8, "H":31, "X":94, "Y":225},
				{ "W":7, "H":34, "X":179, "Y":222},
				{ "W":92, "H":225, "X":94, "Y":256}
			]
		},
		{
			"areaName": "生殖器",
			"coordinate": [
				{ "W":77, "H":43, "X":102, "Y":213}
			]
		}
	];
	
	/**
	 * 获取身体指定点所在区域
	 * @param {*} x 指定点的 x 坐标
	 * @param {*} y 指定点的 y 坐标
	 */
	function getBodyArea(num,y, x) {
		let BODY=[];
		let areaResult = '';
		console.log("getBodyArea()执行")
		console.log("bodyposition",num,"x"+x,"y"+y)
		if (num >= 1 && num <= 7) {
			BODY = BODY1;
    	}else if (num >= 8 && num <= 11){
			BODY = BODY2;
		}else if (num >= 12 && num <= 13){
			BODY = BODY3;
		}else if (num == 14){
			BODY = BODY4;
		}
		else if (num >= 15 && num <= 20){
			BODY = BODY5;
		}else if (num >= 21 && num <= 24){
			BODY = BODY6;
			//25、26
		}else if (num == 25){
			BODY = BODY7;
			//29、30
		}else if (num >= 26 && num <= 29){
			BODY = BODY8;
			//29、30
		}else if (num == 30){
			BODY = BODY9;
		}else if (num >= 31 && num <= 33){
			BODY = BODY10;
		}else if (num >= 34 && num <= 38 && num!= 36){
			BODY = BODY11;
		}else if (num == 36){
			BODY = BODY12;
		}else if (num >= 39 && num <= 43){
			BODY = BODY13;
		}

		//31-33 34-38 39-43
		for(var bodyArea of BODY){
    	let areaName = bodyArea.areaName;
    	let areaPostition = bodyArea.coordinate;
    	areaPostition.forEach(p => {
        	if (x >= p.X && y >= p.Y && x <= p.X + p.W && y <= p.Y + p.H) {
            	areaResult = areaName;
            	return areaResult; 
        	}
    	})
		}
		return areaResult
	}

	/**
	 * original
	 * @param {*} numy 
	 * @param {*} numx 
	 */
	function model_xy(numy,numx) {
		console.log("model_xy()执行");
		var numy = numy;
		var numx = numx;
		// console.log("y" + numy);
		// console.log("x" + numx);
		if(num >= 1 && num <= 7){
			if (numy >= 19 && numy <= 77) {
				if (numx >= 118 && numx <= 165) { return "头部";}
			} 
			if (numy >=78  && numy <= 101) {
				if(numx >= 94 && numx <= 184){return "肩颈部";}
			} 
			if (numy >= 102 && numy <= 142) {
				if(numx >= 103 && numx <= 176){return "胸部";}
			}
			if (numy >= 143 && numy <= 208) {
				if ((numx >= 104 && numx <= 175)) {return "腹部";}
			} 
			if (numy >= 101 && numy <= 208) {
				if ((numx >= 71 && numx <= 103) || (numx >= 176 && numx <= 210)) {return "双上肢";}
			} 
			if (numy >= 208 && numy <= 285) {
				if ((numx >= 50 && numx <= 94) || (numx >= 189 && numx <= 233)) {return "双上肢";}
			}
			// if (numy >= 98 && numy <= 285) {
			// 	if ((numx >= 50 && numx <= 108) || (numx >= 175 && numx <= 232)) {return "双上肢";}	
			// 	else if (numx >= 110 && numx <= 170) {return "腹部";}
			// }
			if (numy >= 209 && numy <= 249) {
				if(numx >= 95 && numx <= 188){return "生殖器";}
			}
			if (numy >= 250 && numy <= 473) {
				if(numx >= 95 && numx <= 188){return "双下肢";}
			}  
			else {
				return "未识别";
			}
		}
		

	}
	//model
	$("#draggable").draggable({
		drag: function(event, ui) {
				stop(); //禁止屏幕拖动
			}
	});
	$(".magnify_glass").on('touchstart', function(e) {
		stop(); //禁止屏幕拖动
	});
	$(".magnify_glass").on('touchmove', function(e) {
		stop(); //禁止屏幕拖动
		e.preventDefault();
		// $("#draggable").remove();
	});
	$(".magnify_glass").on('draggable', function(e) {
		stop(); //禁止屏幕拖动
		// $("#draggable").remove();
	});
	$(".magnify_glass").on('touchend', function(e) {
		move(); //禁止屏幕拖动
	});


	//创建小红块
	$(".magnify").on("dblclick", function(e) {
		$("#draggable").remove();//移除id=draggable的元素
		$(".magnify").append('<div id="draggable"></div>');//append() 方法在被选元素的结尾插入指定内容。
		let posX = parseInt(e.pageX - $("#people_model").offset().left),//offset() 方法返回被选元素相对于文档的偏移坐标。
			posY = parseInt(e.pageY - $("#people_model").offset().top);
		
		$("#draggable").css('left', posX);//css() 方法为被选元素设置或返回一个或多个样式属性。
		$("#draggable").css('top', posY);

		let bg_src = $("#people_model").css("background-image");
    	let filename = bg_src.substring(bg_src.lastIndexOf("/") + 1);
    	let num = filename.substring(0, filename.lastIndexOf("."));
		self.selfListObj.list_2 = getBodyArea(num,posY, posX);
		console.log("选中了"+self.selfListObj.list_2);
	});
	//创建小红块--兼容手机端
	var second=0;
	$('.magnify').on('click', function (e) {
 	    second++;
        setTimeout(function () {
            second = 0;
        }, 500);
        if (second > 1) {
		$("#draggable").remove();
		$(".magnify").append('<div id="draggable"></div>');
			let posX = parseInt(e.pageX - $("#people_model").offset().left),
				posY = parseInt(e.pageY - $("#people_model").offset().top);
			$("#draggable").css('left', posX);
			$("#draggable").css('top', posY);
			// console.log("posX:" + posX);
			// console.log("posY:" + posY);
			// model_xy(posY);
			let bg_src = $("#people_model").css("background-image");
    		let filename = bg_src.substring(bg_src.lastIndexOf("/") + 1);
    		let num = filename.substring(0, filename.lastIndexOf("."));
			self.selfListObj.list_2 = getBodyArea(num,posY, posX);
			console.log("选中了"+self.selfListObj.list_2);
            second = 0;
        }

    });

	//更换放大镜照片
	$("#people_model").on("mousemove touchmove", function() {
		var bg_src = $("#people_model").css("background-image").split("\"")[1];

		if (bg_src == undefined) bg_src = $("#people_model").css("backgroundImage").slice(4, -1);
		$(".magnified_element img").attr("src", bg_src);
	})


	//点击尺子
	$("#draggable_parent").on("click", function(e) {
		 var posX = e.pageX - $("#draggable_parent").offset().left;
		 var _par_width = $("#draggable_parent").width();
		// 	posY = e.pageY - $("#people_model").offset().top;
		$("#draggable_ruler").css('left', posX);
		var pain = Math.ceil(posX / _par_width * 100);
			$("#list_3").attr("data-pain", pain)
		// console.log("posX:" + e.pageX);
		// console.log("$(#draggable_ruler).offset().left:" + $("#draggable_ruler").offset().left);
	});



	//疼痛检测的尺子
	$("#draggable_ruler").draggable({
		drag: function(event, ui) {
			var _this = this,
				_left = parseInt($(_this).css("left"));
			var clientWidth = parseInt(document.body.clientWidth);
			var _par_width = $("#draggable_parent").width();
			var pain = Math.ceil(_left / _par_width * 100);
			$("#list_3").attr("data-pain", pain)
				// console.log(pain);
			if (clientWidth >= 960 && clientWidth > 1177) {
				if (_left <= 57) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 150 && _left <= 200) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 304 && _left <= 358) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 469 && _left <= 522) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 615 && _left <= 668) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 767 && _left <= 822) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}
			if (clientWidth < 1177 && clientWidth > 960) {
				if (_left <= 33) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 120 && _left <= 165) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 250 && _left <= 291) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 384 && _left <= 428) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 505 && _left <= 549) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 632 && _left <= 674) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}
			if (clientWidth < 970 && clientWidth > 768) {
				if (_left <= 24) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 89 && _left <= 124) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 188 && _left <= 222) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 291 && _left <= 324) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 383 && _left <= 416) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 480 && _left <= 511) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}
			if (clientWidth <= 768 && clientWidth > 414) {
				if (_left <= 32) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 115 && _left <= 153) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 232 && _left <= 272) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 357 && _left <= 397) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 470 && _left <= 510) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 587 && _left <= 627) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}
			if (clientWidth <= 414 && clientWidth > 321) {
				if (_left <= 17.6) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 60 && _left <= 81) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 122 && _left <= 143) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 188 && _left <= 209) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 248 && _left <= 268) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 309 && _left <= 331) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}
			if (clientWidth <= 320) {
				if (_left <= 14) {
					$(".tt_ti_1").css("display", "block");
				} else if (_left > 48 && _left <= 66) {
					$(".tt_ti_2").css("display", "block");
				} else if (_left > 100 && _left <= 118) {
					$(".tt_ti_3").css("display", "block");
				} else if (_left > 156 && _left <= 173) {
					$(".tt_ti_4").css("display", "block");
				} else if (_left > 205 && _left <= 223) {
					$(".tt_ti_5").css("display", "block");
				} else if (_left > 257 && _left <= 274) {
					$(".tt_ti_6").css("display", "block");
				} else {
					$("#tt_wenzi div").css("display", "none");
				}
			}


		},
		axis: "x",
		containment: "parent"
	});
	//评分

	function score() {
		var score_sum = 100,
			req_1 = 0,
			req_2 = 0,
			req_3 = 0,
			req_4 = 0,
			req_5 = 0,
			req_6 = 0,
			req_7 = 0,
			req_8 = 0,
			req_9 = 0,
			req_10 = 0,
			zongshu = 0;
		req_1 = $("#list_1").find("input[type='radio']:checked").attr("data-sum"); //0-10
		// req_1 = $("#list_1").find("input[type='radio']:checked").attr("data-sum");
		req_3 = Math.ceil(parseInt($("#list_3").attr("data-pain")) / 10); //0 - 10

		$('#list_4 input[type="checkbox"]:checked').each(function() { //0 - 16
			req_4 += parseInt($(this).attr("data-sum"));
		});

		$('#list_5 input[type="checkbox"]:checked').each(function() { //0 - 12
			req_5 += parseInt($(this).attr("data-sum"));
		});

		req_6 = $("#list_6").find("input[type='radio']:checked").attr("data-sum"); //0 - 15

		req_7 = $("#list_7").find("input[type='radio']:checked").attr("data-sum"); //0 - 15
		req_8 = $("#list_8").find("input[type='radio']:checked").attr("data-sum"); //0 - 15
		req_10 = $("#list_10").find("input[type='radio']:checked").attr("data-sum"); //0 - 10
		zongshu = score_sum - req_1 - req_2 - req_3 - req_4 - req_5 - req_6 - req_7 - req_8 - req_9 - req_10;
		return zongshu;
	};


	//弹窗
	$("#introduction .tanchuang").on("click", function() {
		$("#model").css("display", "block");
	});
	$(".fdj").on("click", function() {
		$("#model").css("display", "block");
	});
	//DOM操作
	$("#model").on("click", ".my_close", function() {
		$("#model").css("display", "none");
		window.location.reload();
	});

	//正则
	// 验证中文名称
	function isChinaName(name) {
		var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
		return pattern.test(name);
	}

	// 验证手机号
	function isPhoneNo(phone) {
		var pattern = /^1[34578]\d{9}$/;
		return pattern.test(phone);
	}

	function yanzheng() {
		var str = '';

		// 判断手机号码
		if ($.trim($('#list_tel').val()).length == 0) {
			str += '手机号没有输入\n';
			$("#list_tel").addClass("false_valid").siblings().addClass("false_valid");
			$('#list_tel').focus();
		} 
		if (isPhoneNo($.trim($('#list_tel').val())) == false) {
				str += '手机号码不正确\n';
				$("#list_tel").addClass("false_valid").siblings().addClass("false_valid");
				// $("#list_tel").removeClass("false_valid").siblings().removeClass("false_valid");
				$('#list_tel').focus();
		}else if(isPhoneNo($.trim($('#list_tel').val()) == true)){
			$("#list_tel").removeClass("false_valid").siblings().removeClass("false_valid");
		}
		// 判断名称
		if ($.trim($('#list_user').val()).length == 0) {
			str += '名称没有输入\n';
			$("#list_user").addClass("false_valid").siblings().addClass("false_valid");
			$('#list_user').focus();
		} else {
			if (isChinaName($.trim($('#list_user').val())) == false) {
				str += '名称不合法\n';
				$("#list_user").addClass("false_valid").siblings().addClass("false_valid");
				$('#list_user').focus();
			}
		}
		// list_4
		var list_4_len=$('#list_4 input[type="checkbox"]:checked').length;
		if(list_4_len == 0){
			str += '第4题还没有选择！\n';
			$('#list_4 input[type="checkbox"]').parent().addClass("false_valid");
		}else{
			$('#list_4 input[type="checkbox"]').parent().removeClass("false_valid");
		}
		// list_5
		var list_5_len=$('#list_5 input[type="checkbox"]:checked').length;
		if(list_5_len == 0){
			str += '第5题还没有选择！\n';
			$('#list_5 input[type="checkbox"]').parent().addClass("false_valid");
		}else{
			$('#list_5 input[type="checkbox"]').parent().removeClass("false_valid");
		}


		// if(str != ''){
		// 	alert("手机号码不正确");  
		// 	return false; 
		// }
		var len=$("#form_xx").find(".false_valid").length;
		var up_len = $("#test_questions").find(".false_valid").length;

		var domain = 'http://43.247.176.217:8080/hobbes/';
		if(len == 0 && up_len == 0){  
			// $('#form_xx').submit();
			$.post(domain + "/admin/usersPainTest/addPainTest",self.selfListObj, function(result) {
				// console.log(self.selfListObj);
				// console.log(score());
				increment(score());
				$("#defen").html(score());
				$("#model").css("display", "block");
				$('#form_xx')[0].reset();

			}); 
		}else{
			alert(str);  
			return false; 
		}


	};

	$("#list_user").on("change keyup", function() {
		// 判断名称
		if ($.trim($('#list_user').val()).length == 0) {
			$("#list_user").addClass("false_valid").siblings().addClass("false_valid");
		} else {
			$("#list_user").removeClass("false_valid").siblings().removeClass("false_valid");
		}
		if (isChinaName($.trim($('#list_user').val())) == false) {
			$("#list_user").addClass("false_valid").siblings().addClass("false_valid");
		} else {
			$("#list_user").removeClass("false_valid").siblings().removeClass("false_valid");
		}
	});
	$("#list_tel").on("change keyup", function() {
		// 判断手机
		if ($.trim($('#list_tel').val()).length == 0) {
			$("#list_tel").addClass("false_valid").siblings().addClass("false_valid");
		} else {
			$("#list_tel").removeClass("false_valid").siblings().removeClass("false_valid");
		}
		if (isPhoneNo($.trim($('#list_tel').val())) == false) {
			$("#list_tel").addClass("false_valid").siblings().addClass("false_valid");
		} else {
			$("#list_tel").removeClass("false_valid").siblings().removeClass("false_valid");
		}
	});
	//提交操作
	$("#submit").on("click", function() {

		var list_4_val = '',
			list_5_val = '';
		$('#list_4 input[type="checkbox"]:checked').each(function() {
			list_4_val += $(this).val() + ',';
		});
		if (list_4_val.length > 0) {
			//得到选中的checkbox值序列 
			list_4_val = list_4_val.substring(0, list_4_val.length - 1);
		}

		$('#list_5 input[type="checkbox"]:checked').each(function() {
			list_5_val += $(this).val() + ',';
		});
		if (list_5_val.length > 0) {
			//得到选中的checkbox值序列 
			list_5_val = list_5_val.substring(0, list_5_val.length - 1);
		}
		self.selfListObj.list_1 = $("#list_1").find("input[type='radio']:checked").val();
		// self.selfListObj.list_2 = self.selfListObj.xy;
		self.selfListObj.list_3 = $("#list_3").attr("data-pain");
		self.selfListObj.list_4 = list_4_val;
		self.selfListObj.list_5 = list_5_val;
		self.selfListObj.list_6 = $("#list_6").find("input[type='radio']:checked").val();
		self.selfListObj.list_7 = $("#list_7").find("input[type='radio']:checked").val();
		self.selfListObj.list_8 = $("#list_8").find("input[type='radio']:checked").val();
		self.selfListObj.list_9 = $("#dijiuti").val();
		self.selfListObj.list_10 = $("#list_10").find("input[type='radio']:checked").val();

		self.selfListObj.name = $("#list_user").val();
		self.selfListObj.sex = $("#list_sex").val();
		self.selfListObj.age = $("#list_age").val();
		self.selfListObj.mobilePhone = $("#list_tel").val();
		self.selfListObj.interflowTime = $("#list_day").val();
		yanzheng();



	});
	//header-slide
	$("#hpjt .nav_hover").css("display","none");
	$("#hpjt").hover(function(){
		$("#hpjt .nav_hover").css("display","block");
	},function(){
		$("#hpjt .nav_hover").css("display","none");
	});
	$("#hpjt").on("click",function(){

		if($("#hpjt .nav_hover").css("display") == "none"){
			$("#hpjt .nav_hover").slideDown();
		}else{
			$("#hpjt .nav_hover").slideUp();
		}
		
	});
	//header-slide End
});
    }
  }
}
</script>

<style scoped>
@import "~assets/css/smartLeadingExamining/self.css"
/* @import "../../assets/css/smartLeadingExamining/self.css" */
</style>