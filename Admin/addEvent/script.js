// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3mRpVul1lr2Ho0ZowXtOSWdk5jxpS008",
    authDomain: "albaha-cb071.firebaseapp.com",
    databaseURL: "https://albaha-cb071-default-rtdb.firebaseio.com",
    projectId: "albaha-cb071",
    storageBucket: "albaha-cb071.appspot.com",
    messagingSenderId: "81343445763",
    appId: "1:81343445763:web:c7fdd485e1a0c1e3094736",
    measurementId: "G-HGCPPH9DV9"
  };

firebase.initializeApp(firebaseConfig);

// Reference to the 'events' node in Firebase Realtime Database
var eventsRef = firebase.database().ref('events');

function copyToClipboard(id) {
    var from = document.getElementById(id);
    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function addEvent() {
    // Get form values
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var img = document.getElementById('img').value;
    var img1 = document.getElementById('img1').value;
    var img3 = document.getElementById('img3').value;
    var img2 = document.getElementById('img2').value;
    var keyword = document.getElementById('keyword').value;
    var link = document.getElementById('link').value;
    var location = document.getElementById('location').value;
    var serves = document.getElementById('serves').value;
    var charcterstic = document.getElementById('charcterstic').value;
    var type = document.getElementById('type').value;
    
    // Validate required fields
    var requiredFields = ["name", "description", "img", "img1", "img2", "img3", "keyword", "type", "link", "location", "serves","charcterstic"];

    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var fieldValue = document.getElementById(fieldName).value.trim();

        if (fieldValue === "") {
            alert("يرجى تعبئة جميع الحقول المطلوبة");
            return;
        }
    }

    // Create event object
    var event = {
        name: name,
        description: description,
        img: img,
        img1: img1,
        img2: img2,
        img3: img3,
        keyword: keyword,
        link: link,
        location: location,
        charcterstic: charcterstic,
        serves: serves,
        type: type,
    };

    // Push the event to the 'events' node in Firebase
    eventsRef.push(event)
        .then(function() {
            console.log("Event added to Firebase!");
        })
        .catch(function(error) {
            console.error("Error adding event to Firebase: ", error);
        });


    // Optionally, you can reset the form
    document.getElementById('eventForm').reset();
}
