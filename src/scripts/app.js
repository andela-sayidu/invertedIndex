const app = angular.module('myIndex', []);

app.controller('indexController', ($scope) => {
  const index = new InvertedIndex();

  $scope.showTable = false;
  $scope.searchResults = false;
  $scope.titles = [];
  $scope.docCount = {};

  /*
   * Upload a valid JSON file
   */
  $scope.uploadFile = (fileName, fileContent) => {
    if (fileName.toLowerCase().match(/\.json$/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          $scope.content = JSON.parse(e.target.result);
          if (!($scope.content[0] && $scope.content[0].title)) {
            status('Invalid JSON file');
            return;
          }
          $scope.$apply(() => {
            $scope.titles.push(fileName);
          });
        } catch (exception) {
          status('Invalid JSON file');
        }
      }
      reader.readAsText(fileContent);
    }
  };

  /*
   * Generates Index for a uploaded file
   */
  $scope.createIndex = () => {
    $scope.showTable = true;
    $scope.searchResults = false;
    const fileSearch = $scope.selectedFile;

    if (fileSearch == 'all') {
      $scope.filedata = '';
      status('Select a file to generate index');
      return;
    }
    if (fileSearch === undefined) {
      status('Error! No file selected');
      return;
    };

    $scope.filedata = index.indexMap[fileSearch];

    if ($scope.filedata === undefined) {
      index.createIndex(fileSearch, $scope.content);
      $scope.filedata = index.getIndex(fileSearch);
      $scope.docCount[fileSearch] = [];
      for (let fileNo = 0; fileNo < $scope.content.length; fileNo += 1) {
        $scope.docCount[fileSearch].push(fileNo);
      }
    } else {
      $scope.filedata = index.getIndex(fileSearch);
    }
  }

  /*
   * Search Files for specific terms
   */
  $scope.search = () => {
    $scope.showTable = false;
    $scope.searchResults = true;
    const searchValue = $scope.terms;
    const fileSearch = $scope.selectedFile;

    if (searchValue === '' || searchValue === undefined) {
      status('Enter at least a term');
    }
    $scope.searchResult = index.searchIndex(fileSearch, searchValue);
  };

  /*
   * Modal Setup
   */
  function status(msg) {
    $scope.message = msg;
    $('.modal').modal();
    $scope.$apply();
  }
});


/*
 * File Upload
 */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('uploadJSON')
    .addEventListener('change', (e) => {
      let fileContent = e.target.files[0];
      let fileName = e.target.files[0].name;
      angular.element(document.getElementById('uploadJSON'))
        .scope().uploadFile(fileName, fileContent);
    });
});