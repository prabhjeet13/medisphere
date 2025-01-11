import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { conversation } from '../services/apis';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
const socket = io("http://localhost:4001");
const Chat = () => {

  // fetch senderId and receiverId
  const { senderId, receiverId } = useParams();
  const [messages,setmessages] = useState([]);
  const {userData,token} = useSelector((state) => state.profile);


  useEffect(() => {
    if(userData){
      socket.emit("join_room", `user_${userData._id}`);
    }
}, [userData._id]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      console.log(message);
      setmessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);



  useEffect(() => {
    const fetch = async () => {
      const toastid = toast.loading('waiting...');
      try {
         const ob = {
            token,
            senderId,
            receiverId
         }
         const response = await axios.post(conversation.getMessage,ob);
         if(!response.data.success)
         {
            throw new Error('not able to do');
         }else {
            setmessages(response.data.conversation_messages);
            toast.success('messages fetched');
         }
      }catch(error) {
          toast.error('Medisphere - server down');
      }
      toast.dismiss(toastid);  
    }
    fetch();
  },[senderId,receiverId]);

  const [text,setText] = useState('');

  
  const submitHandler = async (e) => {
      e.preventDefault();
      if(text) {
        const toastid = toast.loading('...wait');
        try {
            const ob  = {
              token,
              text,
              senderModel : `${userData.account_type === "doctor" ? "Doctor" : "Patient"}`,
              receiverModel : `${userData.account_type === "doctor" ? "Patient" : "Doctor"}`,
              receiverId,
            }
            console.log(ob);
            const response = await axios.post(`http://localhost:4001/api/v1/messages/sendmessage`,ob);
            if(!response.data.success)
            {
               throw new Error('not able to do');
            }else {
              toast.success('message send done');
              setmessages(response.data.messages);
              setText("");
            }
        }catch(error)
        {
              toast.error('Medisphere - send later please');
        }
        toast.dismiss(toastid);
      }else toast.error('please enter text');
  }

  // chat box
  return (
    <div className='mx-auto border-2 border-red-400 w-11/12 max-w-[1260px] mt-3 min-h-[100vh] flex-col flex items-center gap-4'>
      <p className='p-2 m-2 underline text-white font-bold text-xl uppercase'>CHAT BOX</p>
      <div className = 'bg-blue-100 w-[80%] flex flex-col gap-2 p-2 '>
      {messages && messages.length === 0 && (<p className='p-2 m-2 underline text-black font-bold text-xl uppercase'>No older messages</p>)}
      {/* <div className='text-left border-2 border-black p-2 flex flex-col flex-wrap'>
           <p className = 'text-purple-800 text-lg font-mono'>Mehta:</p>
            <p>hellonffffffffffffff fskdfsdjf fjsdfe fjfhsdjf sdjfhsdjkhfcsdfeff ererige rgerhgeriog eguerhguerg egeurgherughe rgergujherugherge hgerjgheguhe gerhgjerhger gjrgherjuher</p>
      </div>
      <div className='text-right border-2 border-black p-2 flex flex-col flex-wrap'>
            <p className='text-purple-800 text-lg font-mono'>Prabh:</p>
            <p>hellonffffffffffffff fskdfsdjf fjsdfe fjfhsdjf sdjfhsdjkhfcsdfeff ererige rgerhgeriog eguerhguerg egeurgherughe rgergujherugherge hgerjgheguhe gerhgjerhger gjrgherjuher</p>
      </div> */}
      {
        messages && messages.length > 0 &&(
          messages.map( (mess) => {
            return (
              <div className= {`${userData._id === mess.senderId._id ? "text-right" : "text-left"} border-2 border-black p-2 flex flex-col`}>
                     <p className = 'text-purple-800 text-lg font-mono'>{mess.senderId.account_type} {mess.senderId.first_name}:</p> 
                     <p className = 'text-black text-lg font-mono'>{mess.text}</p>
                     {/* <p>{mess.createdAt.split('T')[0]}, {mess.createdAt.split('T')[1].split('.')[0]}</p> */}
              </div>
            )
          }))
      }
      <form className='flex flex-col gap-2 items-center p-2 w-full'>
            <input className = 'rounded-md w-full text-black p-1' type='text' name='text' value = {text} id = 'text' onChange={(e) => setText(e.target.value)}/>
            <button onClick = {submitHandler} type = 'submit' className='text-black bg-green-500 w-full rounded-full p-1 transition-all duration-200 hover:scale-90'>send your message</button>
      </form>
      </div>
    </div>
  )
}

export default Chat