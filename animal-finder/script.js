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

submit.addEventListener('click', function (e) {
    e.preventDefault()

    //let animalData
    if (type.value === 'none' | distance.value > 500 | zip.length < 5 | zip.length > 5) {
        console.log(`error`);
    } else {
        // type.value = 'dog'
        // zip.value = 55378
        // distance.value = 30
        console.log(type.value, distance.value, zip.length);
        return fetch(`https://api.petfinder.com/v2/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (resp) {
            return resp.json();
        }).then(function (data) {
            return fetch(`https://api.petfinder.com/v2/animals?type=${type.value}&location=${zip.value}&distance=${distance.value}`, {
                headers: {
                    'Authorization': data.token_type + ' ' + data.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                return resp.json()
            }).then(function (data) {
                //console.log(data);
                let animalData
                animalData = data.animals
                console.log(animalData);
                //filterPhotos(animalData)
                showAnimals(animalData)
            })
        }).catch(function (err) {
            console.log('something went wrong', err);
        });
    }
})

// function filterPhotos(pets) {
//     pets.forEach(pet => console.log(pet.primary_photo_cropped))

// }


function showAnimals(pets) {
    //console.log(pets);
    const results = document.querySelector('.results')
    pets.forEach(animal => {
        console.log(animal.primary_photo_cropped);
        const div = document.createElement('div')
        div.classList.add('info-list')
        div.innerHTML = `
        ${animal.primary_photo_cropped == null ? `<img src="/photos/alexis-chloe-dD75iU5UAU4-unsplash.jpg" alt="">` : `<img src="${animal.primary_photo_cropped.small}" alt="">`}
                <div class="animal-info-list">
                    <ul>
                        <li>
                            <p>${animal.name}, ${animal.age}</p>
                        </li>
                        <li>
                            <p>${animal.contact.email === null ? `Please Call Us` : `${animal.contact.email}`}</p>
                        </li>
                        <li>
                            <p>${animal.contact.phone === null ? `Please Email Us` : `${animal.contact.phone}`}</p>
                        </li>
                    </ul>
                </div>
                <div class="line"></div>
        `
        results.appendChild(div)
    });
}


// const type1 = 'dog'
// const zip1 = '55378'
// const distance1 = 500
// const dataData = () => {
//     let animalData
//     if (type1 !== 'dog' && distance1 > 500) {
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
//         }).then(randomDatas = function (data) {
//             return fetch(`https://api.petfinder.com/v2/animals?type=${type1}&location=${zip1}&distance=${distance1}`, {
//                 headers: {
//                     'Authorization': data.token_type + ' ' + data.access_token,
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             }).then(function (resp) {
//                 return resp.json()
//             }).then(function (data) {
//                 animalData = data.animals
//                 console.log(data.animals);
//                 return animalData
//             }).catch(function (err) {
//                 console.log(`something Failed`);
//             })
//         }).catch(function (err) {
//             console.log('something went wrong', err);
//         });
//     }


// }


// dataData().then(animalData => console.log(animalData))



// var org = 'RI77';
// var status = 'adoptable';

// const getData = () => {
//     let orgData
//     return fetch('https://api.petfinder.com/v2/oauth2/token', {
//         method: 'POST',
//         body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }).then(function (resp) {

//         // Return the response as JSON
//         return resp.json();

//     }).then(randomData = function (data) {

//         return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
//             headers: {
//                 'Authorization': data.token_type + ' ' + data.access_token,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//     }).then(function (resp) {

//         // Return the API response as JSON
//         return resp.json();

//     }).then(function (data) {
//         orgData = data.animals
//         // Log the pet data
//         console.log(data);
//         return orgData
//     })

// }
// getData().then(orgData => console.log(orgData))

// //getAnimalData().then(animalData => console.log(animalData))

