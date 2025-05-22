import React from "react";

const ChatItem = ({ sender: { firstName, lastName, photoUrl, _id }, message, currentUserId, id }) => {
    return (
        <div>
            <div className={`chat ${currentUserId === _id ? 'chat-end' : 'chat-start'} `}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={photoUrl}
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    {firstName}
                </div>
                <div className="chat-bubble">{message}</div>
            </div>
        </div>
    );
};

export default ChatItem;
