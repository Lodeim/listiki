import { useDispatch, useSelector } from "react-redux";
import DetailedCard from "../../components/DetailedCard/index";
import Layout from "../../components/Layout";
import { getPhotos, sendComment, toggleLike } from "../../redux/actions/photos";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";

import "./styles.css";

const MainPage = () => {
  const photos = useSelector((state) => state.photos.photos);
  const isLoading = useSelector((state) => state.photos.isPhotosLoading);
  const isError = useSelector((state) => state.photos.isPhotoError);
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const total = useSelector((state) => state.photos.totalPhotos);
  const mutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const dispatch = useDispatch();
  
  const [page, setPage] = useState(1);

  const [renderedPhotos, setRenderedPhotos] = useState(photos)
  const [sort, setSort] = useState('')

  const onUpClick = () => {setSort('up')}
  const onDownClick = () => {setSort('down')}
  // useEffect(() => {
  //   const photosCopy = [...photos]
  //   const sortedPhotos = photosCopy.sort((a,b) => {
  //     if (sort === "up") {
  //       return b.id - a.id
  //     } else if (sort === "down"){
  //       return a.id - b.id
  //     }
  //   })
  //   setRenderedPhotos(sortedPhotos)
  //   console.log(sortedPhotos)
  // },[photos, sort])


  useEffect(() => {
    const photosCopy = [...photos]
    const sortedPhotos = photosCopy.sort((a,b) => {
      if (sort === "up") {
        if (a.author.nickname < b.author.nickname) {
          return -1;
        }
        if (a.author.nickname > b.author.nickname) {
          return 1;
        }
        return 0;
      } else if (sort === "down"){
        if (a.author.nickname > b.author.nickname) {
          return -1;
        }
        if (a.author.nickname < b.author.nickname) {
          return 1;
        }
        return 0;
      }
    })
    setRenderedPhotos(sortedPhotos)
    console.log(sortedPhotos)
  },[photos, sort])

  useEffect(() => {
    dispatch(getPhotos(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const nextHandler = () => {
    setPage(page + 1);
  };

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendComment(authorizedUser.nickname, photoId, comment));
  };
  return (
    <Layout
      userName={authorizedUser.nickname}
      id={authorizedUser.id}
      avatarUrl={authorizedUser.avatarUrl}
    >
      <div className="cnMainPageRoot">
        <button onClick={onUpClick}>up</button><button onClick={onDownClick}>down</button>
        {isLoading && <Bars color="#000BFF" height={15} width={15} />}
        {!isError && !isLoading && (
          <InfiniteScroll
            dataLength={renderedPhotos.length}
            next={nextHandler}
            hasMore={renderedPhotos.length < total}
            loader={
              <div className="cnMainPageLoaderContainer">
                <Bars color="#000BFF" height={15} width={15} />
              </div>
            }
            endMessage={<p className="cnMainPageLoaderContainer">Thats All!</p>}
          >
            {renderedPhotos.map(({ author, imgUrl, id, likes, comments }) => (
              <DetailedCard
                key={id}
                id={id}
                userName={author.nickname}
                avatarUrl={author.avatarUrl}
                userId={author.id}
                imgUrl={imgUrl}
                likes={likes.length}
                isLikedByYou={likes.includes(authorizedUser.id)}
                comments={comments}
                className="cnMainPageCard"
                onLikeClick={onLikeClick}
                onCommentSendClick={onCommentSendClick}
                mutateLoading={mutateLoading}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};

export default MainPage;
