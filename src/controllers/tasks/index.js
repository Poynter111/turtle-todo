TasksIndexCtrl.$inject = ['$http','$state','$rootScope'];

function TasksIndexCtrl($http, $state, $rootScope) {

  this.all = [];
  this.todaysTasks = [];
  this.pastTasks = [];
  this.futureTasks = [];

  this.selectedTask = null;

  $http.get(`/api/users/${$state.params.id}/tasks`)

  // .then(res => console.log('Users tasks --->', res.data));
    .then(res => {
      this.all = res.data;
      this.todaysTasks = res.data[0];
      this.pastTasks = res.data[1];
      this.futureTasks = res.data[2];
    });

  function handleComplete(userId,taskId){
    $rootScope.$broadcast('flashMessage', {
      style: 'primary',
      content: 'Great job! Task completed!'
    });
    $http
      .post(`/api/users/${userId}/tasks/${taskId}/complete`)
      .then(res => {
        this.all = res.data.tasks;
        $http.get(`/api/users/${$state.params.id}/tasks`)
          .then(res => {
            this.all = res.data;
            this.todaysTasks = res.data[0];
            this.pastTasks = res.data[1];
            this.futureTasks = res.data[2];
          });
      });
  }

  function selectTask(task){
    this.selectedTask = task;
  }

  function unSelectTask() {
    this.selectedTask = null;
  }

  function isSelectedTask(task) {
    return this.selectedTask === task;
  }

  this.selectTask = selectTask;
  this.unSelectTask = unSelectTask;
  this.isSelectedTask = isSelectedTask;
  this.handleComplete = handleComplete;
}


export default TasksIndexCtrl;


// function findById(id){
//   return $http.get(`/api/wines/${id}`);
// }

// Wine.findById($state.params.id)
//   .then(res => this.wine = res.data)
