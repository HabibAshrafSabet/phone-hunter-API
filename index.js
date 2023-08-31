const loadPhone = async (searchText , isShowAll) =>{
    const res = await fetch (` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json ();
    const phones = data.data;
    // console.log(phone);
    displayPhones(phones , isShowAll);
}    

const displayPhones = (phones , isShowAll) =>{
    const phoneContainer = document.getElementById('phone-area');

    phoneContainer.innerText = '';

    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
    

    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    

    phones.forEach(phone =>{
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-base-100 shadow-xl' ;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name} </h2>
            <button onclick="ShowDetailsHandle('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
    
    toggleLoadingSpinner(false);
}

const ShowDetailsHandle = async (id) =>{
    console.log('show details btn click', id)
    const res = await fetch(' https://openapi.programming-hero.com/api/phone/${id}');
    const data = await res.json();
    console.log(data);
}

const searchHandle = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    // searchField.value = '';
    loadPhone(searchText , isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const clickShowAllBtn = () =>{
    searchHandle(true);
}

// loadphone();