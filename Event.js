var today = new Date();
var currentYear = today.getFullYear();
var currentMonth = today.getMonth() + 1;
var currentDay = today.getDate();
var count = 0;
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

firebase.initializeApp(firebaseConfig)

var eventsRef = firebase.database().ref('events');
var typeDropdown = document.getElementById('type-dropdown');
var eventsContainer = document.getElementById('Explore');
var eventsData; 

eventsRef.once('value', function (snapshot) {
    eventsData = snapshot.val();
    let eventsArray = Object.values(eventsData);
    eventsArray.sort((a, b) => {
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();
        return dateB - dateA;
    });

    displayEvents2(eventsArray);
});

var searchBar = document.getElementById('search-bar');

function displayEvents2(eventsData) {
    eventsContainer.innerHTML = '';
    var repeatedCode = '';
    count = 0;

    typeDropdown.addEventListener('change', function () {
        displayEvents2(eventsData);
    });

    // searchBar.addEventListener('input', function () {
    //     displayEvents2(eventsData);
    // });
    // var searchText = searchBar.value;

    for (var eventId in eventsData) {
        var event = eventsData[eventId];

        // يمكنك استخدام الشروط للتحقق من تطابق البحث مع الفعالية
            if ((typeDropdown.value === 'all') || (typeDropdown.value === 'مسجد' && event.type === 'مسجد') || (typeDropdown.value === 'مدرسة' && event.type === 'مدرسة') || (typeDropdown.value === 'منتزة' && event.type === 'منتزة'
            || (typeDropdown.value === 'مول' && event.type === 'مول') || (typeDropdown.value === 'سد' && event.type === 'سد') || (typeDropdown.value === 'سوق' && event.type === 'سوق')
            || (typeDropdown.value === 'نادي' && event.type === 'نادي') || (typeDropdown.value === 'مقهى' && event.type === 'مقهى') || (typeDropdown.value === 'مطعم' && event.type === 'مطعم')
            || (typeDropdown.value === 'فندق' && event.type === 'فندق') || (typeDropdown.value === 'وادي' && event.type === 'وادي') || (typeDropdown.value === 'بقالة' && event.type === 'بقالة')
            || (typeDropdown.value === 'مستشفى' && event.type === 'مستشفى'))) {
                // if(searchText==''||event.name.includes(searchText) || event.type.includes(searchText) || event.description.includes(searchText) || event.keyword.includes(searchText)  || 
                // event.location.includes(searchText) ||event.serves.includes(searchText) ||event.charcterstic.includes(searchText) ){

                var template = getData(event);
                repeatedCode += template;
                count++;
            }
        }
    var myDiv = document.getElementById("NoEvent");
    if (count == 0) {
        myDiv.style.display = "block";
    } else {
        myDiv.style.display = "none";
    }
    eventsContainer.innerHTML = repeatedCode;
}


document.getElementById("search-button").addEventListener("click", function() {
    var searchText = document.getElementById("search-bar").value;
    eventsContainer.innerHTML = '';
    var repeatedCode = '';
    count = 0;
        // searchBar.addEventListener('input', function () {
    //     displayEvents2(eventsData);
    // });
    var searchText = searchBar.value;

    for (var eventId in eventsData) {
        var event = eventsData[eventId];

            if ((typeDropdown.value === 'all') || (typeDropdown.value === 'مسجد' && event.type === 'مسجد') || (typeDropdown.value === 'مدرسة' && event.type === 'مدرسة') || (typeDropdown.value === 'منتزة' && event.type === 'منتزة'
            || (typeDropdown.value === 'مول' && event.type === 'مول') || (typeDropdown.value === 'سد' && event.type === 'سد') || (typeDropdown.value === 'سوق' && event.type === 'سوق')
            || (typeDropdown.value === 'نادي' && event.type === 'نادي') || (typeDropdown.value === 'مقهى' && event.type === 'مقهى') || (typeDropdown.value === 'مطعم' && event.type === 'مطعم')
            || (typeDropdown.value === 'فندق' && event.type === 'فندق') || (typeDropdown.value === 'وادي' && event.type === 'وادي') || (typeDropdown.value === 'بقالة' && event.type === 'بقالة')
            || (typeDropdown.value === 'مستشفى' && event.type === 'مستشفى'))) {
                if(searchText==''||event.name.includes(searchText) || event.type.includes(searchText) || event.description.includes(searchText) || event.keyword.includes(searchText)  || 
                event.location.includes(searchText) ||event.serves.includes(searchText) ||event.charcterstic.includes(searchText) ){

                var template = getData(event);
                repeatedCode += template;
                count++;
            }
        }
    }
    var myDiv = document.getElementById("NoEvent");
    if (count == 0) {
        myDiv.style.display = "block";
    } else {
        myDiv.style.display = "none";
    }
    eventsContainer.innerHTML = repeatedCode;
});



