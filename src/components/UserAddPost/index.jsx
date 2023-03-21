import Modal from 'react-modal';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../../api/sberAddRequest';
import './styles.css'
import { Button, TextField } from '@mui/material';

export const UserAddPost = ({          
    isOpen,
    onClose,
}

) => {

  // eslint-disable-next-line
  const [pictures, setPictures] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [text, setText] = useState('')
  // eslint-disable-next-line
  const [tags, setTags] = useState([])


    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
    let trimArr = []
    data.tags.split(',').forEach(e => {
        let trim = e.trim()
        trimArr.push(trim)})
    data.tags = trimArr
    api.addPost(data).then(res => console.log(res))}




    
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="cnAddModal"
        overlayClassName="cnAddModalOverlay"
      >
    <form className="cnAddModalForm" onSubmit={handleSubmit(onSubmit)}>

    <TextField 
    label="Название" 
    variant="outlined" 
    placeholder="Название" 
    {...register("title", { required: true })}
    onChange={event => setPostTitle( event.target.value )}
    error={postTitle === ""}
    helperText={postTitle === "" ? 'Обязательное поле' : ' '}
  />    
    <TextField 
    label="Текст" 
    variant="outlined" 
    placeholder="Текст" 
    {...register("text", { required: true })}
    onChange={event => setText( event.target.value )}
    error={text === ""}
    helperText={text === "" ? 'Обязательное поле' : ' '}
  />

<TextField
    label="Изображение" 
    variant="outlined" 
    placeholder="Ссылка на изображение" {...register("image")}
    onChange={event => setPictures( event.target.value )}
  />

    <TextField 
    label="Теги" 
    variant="outlined" 
    placeholder="Теги" 
    {...register("tags", { required: true })}
    onChange={event => setTags( event.target.value )}
  />  

<Button type='submit' variant="contained">Добавить</Button>
    </form>
        </Modal>
    )
}
