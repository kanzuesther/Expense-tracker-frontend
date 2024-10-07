const setLocalStorageItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting item in localStorage", error);
    }
};

const getLocalStorageItem = (key) => {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value) ?? null;
    } catch (error) {
        console.error("Error getting item from localStorage: ", error);
        return null;
    }
}

const removeLocalStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item from localStorage:", error);
    }
};

export const setStorageToken = (token) => setLocalStorageItem("token", token);

export const getStorageToken = () => getLocalStorageItem("token");

export const removeStorageToken = () => removeLocalStorageItem("token");

export const setStorageUser = (user) => setLocalStorageItem("user", user);

export const getStorageUser = () => getLocalStorageItem("user");

export const removeStorageUser = () => removeLocalStorageItem("user");

export { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem };
