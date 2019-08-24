angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $cordovaNetwork, $rootScope, $state) {
    $scope.nav = function (navigate) {
      $state.go(navigate);
    }
    $scope.user = JSON.parse(localStorage.getItem("user"));
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('oneCtrl', function ($scope, $rootScope, $http, $ionicLoading, $ionicPopup, $state) {

    $scope.submit = function () {
      var data = {
        name: document.getElementById("full").value,
        username: document.getElementById("user").value,
        department: document.getElementById("dept").value,
        phone: document.getElementById("tel").value,
        pass_key: document.getElementById("key").value
      }
      console.log(data)
      if (!data.pass_key) {
        var confirmAction = $ionicPopup.confirm({
          title: 'No key Provided',
          template: 'You did not Provide any key would you still like to continue?'
        });
        confirmAction.then(function (res) {
          if (res) {
            data.pass_key = null;
            $ionicLoading.show({
              template: ` <div class="ld ld-hourglass ld-spin-fast" style="font-size:64px;color:#8da"></div>`
            });
            $http.post("http://localhost:100/user", data).then(function (res) {
              $ionicLoading.hide();
              localStorage.setItem("user", JSON.stringify(data));
              console.log(res)
              $rootScope.fix = true;
              $state.go("tab.dash")
            },
              function (err) {
                console.log(err)
                $ionicLoading.hide();
                $ionicPopup.alert({
                  title: 'Error!!!',
                  template: "no network connection"
                })

                return
              })

          } else {
            console.log('Not sure!');
          }
        });
      }
      //submit the data to the server for upload
    }

  })

  .controller('quizCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('rulesCtrl', function ($scope, $rootScope, $ionicPopup, $interval, $ionicModal) {
    $scope.img = function (img) {
      document.getElementById("img").src = img;
      $('#myModal').modal('show');

    };
    $rootScope.close = function () {
      console.log("submit")
      $('#myModal').modal('hide');

    }
    var mins = $rootScope.test.duration;
    console.log(mins)
    var index = 0;
    var width = 0;
    var timer = 0;
    var interval = $interval(function () {
      timer = timer + 250;
      var total = mins * 60 * 1000;
      width = timer / total * 100;
      if (width < 50) {
        document.getElementById("progress").style.backgroundColor = "green"
      }
      if (width > 50 && width < 90) {
        document.getElementById("progress").style.backgroundColor = "yellow"
      }
      if (width > 90) {
        document.getElementById("progress").style.backgroundColor = "red"
      }
      document.getElementById("progress").style.width = width + "%";
      console.log(width);
      if (width == 100) {
        $scope.mark();
      }
    }, 250, mins * 60 * 4);
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4");
    $scope.questions = $rootScope.test.quiz;
    $scope.question = $rootScope.test.quiz[index];

    $scope.mark = function () {
      console.log($scope.questions.length)
      var points = 0;
      var scores = 0;
      var grade;
      for (var i = 0; i < $scope.questions.length; i++) {
        console.log(points)
        if ($scope.questions[i].choice == $scope.questions[i].answer) {
          points = points + 1;
          console.log(points)
        }

      }
      scores = points / $scope.questions.length * 100;
      console.log("your score over 100 is " + scores)
      return scores;
    };

    $scope.right = function () {


      if (index + 1 < $scope.questions.length) {
        index = index + 1;
        $scope.question = $scope.questions[index];

      }
    }
    $scope.left = function () {
      if (index > 0) {
        index = index - 1;
        $scope.question = $scope.questions[index];

      }
    }
    $scope.fix = function (ind) {
      index = ind;
      $scope.question = $scope.questions[index];

    }
    $scope.choose = function (choice) {
      $scope.questions[index].choice = choice;

    }

  })
  .controller('classCtrl', function ($scope, $ionicPopup, $state, $rootScope) {

    // this function is a class page level function that navigates the user to the enroll page
    $scope.enroll = function () {
      localStorage.setItem("enrolled", true);
      $rootScope.enrolled = true;

      $state.go("tab.enroll");
    }
    $scope.continue = function () {
      $state.go("tab.course");
    }
    $scope.details = function (item) {
      $ionicPopup.alert({
        title: item.topic,
        template: item.desc
      })
    }
    $scope.groups = [{
      name: "Chapter 1: Introduction to the Fundamentals of FORTRAN",
      items: [{ topic: "What is FORTRAN", desc: "This topic makes you familiar with the basics of programming and FORTRAN" },
      { topic: "FORTRAN 77 basics", desc: "Get to know the basic of FORTRAN77 and its features that makes it different from other versions of FORTRAN" },
      { topic: "Column and Position Rules" }
      ]
    },
    {
      name: "Chapter 2: Variables and Expressions",
      items: [{ topic: "Variables, Types and Declarations" },
      { topic: "Expressions and Assignment" },
      { topic: "Logical Expressions" }
      ]
    },
    {
      name: "Chapter 3: Program Flow",
      items: [{ topic: "The IF statements" },
      { topic: "Loops" }

      ]
    },
    {
      name: "Chapter 4: Arrays and Sub-Programs",
      items: [{ topic: "Arrays" },
      { topic: "Subprograms" },

      ]
    },
    {
      name: "Chapter 5: Input and Output",
      items: [{ topic: "Simple I/O" },
      { topic: "FORMAT Statements" },
      { topic: "File I/O" }
      ]
    },
    {
      name: "Chapter 6: Futher Knowledge",
      items: [{ topic: "Array in Subprograms" },
      { topic: "Common Blocks" },
      { topic: "Data & Data Statement" },
      { topic: "Special Knowledge" }

      ]
    }
    ];


    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };

    $scope.more = false;
    $scope.show = function () {
      $scope.more = true;
    }
  })
  .controller('pastCtrl', function ($scope, $rootScope, $state) {
    $scope.assign = function (test) {
      if (test == "2014a") {
        $rootScope.test = s2014a;
        $state.go("tab.rules");
      }
      if (test == "2014b") {
        $rootScope.test = s2014b;
        $state.go("tab.rules");
      }

    }
  })
  .controller("courseCtrl", function ($scope, $http, $ionicLoading, $ionicPopup) {
   
    $scope.submitQuestions = function () {
      var scores = 0;
      for (var i = 0; i < $scope.questions.length; i++) {
        if ($scope.questions[i].choosen == $scope.questions[i].answer) {
          scores = scores + 1;
        }
      }
      console.log(scores);
      if (scores > 2) {
        console.log("success");
        var confirmAction = $ionicPopup.alert({
          title: '<strong>Success!!!</strong>',
          template: 'Your scores is <b>' + scores + '</b> which is above the required scores.'
        });
        confirmAction.then(function (res) {
          if (res) {
            console.log("scores");
            $scope.quizButton = true;
            $scope.next();
          }
        });
      }
      else {
        console.log("fail");
        var confirmAction = $ionicPopup.alert({
          title: '<strong>Failed!!!</strong>',
          template: 'Your scores is <b>' + scores + '</b> which is below the required scores. Please try again.'
        });
        confirmAction.then(function (res) {
          if (res) {
            console.log("scores");
            $scope.quizButton = true;
          }
        });

      }
    }
    $scope.nextQuiz = function (index) {
      $scope.index = index;
    }
    $scope.assign = function (data) {
      console.log(data)
      $scope.questions[$scope.index].choosen = data;
      console.log($scope.questions[$scope.index]);
    }
    $scope.quizButton = true;
    $scope.loadQuestions = function (choose) {
      $ionicLoading.show({
        template: ` <div class="ld ld-hourglass ld-spin-fast" style="font-size:64px;color:#8da"></div>`
      });
      $http.get("http://localhost:100/questions/" + choose.name).then(function (res) {
        $ionicLoading.hide();
        console.log(res.data);
        $scope.index = 0;
        $scope.questions = res.data;
        $scope.quizButton = false;
      }, function (err) {
        console.log(err);
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error!!!',
          template: "no network connection"
        })
        })
    }
    //declaring the next button
    var nextButton = document.getElementById("nextButton");
    var text = document.getElementById("text");
    //intialize the course object
    $scope.course = fortran;
    //if first time in the course: set the chapter storage and topic storage to the first topic and chapter
    if (localStorage.getItem("chapter") == null) {
      localStorage.setItem('chapter', '0');
      localStorage.setItem('topic', '0');
    }
    //initailze the chapter and the topic variables
    var chapter = parseInt(localStorage.getItem("chapter"));
    var topic = parseInt(localStorage.getItem("topic"));
    var setTutorial = function () {
      $scope.chapter = fortran.chapters[chapter];
      $scope.topic = $scope.chapter.topics[topic];
      $scope.choose = $scope.topic.contents[0];
      if ($scope.choose.type == 'text') {
        console.log("content is text");
        text.innerHTML = $scope.choose.src;
      }
      console.log($scope.chapter);
      console.log($scope.topic);
      console.log($scope.choose);
    };
    var nextTopic = function () {

      if (topic == $scope.chapter.topics.length - 1) {

        $scope.nextTopicName = fortran.chapters[chapter + 1].topics[0].name;

      }
      else {
        $scope.nextTopicName = $scope.chapter.topics[topic + 1].name;
      }

    }

    setTutorial();

    nextTopic();

    // this fixes a specific topic content to the display screen. 
    $scope.fix = function (tutorial) {
      console.log(tutorial)
      $scope.choose = tutorial;
      if ($scope.choose.type == 'text') {
        console.log("content is text");
        text.innerHTML = tutorial.src;
      }
    }

    $scope.next = function () {
      if (topic < $scope.chapter.topics.length - 1) {
        topic = topic + 1;
        setTutorial();
        nextTopic();
      }
      else {
        chapter = chapter + 1;
        topic = 0;
        setTutorial();
        nextTopic();
      }
    }

   
  })


