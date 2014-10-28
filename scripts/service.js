(function() {
  'use strict';
  angular.module('app.my.service', []).factory('MySvc', [
    '$http', '$q', '$window',function($http, $q,$window) {

      var IS_CREATED = 'esaiscreated';
      var ITEMS = 'esaitems';
      var SERIAL = 'esaserial';
      
      var items = [];
      var serial = 0;

      return {
        
        init: function(){
          var d = $q.defer();

          if(!lo.get(IS_CREATED)){           
            console.log ('first');
            var item = {
              id : 1,
              message : '頂新油品風暴波及慈濟，玄奘大學社會科學院院長釋昭慧今天以「悲極無言」形容證嚴法師，強調證嚴法師對這個事件很悲痛。',
              editing : false
            };
            items.push(item);

            var item = {
              id : 2,
              message : '美國疾病管制暨預防中心（CDC）表示，在幾內亞治療伊波拉病患的醫師一抵達甘迺迪國際機場，「就接受針對來自西非疫區國家所有旅客的加強篩檢措施」。',
              editing : false
            };
            items.push(item);

            var item = {
              id : 3,
              message : '美國職籃NBA熱身賽，湖人隊在主場迎戰拓荒者，林書豪今天沒有先發，在第一節剩下4分07秒時替補出賽，上場24分鐘，投9中5，包括4罰中3，拿下13分、3籃板、5助攻。',
              editing : false
            };
            items.push(item);

            lo.sets(ITEMS,items);
            lo.set(IS_CREATED,true);
            lo.set(SERIAL,4);

            items = lo.gets(ITEMS);
            serial = lo.get(SERIAL);
            d.resolve(items);
          }else{
            console.log ('second');
            items = lo.gets(ITEMS);
            serial = lo.get(SERIAL);
            d.resolve(items);
          }

          return d.promise;
        },   

        insert: function(item){
          var d = $q.defer();
          item.id = lo.get(SERIAL);
          item.editing = false;
          items.push(item);
          lo.sets(ITEMS,items);
          lo.set(SERIAL,parseInt(item.id)+1);
          d.resolve(items);
          return d.promise;
        },     

        edit : function(items){
          items = items;
          lo.sets(ITEMS,items);
        },

        delete : function(item){
          var d = $q.defer();
          for(var i=0;i<items.length;i++){
            if(items[i].id == item.id){
              items.splice(i,1);
              lo.sets(ITEMS,items);
              d.resolve(items);
              break;
            }
          }
          return d.promise;
        },

        getItems: function(){
          var d = $q.defer();
          items = lo.gets(ITEMS);
          d.resolve(items);
          return d.promise;
        }



        

      };

    }
  ]);

}).call(this);


