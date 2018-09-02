(function () {
  /**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

// var disqus_config = function () {
// this.page.url = "https://nashmia-riaz.github.io/Blog/";  // Replace PAGE_URL with your page's canonical URL variable
// this.page.identifier = "{{ page.url }}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
// };

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://http-nashmia-riaz-github-io-blog.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
'use strict';
  //
  // angular.module('commentsApp', [])
  // .controller('commentsController', commentsController);
  //
  // commentsController.$inject = ['$scope'];
  //
  // function commentsController($scope) {
  //       $scope.comments = "Be the first to add a comment";
  //       console.log("Comments "+ $scope.comments);
  // };
  angular.module('commentsApp', []).controller('commentsController', function($scope) {
    $scope.comments = "Be the first to add a comment!";
  });
})();
