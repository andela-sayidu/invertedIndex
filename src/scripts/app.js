const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
  const index = new invertedIndex();

  $scope.showTable = true;
  $scope.searchResults = false;
  $scope.titles = [];

  /*
   * Upload a file
   */
  $scope.uploadFile = (fileName, fileContent) => {
    $scope.filedata = {};
    $scope.docCount = [];

    if (fileName.toLowerCase().match(/\.json$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = JSON.parse(e.target.result);
        index.createIndex(fileName, content);
        $scope.filedata = index.indexMap[fileName];
        for (let fileNo = 0; fileNo < content.length; fileNo++) {
          $scope.docCount.push(fileNo);
        }
        $scope.$apply($scope.docCount);
      }
      reader.readAsText(fileContent);
      $scope.$apply(() => {
        $scope.titles.push(fileName);
      });
    } else {
      $(document).ready(function () {
        $('#modal1').modal('open');
      });
    }
  }

  /*
   * Generate Index for a file
   */
  $scope.createIndex = () => {
    $scope.showTable = true;
    $scope.searchResults = false;
    let fileSearch = $scope.selectedFile;
    $scope.filedata = index.getIndex(fileSearch);
  }

  /*
   * Search Files for specific terms
   */
  $scope.search = () => {
    $scope.showTable = false;
    $scope.searchResults = true;
    let searchValue = $scope.terms;
    if (searchValue == '') {
      $scope.showTable = true;
      $scope.searchResults = false;
    } else {
      let fileSearch = $scope.selectedFile;
      $scope.searchResult = index.searchIndex(fileSearch, searchValue);
    }
  }
});


//document DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  //Manage Modal
  $('.modal-trigger').hide();
  $('.modal').modal();
  //Attach eventlistener to file upload button
  document.getElementById('uploadJSON')
    .addEventListener('change', function (e) {
      let fileContent = e.target.files[0];
      let fileName = e.target.files[0].name;
      angular.element(document.getElementById('uploadJSON'))
        .scope().uploadFile(fileName, fileContent);
    });
});
