function UserDetailsError(symbol , difficulty) {
    if(symbol === ""){
        return false;
    }
    if(difficulty === "Select Difficulty"){
        return false;
    }
    return true;
}
export default UserDetailsError;