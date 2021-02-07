const getData = () => {
    const inputData = document.getElementById('input-data').value;
    if (inputData === '') {
        alert('Enter something in the input field');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
            .then(res => res.json())
            .then(data => showData(data.meals))
    }
}

const showData = (meals) => {
    const foodContainer = document.getElementById('food-container');
    const foodDetails = document.getElementById('food-details');
    foodDetails.innerHTML = '<h3 class="text-center">No food is selected for showing details</h3>';

    if (meals === null) {
        foodContainer.innerHTML = '<h3 class="text-center mt-5">Sorry, not found your food. Please search again.</h3>';
    }

    else {
        foodContainer.innerHTML = '';
        meals.map(meal => {
            foodContainer.innerHTML += `
                <div class="col-md-3 p-3" onclick="showDetails(${meal.idMeal})">
                    <div class="border rounded food-item">
                        <img style="width: " src="${meal.strMealThumb}" alt="" class="img-fluid">
                        <h4 class="text-center m-2">${meal.strMeal}</h4>
                    </div>
                </div>
            `
        })
    }

}

const showDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const food = data.meals[0];

            const foodDetails = document.getElementById('food-details');
            foodDetails.innerHTML = `
            <div class="row">
                <h3 class="m-3 text-center">Food Details</h3>
                <div class="col-md-6 text-center">
                    <h3>${food.strMeal}</h3>
                    <img height="300px" src="${food.strMealThumb}" />
                </div>
                <div class="col-md-6">
                    <h4>Ingredients</h4>
                    <ul id="ingredients-parent"></ul>
                </div>
            </div>
        `
            showIngredients(food);
        })
}

const showIngredients = (food) => {

    for (let i = 1; i <= 20; i++) {
        const propertyName = `strIngredient${i}`;
        const element = food[propertyName];

        if (element.length != 0) {
            const ul = document.getElementById('ingredients-parent');
            const item = document.createElement('li');
            item.innerHTML = element;
            ul.appendChild(item);
        }
    }
}