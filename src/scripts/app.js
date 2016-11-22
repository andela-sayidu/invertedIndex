const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
    const index = new invertedIndex();

    $scope.titles = [];
    $scope.selectedFiles = '';


    $scope.uploadFile = (fileName, fileContent) => {
        $scope.data = {};
        $scope.docCount = [];

        if (fileName.toLowerCase().match(/\.json$/)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let content = JSON.parse(e.target.result);
                index.createIndex(fileName, content);
                $scope.data = index.indexMap[fileName];

                for (let fileNo = 0; fileNo < content.length; fileNo++) {
                    $scope.docCount.push(fileNo);
                }
                $scope.$apply($scope.docCount);
            }
            reader.readAsText(fileContent);


            $scope.$apply(() => {
                $scope.titles.push(fileName);
                $scope.selectedFiles = $scope.selectedFile;
            });

        } else {
            $(document).ready(function () {
                $('#modal1').modal('open');
            });
        }
    }

    $scope.search = () => {
        let searchValue = $scope.terms;
        $scope.searchResult = index.searchIndex($scope.fileNme, searchValue);
    }

});



document.addEventListener('DOMContentLoaded', () => {
    $('.modal-trigger').hide();
    $('.modal').modal();
    document.getElementById('uploadJSON')
        .addEventListener('change', function (e) {
            let fileContent = e.target.files[0];
            let fileName = e.target.files[0].name;
            angular.element(document.getElementById('uploadJSON')).scope().uploadFile(fileName, fileContent);
        });
});
