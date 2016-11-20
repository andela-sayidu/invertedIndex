const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
    const index = new invertedIndex();
   
      $scope.titles = []; 

$scope.createIndex = (fileName,fileContent) => {   
        if(fileName.toLowerCase().match(/\.json$/)) {
            console.log("file check");
    
        const reader = new FileReader();
        reader.onload = (e) => {
            var content = JSON.parse(e.target.result); 
            console.log(content);
        }
        reader.readAsText(fileContent);
    
      $scope.$apply(() => {
        $scope.titles.push(fileName); 
        console.log($scope.titles);
      });
     } else{  
         $(document).ready(function() {
                 $('#modal1').modal('open');
         });
     }
}
  
});

            
 document.addEventListener('DOMContentLoaded', () => {
              $('.modal-trigger').hide();
              $('.modal').modal();
    document.getElementById('uploadJSON')
           .addEventListener('change', function (e) {
              var fileContent = e.target.files[0];
              var fileName = e.target.files[0].name;
              angular.element(document.getElementById('uploadJSON')).scope().createIndex(fileName,fileContent);
              
           });
 });
