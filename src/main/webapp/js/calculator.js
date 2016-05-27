/*
 Created by SQ05 on 5/24/2016.
 Initializing a Start Application Called calculators
 */

var cal = angular.module('calculator', ["angular-google-gapi"]);//added googleApi for easy API interaction

/**
 * app run to help load the api before hand
 */
cal.run(['GApi', 'GAuth',
    function(GApi, GAuth) {
        var BASE = 'http://localhost:8080/_ah/api';
        GApi.load('calculator','v1',BASE).then(function(resp) {
            console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
        }, function(resp) {
            console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
        });
    }
]);

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
cal.controller("getCal",['$filter', '$log', '$scope','GApi', function($filter, $log, $scope,GApi){
         $scope.calVal={
               result: '',
           disable:false
        };

    /**
     *  value1 and value2 are the parameters we are going to use in managing user result and input
     *  controller is used to detect where the cursor should be either for value1 or value2
     *  operation is here to help hold which operation is clicked thats in between value 1 and value2
     */
    $scope.value1=0;
    $scope.value2=0;
    $scope.controller=1;
    $scope.operation="";
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

        $scope.resetCalc();//reset calculator parameters

        return false;
    };

    /*
     This ClickNumber is used to Concatenate and display the Input Number on the View Screen
     */

    $scope.clickNumber=function($val){
        conCat+=$val;
        $log.log(conCat);
        $scope.calVal.result=conCat;

        /**
         * as usual click on a button update our 2 value variables
         * then controller is used in controlling how many times users clicked on buttons with an operation
         */
        if($val != '+' && $val != '-' && $val != '*' && $val != '/'){
            if ($scope.controller == 1)
                $scope.value1 = Number($scope.value1+""+$val);
            if ($scope.controller == 2)
                $scope.value2 = Number($scope.value2+""+$val);
        }else{
            $scope.doEqual($scope.operation,$val);//pass the old operation before changing to the new operation "+"
            $scope.operation=$scope.oprTable($val);
            $scope.ctrlFunction();
        }

        $log.log("Controller Value: "+$scope.controller);
        $log.log(" Value 1: "+$scope.value1);
        $log.log(" Value 2: "+$scope.value2);

    };
    /**
     * function to update the scope value controller
     */
    $scope.ctrlFunction=function () {
        $scope.controller=$scope.controller==1?2:1;
    };

    /**
     * @param operation stores the old value of operation
     * @param newOpr is to store the new operation Symbol to be perform after processing the old operation
     * so we can update the view to the result if value 1 and 2 (variable) is occupied with values
     */
    $scope.doEqual=function (operation,newOpr) {
        if($scope.controller==2)
            $scope.gotoServer(operation,newOpr);
    };
    
    /**
     *Reset Caclculator  control parameters
     */
    $scope.resetCalc=function () {
        $scope.value1=0;
        $scope.value2=0;
        $scope.controller=1;
        $scope.operation="";
    };

    /**
     * Function to handle google api call and return response
     * @param operation is for the google cloud endpoint api link e.g calcAPI.add
     * @param newOpr is an optional field which is undefined by default
     */
    $scope.gotoServer=function (operation,newOpr) {
        GApi.execute('calculator', 'calcAPI.'+operation, {value1: $scope.value1, value2:$scope.value2}).then( function(resp) {
            //$scope.value = resp;
            $scope.resetCalc();//reset calculator parameters
            $scope.value1=Number(resp.result.result); //take value1 as our new result after performing computation, so it can be use for next computation
            $scope.calVal.result=$scope.value1;//update our result view panel to value1 value
            conCat=""+$scope.value1;
            if( typeof newOpr != 'undefined' ){
                conCat +=" "+newOpr;
                $scope.calVal.result += " "+newOpr;
                $scope.controller=2;//update controller to point to value2 , sincd value1 is occupied with answer returned from api
                $scope.operation=$scope.oprTable(newOpr);
            }

            console.log(resp);
        }, function() {
            console.log("error :(");
        });
    };
    /**
     * @param oprSymbol  takes in operation Symbols
     * then our function converts it to api name correspondence
     */
    $scope.oprTable=function (oprSymbol) {
        apiName="+";
        switch (oprSymbol) {
            case '+':
               apiName = "add";
                break;
            case '-':
                apiName = "subtract";
                break;
            case '*':
                apiName = "multiplication";
                break;
            case '/':
                apiName = "division";
                break;
        }
        return apiName;
    }
    //practising
    /*
     This ClickAns is used to evaluate and display the result of input String on the screen
     */
    $scope.clickAns=function(){
        /* $scope.calVal.result=eval(conCat);
         conCat= "";*/
        /**
         * when you click on submit goto server for result
         */
        $scope.gotoServer($scope.operation);
        return false;
    };

}]);