var offline = function () {
  console.log("test")
  var x = document.getElementById("offline");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}


var toast = function () {
  console.log("test")
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}

var fortran =
{
  "id": 1,
  "name": "Introduction to Symbolic Programming with FORTRAN",
  "completed": false,
  "chapters": [
    {
      "id": 1,
      "name": "Introduction to the Fundamentals of FORTRAN",
      "topics": [
        {
          "id": 1,
          "name": "What is FORTRAN",
          "contents": [
         
            {
              "id": 1,
              "name": "What is FORTRAN",
              "type": "text",
              "src": `<div class="card">
  <div class="row">
    <div class="col" style=""><strong>what is FORTRAN ? </strong></div>
  </div>
  <div class="row">
    <div class="col" style="font-family:sans-serif; font-weight:200;">
Fortran is a general purpose programming language, mainly intended for mathematical computations in e.g. engineering. Fortran is an acronym for FORmula TRANslation, and was originally capitalized as <span style="font-weight:600"> FORTRAN</span>. However, following the current trend to only capitalize the first letter in acronyms, we will call it Fortran. Fortran was the first ever high-level programming languages. The work on Fortran started in the 1950's at IBM and there have been many versions since. By convention, a Fortran version is denoted by the last two digits of the year the standard was proposed. Thus we have:
<ul style="list-style-type:circle">
  <li style="list-style-type:circle">Fortran 66</li>
  <li>Fortran 77</li>
  <li>Fortran 90</li>
  <li>Fortran 2005</li>
  <li>Fortran 2018</li>
</ul>

    </div>
  </div>
</div>`,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-document"
            },

            {
              "id": 2,
              "name": "History of FORTRAN",
              "type": "video",
              "size": "6.49MB",
              "duration": "5:42",
              "src": "http://localhost:100/lib/videos/ch1_T2_history_of_fortran.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "Introduction to FORCE 2.0",
              "type": "video",
              "size": "1.93MB",
              "duration" : "3:09",
              "src": "http://localhost:100/lib/videos/FORCE2.0.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 5,
              "name": "WHAT IS FORTRAN",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },
        {
          "id": 2,
          "name": "FORTRAN77 Basics",
          "contents": [
   
            {
              "id": 1,
              "name": "Complier, Interpreter, and FORTRAN",
              "type": "video",
              "size": "4.57MB",
              "src": "http://localhost:100/lib/videos/complier and interpreter.mp4",
              "done": false,
              "duration": "5:13",
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Another simple program",
              "type": "text",

              "src": `
<div class="card">
  <div class="row">
    <div class="col" style="font-weight:800">FORTRAN 77 basics</div>
  </div>
  <div class="row">
    <div class="col">
      <p>A Fortran program is just a sequence of lines of text. The text has to follow a certain syntax to be a valid Fortran program. We start by looking at a simple example:</p>
     
         <code>   <span style="color: blue">  program <span> circle<br/>
             real r, area<br/>
        c    This program reads a real number r and prints<br/>
        c    the area of a circle with radius r.<br/>
             write (*,*) 'Give radius r:'<br/>
             read (*,*) r<br/>
             area = 3.14159*r*r<br/>
             write (*,*) 'Area = ', area<br/>
             stop<br/>
             end

      </code>
  <p>The lines that begin with with a "c" are comments and has no purpose other than to make the program more readable for humans. Originally, all Fortran programs had to be written in all upper-case letters. Most people now write lower-case since this is more legible, and so will we.</p>
 
    </div>
  </div>
</div>

`,
              "done": false,
              "icon": "ion ion-document"
            },
            {
              "id": 3,
              "name": "Learning the alphabets, words and sentences",
              "type": "video",
              "size": "9.32MB",
              "duration": "15:15",
              "src": "http://localhost:100/lib/videos/learning_the_alphabets.mp4",
              "done": false,
              "icon": "ion ion-videocamera"
            },
          
            {
              "id": 4,
              "name": "Columns and Position Rules",
              "type": "text",
              "src": `<div class="card">
  <h2>column and position rules</h2>
  <p>Fortran 77 is not a free-format language, but has a very strict set of rules for how the source code should be formatted. The most important rules are the column position rules:</p>
  <p>
    Col. 1 : Blank, or a "c" or "*" for comments<br/>
    Col. 2-5 : Statement label (optional)<br/>
    Col. 6 : Continuation of previous line (optional)<br/>
    Col. 7-72 : Statements<br/>
    Col. 73-80: Sequence number (optional, rarely used today)<br/>
  </p>
  <p>Most lines in a Fortran 77 program starts with 6 blanks and ends before column 72, i.e. only the statement field is used. Note that Fortran 90 and above allows free format.</p>
  <h3>comments</h3>
  <p>A line that begins with the letter "c" or an asterisk in the first column is a comment. Comments may appear anywhere in the program. Well-written comments are crucial to program readibility. Commercial Fortran codes often contain about 50% comments. You may also encounter Fortran programs that use the exclamation mark (!) for comments. This is highly non-standard in Fortran 77, but is allowed in Fortran 90. The exclamation mark may appear anywhere on a line (except in positions 2-6).</p>
  <h3>Continuation</h3>
  <p>Occasionly, a statement does not fit into one single line. One can then break the statement into two or more lines, and use the continuation mark in position 6. Example:</p>
  <code>
    c23456789 (This demonstrates column position!)<br/>
    c The next statement goes over two physical lines<br/>
    area = 3.14159265358979<br/>
    + * r * r<br/>
  </code>
  <p>
    Any character can be used instead of the plus sign as a continuation character. It is considered good programming style to use either the plus sign, an ampersand, or numbers (2 for the second line, 3 for the third, and so on).
  </p>
  <h3>Blank spaces</h3>
  <p>
    Blank spaces are ignored in Fortran 77. So if you remove all blanks in a Fortran 77 program, the program is still syntactilly correct but almost unreadable for humans.
  </p>
</div>
`,

              "done": false,

              "icon": "ion ion-document"
            },
            {
              "id": 5,
              "name": "FORTRAN77 Basics",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }
          ]
        }


      ],
      "quiz": [
        "a list of quiz objects coming from the server with chapter ID as 1 (10)"
      ]

    },
    {
      "id": 2,
      "name": "Variables and Expressions",
      "topics": [
        {
          "id": 1,
          "name": "VARIABLE, TYPES AND DECLARATION",
          "contents": [
            {
              "id": 1,
              "name": "Understanding Variables.",
              "type": "video",
              "size": "6.52 MB",
              "duration": "9:04",
              "src": "http://localhost:100/lib/videos/UNDERSTANDING_VARIABLES.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Data-Types in FORTRAN",
              "type": "video",
              "size": "5.75MB",
              "duration":"6:31",
              "src": "http://localhost:100/lib/videos/DATATYES_IN_FORTRAN.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },

            {
              "id": 3,
              "name": "VARIABLE, TYPES AND DECLARATION",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },
        {
          "id": 2,
          "name": "EXPRESSIONS AND ASSIGNMENT",
          "contents": [
            {
              "id": 1,
              "name": "Expression in FORTRAN",
              "type": "video",
              "size": "1.53MB",
              "duration": "3:03",
              "src": "http://localhost:100/lib/videos/expressions_in_fortran.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Expressions",
              "type": "text",
              "src": `<div class="card padding">
  <h2>Expressions</h2>
  <p>
    The simplest expressions are of the form <br />
    <span style="color: cadetblue">
      operand operator operand
    </span><br/>
    and an example is
    <span style="color:cadetblue">x + y</span>
  </p>
  <p>
    The result of an expression is itself an operand, hence we can nest expressions together like<br />
    <span style="color:cadetblue"> x + 2 * y </span>
  </p>
  <p>This raises the question of precedence: Does the last expression mean x + (2*y) or (x+2)*y? The precedence of arithmetic operators in Fortran 77 are (from highest to lowest):</p>
  <p>
    ** {exponentiation}<br/>
    *,/ {multiplication, division}<br/>
    +,- {addition, subtraction}<br/>
  </p>
  <p>All these operators are calculated left-to-right, except the exponentiation operator **, which has right-to-left precedence. If you want to change the default evaluation order, you can use parentheses.</p>
  <p>The above operators are all binary operators. there is also the unary operator - for negation, which takes precedence over the others. Hence an expression like -x+y means what you would expect.</p>
  <p>Extreme caution must be taken when using the division operator, which has a quite different meaning for integers and reals. If the operands are both integers, an integer division is performed, otherwise a real arithmetic division is performed. For example, 3/2 equals 1, while 3./2. equals 1.5.</p>
</div>
`,
              "done": false,

              "icon": "ion ion-document"
            },

            {
              "id": 3,
              "name": "Arithmetic Expressions",
              "type": "video",
              "size": "9.15MB",
              "duration": "11:10",
              "src": "http://localhost:100/lib/videos/BODMASmp4.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },

            {
              "id": 4,
              "name": "Parameter Statement",
              "type": "text",
              "src": `<div class="card padding">
  <h2>parameter statement</h2>
  <p>Some constants appear many times in a program. It is then often desirable to define them only once, in the beginning of the program. This is what the parameter statement is for. It also makes programs more readable. For example, the circle area program should rather have been written like this:</p>
  <code>
    program circle<br />
    real r, area, pi<br />
    parameter (pi = 3.14159)<br />
    write (*,*) 'Give radius r:'<br />
    read (*,*) r<br />
    area = pi*r*r<br />
    write (*,*) 'Area = ', area<br />
    stop<br />
    end
  </code>
  <p>
    The syntax of the parameter statement is<br />
    <code> parameter (name = constant, ... , name = constant)</code>
  </p>
  <p>
    Some good reasons to use the parameter statement are:<br/>
    * it helps reduce the number of typos<br/>
    * it is easy to change a constant that appears many times in a program<br/>
  </p>
</div>
`,
              "done": false,

              "icon": "ion ion-document"
            },
            {
              "id": 5,
              "name": "Assignment Statement",
              "type": "text",
              "src": `<div class="card padding">
  <h2>Assignment Statement</h2>
  <p>
    The assignment has the form<br />
    <span style="color:cadetblue">variable_name = expression </span> <br />
    The interpretation is as follows: Evaluate the right hand side and assign the resulting value to the variable on the left. The expression on the right may contain other variables, but these never change value! For example,<br />
    <span style="color:cadetblue">area = pi * r**2  </span> <br />
    does not change the value of pi or r, only area.
  </p>
  <h3>Type conversion</h3>
  <p>
    When different data types occur in the same expression, type conversion has to take place, either explicitly or implicitly. Fortran will do some type conversion implicitly. For example,<br />
    <code style="color:cadetblue">
      real x <br/>
      x = x + 1
    </code>
  </p>
  <p>
    will convert the integer one to the real number one, and has the desired effect of incrementing x by one. </p>

</div>
`,
              "done": false,

              "icon": "ion ion-document"
            },
            {
              "id": 6,
              "name": "EXPRESSIONS AND ASSIGNMENT",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }

          ]
        },
        {
          "id": 3,
          "name": "LOGICAL EXPRESSIONS",
          "contents": [
            {
              "id": 1,
              "name": "Logical Expressions(summary)",
              "type": "text",
              "size": "",
              "src": `<div class="card padding">
              <h3>Logical Expression</h3>
              <p>Logical expressions are expression that can only result in only two values:
                   <span>.TRUE.</span> and <span>.FALSE.</span>.
                    A logical expression can be formed by comparing arithmetic expressions using the following relational operators.
                  </p>
              <h4>Relational Operators</h4>
              <div class="list">
                      <div class = "item ">
                              .LT.  
                              <span class = "text-note">(less than)</span>
                       </div>
                       <div class = "item ">
                              .GT.  
                              <span class = "text-note">(greater than)</span>
                       </div>
                       <div class = "item ">
                              .GE.  
                              <span class = "text-note">(greater than or equal to)</span>
                       </div>
                       <div class = "item ">
                              .LE.  
                              <span class = "text-note">(less than or equal to)</span>
                       </div>
                       <div class = "item ">
                              .EQ.  
                              <span class = "text-note">(equal to)</span>
                       </div>
                       <div class = "item ">
                              .NE.  
                              <span class = "text-note">(not equal to)</span>
                       </div>
              </div>
              <h4>Logical Operators</h4>
              <p>
                      Logical expressions can be combined by the logical operators .AND. .OR. .NOT. which have the obvious meaning.
              </p>
              <h4>Logical variables and assignment</h4>
              <p>
                  Truth values can be stored in logical variables. The assignment is analagous to the arithmetic assignment. Example:
                  <br/>
                  <code>
                      <pre>
<span style="color:blue">LOGICAL </span>A, B
A = <span style="color:blue">.TRUE.</span> 
B = A <span style="color:blue">.AND.</span> 3 <span style="color:blue">.LT.</span> 5<span style="color:green">/</span>2
                      </pre>
                  </code>
                  <br/>
              <p>
                      The order of precedence is important, as the last example shows. The rule is that arithmetic expressions are evaluated first, then relational operators,
                       and finally logical operators. Hence b will be assigned .FALSE. in the example above.
              </p>
              </p>
          
          </div>`,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-document"
            },
            {
              "id": 2,
              "name": "Relational Expressions",
              "type": "video",
              "size": "4.42 mb",
              "src": "http://localhost:100/lib/videos/RELATIONAL_EXP.mp4",
              "done": false,
              "duration": "7:42",
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "Logical Expressions",
              "type": "video",
              "size": "8.59 MB",
              "duration" : "6:29",
              "src": "http://localhost:100/lib/videos/LOGICAL_OP.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            
            {
              "id": 4,
              "name": "A brief History of FORTRAN",
              "type": "quiz",
              "score": 0,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-help"
            }
          ]
        }

      ],
      "quiz": [
        "a list of quiz objects coming from the server with chapter ID as 1 (10)"
      ]

    },
    {
      "id": 3,
      "name": "Program Flow",
      "topics": [
        {
          "id": 1,
          "name": "IF Statements 1",
          "contents": [
            {
              "id": 1,
              "name": "Selectional Flow(conditional statement)",
              "type": "video",
              "size": "5.56 MB",
              "duration": "3:08",
              "src": "http://localhost:100/lib/videos/selectional_statement.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "Computed GOTO",
              "type": "video",
              "size": "12.1 MB",
              "duration": "7:51",
              "src": "http://localhost:100/lib/videos/COMPUTED_GOTO.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 4,
              "name": "Arithmetic IF ",
              "type": "video",
              "size": "12.0 MB",
              "duration": "7:54",
              "src": "http://localhost:100/lib/videos/ARITHMETIC_IF.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "IF STATEMENTS 1",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },
        {
          "id": 2,
          "name": "IF STATEMENTS 2",
          "contents": [
            {
              "id": 1,
              "name": "Logical IF",
              "type": "video",
              "size": "3.99 MB",
              "duration": "3:21",
              "src": "http://localhost:100/lib/videos/LOGICAL_IF.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Block IF",
              "type": "video",
              "size": "13.3 MB",
              "duration": "7:36",
              "src": "http://localhost:100/lib/videos/BLOCK_IF.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Block IF",
              "type": "text",
              "size": "",
              
              "src": `<div class="card padding">
  <h3>IF Statements</h3>
  <p>
    An important part of any programming language are the conditional statements.
    The most common such statement in Fortran is the ifstatement, which actually has several forms.
    The simplest one is the logical if statement:
  </p>
  <h4>Logical IF</h4>
  <div>
    syntax:
    <code>
    <span style="color: blue">IF</span> (logical expression) executable statement
    </code>
           
  </div>
  <h4>Block IF</h4>
  <div>
    <span>
      If more than one statement should be executed inside the if,
      then the following syntax should be used:
    </span>
    <code>
      <pre>
<span style="color: blue">IF</span> (logical expression) <span style="color: blue">THEN</span>
  statements
<span style="color: blue">ENDIF</span>
</pre>
    </code>
    <p>The most general form of the if statement has the following form:</p>
    <code>
      <pre>
<span style="color: blue">IF</span> (logical expression) <span style="color: blue">THEN</span>
statements
<span style="color: blue">ELSEIF</span> (logical expression) <span style="color: blue">THEN</span>
statements
:
:
<span style="color: blue">ELSE</span>
statements
<span style="color: blue">ENDIF</span>
</pre>
    </code>
    <p>The execution flow is from top to bottom.
    The conditional expressions are evaluated in sequence until one is found to be true.
    Then the associated code is executed and the control jumps to the next statement after the endif.
    </p>
  </div>
  <h4>Nested IFs</h4>
  <div>
    <p>
      if statements can be nested in several levels. To ensure readability, it is important to
      use proper indentation. Here is an example:
    </p>
    <code>
      <pre>
<span style="color:blue">IF</span> (x <span style="color:blue">.GT.</span> 0) <span style="color:blue">THEN</span>
<span style="color:blue">IF</span>(x <span style="color:blue">.GE.</span> y) <span style="color:blue">THEN</span>
<span style="color:blue">WRITE</span>(<span style="color:green">*</span>,<span style="color:green">*</span>) 'x is positive and x >= y'
else
<span style="color:blue">WRITE</span>(<span style="color:green">*</span>,<span style="color:green">*</span>) 'x is positive but x < y'
endif
<span style="color: blue">ELSEIF</span> (x .LT. 0) then
<span style="color:blue">WRITE</span>(<span style="color:green">*</span>,<span style="color:green">*</span>) 'x is negative'
<span style="color: blue">ELSE</span>
<span style="color:blue">WRITE</span>(<span style="color:green">*</span>,<span style="color:green">*</span>) 'x is zero'
<span style="color: blue">ENDIF</span>
</pre>
    </code>
    <p>
      You should avoid nesting many levels of if statements since things get hard to follow.
    </p>

  </div>
</div>
`,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-document"
            },
         
            {
              "id": 4,
              "name": "IF Statement 2",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },
        {
          "id": 3,
          "name": "LOOPS",
          "contents": [
            {
              "id": 1,
              "name": "Do Loops",
              "type": "video",
              "size": "19.1 MB",
              "duration": "12.13",
              "src": "http://localhost:100/lib/videos/DO_LOOP.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "DO_WHILE loop",
              "type": "video",
              "size": "14.4 MB",
              "duration": "7:11",
              "src": "http://localhost:100/lib/videos/DO_WHILE.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Loop Nesting",
              "type": "video",
              "size": "5.34 MB",
              "duration": "5:05",
              "src": "http://localhost:100/lib/videos/nesting.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "LOOPS",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },


      ],
      "quiz": [
        "a list of quiz objects coming from the server with chapter ID as 1 (10)"
      ]

    },
    {
      "id": 4,
      "name": "Arrays and SubPrograms",
      "topics": [
        {
          "id": 1,
          "name": "SINGLE DIMENSIONAL ARRAYS",
          "contents": [
            {
              "id": 1,
              "name": "",
              "type": "video",
              "size": "6.52 MB",
              "duration": "9:04",
              "src": "http://localhost:100/lib/videos/UNDERSTANDING_VARIABLES.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 2,
              "name": "Data-Types in FORTRAN",
              "type": "video",
              "size": "5.75MB",
              "duration": "6:31",
              "src": "http://localhost:100/lib/videos/DATATYES_IN_FORTRAN.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },

            {
              "id": 3,
              "name": "VARIABLE, TYPES AND DECLARATION",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }


          ]
        },
        {
          "id": 2,
          "name": "Multi Dimensional Arrays",
          "contents": [
            {
              "id": 1,
              "name": "Multi dimensional Arrays",
              "type": "video",
              "size": "2.92MB",
              "duration": "5:08",
              "src": "http://localhost:100/lib/videos/MULTI_DEMENSION.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
         

            {
              "id": 3,
              "name": "Accessing Multi Dimensional Arrays",
              "type": "video",
              "size": "12.9MB",
              "duration": "5:36",
              "src": "http://localhost:100/lib/videos/BODMASmp4.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 4,
              "name": "Implied Do for Arrays",
              "type": "video",
              "size": "12.9MB",
              "duration": "9:48",
              "src": "http://localhost:100/lib/videos/ARRAY_IMPLIED.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 4,
              "name": "Multi Dimensional Arrays",
              "type": "text",
              "size": "",
              "duration": "",
              "src": `<div class="card padding">
  <h3>Multi-Dimensional Array</h3>
  <h4>Two Dimensional Array</h4>
  <div>
    <p>
      Matrices are very important in linear algebra.
      Matrices are usually represented by two-dimensional arrays. For example, the declaration
    </p>
    <code>
      <span style="color:blue">REAL</span> A(3,5)
    </code>
    <p>
      defines a two-dimensional array of 3*5=15 real numbers.
      It is useful to think of the first index as the row index, and the second as the column index.
      Hence we get the graphical picture:
    </p>
    <code>
      <pre>
(1,1) (1,2) (1,3) (1,4) (1,5)
(2,1) (2,2) (2,3) (2,4) (2,5)
(3,1) (3,2) (3,3) (3,4) (3,5)
</pre>
    </code>
    <p>
      Two-dimensional arrays may also have indices in an arbitrary defined range.
      The general syntax for declarations is:
    </p>
    <code>
      <pre>
Name (low_index1 : hi_index1, low_index2 : hi_index2)
</pre>
    </code>
    <p>
      The total size of the array is then
    </p>
    <code>
      <pre>
size = (hi_index1-low_index1+1)*(hi_index2-low_index2+1)
</pre>

    </code>
  </div>
  <h4>Multi Dimensional Arrays</h4>
  <div>
  Fortran 77 allows arrays of up to seven dimensions.
  The syntax and storage format are analogous to the two-dimensional case, so we will not spend time on this
  </div>
</div>
`,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-document"
            },

        
           
            {
              "id": 6,
              "name": "MULTI DIMENSIONAL ARRAYS",
              "type": "quiz",

              "score": 0,
              "done": false,

              "icon": "ion ion-help"
            }

          ]
        },
        {
          "id": 3,
          "name": "Subprograms",
          "contents": [
   
            {
              "id": 1,
              "name": "Introduction to Subprograms",
              "type": "video",
              "size": "4.48 mb",
              "src": "http://localhost:100/lib/videos/subprograms.mp4",
              "done": false,
              "duration": "4:16",
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "In-Built & Arithmetic functions",
              "type": "video",
              "size": "12.1 MB",
              "duration": "11:19",
              "src": "http://localhost:100/lib/videos/INBUILT&ARTH_FUN.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 3,
              "name": "Function Subprogram",
              "type": "video",
              "size": "10.9 MB",
              "duration": "6:23",
              "src": "http://localhost:100/lib/videos/FUNCTIONS.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },
            {
              "id": 4,
              "name": "SUBROUTINES Subprogram",
              "type": "video",
              "size": "10.9 MB",
              "duration": "8:32",
              "src": "http://localhost:100/lib/videos/SUBROUTINES.mp4",
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-videocamera"
            },

            {
              "id": 5,
              "name": "SUBPROGRAMS",
              "type": "quiz",
              "score": 0,
              "done": false,
              "subtitle": "some text to be shown later on",
              "icon": "ion ion-help"
            }
          ]
        }

      ],
      "quiz": [
        "a list of quiz objects coming from the server with chapter ID as 1 (10)"
      ]

    }
  ]

}


var s2014a = {
  "duration": 5,
  "rules": ["You have 20 questions to answer", "Answer all questions", "Finish within 5 minutes"],
  "quiz": [
    {
      "question": "what role is the first arithmetic operator in the statement ",
      "option1": "dyadic",
      "option2": "monadic",
      "option3": "unary",
      "option4": "none of the above",
      "answer": "unary",
      "session": "2014/2015",
      "chapter": "",
      "no": "1",
      "img": [],
      "choice": ""
    },
    {
      "question": "manual checking of program using test data is called?",
      "option1": "Debugging",
      "option2": "Hard_run",
      "option3": "Dry_run",
      "option4": "Soft-Run",
      "answer": "Dry_run",
      "session": "2014/2015",
      "chapter": "",
      "no": "2",
      "img": [],
      "choice": ""
    },
    {
      "question": "which of the following statements is not true about code1?",
      "option1": "the array used in the program can hold up to 20 elements",
      "option2": "the array contains 12 elements",
      "option3": "the array is multi-dimensional",
      "option4": "all of the above",
      "answer": "the array contains 12 elements",
      "session": "2014/2015",
      "chapter": "",
      "no": "3",
      "img": "2",
      "choice": ""
    },
  
    {
      "question": "Which of the following is true about code1?",
      "option1": "statement in line 10 will lead to a logical error",
      "option2": "statement in line 10 will lead to a syntax error",
      "option3": "statement in line 10 will lead to an execution error",
      "option4": "none of the above",
      "answer": "none of the above",
      "session": "2014/2015",
      "chapter": "",
      "no": "4",
      "img": "2",
      "choice": ""
    },
    {
      "question": "Which of the following is statements is true about arry a( i",
      "option1": "j) in code1?",
      "option2": "the array value is read in no particular order",
      "option3": "the array is outputted in a matrix form",
      "option4": "statement on line 5 & 6 will lead to a logical error",
      "answer": "none of the above",
      "session": "the array is outputted in a matrix form",
      "chapter": "2014/2015",
      "no": "",
      "img": "5",
      "choice": ""
    },
    {
      "question": "which of the following option best describes the type of 'do' statement employed in code1?",
      "option1": "implied do loop",
      "option2": "explict do loop",
      "option3": "combined do loop",
      "option4": "option a",
      "answer": "b and c",
      "session": "implied do loop",
      "chapter": "",
      "no": "",
      "img": "6",
      "choice": ""
    },
    {
      "question": "which of the following is true about the file 'loopin.txt' of code1?",
      "option1": "it is an output file",
      "option2": "the file is automatically created",
      "option3": "it is an input file",
      "option4": "a and c",
      "answer": "it is an input file",
      "session": "",
      "chapter": "",
      "no": "7",
      "img": "2",
      "choice": ""
    },
    {
      "question": "the execution will proceed with the write statement if",
      "option1": "A.LE.4",
      "option2": "A.GE.4",
      "option3": "A.NE.4",
      "option4": "A.GT.4",
      "answer": "A.GT.4",
      "session": "",
      "chapter": "",
      "no": "9",
      "img": "3",
      "choice": ""
    },
    {
      "question": "which of the following is true about code2?",
      "option1": "30",
      "option2": "40",
      "option3": "50 are all labels",
      "option4": "if b²-4ac > 0 execution will continue with label 50",
      "answer": "if b²-4ac = 0 execution continues with label 40 ",
      "session": "all of the above",
      "chapter": "all of the above",
      "no": "",
      "img": "",
      "choice": ""
    },
    {
      "question": "the maximum allowable integer value by variable A in code2 is….",
      "option1": "999.99",
      "option2": "99.99",
      "option3": "9.99",
      "option4": "99",
      "answer": "99",
      "session": "",
      "chapter": "",
      "no": "11",
      "img": "3",
      "choice": ""
    },
    {
      "question": "after execution of the statement L = 3/2 the result is…",
      "option1": "L = 1",
      "option2": "L = 1.5",
      "option3": "L = 0.5",
      "option4": "L = 1.3",
      "answer": "L = 1",
      "session": "",
      "chapter": "",
      "no": "12",
      "img": "",
      "choice": ""
    },
    {
      "question": "which of the following is not true about algorithm?",
      "option1": "has a finite number of steps",
      "option2": "must be ambiguous",
      "option3": "mat take zero or more inputs",
      "option4": "should have a starting point",
      "answer": "must be ambiguous",
      "session": "",
      "chapter": "",
      "no": "13",
      "img": "",
      "choice": ""
    },
    {
      "question": "which of the following is not a data type in FORTRAN?",
      "option1": "integer",
      "option2": "real",
      "option3": "character",
      "option4": "none of the above",
      "answer": "none of the above",
      "session": "",
      "chapter": "",
      "no": "14",
      "img": "",
      "choice": ""
    },
    {
      "question": "which of the following is not an attribute of a good program?",
      "option1": "should be robust",
      "option2": "should always be correct",
      "option3": "must be efficient",
      "option4": "easy to maintain",
      "answer": "",
      "session": "",
      "chapter": "",
      "no": "15",
      "img": "",
      "choice": ""
    },
    {
      "question": "which of the following voilates the hierarchy of operators in FORTRAN?",
      "option1": "**",
      "option2": "*",
      "option3": "+",
      "option4": ".NOT.",
      "answer": ".OR.",
      "session": "*",
      "chapter": "+",
      "no": ".LT.",
      "img": ".NOT.",
      "choice": ""
    },
    {
      "question": "What value will be stored in J= DIM(A",
      "option1": "B)?",
      "option2": "the symmetric difference between A and B",
      "option3": "The difference between A and B",
      "option4": "The positive difference between A and B",
      "answer": "none of the above",
      "session": "The positive difference between A and B",
      "chapter": "",
      "no": "",
      "img": "8",
      "choice": ""
    },
    {
      "question": "Where are the values used for computation in code3 fetched?",
      "option1": "from file",
      "option2": "via data statement in the code",
      "option3": "from default input device",
      "option4": "assignment statement in the code",
      "answer": "from default input device",
      "session": "",
      "chapter": "",
      "no": "18",
      "img": "4",
      "choice": ""
    },
    {
      "question": "what type of IF statement is used in sample code3?",
      "option1": "arithmetic IF statement",
      "option2": "Logical IF statement",
      "option3": "Block IF statement",
      "option4": "controlled IF statement",
      "answer": "Block IF statement",
      "session": "",
      "chapter": "",
      "no": "19",
      "img": "4",
      "choice": ""
    },
    {
      "question": "What parts of the code is executed when the value of n is greater than 3?",
      "option1": "lines 1-40",
      "option2": "lines 6-9",
      "option3": "lines 11-14",
      "option4": "line 21",
      "answer": "line 21",
      "session": "",
      "chapter": "",
      "no": "20",
      "img": "4",
      "choice": ""
    }]
}
var s2014b = {
  "duration": 10,
  "rules": ["You have 25 questions to answer", "Answer all questions", "Finish within 10 minutes"],
  "quiz": [

    {
      "question": "On execution of the statement on line 18, control is transferred to which of the following lines?",
      "option1": "36",
      "option2": "26",
      "option3": "31",
      "option4": "none of the above",
      "answer": "36",
      "session": "2014/2015",
      "chapter": "",
      "no": "21",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "On execution of the function named, control is transferred to which line? ",
      "option1": "14",
      "option2": "2",
      "option3": "18",
      "option4": "13",
      "answer": "13",
      "session": "2014/2015",
      "chapter": "",
      "no": "22",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "What type of result is returned by the called program?",
      "option1": "integer",
      "option2": "explicit",
      "option3": "implicit",
      "option4": "real",
      "answer": "real",
      "session": "",
      "chapter": "",
      "no": "23",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "None but one of the following is true about code3?",
      "option1": "it has some complied time errors",
      "option2": "each of the subprograms have at least one argument",
      "option3": "It has an execution error",
      "option4": "all of the above",
      "answer": "each of the subprograms have at least one argument",
      "session": "",
      "chapter": "",
      "no": "24",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "Which of the following is not true about code3?",
      "option1": "Invocation of the subprogram is by CALL statement",
      "option2": "Invocation of the subprogramis by assignment statement",
      "option3": "some literals were used in the program",
      "option4": "b and c",
      "answer": "b and c",
      "session": "",
      "chapter": "",
      "no": "25",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "what type of variable declartion is adopted in calling program of sample 3?",
      "option1": "Mixed mode declartion",
      "option2": "implicit declartion",
      "option3": "explicit declartion",
      "option4": "all of the above",
      "answer": "implicit declartion",
      "session": "",
      "chapter": "",
      "no": "26",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "what type of IF statement is used in sample code3?",
      "option1": "arithmetic IF statement",
      "option2": "Logical IF statement",
      "option3": "Block IF statement",
      "option4": "controlled IF statement",
      "answer": "Block IF statement",
      "session": "",
      "chapter": "",
      "no": "27",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "Which of the following options best describes what sample code3 does?",
      "option1": "calculates the area of shapes using subroutines",
      "option2": "calculates the area of shapes using functions and procedures",
      "option3": "computes area of shapes by employing subprograms",
      "option4": "all of the above",
      "answer": "computes area of shapes by employing subprograms",
      "session": "",
      "chapter": "",
      "no": "28",
      "img": ["../img/past/1-1.png", "../img/past/1.png"],
      "choice": ""
    },
    {
      "question": "Which of the following is true about the declaration 'real *4 i,j'? ",
      "option1": "it is the same as 'real i,j'",
      "option2": "it is a single precision real declaration ",
      "option3": "I and j can only hold 8 bytes of information",
      "option4": "none of the above",
      "answer": "it is a single precision real declaration ",
      "session": "2014/2015",
      "chapter": "",
      "no": "",
      "img": [],
      "choice": ""
    },
    {
      "question": "…….. Is the diagrammatic representation of an algorithm",
      "option1": "psuedocode",
      "option2": "HIPO chart",
      "option3": "Data flow Diagram",
      "option4": "Flowchart",
      "answer": "Flowchart",
      "session": "",
      "chapter": "",
      "no": "30",
      "img": [],
      "choice": ""
    },
    {
      "question": "Given an array A(-2:3,3,-3:2)  how many elements are there in array A?",
      "option1": "108",
      "option2": "15",
      "option3": "105",
      "option4": "13",
      "answer": "108",
      "session": "2014/2015",
      "chapter": "",
      "no": "31",
      "img": [],
      "choice": ""
    },
    {
      "question": "Given an array B(10,5) and sub array B(4,3), what is the position of the sub-array in the parent array?",
      "option1": "24",
      "option2": "12",
      "option3": "21",
      "option4": "none of the above",
      "answer": "24",
      "session": "2014/2015",
      "chapter": "",
      "no": "32",
      "img": [],
      "choice": ""
    },
    {
      "question": "Which of the following requires only one argument",
      "option1": "MOD",
      "option2": "DIM",
      "option3": "ABS",
      "option4": "LLE",
      "answer": "ABS",
      "session": "",
      "chapter": "",
      "no": "33",
      "img": [],
      "choice": ""
    },
    {
      "question": "Which of the following translators is used for FORTRAN",
      "option1": "assembler",
      "option2": "interpreter",
      "option3": "complier",
      "option4": "none of the above",
      "answer": "complier",
      "session": "",
      "chapter": "",
      "no": "34",
      "img": [],
      "choice": ""
    },
    {
      "question": "A function subprogram is similar to a subroutine in FORTRAN in the following ways EXCEPT",
      "option1": "they can both be called be called without argument",
      "option2": "they are both subprograms",
      "option3": "they both must return one and only one value to the caller program",
      "option4": "a and c",
      "answer": "a and c",
      "session": "",
      "chapter": "",
      "no": "35",
      "img": [],
      "choice": ""
    },
    {
      "question": "How many times will the loop in code4 iterate?",
      "option1": "infinity",
      "option2": "6 times",
      "option3": "20 times",
      "option4": "n times",
      "answer": "n times",
      "session": "",
      "chapter": "",
      "no": "36",
      "img": "5",
      "choice": ""
    },
    {
      "question": "What is the maximum value that the variable ",
      "option1": "127",
      "option2": "128",
      "option3": "256",
      "option4": "225",
      "answer": "127",
      "session": "",
      "chapter": "",
      "no": "37",
      "img": "5",
      "choice": ""
    },
    {
      "question": "On what condition will the statement on line14 be executed?",
      "option1": "When count is less than n",
      "option2": "when count is less than n",
      "option3": "when count is equal to n",
      "option4": "none of the above",
      "answer": "when count is equal to n",
      "session": "",
      "chapter": "",
      "no": "38",
      "img": "5",
      "choice": ""
    },
    {
      "question": "Which is true about the field descriptor in code4?",
      "option1": "it can hold integer values",
      "option2": "it can hold real values",
      "option3": "it can accommodate character values",
      "option4": "a and b ",
      "answer": "it can hold real values",
      "session": "",
      "chapter": "",
      "no": "39",
      "img": "5",
      "choice": ""
    },
    {
      "question": "What is the maximum value sum in code4 can hold ?",
      "option1": "9",
      "option2": "99",
      "option3": "999",
      "option4": "9999999",
      "answer": "9999999",
      "session": "",
      "chapter": "",
      "no": "40",
      "img": "5",
      "choice": ""
    },
    {
      "question": "what will be the value of ",
      "option1": "-70",
      "option2": "18",
      "option3": "70",
      "option4": "54",
      "answer": "-70",
      "session": "",
      "chapter": "",
      "no": "41",
      "img": "",
      "choice": ""
    },
    {
      "question": "what is the maximum value that a label in FORTRAN can assume?",
      "option1": "9999",
      "option2": "999",
      "option3": "99999",
      "option4": "99",
      "answer": "99999",
      "session": "",
      "chapter": "",
      "no": "42",
      "img": "",
      "choice": ""
    },
    {
      "question": "….. Is a type of error that cannot be detected at either compile time or run-time",
      "option1": "syntax",
      "option2": "execution",
      "option3": "logical",
      "option4": "a and b ",
      "answer": "logical",
      "session": "",
      "chapter": "",
      "no": "43",
      "img": "",
      "choice": ""
    },
    {
      "question": "An array subscript cannot be…..",
      "option1": "an integer constant",
      "option2": "an integer variable",
      "option3": "real constant and variable",
      "option4": "integer expression",
      "answer": "real constant and variable",
      "session": "",
      "chapter": "",
      "no": "44",
      "img": "",
      "choice": ""
    },
    {
      "question": "Given the DO statement DO lab I = K1",
      "option1": " K2",
      "option2": " K3",
      "option3": " which of the following currently defines the number of iterations?",
      "option4": "(K2-K1)K3",
      "answer": "(K2-K1+K3)/K3",
      "session": "(K1-K2+K3)/K3",
      "chapter": "(K2-K1)+1",
      "no": "(K1-K2+K3)/K3",
      "img": "",
      "choice": ""
    }
  ]
}


