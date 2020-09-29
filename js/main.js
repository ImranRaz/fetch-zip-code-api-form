'use strict';

//API end point
const   smartyAddressUrl='https://us-street.api.smartystreets.com/street-address?auth-id=15872894885911815&candidates=10';

const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');


const onSuccess = function(data){
    const ParsedData = JSON.parse(data);
    // console.log(ParsedData);

    const zip = ParsedData[0].components.zipcode;
    const plus4 =  ParsedData[0].components.plus4_code;
    // console.log (zip + '-' + plus4);
    zipField.value = zip + '-' + plus4;
}

const onError = function (data) {
    console.log (data);
  }

const responseMethod = function(httpRequest){
    if (httpRequest.readyState ===4){
        onSuccess (httpRequest.responseText);

    }else {
        onError (httpRequest.status + ': '+ httpRequest.responseText);
    }
}
const createRequest = function(url){
    const httpRequest = new XMLHttpRequest(url);
    httpRequest.addEventListener ('readystatechange', (url) => responseMethod(httpRequest));
    httpRequest.open ('GET', url);
    httpRequest.send();
};  

const inputValid = function (){
    if (addressField.value !== '' &&
        cityField.value !== '' &&
        stateField.value !== ''){
            const requestUrl = smartyAddressUrl + 
            '&street=' + addressField.value + 
            '&city=' + cityField.value + 
            '&state=' + stateField.value;
           createRequest(requestUrl); 
        } 
}
// createRequest(smartUrl);
// createRequest (parksUrl);
addressField.addEventListener ('blur', inputValid);
cityField.addEventListener('blur', inputValid);
stateField.addEventListener('blur', inputValid);