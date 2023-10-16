import { database, db, storage } from "../../utilities/firebase";
import {
  Timestamp,
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { off, onValue, ref } from "firebase/database";

import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useEffect } from "react";
import { TbSend } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { useChatContext } from "../../Contexts/ChatContext";
import { useAuth } from "../../Contexts/UserContext";
import { sendPushNotification } from "../../utilities/sendPushNotification";
import { notificationPayload } from "../../utilities/notificationPayload";
import sendChatEmail from "../../utilities/sendChatEmail";
import { useState } from "react";

let typingTimeout = null;

const Composebar = () => {
  const [messageSend, setMessageSend] = useState(0)
  const {
    inputText,
    setInputText,
    data,
    attachment,
    setAttachment,
    setAttachmentPreview,
    editMsg,
    setEditMsg,
  } = useChatContext();
  const { currentUser } = useAuth();
  const [isOnline, setIsOnline] = useState(false)
  useEffect(() => {
    // Attach the onValue listener when the component mounts
    const presenceRef = ref(database, `connections/${data.user.uid}`);
    const presenceListener = onValue(presenceRef, (snapshot) => {
      const userStatus = snapshot.val();
     
      setIsOnline(userStatus === true);
    });

    // Detach the onValue listener when the component unmounts
    return () => {
      off(presenceRef, "value", presenceListener);
    };
  }, [data.user.uid]);
  useEffect(() => {
    setInputText(editMsg?.text || "");
  }, [editMsg]);
  const isMobileOrSmallDevice = window.innerWidth < 768;
  const handleTyping = async (e) => {
    setInputText(e.target.value);
    await updateDoc(doc(db, "chats", data.chatId), {
      [`typing.${currentUser.uid}`]: true,
    });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    typingTimeout = setTimeout(async () => {
      await updateDoc(doc(db, "chats", data.chatId), {
        [`typing.${currentUser.uid}`]: false,
      });

      typingTimeout = null;
    }, 1000);
  };
  const onKeyUp = (e) => {
    if (e.key === "Enter" && (inputText || attachment)) {
      editMsg ? handleEdit() : handleSend();
    }
  };

  const handleSend = async () => {
    if (attachment) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, attachment);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: inputText,
                sender: currentUser.uid,
                date: Timestamp.now(),
                read: false,
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (inputText) {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: inputText,
            sender: currentUser.uid,
            date: Timestamp.now(),
            read: false,
          }),
        });
      }
    }

    let msg = { text: inputText };
    if (attachment) {
      msg.img = true;
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: msg,
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: msg,
      [data.chatId + ".date"]: serverTimestamp(),
      [data.chatId + ".chatDeleted"]: deleteField(),
    });
    // send push notification to user
    const getOtherUser = await getDoc(doc(db, "users", data.user.uid));
    
    if (getOtherUser.exists()) {
     
      const otherUser = getOtherUser.data();
      const notification = notificationPayload(currentUser.displayName);
      
      if(!isOnline){
     
      if(otherUser.token){  
      

      sendPushNotification(otherUser.token, notification); // send notification if token
      }
      else{
        const formState = {
          toUsername: otherUser.displayName,
          fromUsername : currentUser.displayName,
          toUserPicture : otherUser.photoURL,
          toEmail: otherUser.email,
          subject : `You have received messages from ${currentUser.displayName}`
        };
        sendChatEmail(formState)                        // send email if not token available
         console.log(`token is not available, therefor email is sent ${otherUser.email}`)
      }
    }
    }

    setInputText("");
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleEdit = async () => {
    const messageId = editMsg.id;
    const chatRef = doc(db, "chats", data.chatId);

    const chatDoc = await getDoc(chatRef);

    if (attachment) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, attachment);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            let updatedMessages = chatDoc.data().messages.map((message) => {
              if (message.id === messageId) {
                message.text = inputText;
                message.img = downloadURL;
              }
              return message;
            });
            await updateDoc(chatRef, {
              messages: updatedMessages,
            });
          });
        }
      );
    } else {
      let updatedMessages = chatDoc.data().messages.map((message) => {
        if (message.id === messageId) {
          message.text = inputText;
        }
        return message;
      });
      await updateDoc(chatRef, {
        messages: updatedMessages,
      });
    }

    setInputText("");
    setAttachment(null);
    setAttachmentPreview(null);
    setEditMsg(null);
  };

  return (
    <div className="flex items-center  gap-2 grow">
      <input
       id="chatInput"
        autoFocus={!isMobileOrSmallDevice}
        type="text"
        className="grow w-full outline-0 px-2 py-2  text-c3 bg-transparent placeholder:text-c3 outline-none text-base"
        placeholder="Type a message"
        value={inputText}
        onChange={handleTyping}
        onKeyUp={onKeyUp}
      />
      <button
        className={`h-10 w-10 rounded-xl shrink-0 flex justify-center items-center ${
          inputText.trim().length > 0 || attachment ? "bg-c4" : ""
        }`}
        onClick={editMsg ? handleEdit : handleSend}
      >
        <TbSend size={20} className="text-gray-200" />
      </button>
    </div>
  );
};

export default Composebar;
