import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import UserBio from "../../components/UserBio";
import { useEffect, useState } from "react";
import {
  getPostsByUser,
  sendCommentOnUserPage,
  toggleLikeOnPost,
} from "../../redux/actions/postsByUser";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import { getUser, mutateUser } from "../../redux/actions/users";

import "./styles.css";

const UserPage = () => {
  const authorizedUser = useSelector((state) => state.users.authorizedUser);
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.postsByUser.posts);
  const isPostsError = useSelector((state) => state.postsByUser.isPostsError);
  const isPostsLoading = useSelector(
    (state) => state.postsByUser.isPostsLoading
  );
  const isUserLoading = useSelector((state) => state.users.isUserLoading);
  const isUserMutateLoading = useSelector(
    (state) => state.users.isMutateLoading
  );
  const isUserError = useSelector((state) => state.users.isUserError);
  const mutateLoading = useSelector((state) => state.photos.isMutateLoading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [postsForRender, setPostsForRender] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const newPosts = [...posts];
    if (newPosts.length) {
      setPostsForRender(newPosts.splice(0, 12));
    }
  }, [posts]);

  useEffect(() => {
    dispatch(getPostsByUser(id));
    dispatch(getUser(id));
  }, [id, dispatch]);

  const onLikeClick = (photoId) => {
    dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id));
  };

  const onCommentSendClick = (photoId, comment) => {
    dispatch(
      sendCommentOnUserPage(authorizedUser.nickname, photoId, user.id, comment)
    );
  };

  const nextHandler = () => {
    const newPosts = [...posts];
    const offset = 12 * (page + 1);
    setPostsForRender([...postsForRender, ...newPosts.splice(offset + 12)]);
    setPage(page + 1);
  };

  const onEdit = async (data) => {
    await dispatch(mutateUser(data, user.id));
  };
  return (
    <Layout
      userName={authorizedUser.nickname}
      id={authorizedUser.id}
      avatarUrl={authorizedUser.avatarUrl}
    >
      {isPostsLoading || isUserLoading ? (
        <div className="cnMainPageLoaderContainer">
          <Bars color="#000BFF" height={80} width={80} />
        </div>
      ) : (
        <div className="cnUserPageRoot">
          {!isUserError && (
            <UserBio
              avatarUrl={user.avatarUrl}
              nickname={user.nickname}
              subscribed={user.subscribed.length}
              subscribers={user.subscribers.length}
              firstname={user.firstName}
              lastname={user.lastName}
              description={user.description}
              url={user.url}
              // сравнение id == authorizedUser.id без приведения
              // eslint-disable-next-line
              isMyPage={id == authorizedUser.id}
              isSubscribed={user.subscribers.includes(authorizedUser.id)}
              onEdit={onEdit}
              formLoading={isUserMutateLoading}
            />
          )}
          <div className="cnUserPageRootContent">
            {postsForRender.length ? (
              <InfiniteScroll
                dataLength={postsForRender.length}
                next={nextHandler}
                hasMore={postsForRender.length < posts.length}
                loader={
                  <div className="cnMainPageLoaderContainer">
                    <Bars color="#000BFF" height={15} width={15} />
                  </div>
                }
                endMessage={
                  <p className="cnMainPageLoaderContainer">Thats All!</p>
                }
                className="cnUserPageScroll"
              >
                {postsForRender.map(({ comments, likes, imgUrl, id }) => (
                  <Card
                    key={id}
                    imgUrl={imgUrl}
                    className="cnUserPageCard"
                    likes={likes.length}
                    comments={comments}
                    isLikedByYou={likes.includes(authorizedUser.id)}
                    onLikeClick={() => onLikeClick(id)}
                    userData={{
                      userName: user.nickname,
                      avatarUrl: user.avatarUrl,
                      userId: user.id,
                    }}
                    onCommentSubmit={(comment) =>
                      onCommentSendClick(id, comment)
                    }
                    isMutateLoading={mutateLoading}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              !isPostsError && (
                <p className="cnUserPageNoPosts">No Posts Yet!</p>
              )
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
