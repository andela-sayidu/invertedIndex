const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
    const index = new invertedIndex();

    $scope.titles = [];
    $scope.data = '';
    $scope.filesLength = [];
    let fileNo = 0;

    $scope.createIndex = (fileName, fileContent) => {
        if (fileName.toLowerCase().match(/\.json$/)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let content = JSON.parse(e.target.result);
                $scope.file =  index.createIndex(fileName, content);
                $scope.data =index.indexMap[fileName];
                console.log($scope.data);

            }
    
            
            reader.readAsText(fileContent);

            $scope.$apply(() => {
                $scope.titles.push(fileName);
                $scope.filesLength.push(fileNo += 1);
                $scope.data;
            });

        } else {
            $(document).ready(function () {
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
            let fileContent = e.target.files[0];
            let fileName = e.target.files[0].name;
            angular.element(document.getElementById('uploadJSON')).scope().createIndex(fileName, fileContent);

        });
});
