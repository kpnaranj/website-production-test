import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import {API} from '../config';

export const signup =(user)=>{
    return fetch(`${API}/signup`, {
        method:'POST',
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).
    then(response=>{
        return response.json();
    }).
    catch(err=>{
        console.log(err);
    })
}

export const signin =(user)=>{
    return fetch(`${API}/signin`, {
        method:'POST',
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).
    then(response=>{
        return response.json();
    }).
    catch(err=>{
        console.log(err);
    })
};

export const signout = async (next)=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
    
    try {
        const response = await fetch(`${API}/signout`, {
            method: 'GET'
        });
        console.log('signout sucess');
    } catch (err) {
        console.log(err);
    }
}


//set cookie

export const setCookie = (key, value)=>{
    //check if the process works
    if(process.browser){
        cookie.set(key, value,{
            expires:1
        });
    }
};

//remove cookie

export const removeCookie = (key)=>{
    //check if the process works
    if(process.browser){
        cookie.remove(key, {
            expires: 1
        });
    }
};

//get cookie

export const getCookie = (key)=>{
    //check if the process works
    if(process.browser){
       return cookie.get(key);
    }
};

// save localstorage
export const setLocalStorage = (key, value)=>{
    if (process.browser){
        localStorage.setItem(key, JSON.stringify(value));
    }
}


// remove localstorage
export const removeLocalStorage = (key)=>{
    if (process.browser){
        localStorage.removeItem(key);
    }
}

//authenticate method

export const authenticate = (data, next)=>{
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

//use information in any way 

export const isAuth = () =>{
    if(process.browser){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
}



