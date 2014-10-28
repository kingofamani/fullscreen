var am={};

am.WEB = "http://localhost";

//localStorage操作
var lo={};
//json set
lo.sets = function(key,val){
  window.localStorage.setItem(key,angular.toJson(val));        
}
//value set
lo.set = function(key,val){
  window.localStorage.setItem(key,val);        
}
//json get
lo.gets = function(key){
  return angular.fromJson(window.localStorage.getItem(key));
}
//value get
lo.get = function(key){
  return window.localStorage.getItem(key);
}
lo.len = function(){
  return window.localStorage.length;
}
lo.key = function(index){
  return window.localStorage.key(index);
}
lo.pop = function(key){
  window.localStorage.removeItem(key);
}
lo.clear = function(){
	window.localStorage.clear();
}

//將localStorage匯出匯入txt
lo.backup = function(text){
	text = angular.toJson(text);

	var data = new Blob([text], {type: 'text/plain'});
	var textFile;

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (typeof textFile !== "undefined") {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
    return textFile;
}

lo.resotre = function(){
	alert("resotre");
}


//json排序
am.sort = function(json,field){
	json.sort(function(a, b){
	    return a.field - b.field;
	});
}

//多重排序
am.sort_by = function() {
	var fields = [].slice.call(arguments),
	  n_fields = fields.length;

	return function(A, B) {
	  var a, b, field, key, primer, reverse, result;
	  for (var i = 0, l = n_fields; i < l; i++) {
	    result = 0;
	    field = fields[i];

	    key = typeof field === 'string' ? field : field.name;

	    a = A[key];
	    b = B[key];

	    if (typeof field.primer !== 'undefined') {
	      a = field.primer(a);
	      b = field.primer(b);
	    }

	    reverse = (field.reverse) ? -1 : 1;

	    if (a < b) result = reverse * -1;
	    if (a > b) result = reverse * 1;
	    if (result !== 0) break;
	  }
	  return result;
	}
}

am.getNow = function(){
	var date = new Date();
	var yyyy = date.getFullYear().toString()  ;                                 
	var mm = (date.getMonth()+1);
	var dd  = date.getDate(); 
	if (mm<10){mm = "0" + mm;}
	if (dd<10){dd = "0" + dd;} 
	return yyyy+"/"+mm+"/"+dd;
};

am.getNowTime = function(){
	var date = new Date();
	var hh = date.getHours() ;                                 
	var mm = date.getMinutes();
	var ss  = date.getSeconds(); 
	var helf = "";
	if (mm<10){mm = "0" + mm;}
	if (ss<10){ss = "0" + ss;} 
	hh<12?helf="上午":helf="下午";
	return helf + " "+hh+":"+mm+":"+ss;
};

am.getWeek = function(){
	var weeks = ['日', '一', '二', '三', '四', '五', '六'];
	var date = new Date();
	var week  = date.getDay();
	return weeks[week];
}

am.shortDate = function(date){
	var yyyy = date.getFullYear().toString()  ;                                 
	var mm = (date.getMonth()+1);
	var dd  = date.getDate(); 
	if (mm<10){mm = "0" + mm;}
	if (dd<10){dd = "0" + dd;} 
	return yyyy+"/"+mm+"/"+dd;
};
