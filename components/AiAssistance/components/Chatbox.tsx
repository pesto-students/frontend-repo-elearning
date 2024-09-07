'use client';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

import style from '../style.module.css';

enum UserType {
  model = 'model',
  user = 'user',
}

interface IChatBox {
  role: string;
  text: string;
}

const ChatBox = ({ role, text }: IChatBox) => {
 
  return (
    <div
      className={classNames(
        style.chatBoxContainer,
        role === UserType.model ? style.chatBoxLeft : style.chatBoxRight
      )}
    >
      <div className={style.chatBox}><ReactMarkdown>{text}</ReactMarkdown></div>
    </div>
  );
};

export default ChatBox;
