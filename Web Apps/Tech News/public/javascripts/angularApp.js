
angular.module('blondeLabNews', ['ui.router'])
.config([  // router config settings
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // define route settings for home page
        $stateProvider
            .state( 'home', {  // when state is set to 'home'
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts) {
                        return posts.getAll();
                    }]
                }
                // using the resolve property in this way, we are ensuring that anytime our home state is entered, we will automatically query all posts from our backend before the state actually finishes loading.
            })

            .state( 'posts', {  // when state is set to 'posts'
                url: '/posts/{id}',  // here {id} is a route parameter to be passed to our controller to define the index id of the post object in the posts array
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            })
            // In the above resolve command, the Angular ui-router detects we are entering the posts state and will then automatically query the server for the full post object, including comments. Only after the request has returned will the state finish loading.

            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            });
            // Here we're specifying an onEnter function in our states. This gives us the ability to detect if the user is authenticated before entering the state, which allows us to redirect them back to the home state if they're already logged in.

            // route redirect back to home page whenever the app receives a url that is not defined
            $urlRouterProvider.otherwise('home');
    }
])

// This is our auth factory. We'll need to inject $http for interfacing with our server and $window for interfacing with localStorage. We'll be using localStorage for persisting data to the client. If a JWT token exists in localStorage, we can assume the user is logged in, as long as the token isn't expired. To log a user out, simply remove the token from localStorage.
.factory('auth', ['$http', '$window', function($http, $window) {
    var auth = {};

    // method to save the token to local storage
    auth.saveToken = function(token) {
        $window.localStorage['blondeLabNews'] = token;
    };

    // method to retrieve the token from local storage
    auth.getToken = function() {
        return $window.localStorage['blondeLabNews'];
    };

    // method to check if the user is logged in; returns a boolean.
    auth.isLoggedIn = function() {
        var token = auth.getToken();

        // If a token exists, we'll need to check the payload to see if the token has expired, otherwise we can assume the user is logged out. The payload is the middle part of the token between the two .s. It's a JSON object that has been base64'd. We can get it back to a stringified JSON by using $window.atob(), and then back to a javascript object with JSON.parse.
        if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;

        } else {
            return false;
        }
    };

    // Now create the methods to log in, register, and log users out.

    // method to return the username of the user that's currently logged in
    auth.currentUser = function() {
        if(auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    // register method that posts a user to our /register route and saves the token returned
    auth.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    // login method that posts a user to our /login route and saves the token returned
    auth.logIn = function(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    // logout method that removes a user's token from local storage, logging the user out
    auth.logOut = function() {
        $window.localStorage.removeItem('blondeLabNews');
    };

    return auth;
}])

// What we doing here is creating a new object that has an array property called posts. We then return that variable so that our "o" object essentially becomes exposed to any other Angular module that cares to inject it. Note that we could have simply exported the posts array directly, however, by exporting an object that contains the posts array we can add new objects and methods to our services in the future.
.factory('posts', ['$http', 'auth', function($http, auth) {  // when updating to call back end, need to be sure to inject the $http service.
    var o = {
        posts: []
    };

    // In this function we're using the Angular $http service to query our posts route. The success() function allows us to bind function that will be executed when the request returns.
    o.getAll = function() {
        return $http.get('/posts').success(function(data) {
            angular.copy(data, o.posts);
            //  It's important to use the angular.copy() method to create a deep copy of the returned data. This ensures that the $scope.posts variable in MainCtrl will also be updated, ensuring the new values are reflect in our view.
        });
    };

    // Once we've added/required authorization for all write route requests to the database, we need to update our services to send the JWT token to teh server. We'll need to send our JWT token as an Authorization header. The format for this header should be Authorization: Bearer TOKEN.GOES.HERE.

    // We'll need to pass the Authorization header as the last argument for our $http calls for the create, upvote, addComment, and upvoteComment methods in our posts service.

    o.create = function(post) {  // linkage to send new posts to the backend db
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data) {
            o.posts.push(data);
        });
    };

    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data) {
            post.upvotes += 1;
        });
    };

    o.get = function(id) {  //method to retrieve a single post from the server
        return $http.get('/posts/' + id).then(function(res) {
            return res.data;
        });
    };

    // Notice (above) that instead of using the success() method we have traditionally used, we are instead using a "promise".

    o.addComment = function(id, comment) {  // method to add comments
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };

    o.upvoteComment = function(post, comment) {  // method to upvote comments
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        }).success(function(data) {
            comment.upvotes += 1;
        });
    };

    return o;
}])

// We dependency inject the factory service into the controller to allow the controller access to the service / service data by adding the output object to a couple of places...
.controller('MainCtrl', [
    '$scope',
    'posts',
    'auth',
    function($scope, posts, auth){  //added posts to the controller function

        $scope.isLoggedIn = auth.isLoggedIn;

        // Two-way data-binding only applies to variables bound to $scope. To display our array of posts that exist in the posts factory (posts.posts), we'll need to bind the scope variable in our controller to the posts array in our service.
        $scope.posts = posts.posts;
        //Now any change or modification made to $scope.posts will be stored in the service and immediately accessible by any other module that injects the posts service.

        // scope function that will add a post object to our posts array.
        $scope.addPost = function() {
            if ($scope.title === '') { return;
            } else {
                posts.create({     // save posts to the server
                    title: $scope.title,  //  note data binding with $scope.title and $scope.link
                    link: $scope.link,
                });
            }
            $scope.title = '';  // added to clear form after input submission.
            $scope.link = '';
        };

        // function to increment our upvotes when called / clicked.
        $scope.incrementUpvotes = function(post) {
            posts.upvote(post);  // updated after our o.upvote method was create in the posts factory.
        };
    }
])

.controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    'auth',  // reference to the post object returned in line 28.
    function($scope, posts, post, auth) {

        $scope.isLoggedIn = auth.isLoggedIn;

        // set a scope object called post, that grabs the appropriate post from the posts service using the id from $stateParams:
        $scope.post = post;  // we no longer have need to inject $stateParams into our controller, rather we can directly inject the post object from line 28 rather than going through the posts service.

        // scope function similar to add posts that will allow users to add comments
        $scope.addComment = function() {
            if ($scope.body === '') { return;
            } else {
                posts.addComment(post._id, {
                    body: $scope.body,
                    author: 'user',
                }).success(function(comment) {
                    $scope.post.comments.push(comment);
                });
            }
            $scope.body = '';
        };

        // function to increment our comments when called / clicked.
        $scope.incrementUpvotes = function(comment) {
            posts.upvoteComment(post, comment);
        };
    }
])

// We need to initialize a user on $scope for our form. Then, we can create the register and logIn methods on $scope to call the respective methods in the auth factory. We can then handle any errors and set $scope.error for displaying error messages. Finally, if no errors occur, we can send the user back to the home state using a promise.

.controller('AuthCtrl', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
              $scope.error = error;
            }).then(function(){
              $state.go('home');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
              $scope.error = error;
            }).then(function(){
              $state.go('home');
            });
        };
    }
])

// Navigation controls.
.controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }
])
