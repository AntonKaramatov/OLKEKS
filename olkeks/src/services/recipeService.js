import $ from 'jquery'

class RecipeService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getAll() {
        return this.getJsonAsPromise(this.url)
            .then((recipes) => {
                if(!recipes)
                    recipes = [];
                return recipes;
            });
    }

    get(recipeId) {
        return this.getJsonAsPromise(`${this.url}/${recipeId}`)
            .then(recipe => recipe);
    }

    add(recipe) {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(recipe)
                }).done(resolve).fail(reject);
            }
        );
    }

    upddate(recipe) {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: `${url}/${recipe.id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(recipe)
                }).done(resolve).fail(reject);
            }
        );
    }

    delete(recipeId) {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: `${url}/${recipeId}`,
                    dataType: 'json',
                    type: 'DELETE'
                }).done(resolve).fail(reject);
            }
        );
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default RecipeService;