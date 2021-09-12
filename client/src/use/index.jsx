import { useEffect, useState } from 'react';

const addBodyClass = (className) => {
    document.body.classList.add(className);
}

const removeBodyClass = (className) => {
    document.body.classList.remove(className);
}

const useBody = (className) => {
    useEffect(() => {
        className instanceof Array ? className.map(addBodyClass) : addBodyClass(className);

        return () => {
            className instanceof Array ? className.map(removeBodyClass) : removeBodyClass(className);
        }
    }, [className]);
}

const useImage = (imageName) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const imageLink = require(`../assets/images/${imageName}`).default;
        setImage(imageLink);
    }, [imageName]);

    return [image];
}

export { useBody, useImage };