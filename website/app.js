/* Global Variables */
var projectData = {};
var basicURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
var apiKey = "74d7ba758febe40bfa66d14fb03d4706";
var zipcodeValue = document.getElementById('zip');
var userFeeling = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', fetchData);

function fetchData(e){
    if(zipcodeValue.value === ""){
        alert("enter zipcode");
    }else{
        getData(basicURL, apiKey, zipcodeValue, userFeeling)
        .then(function(d){ 
            // update ui
            updateUI(d);
        })
    }
}

const getData = async function(basicURL, apiKey, zipcodeValue, userFeeling){
    const res = await fetch(basicURL+zipcodeValue.value+",us&appid="+apiKey)
    try{
        const data = await res.json();
        data.userFeeling = userFeeling.value;
        return data;
    }catch(e){
        console.log("error:", e);
    }
}

const updateUI = async function(data){
    document.getElementById('date').innerHTML = "Date: "+newDate;
    document.getElementById('temp').innerHTML = "Temprature: "+data.main.temp;
    if(data.userFeeling !== ""){
        document.getElementById('content').innerHTML = "Content: "+data.userFeeling;
    }
}