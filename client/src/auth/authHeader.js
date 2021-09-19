import validator from 'validator';

const configAuth = () => {
    const user = localStorage.getItem('token');

    if (user && validator.isJWT(user)) {
        return { 'Authorization': 'Bearer ' + user };
    } else {
        return {}
    }
}

export { configAuth };