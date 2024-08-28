'use client';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

import { IdefaultMsgBody } from '@/constant/types';
import style from '../style.module.css';

enum UserType {
  chatbot = 'chatbot',
  user = 'user',
}

const ChatBox = ({ text, userType }: IdefaultMsgBody) => {
 
  return (
    <div
      className={classNames(
        style.chatBoxContainer,
        userType === UserType.chatbot ? style.chatBoxLeft : style.chatBoxRight
      )}
    >
      <div className={style.chatBox}><ReactMarkdown>{text}</ReactMarkdown></div>
    </div>
  );
};

export default ChatBox;
