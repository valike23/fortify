// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $state, $rootScope) {
   
    $rootScope.toastMessage = "your are now online";
   


    $ionicPlatform.ready(function () {
     
     
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }
   
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

      document.addEventListener("offline", offline, false);
      console.log(navigator.connection.type)
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      console.log(toState)

        if ($rootScope.fix == false) {
          
            if (toState.name != "one") {
                event.preventDefault()
                $state.go("one")
            }
           
        }
    })
    if (!localStorage.getItem("enrolled")) {
      $rootScope.enrolled = false;
    }
    else {
      $rootScope.enrolled = true;
    }
    if (!localStorage.getItem("user")) {
        $rootScope.fix = false;
      
        $state.go("one")

    }
    else {
        $rootScope.fix = true;
        
    }

  });
 
})

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      "https://fortifyme.herokuapp.com/**"
    ])
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
    })
      .state('one', {
        url: '/one',
        templateUrl: 'templates/one.htm',
          controller:'oneCtrl'
    })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
    })
    .state('tab.contacts', {
      url: '/dash/contact',
      views: {
        'tab-dash': {
          templateUrl: 'templates/dash/contacts.htm',
          controller: 'DashCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.quiz', {
    url: '/quiz',
    views: {
      'tab-quiz': {
        templateUrl: 'templates/tab-quiz.htm',
        controller: 'quizCtrl'
      }
    }
  }).state('tab.rules', {
      url: '/quiz/rules',
      views: {
          'tab-quiz': {
              templateUrl: 'templates/rules.htm'
          }
      }
  }).state('tab.past', {
      url: '/past',
      views: {
          'tab-quiz': {
              templateUrl: 'templates/past.htm',
              controller: 'pastCtrl'
          }
      }
  }).state('tab.exam', {
      url: 'quiz/rules/exams',
      views: {
          'tab-quiz': {
              templateUrl: 'templates/exam.htm',
              controller: 'rulesCtrl'
          }
      }
  })
    .state('tab.class', {
        url: '/class',
        views: {
            'tab-class': {
                templateUrl: 'templates/tab-class.htm',
              controller: 'classCtrl',
         
          }
        }
    }).state('tab.enroll', {
      url: '/class/enroll',
      views: {
        'tab-class': {
          templateUrl: 'templates/class/enroll.htm',
          controller: 'classCtrl'
        }
      }
    }).state('tab.course', {
      url: '/class/course',
      views: {
        'tab-class': {
          templateUrl: 'templates/class/edu.htm',
          controller: 'courseCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/tab/dash');

});
