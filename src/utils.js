import { toast } from 'react-toastify';
import { getUserById } from './api/users';


export const getPhotoFromState = (photos, photoId) => {
    const photo = photos.find((elem) => elem._id === photoId);
    
    return { ...photo }

}

export const getUpdatedPhotoForState = (photos, photoId, data) => {
    const newPhotos = [...photos];
      const photoIndex = newPhotos.findIndex((photo) => photo._id === photoId);
      newPhotos[photoIndex] = data;
      return newPhotos;
}

export const getUserPagePostData = (posts, postId) => {
    const newPosts = [...posts]
    const newPostIndex = newPosts.findIndex(post => post._id === postId)
    const postForEdit = newPosts[newPostIndex]
    return {
        newPosts,
        postForEdit,
    }
}

export const getError = ({response: {status, statusText}}) =>{
    toast.error(`${status}: ${statusText}`)
}

export const getNaming = async function (author) {
let user = await getUserById(author).then(res => res.data.name)
return user
}
