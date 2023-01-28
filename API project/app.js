
const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then(data => setMenu(data.data.news_category))
        .catch(err => console.log(err));
}

// set menu function 
const setMenu = items => {
    const menuContainer = document.getElementById('menu-container');
    
    items.forEach(menu => {
    // console.log(menu)
    const div = document.createElement('div');
        div.innerHTML = `
    <li onclick="getId('${menu.category_id}','${menu.category_name}')" class=' p-2  cursor-pointer mt-2 lg:mt-0'>${menu.category_name}</li>
    `;
    menuContainer.appendChild(div)
    })
}

// get id from menu 
const getId = (Id,name) => {
    toggle(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${Id}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => disPlayNews(data.data, name))
        .catch(err => console.log(err))
}

// create card with dynamic id 
const disPlayNews = (allNews,name) => {
    const newsContainer = document.getElementById('news-container');

    // array sort for total view 
    const sort = allNews?.sort((a, b) => (a.total_view > b.total_view ? -1 : 1));
    
    newsContainer.innerText = '';
    const result = document.getElementById('result');

    // showing result 
    if (allNews.length === 0) {
        result.innerText = `No result found with this category ${name}`;
        result.classList.add('text-red-600')
    }
    else {
        result.innerText = `${allNews.length} results found with this category ${name}`;
        result.classList.remove('text-red-600');
    }

    // create card 
    sort.forEach(news => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-base-100 shadow-xl mb-5 lg:flex">
            <div class='w-full lg:w-1/3'>
            <figure><img class='w-full' src="${news.thumbnail_url}" alt="Movie"></figure></div>
            <div class="card-body w-full lg:w-2/3">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details.length > 300 ? news.details.slice(0,300)+'...' : news.details}</p>
                <div class="w-full lg:flex justify-evenly items-center">
                    <div class="lg:flex gap-5">
                        <img class="w-8 rounded-md" src="${news.author.img}" alt="">
                        <div>
                            <p>${news.author.name ? news.author.name : 'No Author Found'}</p>
                            <p>${news.author.published_date ? news.author.published_date : "No Date Found"}</p>
                        </div>
                    </div>
                    <div class='flex gap-4 mt-5 lg:mt-0'>
                        <div><i class="fa-solid fa-eye"></i></div>
                        <p>${news.total_view ? news.total_view : 'No View'}</p>
                    </div>
                    <div class="rating">
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-white" />
                    </div>
                    <div class="mt-5 lg:mt-0"><label onclick="getNewsId('${news._id}')" for="my-modal" class="btn modal-button btn-primary"><i class="fa-solid fa-arrow-right"></i></label></div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    });
    // spinner hide 
    toggle(false)
}

// get news id from button 
const getNewsId = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0]))
        .catch(err => console.log(err))
}

// create modal body 
const displayDetails = details => {
    console.log(details)
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="modal-box">
                <img class="w-full mb-3" src='${details.thumbnail_url ? details.thumbnail_url : "no image found"}'>
                <h3 class="font-bold text-lg">${details.title ? details.title : "no title found"}</h3>
                <p class="py-4">${details.details ? details.details : "no details found"}</p>
                <p>Rating: ${details.rating.number ? details.rating.number : "No rating found"}</p>
                <label for="my-modal" class="btn btn-sm btn-circle bg-red-500 absolute right-0 top-0">✕</label>
            </div>
    `;
}

// spinner function 
const toggle = isTrue => {
    const spinner = document.getElementById('spinner');
    if (isTrue === true) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden')
    }
}


// function call for menu 
loadCatagories();

// show some result always 
getId("01",'Default');
