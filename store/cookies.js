import Cookies from 'universal-cookie';
const cookies = new Cookies();


async function setCookie(key, value) {
    try {
        if (value && value.jwt) {
            cookies.set(key, JSON.stringify(value), { path: '/' });
        }
    } catch (err) {
        console.log("Error:in:setCookie ", err);
    }
}

async function getCookie(key) {
    try {
        let result = cookies.get(key);
        if (result) return result;
        return null;
    } catch (err) {
        console.log("Error:in:getCookie ", err);
        return null;
    }
}

async function removeCookie(key) {
    try {
        cookies.remove(key); return true;
    } catch (err) {
        console.log("Error:in:removeCookie ", err);
    }
    return false;
}

module.exports = { setCookie, getCookie, removeCookie };