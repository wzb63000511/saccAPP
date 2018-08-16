/**
 * Created by smq on 2017/4/19.
 */
document.write("<script type='text/javascript' src='../script/api.js'></script>");
document.write("<script type='text/javascript' src='../script/jquery-1.8.2.min.js'></script>");
document.write("<script type='text/javascript' src='../script/pda.js'></script>");
document.write("<script type='text/javascript' src='../script/page.js'></script>");
document.write("<script type='text/javascript' charset='UTF-8' src='../bootstrap/js/bootstrap-datetimepicker.min.js'></script>");
document.write("<script type='text/javascript' charset='UTF-8' src='../bootstrap/js/locals/bootstrap-datetimepicker.fr.js'></script>");
document.write("<script type='text/javascript' src='../bootstrap/js/bootstrap.min.js'></script>");
document.write("<script type='text/javascript' src='../bootstrap/js/bootstrapValidator.js'></script>");
document.write("<script type='text/javascript' src='../bootstrap/js/language/zh_CN.js'></script>");
document.write("<script type='text/javascript' src='../bootstrap/js/language/bootstrap-datetimepicker.zh-CN.js'></script>");
document.write("<script src='../controller/masking_layer.js'></script>");
var RepairConfirmModule = angular.module("RepairConfirmModule", []);
RepairConfirmModule.controller('repairConfirm1', ['$scope',
    function ($scope) {
        apiready = function workcnter(){
            api.ajax({
                url: getUrl("padControllerEx!getworkter.m"),
                method: 'post'
            }, function (ret, err) {
                $scope.workcters = ret;
                $scope.$apply();

            });
        }

        $scope.planqueryinput = function () {
            api.openWin({
                name: 'search',
                url: 'planquery_input.html',
                pageParam: {
                    data: $scope.repair
                }
            });
/*            api.showProgress();
            var planorder = $("#planorder").val();
            var planorder1=$scope.repair.planorder;
            var url = "padController!planquery.m";
            api.ajax({
                url : getUrl(url),
                method : 'post',
                dataType : 'text', //返回数据类型json/text
                data : {//POST数据，method为get时不传
                    values : {////以表单方式提交参数（JSON对象）
                        planorder : planorder
                    }
                }
            }, function(ret, err) {
                if(ret){
                    api.hideProgress();
                    //alert(JSON.stringify(ret));
                    var retData = ret;
                    if (retData != null) {
                        api.openWin({
                            name: 'search',
                            url: 'planquery_input.html',
                            pageParam: {
                                data: $scope.repair
                            }
                        });
                    } else {
                        alert("未查到数据");
                    }
                }
            });*/
        }
        //初始加载时间组件
        $(".form_datetime").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 2,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
        }).on('changeDate', function (e) {
            // alert("调用change查订单号");
            //获取订单日期
            var plandate = new Date(e.date.getTime()).Format("yyyy-MM-dd");
            $scope.repair.plandate = plandate;
            /*if(typeof $scope.repair.workcter=="undefined" || $scope.repair.workcter==""){
                alert("请选择生产中心！");
                return;
            }
            var workcellid = document.getElementById('workcter').value;//产品名称(code)
            api.ajax({
                url: getUrl("padController!getOrderListByDateAndWorkCell.m"),
                method: 'post',
                data: {
                    values: {
                        workcellid: workcellid,
                        plandate: plandate
                    }
                }
            }, function (ret, err) {
                $scope.planorders = ret;

            });*/
        });
        //时间格式转换方法
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        //订单日期
        $scope.repair = {plandate: new Date().Format("yyyy-MM-dd")};


    }
]);

//初始化获取返修方式
function getCheckResult(){
    api.ajax({
        url:getUrl("reportWorkController!getUdi.m"),
        method:'post',
        data: {
            values: {
                code:"REPAIR_TYPE"
            }
        }
    }, function(ret, err) {
        if(ret!=null && ret.length>0){
            for(var i=0 ;i< ret.length ; i++){
                var personId = ret[i].id;
                var personName = ret[i].name;
                $("#repairType").append("<option value='"+personId+"'>"+personName+"</option>" );
            }
        }


    });
};

//初始化返修人员，审理结果获取后调用
function getCheckPerson(){
    api.ajax({
        url:getUrl("trialController!getRepairPerson.m"),
        method:'post',
        data: {
            values: {
                //data: $scope.user
            }
        }
    }, function(ret, err) {

        if(ret!=null && ret.length>0){
            for(var i=0 ;i< ret.length ; i++){
                var personId = ret[i].id;
                var personName = ret[i].name;
                $("#repairRerson").append("<option value='"+personId+"'>"+personName+"</option>" );
            }
        }
        //    $scope.$apply();

    });
}

//search页面列表
var PlanSearchModule = angular.module("PlanSearchModule", []);
PlanSearchModule.controller('planSearchModule', ['$scope',
    function ($scope) {
        apiready = function getplanoder(){
            var data= api.pageParam.data;
            //alert(data);
                api.ajax({
                    url: getUrl("padController!planquery.m"),
                    method: 'post',
                    data: {
                        values: {
                            data: data
                        }
                    }
                }, function (ret, err) {
                   // alert(ret);
                    if(ret==""){
                       alert("没有数据!");
                    }
                    $scope.searchs = ret;
                    $scope.$apply();
                });

        }
        $scope.showitem = function (index) {

            //取出所有的遍历数据
            var searchs = $scope.searchs;
            // alert(searchs.length);
            //取选中的数据
            var arr = searchs[index];
            var tname='page3'+new Date().getTime();
            //alert(tname);
            api.openFrame({
                name: tname,
                url: 'planquery_item.html',
                pageParam: {
                    arr: arr,

                }
            });
        }

    }
]);
//search页面列表
var repairConfirmSearchItemModule = angular.module("RepairConfirmSearchItemModule", []);
repairConfirmSearchItemModule.controller('repairConfirmSearchitem', ['$scope',
    function ($scope) {
       // $scope.test="123456789";
        apiready = function () {


            var data = api.pageParam.arr;

            $scope.searchitem = data;
            //  alert(data.batchcode+"----------------");
            $scope.$apply();
        }
        $scope.confirmitem=function () {
            api.ajax({
                url:getUrl("umppPlanOrderController!planqueryA.m"),
                method:'post',
                data: {
                    values: {
                        data: $scope.searchitem ,
                        test:$scope.test
                    }
                }
            }, function(ret, err) {

                if(ret){
                    alert(ret.data)
                }else{
                    alert(err.msg);
                }
                $scope.$apply();

            });
        }
        $scope.planqueryinput1=function(){
            api.getPicture({
                sourceType: 'camera',
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'url',
                allowEdit: true,
                quality: 50,
                targetWidth: 100,
                targetHeight: 100,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err));
                }
            });
        }
        $scope.planqueryinput2=function(){
            var FNScanner = api.require('FNScanner');
            FNScanner.openScanner({

            }, function(ret, err) {
                if (ret) {
                    alert(ret.content)
                   // alert(2);
                    var content=ret.content;;
                    if(typeof (content)!="undefined"){
                        $scope.test=content;
                        $scope.$apply();
                    }

                } else {
                    alert(JSON.stringify(err));
                }
            });
        }
    }
]);
