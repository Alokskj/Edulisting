import React, { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EmojiPicker from 'emoji-picker-react';

import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../utilities/firebase";
import { v4 as uuid } from "uuid";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { ChatContext } from "../Contexts/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const [emoji , setEmoji] = useState(false)
  const { user } = useCurrentUser(true);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!img && !text) return;
    if (img) {
      console.log("yes hello");
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.sub,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.sub,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.sub), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  function handleEmojiClick (emojiData){
    setText((prev)=> prev + emojiData.emoji)
  }
  return (
    <>
      <form method="post">
        <div className="input-bar ">
          <div className="container flex justify-center items-center fixed bottom-1  ">
            <div className="user-inputs flex justify-between   bg-slate-50 focus:shadow-lg rounded-full box-border py-3 border-1 shadow-md border-black   w-[80vw] px-4">
              <div className="left flex gap-4">

              
              <div onClick={()=> setEmoji((prev)=> !prev)} className="emoji relative">
                <AddReactionOutlinedIcon style={{color : 'grey' }}/>
                <div className="select absolute  w-full bottom-12 left-2">
                {emoji && <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis={true}/>}

                </div>
              </div>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="outline-none w-[50vw] lg:w-[60vw] xl:w-[70vw] bg-transparent"
                placeholder="Type something here.."
              />
              </div>
              <div className="right upload-files flex gap-3 cursor-pointer relative">
                <AttachFileIcon style={{transform: 'rotate(-35deg)', color : 'gray'}}/>
                <PhotoCameraIcon style={{color : 'grey' }} />
                <input
                  type="file"
                  className="opacity-0 cursor-pointer absolute w-full"
                  id="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                
              </div>
            </div>
            <button
              onClick={handleSend}
              className="bg-blue-700 rounded-full ml-1  disabled:bg-blue-200  cursor-pointer p-3 shadow-lg text-white font-bold"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
