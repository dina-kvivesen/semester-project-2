const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export const cartItemsKey = "cart items";

export function saveToStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

export function getFromStorage(key) {
    const items = localStorage.getItem(key);

    if (!items) {
        return [];
    }
    return JSON.parse(items);
}

export function getToken() {
    return getFromStorage(tokenKey);
}


export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
}