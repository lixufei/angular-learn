var myModule = angular.module('myModule',[]);
myModule.controller('MyController',['$scope',function($scope){
	$scope.greeting='Hello';
	$scope.test1=function(){
		alert("test1");
	}
}]).
directive('thoughtworks',function(){
	return{
		template: '<p>thoughtworks</p>'
	}
}).
directive('hr',function(){
	return{
		template: '<div>hr</div>'
	}
}).
controller('commonController',['$scope',function($scope){
	$scope.common=function(){
		alert("nihao!");
	}
}]).
controller('MyController1',['$scope',function($scope){
	$scope.second={
		text: 'second'
	};
	$scope.test2=function(){
		alert("test2");
	}
}])