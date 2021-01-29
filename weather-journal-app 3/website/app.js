/* Global Variables */
const url_base = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'a922bd0516eec7d184235a522963c834';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', event=>{
    event.preventDefault()
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const url = `${url_base}?zip=${zip}&appid=${apiKey}`;
    
    const getTemp = async (url) => {
        const res = await fetch (url)
        try {
            const data = await res.json();
            const temper= data.main.temp;
            console.log(temper);
            return temper
        }
        catch (error) {
            console.log('error', error);
        }
    }
    getTemp (url)
    .then(function (temper){
        postData('http://localhost:8000/postData' , {temp: temper, date: newDate, user_res: feelings })
        updateUI()
    })
});


const postData = async (url = '', data = {}) => {
    const respone = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await respone.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}


const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
    
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.user_res;
    }
    catch (error) {
        console.log('error', error);
    }
}