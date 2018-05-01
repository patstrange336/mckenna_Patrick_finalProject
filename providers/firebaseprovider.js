var FIREBASE_PROVIDER = (function () {

    var user = null;
    var _speakerID = '';
      var config = {
    apiKey: "AIzaSyAZ9LHVj6BGsSnr5fNKKfWetMNaPzFmyV8",
    authDomain: "fir-finalproject-314d8.firebaseapp.com",
    databaseURL: "https://fir-finalproject-314d8.firebaseio.com",
    projectId: "fir-finalproject-314d8",
    storageBucket: "fir-finalproject-314d8.appspot.com",
    messagingSenderId: "1071972228994"
  };
  firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            window.user = user.uid; // user is undefined if no user signed in
        console.log('authChange ', user);
        }else{
            
        }
        
    });

    var _dbRef = firebase.database();
    var _speakersRef = _dbRef.ref('Speakers');
    


    var _signIn = function (loginObj) {
        

        firebase.auth().signInWithEmailAndPassword(loginObj.email, loginObj.password)
            .then(function (value) {
                console.log(value);
                user = firebase.auth().currentUser;
                _speakerID = user.uid;
            }).catch(function (error) {
            var errorCode = error.code;
            console.log('errorCode ', errorCode);
            var errorMessage = error.message;
            console.log('errorMessage ', errorMessage);
        });
    };

  var _createNewUser = function (newUserObj) {
        var newInfo = {
            name: newUserObj.name,
            email: newUserObj.email,
            password: newUserObj.password,
            twitter: newUserObj.twitter,
            company: newUserObj.company,
            phone: newUserObj.phone
        };
        
        firebase.auth().createUserWithEmailAndPassword(newUserObj.email, newUserObj.password)
            .then(function (value) {
                console.log(value.uid);
                user = firebase.auth().currentUser;
        _speakersRef.push(newInfo).then(function (snap) {
            _speakerID = snap.key;
        });
                _speakersRef
                 .child(value.uid)
                   .set({email: newUserObj.email, name: newUserObj.name, password: newUserObj.password, twitter: newUserObj.twitter, company: newUserObj.company, phone: newUserObj.phone});
            }).catch(function (error) {
            var errorCode = error.code;
            console.log('errorCode ', errorCode);
            var errorMessage = error.message;
            console.log('errorMessage ', errorMessage);
        });
    };

    var _createSpeaker = function (speakerInfo) {
        _speakersRef.push(speakerInfo).then(function (snap) {
            _speakerID = snap.key;
        });


    };

    var _updateSpeaker = function (updateInfo) {
        _speakersRef.child(_speakerID).update(updateInfo);
    };

    var _deleteSpeaker = function () {
        _speakersRef.child(_speakerID).remove();
    };

    var _getAllDataOnce = function () {
        return firebase.database().ref('/Speakers/').once('value').then(function (snapshot) {
            // console.log(snapshot.val());


        });
    };

    var _logout = function () {
        firebase.auth().signOut();
    };

    return {
        createSpeaker: _createSpeaker,
        updateSpeaker: _updateSpeaker,
        deleteSpeaker: _deleteSpeaker,
        getAllDataOnce: _getAllDataOnce,
        createNewUser: _createNewUser,
        loginUser: _signIn,
        logoutUser: _logout
    };

})();