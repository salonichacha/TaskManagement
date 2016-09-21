var app = angular.module('taskApp', ['ngRoute'])


app.config(function($routeProvider){
        $routeProvider
            .when('/createTask', {

                templateUrl: 'pages/create.html',
                controller: 'taskAddController'
            })

            .when('/',{
                controller: 'taskController',
                controller: 'taskController'
            })
})

app.controller("taskController",function($scope) {
 
    $scope.TaskDetails = { 
    tasks : [{
        taskTitle : "Task 1",
        taskDescription : "as",
        taskPriority : "Major",
        taskStatus : 'ToDo',
        dueDate : '6/2/2016',
        taskParent : "Task 1",
        dateCreated : '5/1/2016',
        dateModified : '5/2/2016',
        id: 1
    }],

    selected : {}
    };

     $scope.getTemplate = function (task) {
        if (task.id === $scope.TaskDetails.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editDetail = function (task) {
        $scope.TaskDetails.selected = angular.copy(task);
    };

    $scope.saveDetail = function (id) {
        console.log("Saving contact");
         var d = new Date();
        d = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
        $scope.TaskDetails.selected.dateModified = d;
        var x = new Date($scope.TaskDetails.selected.dueDate);
        x = 1+parseInt(x.getMonth())+"/"+x.getDate()+"/"+x.getFullYear();
        $scope.TaskDetails.tasks[id] = angular.copy($scope.TaskDetails.selected);
        $scope.reset();
    };
    
    $scope.deleteDetail = function(task){
        var temp = $scope.TaskDetails.tasks;
        $scope.TaskDetails = {tasks: [],selected: {}};
        angular.forEach(temp, function(t) {
            if(parseInt(t.id) !== parseInt(task.id)) $scope.TaskDetails.tasks.push(t);
        });
    }

    $scope.reset = function () {
        $scope.TaskDetails.selected = {};
    };
});

app.controller('taskAddController',function($scope){
        $scope.addDetails = function(){
        var temp = $scope.TaskDetails.tasks.length;
        temp += 1; 
        var d = new Date();
        d = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();

        var x = new Date($scope.dueDate);

        x = 1+parseInt(x.getMonth())+"/"+x.getDate()+"/"+x.getFullYear();



        if($scope.taskParent == null)   
            $scope.TaskDetails.tasks.push({id:temp, taskTitle: $scope.taskTitle, taskDescription: $scope.taskDescription, taskPriority: $scope.taskPriority, taskStatus: $scope.taskStatus, dueDate: x, taskParent: $scope.taskParent, dateCreated: d, dateModified: d});
        else{
            
            var t = $scope.TaskDetails.tasks;
            var parentName= "";
            for(var i = 0 ; i < t.length; i++){
                if($scope.taskParent === t[i].taskTitle){
                    parentName = t[i].taskParent+"."+$scope.taskTitle;
                }
            }


            var original = $scope.taskParent.length;
            original += 1;
            var aftertrim = $scope.taskParent.trim().length;
            var count = original - aftertrim;
            var finalName = "";
            for(var i = 0 ; i < count ; i++){
                finalName += " "; 
            }
            finalName += $scope.taskTitle;
            $scope.TaskDetails.taskTitle = finalName;
            $scope.TaskDetails.tasks.push({id:temp, taskTitle: $scope.TaskDetails.taskTitle, taskDescription: $scope.taskDescription, taskPriority: $scope.taskPriority, taskStatus: $scope.taskStatus, dueDate: x, taskParent: parentName, dateCreated: d, dateModified: d});
        }

        $scope.taskTitle = "";
        $scope.taskDescription = "";
        $scope.taskPriority = "";
        $scope.taskStatus = "";
        $scope.dueDate = "";
        $scope.taskParent = "",
        $scope.dateCreated = ""
    };

});