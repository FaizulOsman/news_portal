/* Load Data For Categories */
const loadCategoryData = async () => {
    // fetch(`https://openapi.programming-hero.com/api/news/categories`)
    //     .then(res => res.json())
    //     .then(data => console.log(data.data.news_category))
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const data = await res.json()
    return data.data.news_category
}

const categories = async () => {
    const loadCategories = await loadCategoryData()
    const categorySection = document.getElementById('category-section')
    for (const category of loadCategories) {
        const div = document.createElement('div')
        div.innerHTML = `
            <p>${category.category_name}</p>
        `
        categorySection.appendChild(div)
    }
}
categories()