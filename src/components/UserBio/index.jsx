import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserCounter from "../UserCounter";
import Button from "../Button";
import Input from "../Input";
import FormTextArea from "../FormTextArea";

import "./styles.css";
import { UserAddPost } from "../UserAddPost";

const requiredText = "Поле обязательное";
const validateText = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }
  if (text < 3) {
    cb("Слишком короткий текст");
    return true;
  }
  if (/\s/g.test(text)) {
    cb("Не должно быть пробелов");
    return true;
  }
  return false;
};
const validateUrl = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(text)) {
    cb("Невалидная ссылка");
    return true;
  }
  return false;
};

const UserBio = ({
  avatarUrl,
  nickname,
  subscribed,
  subscribers,
  firstname,
  lastname,
  description,
  url,
  isMyPage,
  isSubscribed,
  onEdit,
  formLoading,
}) => {
  const [btnProps, setBtnProps] = useState({
    onClick: () => false,
    children: "Подписаться",
  });

  const [isAddPostVisible, setIsAddPostVisible]= useState(false)
  const onCloseAddPost = (e) => {
    e.stopPropagation()
    setIsAddPostVisible(false);

  };
  const onOpenAddPost = () => {
    setIsAddPostVisible(true);
   
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [formUserName, setFormUserName] = useState(nickname);
  const [formFirstName, setFormFirstName] = useState(firstname);
  const [formLastName, setFormLastName] = useState(lastname);
  const [formDescription, setFormDescription] = useState(description);
  const [formUrl, setFormUrl] = useState(url);
  const [userNameError, setUserNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [urlError, setUrlError] = useState("");

  const onSaveEditForm = useCallback(async () => {
    const isUserNameError = validateText(formUserName, setUserNameError);
    const isFirstNameError = validateText(formFirstName, setFirstNameError);
    const isLastNameError = validateText(formLastName, setLastNameError);
    const isUrlError = validateUrl(formUrl, setUrlError);
    let isErrors =
      isUserNameError || isFirstNameError || isLastNameError || isUrlError;

    if (!formDescription) {
      isErrors = true;
      setDescriptionError(requiredText);
    }
    if (isErrors) {
      return;
    }
    await onEdit({
      firstname: formFirstName,
      lastname: formLastName,
      nickname: formUserName,
      description: formDescription,
      url: formUrl,
    });

    setIsEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formUserName, formFirstName, formLastName, formUrl, formDescription]);

  useEffect(() => {
    if (isMyPage) {
      if (isEditMode) {
        setBtnProps({
          onClick: () => onSaveEditForm(),
          children: "Сохранить",
          className: "cnUserEditButton",
          disabled: formLoading,
        });
      } else {
        setBtnProps({
          onClick: () => setIsEditMode(true),
          children: "Редактировать",
        });
      }
    } else if (isSubscribed) {
      setBtnProps({ onClick: () => false, children: "Отписаться" });
    } else {
      setBtnProps({ onClick: () => false, children: "Подписаться" });
    }
  }, [isMyPage, isSubscribed, isEditMode, formLoading, onSaveEditForm]);








  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        userName: (
          <Input
            value={formUserName}
            onChange={({ target: { value } }) => setFormUserName(value)}
            errorText={userNameError}
            className="cnInput"
          />
        ),
        name: (
          <>
            <Input
              value={formFirstName}
              onChange={({ target: { value } }) => setFormFirstName(value)}
              className="cnInput"
              errorText={firstNameError}
            />
            <Input
              value={formLastName}
              onChange={({ target: { value } }) => setFormLastName(value)}
              className="cnInput"
              errorText={lastNameError}
            />
          </>
        ),
        description: (
          <FormTextArea
            value={formDescription}
            onChange={({ target: { value } }) => setFormDescription(value)}
            className="cnInput"
            errorText={descriptionError}
          />
        ),
        url: (
          <Input
            value={formUrl}
            onChange={({ target: { value } }) => setFormUrl(value)}
            errorText={urlError}
          />
        ),
        firstButtonClassName: "cnUserBioButtonRow",
      };
    }
    return {
      userName: <span className="cnUserBioNickname">{nickname}</span>,
      name: (
        <span className="cnUserBioName">
          {firstname}
          {lastname}
        </span>
      ),
      description: <span>{description}</span>,
      url: <a href={url}>{url}</a>,
      firstButtonClassName: "cnUserBioRow",
    };
  }, [
    isEditMode,
    nickname,
    firstname,
    lastname,
    description,
    url,
    formUserName,
    formFirstName,
    formLastName,
    formDescription,
    formUrl,
    userNameError,
    firstNameError,
    lastNameError,
    urlError,
    descriptionError,
  ]);
  return (
    <div className="cnUserBioRoot">
      <div>
        <img className="cnUserBioAvatar" src={avatarUrl} alt="avatar" />
      </div>
      <div className="cnUserBioInfo">
        <div className={fields.firstButtonClassName}>
          {fields.userName}
          <Button {...btnProps} />
          <Button onClick={onOpenAddPost}>Добавить пост</Button>
          <UserAddPost
            isOpen={isAddPostVisible}
            onClose={onCloseAddPost}
            />
        </div>
        <div className="cnUserBioRow">
          <UserCounter
            count={5}
            text="Публикаций"
            className="cnUserBioCounter"
          />
          <UserCounter
            count={subscribers}
            text="Подписчиков"
            className="cnUserBioCounter"
          />
          <UserCounter count={subscribed} text="Подписок" />
        </div>
        <div className="cnUserBioRow">{fields.name}</div>
        <div className="cnUserBioRow">{fields.description}</div>
        {fields.url}
      </div>
    </div>
  );
};

export default UserBio;
