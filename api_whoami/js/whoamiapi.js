console.log("who's there?");

// Selecting elements
let userName = document.getElementById('userName');
let btn = document.querySelector('.btn-go');
let begin = document.querySelector('.begin');
let result = document.querySelector('.result');
let nameData = document.querySelector('.name');
let genderData = document.querySelector('.gender');
let genderProbabilityData = document.querySelector('.genderProbability');
let ageData = document.querySelector('.age');
let countryData = document.querySelector('.country');
let countryProbabilityData = document.querySelector('.countryProbability');
let probabilityDataTotal = document.querySelector('.probability');
let icon = document.querySelector('#icon');
let error = document.querySelector('.error');

// Getting url
let urlGender = `https://api.genderize.io?name=`;
let urlAge = `https://api.agify.io?name=`;
let urlCountry = `https://api.nationalize.io?name=`;

btn.addEventListener('click', async () => {
    let realName = userName.value;
    let apiUrlGender = urlGender + realName;
    let apiUrlAge = urlAge + realName;
    let apiUrlCountry = urlCountry + realName;

    const res1 = fetch(apiUrlGender);
    const res2 = fetch(apiUrlAge);
    const res3 = fetch(apiUrlCountry);
    const [dataGender, dataAge, dataCountry] = await Promise.all([res1, res2, res3]);

    // Process data from each res
    const processDataGender = await dataGender.json();
    const processDataAge = await dataAge.json();
    const processDataCountry = await dataCountry.json();

    // Getting Data
    let {gender, name} = processDataGender;
    let probabilityGender = processDataGender.probability;

    let age = processDataAge.age;
    
    let country1 = processDataCountry.country[0]?.country_id || 'N/A';
    let country2 = processDataCountry.country[1]?.country_id || 'N/A';
    let country3 = processDataCountry.country[2]?.country_id || 'N/A';
    let probabilityCountry = processDataCountry.country[0]?.probability || 'N/A';

    // Average probabilities
    let probabilityTotal = (probabilityGender + probabilityCountry) / 2;

     // Display data
    if (gender){
        userName.value = '';
        begin.style.display = 'none';
        error.style.display = 'none';
        result.style.display = 'block';
        result.style.placeItems = 'center';
        nameData.innerHTML = name;
        genderData.innerHTML = gender;
        genderProbabilityData.innerHTML = `I'm ${Math.round(probabilityGender*100)}% sure!`;

        ageData.innerHTML = age + ' years old';

        countryData.innerHTML = country1 + ' | ' + country2 + ' | ' + country3;
        countryProbabilityData.innerHTML = `I'm ${Math.round(probabilityCountry*100)}% sure it's one of them`;

        probabilityDataTotal.innerHTML = `I'm ${Math.round(probabilityTotal*100)}% sure it's a perfect match!`;

        if(gender == 'male') {
            icon.classList.replace('fa-person-dress', 'fa-person');
            random_bg_color();
        } else {
            icon.classList.replace('fa-person', 'fa-person-dress');
            random_bg_color();
        }
    } else {
        result.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = `Sorry, I can't recognize your name  <i class="fa-solid fa-face-sad-cry"></i>`;
    }
});

// Random background color function
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    console.log(bgColor);
    document.body.style.background = bgColor;
}