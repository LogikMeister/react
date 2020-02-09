export default {
    /*current_user */
    saveUser(user) {
        localStorage.setItem('current_user', JSON.stringify(user))
    },
    getUser(){
        return JSON.parse(localStorage.getItem('current_user') || '{}')
    },
    removeUser() {
        localStorage.removeItem('current_user')
    }
}