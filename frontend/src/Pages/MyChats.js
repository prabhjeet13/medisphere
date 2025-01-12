import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {conversation} from '../services/apis';
import { useNavigate } from 'react-router-dom';
const MyChats = () => {
    const [conversations,setConversation] = useState([]);
    const {userData,token} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
      const fetch = async () => {
          const toastid = toast.loading('waiting...');
          try {
             const ob = {
                token,
                account_type : userData.account_type
             }
             const response = await axios.post(conversation.getMyconversation,ob);
  
             if(!response.data.success)
             {
                throw new Error('not able to do');
             }else {
                setConversation(response.data.conversations);
                toast.success('data fetched');
             }
          }catch(error) {
              toast.error('Medisphere - server down');
          }
          toast.dismiss(toastid);
      }
      fetch();
    },[]);
    

  if(conversations.length === 0)
    {
        return (
            <div> No Conversation found ... </div>
        )
    }      

  // on clicking any conversation go to chat page of sender and receiver
  return (
    <div className='sidebar:w-[82%] w-full flex flex-col font-mono text-white'>    
        <p className='p-2 m-2 underline text-white font-bold text-xl uppercase'> My Chats </p>
        {
            conversations && conversations.length > 0 && (
                conversations.map((con,index) => {
                    return (
                            <div onClick = {() => navigate(`/chat/${con.participants[0]._id}/${con.participants[1]._id}`)} className='p-1 m-2 bg-gray-400 text-black font-semibold rounded-md cursor-pointer'>
                                    <span>{index + 1}. </span>
                                    {
                                        userData.account_type === "patient" && (<span>Dr. {con.participants[1].first_name} {con.participants[1].last_name}</span>)
                                    }
                                    {
                                        userData.account_type === "doctor" && (<span>Patient {con.participants[0].first_name} {con.participants[0].last_name}</span>)
                                    }
                            </div> 
                    )
                })
            )
        }
    </div>
  )
}

export default MyChats