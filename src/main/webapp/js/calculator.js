/*
 Created by SQ05 on 5/24/2016.
Initializing a Start Application Called calculators
 */
var cal = angular.module('calculator', []);
/*
Declaration of Global Variables.
 */
var conCat = "";
var count=1;
var len=0;
var limit=0;

/*
This starts the usage of a controller name getCal
 */
cal.controller("getCal",['$filter', '$log', '$scope', function($filter, $log, $scope){

    $scope.calVal={
        result: '',
    disable:false
        
    };
/*
This clickBs is used to Backspace Input Value by removal on last input
 */
    $scope.clickBs=function(){
      len=conCat.length;
        limit=len-count;
        $scope.calVal.result=$filter('limitTo')(conCat,limit,0);
        conCat=$filter('limitTo')(conCat,limit,0);
        return false;
    };

    /*
     This clickCancel is used to Delete all Input Value and setting the view screen to null
     */
    $scope.clickCancel=function(){
        $scope.calVal.result='';
        conCat='';
        return false;
    };

/*
This ClickAction is used to switch on and off the Calculator.
 */
    $scope.clickAction=function($action){
        if($action=="On") {
            $scope.calVal.result="Switched On";
            $scope.calVal.disable=false;
        }
        else if($action=="Off"){
            $scope.calVal.result="Switched Off";
            $scope.calVal.disable=true;
        } else{$scope.calVal.result=calVal.disable;}
        $log.log($scope.calVal.disable);
        conCat= "";
        return false;
    };

/*
This ClickNumber is used to Concatenate and display the Input Number on the View Screen
 */

 $scope.clickNumber=function($val){
        conCat+=$val;
        $log.log(conCat);
        $scope.calVal.result=conCat;

    };
    //practising 
/*
This ClickAns is used to evaluate and display the result of input String on the screen
 */
    $scope.clickAns=function(){
        $scope.calVal.result=eval(conCat);
        conCat= "";
        return false;
    };

}]);
