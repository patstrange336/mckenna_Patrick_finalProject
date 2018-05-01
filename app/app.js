var speakersJSON = {};


function initSite() {
    $(".submit").click(function (e) {
        e.preventDefault(); //prevents refresh
        var speakerArray = $("form").serializeArray();
        var obj = {};
        //console.log(speakerArray);
        $.each(speakerArray, function (idx, formValue) {
            //console.log(formValue.name + ' ' + formValue.value);
            obj[formValue.name] = formValue.value;
        });
        currentUser = obj;
        speakersJSON.Speakers.push(obj);
        console.log(speakersJSON);
        $("form").css("display", "none");
        $(".logout").show();
        $(".update").show();
        $(".delete").show();
        $('.headerName').html("Welcome " + currentUser.fName + " " + currentUser.lName + "<br />");
        console.log($("form").serializeArray());
        //alert('.regName');
    });

    $(".loginSubmit").click(function (e) {
        e.preventDefault(); //prevents refresh
        var speakerArray = $("form").serializeArray();
        var obj = {};
        //console.log(speakerArray);
        $.each(speakerArray, function (idx, formValue) {
            //console.log(formValue.name + ' ' + formValue.value);
            obj[formValue.name] = formValue.value;
        });
        currentUser = obj;
        speakersJSON.Speakers.push(obj);
        console.log(speakersJSON);
        $("form").css("display", "none");
        $(".logout").show();
        $(".update").show();
        $(".delete").show();
        $('.headerName').html("Welcome Back " + currentUser.email + "<br />");
        //alert('.regName');
    });
}

function getData() {
    $.getJSON("data/data.json", function () {

    }).done(function (data) {
        speakersJSON = data;
        console.log(speakersJSON);
        initSite();
    }).fail(function (error) {
        //console.log(error);
    });
}


function init() {
    FIREBASE_PROVIDER.getAllDataOnce();

    $('.loginForm .loginSubmit').click(function (e) {
        e.preventDefault();
        var email = $('.loginForm .email').val(),
                password = $('.loginForm .password').val();

        var loginUserObj = {
            "email": email,
            "password": password
        };

        FIREBASE_PROVIDER.loginUser(loginUserObj);
    });

    $('.logout').click(function () {
        FIREBASE_PROVIDER.logoutUser();
        $('.headerName').html(currentUser.email + " have logged out successfully");
    });

    $("form .submit").click(function (e) {
        e.preventDefault();
        var firstName = $('.fName').val(),
                lastName = $('.lName').val(),
                email = $('.email').val(),
                password = $('.password').val(),
                twitter = $('.twitter').val(),
                company = $('.company').val(),
                phone = $('.phone').val();

        var newUserObj = {
            "name": firstName + ' ' + lastName,
            "email": email,
            "password": password,
            "twitter":twitter,
          "company":company,
            "phone": phone
        };

        FIREBASE_PROVIDER.createNewUser(newUserObj);
    });

    $(".delete").click(function (e) {
        FIREBASE_PROVIDER.deleteSpeaker();
        $('.headerName').html("This user has been deleted");
        //$('.headerNameReturn').html( currentUser.email + ' ' + "has been deleted successfully");
    });

    $(".update").click(function (e) {
        
        var updataObj = {
            "email": "annoymous@gmail.com",
            "password": "whatever"
        };

        FIREBASE_PROVIDER.updateSpeaker(updataObj);
    });

    $(".add").click(function (e) {
        // this is where you would get all your input values from a form
        var spkInfo = {
            "fName": "Mike",
            "lName": "Smith",
            "email": "mike@smith.com",
            "twitter": "video_Smith",
            "github": "ms",
            "talks": []
        };

        FIREBASE_PROVIDER.createSpeaker(spkInfo);
    });
}

$(document).ready(function () {
    init();
    getData();
    initSite();
    $(".update").hide();
    $(".logout").hide();
    $(".delete").hide();
});