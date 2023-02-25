import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from "../components/Button/Button";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { getImagesFromPixabay } from './GetImagesApi';

export function App() {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [imgArr, setImgArr] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setErorr] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(()=> {
    setStatus("pending");

    getImagesFromPixabay(query, page)
      .then(images => {
        setImgArr(prevState => [...prevState, ...images.hits])
        setTotalHits(images.totalHits) 
        setStatus("pending")})
      .catch(err => {
        setStatus("pending") 
        setErorr(err)})

  }, [query, page])

  const handleInputValue = (inputValue) => {
    setQuery(inputValue)
    setPage(1)
    setImgArr([])
    }

  const onloadMoreClick = () => setPage(prevPage => prevPage + 1);

  const isPending = status === "pending";
  const isResolved = status === "resolved";
  const isError = status === "rejected";
  const isBtnShown =  Boolean(imgArr.length) && !(totalHits <= page * 12);

  return (
    <Container>
      <Searchbar handleInputValue={handleInputValue}/>
      {isPending && <Loader/>}
      {isResolved && <ImageGallery images={imgArr}/>}        
      {isBtnShown && <Button loadMore={onloadMoreClick}/>}
      {isError && Notify.failure(error.message)}
    </Container>
  )
};
