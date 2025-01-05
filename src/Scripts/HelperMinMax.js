function evaluateChoice(obj){
    // Returns the top 3 moves out of all the simulated moves in the object `obj`.
    // The function assumes `obj` is an object where keys represent move indices
    // and values represent their respective scores.

    let [first, second, third] = [-Infinity, -Infinity, -Infinity]; //variables to track the top 3 scores
    let [ind1, ind2, ind3] = [-1, -1, -1];                      //variables to track the top 3 moves
    // Iterate through the object
    for (let key in obj) {
        let value = obj[key];
        key = Number(key); // Ensure the key is treated as a number

        if (value > first) {
            // Shift the current top values
            third = second;
            ind3 = ind2;

            second = first;
            ind2 = ind1;

            first = value;
            ind1 = key;
        }
        else if (value > second) {
            // Shift the second and third values
            third = second;
            ind3 = ind2;
            second = value;
            ind2 = key;
        }
        else if (value > third) {
            // Update the third value
            third = value;
            ind3 = key;
        }
    }
    if(ind3 == -1 && ind2 == -1){       //handle the case when there's no second best move and third best move
        ind2 = ind1
        ind3 = ind1
    }
    else if(ind3 == -1){                //handles the case when there's no third best move.
        ind3 = ind2
    }

    return [ind1,ind2,ind3]    //[hard ,medium ,easy]
}
export default evaluateChoice;