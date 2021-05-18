controllers.ParentController = function ($scope, $http, $window, $route, $location, loginService, teamsFactory, nflTeamsService) {
    $("#adminselect").hide();
    
    $scope.memberavatar = "";

    function checkRole() {
        var role = loginService.getMemberRole();
        if (role == "admin")
        {
            $("#adminselect").show();
            $("#adminselectsmall").show();
        }
        else
        {
            $("#adminselect").hide();
            $("#adminselectsmall").hide();
        }  
    }

    function showPicture(title, picture) {
        $('#homePicShowModalTitle').text(title);
        $scope.showPictureSrc = "img/"+ picture;
        $('#homePicShowModal').modal();
    }

    function getAvatar()
    {
        $scope.memberavatar = loginService.getMemberAvatar();
    }

    function getScreenName()
    {
        $scope.memberscreenname = loginService.getMemberScreenname();
    }

    function showAlert(title, body) {
        $('#parentAlertModalTitle').text(title);
        $('#parentAlertModalBody').text(body);
        $('#parentAlertModal').modal();
    }

    function loginlogoff(request) {
        var route = loginService.setLoginLogoffLabel("menubarlogin",1);
        getAvatar();

        loginService.setAvatarLabel("menubaravatar",1);

        checkRole();
        if (route != "")
        {
            $location.path(route);
        }

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
        {
            $("#loginHomeButton").text("Logoff");
        }
        else
        {
            $("#loginHomeButton").text("Login");
            if (route == '/home')
                showAlert("Success", "You are now logged off from The Covid 19 View");
        }
    }

    init();
    function init() {
        $scope.imagePath = "img";
        $scope.intervalVariable = "";

        $scope.current = {};
        $scope.bigNavbar = true;

        var ua = getUserAgent();
        $scope.current.devicename = ua.deviceName; 
        $scope.current.devicetype = ua.deviceType;   
        $scope.mobileDevice = isMobile();
 
        setviewpadding();

        var windowHeight = window.innerHeight;
        $scope.current.homeNewsOpinionesize = windowHeight * .50;

        getAvatar();
        getScreenName();

        loginService.setAvatarLabel("menubaravatar",0);
        var route = loginService.setLoginLogoffLabel("menubarlogin",0);

        checkRole();  
    };         

    $scope.loginlogoff = function (request) {
        loginlogoff(request);
    }

    // $scope.goMobile = function () {
    //     window.location.href = "mobile/index.html";
    // }

    $scope.showMemberAvatar = function () {
        getAvatar();
    }

    $scope.getScreenName = function () {
        getScreenName();
    }

    $scope.showAlert = function (title, body) {
        $('#parentAlertModalTitle').text(title);
        $('#parentAlertModalBody').text(body);
        $('#parentAlertModal').modal();
    }

    $scope.showPicture = function (title, picture) {
        showPicture(title, picture);   
    }
}

controllers.loginController = function ($scope, $http, $location, $window, loginService, msgService, loginFactory) {
    $scope.login = loginService.getEmptyLogin();
    $scope.msg = msgService.getEmptyMsg();
     
    init();
    function init() {
        //
        // this is not getting called at right time for definig top offset 
        // in jquery ready. So adding it here
        //
        $window.scrollTo(0, 0);

        setviewpadding();
        
    };

    $scope.sendLoginForm = function() {
        var data = "screenname="+$scope.login.screenname+"&passwd="+$scope.login.passwd;

        loginFactory.loginPassword(data)
            .success( function(login) {
                var ua = getUserAgent();
                
                if (login.rc == "1")
                {
                    loginService.addLogin(login);

                    // get avatar and screen name
                    $scope.$parent.showMemberAvatar();
                    $scope.$parent.getScreenName();

                    // flip the label
                    var route = loginService.setLoginLogoffLabel("menubarlogin",0);
                    loginService.setAvatarLabel("menubaravatar",0);

                    if (ua.deviceType == "Mobile")
                    {
                        alert("Success\n"+login.text);

                        var role = loginService.getMemberRole();
                        if (role == "admin")
                        {
                            $("#adminselect").show();
                        }
                        else
                        {
                            $("#adminselect").hide();
                        }

                        $location.path("#home");
                    }
                    else
                    {
                        $('#iformationDialogModalTitle').text("Success");
                        $('#iformationDialogModalLabelBody').text(login.text);
                        $('#iformationDialogModal').modal();
                    }
                }
                else
                {
                    if (ua.deviceType == "Mobile")
                    {
                        alert("Error\n"+login.text);
                    }
                    else
                    {
                        $('#iformationDialogModalTitle').text("Error");
                        $('#iformationDialogModalLabelBody').text(login.text);
                        $('#iformationDialogModal').modal();
                    }
                }   
            })
            .error( function(edata) {
                if (ua.deviceType == "Mobile")
                {
                    alert("System Error\n"+edata);
                }
                else
                {
                    $('#iformationDialogModalTitle').text("System Error");
                    $('#iformationDialogModalLabelBody').text("Syetem Error", edata);
                    $('#iformationDialogModal').modal();
                }
            });
    }

    $scope.closeModalCleanUp = function () {
        var role = loginService.getMemberRole();
        if (role == "admin")
        {
            $("#adminselect").show();
            $("#adminselectsmall").show();
        }
        else
        {
            $("#adminselect").hide();
            $("#adminselectsmall").hide();
        }

        $('#iformationDialogModal').modal('hide');
        
        $location.path("/home");
    }
        
}

controllers.homeController = function ($scope, $http, $location, $window, $route, loginService) {

    init();
    function init() {
        //
        // this is not getting called at right time for definig top offset 
        // in jquery ready. So adding it here
        //
        $window.scrollTo(0, 0);

        setviewpadding();

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
            $("#loginHomeButton").text("Logoff");
        else
            $("#loginHomeButton").text("Login");
    };

    $scope.homepagelogin = function () {
        $scope.$parent.loginlogoff();

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
            $("#loginHomeButton").text("Logoff");
        else
            $("#loginHomeButton").text("Login");

        // $route.reload();
    }
}

controllers.editorialController = function ($scope, $http, $location, loginService) {
    $scope.current = {};

    init();
    function init() {

    }
}