function getData(event) {
    var template = `
        <div class="rectangle">
        <a href="Details/index.html?name=${encodeURIComponent(event.name)}">
            <img src="${event.img}" width="330" height="199">
            <div class="description">
                <div class="inline">
                <div class="type"><h5 class="color_13_">${event.type}</h5></div>
                </div>
                <h2 class="title">${event.name}</h2>
                <p class="detail">${event.description.length > 500 ? event.description.slice(0, 500) + '...' : event.description}</p>
            </div>
            </a>

        </div>
    `;

    var tagColorClass;
    switch (event.type) {
        case "مستشفى":
            tagColorClass = 'color_1';
            break;
        case "مدرسة":
            tagColorClass = 'color_2';
            break;
        case "منتزة":
            tagColorClass = 'color_3';
            break;
        case "فندق":
            tagColorClass = 'color_4';
            break;

        case "مطعم":
            tagColorClass = 'color_5';
            break;
        case "مول":
            tagColorClass = 'color_6';
            break;
        case "وادي":
            tagColorClass = 'color_7';
            break;
        case "سد":
            tagColorClass = 'color_8';
            break;
        case "نادي":
            tagColorClass = 'color_9';
            break;
        case "بقالة":
            tagColorClass = 'color_10';
            break;
        case "مقهى":
            tagColorClass = 'color_11';
            break;
        case "مسجد":
            tagColorClass = 'color_12';
            break;
        case "سوق":
            tagColorClass = 'color_14';
            break;
        default:
            tagColorClass = 'color_13';
    }

    template = template.replace(`<div class="type"><h5 class="color_13_">${event.type}</h5></div>`,
        `<div class="type"><h5 class="${tagColorClass}_">${event.type}</h5></div>`);

    return template;
}


const animatedElements = document.querySelectorAll('.anim');

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersection, options);

animatedElements.forEach(element => {
    observer.observe(element);
});

// animation 4
const animatedElements4 = document.querySelectorAll('.anim4');

function handleIntersection4(entries, observer4) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show4');
        } else {
            entry.target.classList.remove('show4');
        }
    });
}

const options4 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer4 = new IntersectionObserver(handleIntersection4, options4);

animatedElements4.forEach(element => {
    observer4.observe(element);
});
// animation 5
const animatedElements5 = document.querySelectorAll('.anim5');

function handleIntersection5(entries, observer5) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show4');
        } else {
            entry.target.classList.remove('show4');
        }
    });
}

const options5 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer5 = new IntersectionObserver(handleIntersection5, options5);

animatedElements5.forEach(element => {
    observer5.observe(element);
});
// animation 3
const animatedElements3 = document.querySelectorAll('.anim3');

function handleIntersection3(entries, observer3) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show3');
        } else {
            entry.target.classList.remove('show3');
        }
    });
}

const options3 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer3 = new IntersectionObserver(handleIntersection3, options3);

animatedElements3.forEach(element => {
    observer3.observe(element);
});
const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')

