import React from 'react';

const useLocalStorage = (key) => {

    const setPrimitive = (value: string|boolean|number) => {
        window.localStorage.setItem(key, value);
    };

    const getPrimitive = () => {
        return window.localStorage.getItem(key);
    };

    const setObject = (value: Object) => {
        window.localStorage.setItem(key, JSON.stringify(value)); // o que quero armazenar, valor e chave.
    };

    const getObject = () => {
        return JSON.parse(window.localStorage?.getItem(key)); //passa a chave pra saber o que tem armazenado
    };

    const remove = () => {
        window.localStorage.removeItem(key);
    }

    return {setPrimitive, getPrimitive, getObject, setObject, remove}
};

useLocalStorage.propTypes = {};

export default useLocalStorage;