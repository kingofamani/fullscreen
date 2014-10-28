(function() {
  'use strict';
  angular.module('app.fileIO.ctrl', []).controller('FileIOCtrl', [
    '$scope', '$filter','$window', function($scope, $filter,$window) {

      var ESA = 'esa';

      var storage = {};
      
      //將localStorage匯出匯入txt

      $scope.backup = function(){
        console.log('backup');

        storage = {};
        for(var i=0;i<lo.len();i++){
          var key = lo.key(i);
          if(key.indexOf(ESA) != -1){
            // data.push(lo.gets(key));
            storage[key] = lo.gets(key);
          }           
        }//end for

        lo.backup(storage);

        var link = document.getElementById('download');
        link.href = lo.backup(storage);
        link.click();
        // link.style.display = 'block';

        // console.log (storage);
      };

      $scope.restore = function(){
        console.log('restore');

        var data = $('#output').html();

        if(data){

          storage = angular.fromJson(data);
        
          lo.clear();

          for(var key in storage){
            lo.sets(key,storage[key]);
          }
          alert('匯入成功！');

        }else{
          alert('請先選擇檔案');
        }
        


        // var file = "file:///D:/ESA.txt";
        // var rawFile = new XMLHttpRequest();
        // rawFile.open("GET", file, true);
        // rawFile.onreadystatechange = function ()
        // {
        //     if(rawFile.readyState === 4)
        //     {
        //         if(rawFile.status === 200 || rawFile.status == 0)
        //         {
        //             var allText = rawFile.responseText;
        //             alert(allText);
        //         }
        //     }
        // }
        // rawFile.send(null);

      };

      

      $scope.readfile = function() {
        // console.log ('readfile');

        // var single = $scope.single
        // console.log ($scope.vm.single);
        // var reader = new FileReader();
        // reader.readAsText(single); 
        // var text = reader.result;
        // $('#output').val(text);

        // var reader = new FileReader();  // Create a FileReader object
        // reader.readAsText(f);           // Read the file
        // reader.onload = function() {    // Define an event handler
        //     var text = reader.result;   // This is the file contents
        //     var out = document.getElementById("output");    // Find output element
        //     out.innerHTML = "";                             // Clear it
        //     out.appendChild(document.createTextNode(text)); // Display file contents
        // }
        // reader.onerror = function(e) {  // If anything goes wrong
        //   console.log("Error", e);    // Just log it
        // };
      };







    }
  ]);

}).call(this);


