(function() {
  'use strict';
  angular.module('app.my.ctrl', []).controller('MyCtrl', [
    '$scope','$rootScope','$route','$timeout','$sce','$location', 'MySvc','keyboardManager',  
    function($scope,$rootScope,$route,$timeout,$sce,$location,MySvc,keyboardManager) {

    //監看ng-repeat complate事件
    $scope.$on('onRepeatLast', function(scope, element, attrs){
      $("#marquee1").marquee();
    });

    // 回後台
    keyboardManager.bind('ctrl+right', function() {
      $location.path('/admin');
    }); 
    // 回前台
    keyboardManager.bind('ctrl+left', function() {
      $location.path('/news');
    });    

    

    // $scope.keydown = function(e){
    //   console.log(e);
    //   console.log('keyCode:'+ e.keyCode);
    //   console.log('ctrlKey:' + e.ctrlKey);
    // }

    $scope.test = function(){
      // $route.reload();
    }
    
    $scope.start = function(){
      $("#marquee1").marquee();
    }

    $scope.frontEnd = function(){
      $location.path('/news');
    }

    $scope.initNews = function(){
      //初始訊息
      MySvc.getItems().then(function(res){
        $rootScope.items = res;
        for(var i=0;i<$rootScope.items.length;i++){
          $rootScope.items[i].message = $rootScope.items[i].message.replace(/(\n)+/g, '<br />');
          $rootScope.items[i].message = $sce.trustAsHtml($rootScope.items[i].message);
        }
        
        //跑馬燈
        $("#marquee1").marquee();
      });
            
      getStudy();//遠端取得課表
      showStudy();//每10秒更新畫面
      getWether();//天氣
      showtime();//目前時間
      // $timeout(getStudy,600000);
      // $timeout(showStudy,10000);
      // $timeout(getWether,600000);
      // $timeout(showtime,1000);
    }
    

    $scope.init = function(){
      MySvc.init().then(function(res){
        $rootScope.items = res; 
        // console.log ($rootScope.items);    
      });
      
    }

    $scope.insert = function(){
      $scope.newItem = {};
      $scope.newItem.editing = true;
    }

    $scope.insertOk = function(item){
      if(item.message){
        MySvc.insert(item).then(function(res){
          $rootScope.items = res;
          $scope.newItem = {};
        });
      }else{
        alert('請輸入跑馬燈訊息');
      }
      
    }

    $scope.edit = function(item){
      item.editing = true;
    }

    $scope.editOk = function(item){
      item.editing = false;
      MySvc.edit($rootScope.items);
      
    }

    $scope.cancel = function(item){
      item.editing = false;
    }

    $scope.delete = function(item){
      MySvc.delete(item).then(function(res){
        if (res){
          $rootScope.items = res;
          alert('刪除完成!');
        }else{
          alert('刪除失敗!');
        }
      });
    }


 
    function showtime(){
      // console.log ('showtime');
      var today = new Date();
      $('#datesp').html(am.getNow() + ' (' + am.getWeek() + ')');
      $('#timesp').html(am.getNowTime());
      $timeout(showtime,1000);
    }

    function getWether(){
      console.log ('getWether');
      $.get("http://boe.ntpc.edu.tw/StudyOpenData.ashx?act=weather"
        ,function(data){
          //console.log(data);
          //alert('ok');
          $('#icon').prop("src",data.Icon);
          $('#temp').html(data.Weather+""+data.Temp_c+"&deg;C ");
          // $('#temp').html(data.Temp_c+" &deg;C ");
        }
      );
      $timeout(getWether,600000);//每10分鐘更新一次
    }


    function getStudy(){
      console.log ('getStudy');
      $.get("http://boe.ntpc.edu.tw/StudyOpenData.ashx?act=study"
        ,function(data){
          $scope.allStudy = data.result;

          var len = $scope.allStudy.length;
          if ($scope.allStudy[len-1].length != 4){
            var sublen = $scope.allStudy[len-1].length;
            for(var i=0;i<4-sublen;i++){
              var item = {
                stime: ':',
                etime: ':',
                classroom: '',
                reason: ''
              };
              $scope.allStudy[len-1].push(item);
            }
          }

          $scope.studys = $scope.allStudy[0];
        }
      );
      $timeout(getStudy,600000);//每10分鐘更新一次
    }

    var index = 0;
    function showStudy(){  
      console.log ('showStudy ' +index);
      if (typeof $scope.allStudy != 'undefined'){
        $scope.studys = $scope.allStudy[index];

        if($scope.allStudy.length == 1){
          index = 0;
        }else if(index+1 == $scope.allStudy.length){
          index = 0;
        }else{
          index ++;
        }


      }

      $timeout(showStudy,5000);//每10秒更新一次
    }
      
      
    }
  ]);
}).call(this);


