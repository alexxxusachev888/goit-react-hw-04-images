import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export function ImageGalleryItem ({id, tags, webformatURL, largeImageURL}){
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(()=> {
        window.addEventListener("keydown", handleKeyEsc)
        return (window.removeEventListener("keydown", handleKeyEsc))
    }, [isOpen])

    const handleKeyEsc = evt => evt.code === 'Escape' && setIsOpen(false);
    const handleBackdrop = evt => evt.currentTarget === evt.target && setIsOpen(false);

    return (
        <ImageGalleryItemLi key={id}>
            <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={() => setIsOpen(true)}/>
            {isOpen && <Modal tags={tags} imgUrl={largeImageURL} backDropClick={handleBackdrop}/>}
        </ImageGalleryItemLi>
    )
}

ImageGalleryItem.propTypes = {
    id:PropTypes.number.isRequired,
    tags:PropTypes.string.isRequired,
    webformatURL:PropTypes.string.isRequired,
    largeImageURL:PropTypes.string.isRequired
}