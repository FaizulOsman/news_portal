/* Load Data For Categories */
const loadCategoryData = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
        const data = await res.json()
        return data.data.news_category
    } catch (error) {
        console.log(error)
    }
}

const categories = async () => {
    const loadCategories = await loadCategoryData()
    const categorySection = document.getElementById('category-section')
    for (const category of loadCategories) {
        const div = document.createElement('div')
        div.innerHTML = `
            <a onclick="category(${category.category_id})" class="py-3 text-sm">${category.category_name}</a>
        `
        categorySection.appendChild(div)
    }
}
categories()

const category = async (id) => {
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    const res = await fetch(url)
    const data = await res.json()
    const newses = data.data
    const newsSection = document.getElementById('news-section')
    newsSection.innerHTML = ''

    // Count Category
    const countCategory = document.getElementById('count-category')
    countCategory.innerHTML = ` 
        <p><b>${newses.length > 0 ? newses.length + ' items found for this category.' : 'No news found'}</b></p>
    `

    /* Get Every News for Categories */
    for (let news of newses) {
        const { author, thumbnail_url, title, details, total_view } = news
        const { img, name, published_date } = author


        // Cooking News Card
        const div = document.createElement('div')
        div.classList.add("mt-5")
        div.innerHTML = `
            <div class="card card-side bg-base-100 shadow-xl p-4 flex flex-col md:flex-row justify-center">
                <figure class="w-1/4 md:w-1/6 mx-auto"><img class="rounded" src="${thumbnail_url}"
                        alt="Movie">
                </figure>
                <div class="card-body py-0 w-full md:w-5/6 pt-5 md:pt-0">
                    <h2 class="card-title">${title}</h2>
                    <p class="text-sm">${details.length > 300 ? details.slice(0, 300) + '...........' : details}</p>
                    <div class="card-actions flex justify-between items-center">
                        <div class="flex my-2">
                            <img class="w-10 rounded-full" src="${img}" />
                            <div class="pl-4">
                                <h5 class="font-semibold">${name === null || name === '' ? 'No data available' : name}</h5>
                                <p>${published_date === null ? 'No Published Date' : published_date}</p>
                            </div>
                        </div>
                        <div class="flex items-center my-2">
                            <i class="fa-regular fa-eye mr-3"></i>
                            <p>${total_view === null ? 'No data available' : total_view}</p>
                        </div>
                        <div class=" my-2">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class=" my-2">
                            <label onclick="newsModal('${title}','${name === null || name === '' ? 'No data available' : name}', '${img}', '${total_view === null ? 'No data available' : total_view}','${published_date === null ? 'No Published Date' : published_date}')" for="my-modal-3" class="btn modal-button">
                                <i class="fa-solid fa-arrow-right"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsSection.appendChild(div)
    }
    spinner(false)
}

const newsModal = (title, name, img, total_view, published_date) => {
    const modal = document.getElementById('modal-area')
    modal.innerHTML = `
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold mr-5">${title}</h3>
            <img class="py-4" src="${img}">
            <div class="py-4 flex justify-between">
                <p>${name}</p>
                <p>${total_view}</p>
                <p>${published_date}</p>                               
            </div>
        </div>
    </div>
    `
}

const spinner = (isTrue) => {
    const spinnerDisplay = document.getElementById('spinner-display')
    if (isTrue === true) {
        spinnerDisplay.classList.remove('hidden')
    } else {
        spinnerDisplay.classList.add('hidden')
    }
}





/* News and Blog button click handler */
document.getElementById('blog-button').addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'none'
})

document.getElementById('news-button').addEventListener('click', function () {
    document.getElementById('main-section').style.display = 'block'
})