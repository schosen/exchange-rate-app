/*JSON and Fetch API
fetch is used to make HTTP requests to the backend wen your dealing with a database, which may be written in node JS orPHP or Python. In most cases you will make request from the front end (what we have made so far client side) to the back end (server side) to get the data, sometimes you can use third party API such as the one we are using for this project which is th exchange rate API 

Fetch is built into the browser. When you load a webpage your getting data from a server its typically called a get request. When your posting data to the server eg filling out a form, that will be saved to back end data site that's a post request, if you're updating data on a server it would be a put request or a patch request and if you are deleting something of the server it would be a delete request

function calculate() {
    fetch('items.json')
    .then(res => res.json())
    .then(data => console.log(data)); //this fetch item runs asynchronously which means it runs in the background and when it's done fetching itll return a promise and the way you catch that promise is with .then

};

calculate();

*/
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
function calculate() {
      
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {

        //console.log(data)
        const rate = data.rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // .tofixed is fixed to 2 decimal points
    })

};

//Event Listeners
currencyEl_one.addEventListener('chaneg', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('chaneg', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();

})

calculate();