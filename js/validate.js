function validatePhrase(input) {

    // Split the input value by spaces
    var recipes = input.split(/\s+/);
    if (![12, 18, 24].includes(recipes.length)) {
        return false;
    }
    else {
        return true;
    }

}