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
      //$('#startbtn').trigger('click');
      // console.log($rootScope.items);
      //  if($rootScope.items.length>0)
      // $("#marquee1").marquee();
      //$("#marquee1").marquee();
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
      
      
      //天氣
      getWether();
      showtime();
      $timeout(getWether,600000);//每10分鐘更新一次
      $timeout(showtime,1000);
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
      $.get("http://boe.ntpc.edu.tw/weather.ashx"
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
      
      
    }
  ]);
}).call(this);


