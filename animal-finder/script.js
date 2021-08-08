// uMwQhR9DNqEPO4sdjTT88yMxuT15pzdALG5KiMjXQGbUVFgrIC api key
//qqugWMTBuAuDpEbMGSNRAyl3llQKJ9eMA3Tspmdj secret
const key = 'uMwQhR9DNqEPO4sdjTT88yMxuT15pzdALG5KiMjXQGbUVFgrIC'
const secret = 'qqugWMTBuAuDpEbMGSNRAyl3llQKJ9eMA3Tspmdj'
const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ1TXdRaFI5RE5xRVBPNHNkalRUODh5TXh1VDE1cHpkQUxHNUtpTWpYUUdiVVZGZ3JJQyIsImp0aSI6IjRhODM3NThkZjBjMGFjMTQwMWZiN2E5MmM1ZjYxYTY3YmUwMmFhYWE0Zjk0M2ZlOGNlMWUyMWVmODJiZTVkMDc1NzQ4Y2E4MDNiYmQ0ZDBjIiwiaWF0IjoxNjI3ODU4NTQ0LCJuYmYiOjE2Mjc4NTg1NDQsImV4cCI6MTYyNzg2MjE0NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.xGgGep4vz_-sefbn4EUMxKA_uTj1jS8VwC5ptJrYn_1e4T4XyG6Mqyf0OOu5JyIwWn7HvO5Q9ZBrJlg4llqUOaDgfWeO-LK4iAlThu3HtHHQda8IZjDOBUj9WCtIZ_1-KJp7x71l9IilmGwwbf_TLpvwGrO9mDIiBT5dR-vyIQDzgPNvRA_3BayOBQRTUZz4hkCQjVemwuSi1TFNB8y5Dsq54TorgVGNLQA6KjvLdcq2m6d9TAey9r6anetE7hitScg_TtOTxkFVHR9kiMDD_JoWso5nMeJyIFOkkPf2fgKJ9bem_uMa-VGz-9BAjrigSVQ1XAwlG4yc1cF9i6eygg'

const submit = document.querySelector('.submit')
const type = document.getElementById('type')
const zip = document.getElementById('zip')
const distance = document.getElementById('distance')

//check for type
// submit.addEventListener('click', function (event) {
//     event.preventDefault()

//     if (type.value === 'none' | distance.value > 500) {
//         console.log(`error`);
//     } else {
//         return fetch(`https://api.petfinder.com/v2/oauth2/token`, {
//             method: 'POST',
//             body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then(function (resp) {
//             return resp.json();
//         }).then(function (data) {
//             return fetch(`https://api.petfinder.com/v2/animals?type=${type.value}&location=${zip.value}&distance=${distance.value}`, {
//                 headers: {
//                     'Authorization': data.token_type + ' ' + data.access_token,
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             }).then(function (resp) {
//                 return resp.json()
//             }).then(function (data) {
//                 let animalData = data.animals
//                 console.log(data.animals);
//                 return animalData
//             })
//         }).catch(function (err) {
//             console.log('something went wrong', err);
//         });

//     }
//     console.log(animalData);
// })

var org = 'RI77';
var status = 'adoptable';


// Call the API
// This is a POST request, because we need the API to generate a new token for us
const getData = () => {
    let orgData
    return fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return the response as JSON
        return resp.json();

    }).then(randomData = function (data) {

        // Log the API data
        //console.log('token', data);

        // Return a second API call
        // This one uses the token we received for authentication
        return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

    }).then(function (resp) {

        // Return the API response as JSON
        return resp.json();

    }).then(function (data) {
        orgData = data.animals
        // Log the pet data
        console.log(data);
        return orgData
    })
    console.log(orgData);
}
getData().then(orgData => orgData.forEach(animal => {
    console.log(animal);
}))


// async function animalData() {
//     const response = await fetch(`https://api.petfinder.com/v2/animals?type=dog`, {});
//     const json = await response.json()
//     console.log(json);
// }

// fetch(`https://api.petfinder.com/v2/oauth2/token`, {
//     method: 'POST',
//     body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// }).then(function (resp) {
//     // Return the response as JSON
//     return resp.json();
//     
// }).then(function (data) {
//     return fetch(`https://api.petfinder.com/v2/animals?type=dog`, {
//         headers: {
//             'Authorization': data.token_type + ' ' + data.access_token,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }).then(function (resp) {
//         return resp.json()
//     }).then(function (data) {
//         console.log(data);
//     })
// }).catch(function (err) {

//     // Log any errors
//     console.log('something went wrong', err);

// });

