/* eslint-disable spaced-comment */
import { BehaviorSubject } from 'rxjs';
import decode from 'jwt-decode';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export function handleResponse(response) {
    return response.text().then(data => {
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // eslint-disable-next-line no-use-before-define
                authenticationService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        return decoded && (decoded.exp <= Date.now() / 1000);
    }
    catch (err) {
        return false;
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${process.env.REACT_APP_API_HOST  }/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user);
            currentUserSubject.next(user);

            return user;
        })
        .catch();
}

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(authenticationService.currentUserValue);

    return (currentUser) ? { Authorization: `Bearer ${currentUser.token}` } : {};
}
