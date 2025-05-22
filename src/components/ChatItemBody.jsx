import React from 'react'
import ChatItem from './ChatItem'
import Loader from './Loader'

const ChatItemBody = ({ chatList, currentUserId, isLoading, rootElementRef }) => {
  return (
    <div ref={rootElementRef} className='h-[calc(100%-60px)] overflow-auto relative flex-col-reverse flex'>
      {
        isLoading ?
          <Loader /> :
        [...chatList].reverse().map((chatItem) => {
          return (
            <ChatItem
              id={chatItem._id}
              key={chatItem._id}
              sender={chatItem.senderId}
              message={chatItem.message}
              currentUserId={currentUserId}
            />
          )
        })
          
      }
    </div>
  )
}

export default ChatItemBody