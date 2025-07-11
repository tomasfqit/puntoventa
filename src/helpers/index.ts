export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const removeToken = () => {
    localStorage.removeItem("token");
}
    