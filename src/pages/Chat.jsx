import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatItemTextArea from "../components/ChatItemTextArea";
import ChatItemBody from "../components/ChatItemBody";
import { IoSendOutline } from "react-icons/io5";
import { initializeSocketConnection } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserChatQuery } from "../services/api/chatApi";
import { addChatMessages, appendMessage, removeChatMessages } from "../store/chatSlice";
import { useGetCurrentUserProfileQuery } from "../services/api/profileApi";
import { FaCircleArrowLeft } from "react-icons/fa6";

const Chat = () => {
    const [count, setCount] = useState(1);
    const [hasMoreMessages, setHasMoreMessages] = useState(true); // Fixed typo in variable name
    const { toUserId } = useParams();
    const { data, isLoading } = useGetCurrentUserChatQuery({ toUserId, count });
    const { data: currentUser } = useGetCurrentUserProfileQuery();

    const chat = useSelector((store) => store.chat);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInputRef = useRef("");
    const rootElementRef = useRef(null);
    const observerRef = useRef(null); 

    useEffect(() => {
        if (data?.response?.messages) {
            if (data.response.messages.length > 0) {
                dispatch(addChatMessages(data.response.messages));
            }
            setHasMoreMessages(data.response.messages.length > 0);
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (!rootElementRef.current || !hasMoreMessages) return;

        const options = {
            root: rootElementRef.current,
            threshold: 1.0, 
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading && hasMoreMessages) {
                    setCount((prevState) => prevState + 1);
                }
            });
        };

        const rootElementChildren = rootElementRef.current.children;
        const targetElement = rootElementChildren[rootElementChildren.length - 10];

        if (targetElement) {
            observerRef.current = new IntersectionObserver(callback, options);
            observerRef.current.observe(targetElement);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMoreMessages, chat]);

    useEffect(() => {
        if (!toUserId) return;

        const socket = initializeSocketConnection();
        socket.emit("join_chat", { toUserId });

        socket.on("received_message", ({ message }) => {
            dispatch(appendMessage([message]));
        });

        socket.on("error", (errorMessage) => {
            console.error("Socket Error:", errorMessage);
        });

        return () => {
            socket.disconnect();
            dispatch(removeChatMessages());
        };
    }, [toUserId, dispatch]);

    const handleSendChat = () => {
        const userMessage = userInputRef?.current?.value;
        if (!userMessage) return;

        if (toUserId) {
            const socket = initializeSocketConnection();
            socket.emit("send_message", { toUserId, message: userMessage });
            userInputRef.current.value = "";
        }
    };

    return (
        chat && (
            <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
                <div className="relative h-[90%]">
                    <FaCircleArrowLeft
                        onClick={() => navigate(-1)}
                        className="absolute left-[-36px] text-xl cursor-pointer"
                    />
                    <div className="w-3xl bg-base-100 h-full p-4 border rounded border-gray-700">
                        <ChatItemBody
                            chatList={chat}
                            currentUserId={currentUser?.response._id}
                            isLoading={isLoading}
                            rootElementRef={rootElementRef}
                        />
                        <div className="flex gap-4 justify-between items-center w-full">
                            <ChatItemTextArea
                                ref={userInputRef}
                                placeholder="Enter Your Message"
                            />
                            <IoSendOutline onClick={handleSendChat} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Chat;
