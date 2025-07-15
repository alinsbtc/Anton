'use client'

import React, { useEffect, useRef, useState } from "react"
import "./Chatbot.scss"
import { callAgentApi } from "../apis/agentApis";
import clsx from 'clsx';


export const Chatbot = React.memo(() => {
    const [isFormActive, setIsFormActive] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        console.log(messages)
    }, [messages]);

    const onActiveForm = () => {
        setIsFormActive(!isFormActive)
    }
    const addUserChat = (input) => {
        setMessages((prevMessages) => {
            const isBotReplLastMsg = prevMessages.length > 0
                ? prevMessages[prevMessages.length - 1].role === "bot"
                : true;

            if (!isBotReplLastMsg) {
                // Nếu người dùng tiếp tục nói, thêm vào tin nhắn trước
                const updated = [...prevMessages];
                updated[updated.length - 1].content.push(input);
                return updated;
            } else {
                // Nếu tin nhắn trước là bot hoặc chưa có tin nhắn, tạo mới
                return [...prevMessages, { role: "user", content: [input] }];
            }
        });

    }
    const addChatbotReplied = (output) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                role: "bot",
                content: [...output],
            },
        ]);
    }
    const onChat = () => {
        addUserChat(input)

        callAgentApi(input).then(result => {
            const replied = result.data.agent_response.content
            addChatbotReplied(replied)
        })

        setInput("")
    }

    return (
        <div className="Chatbot">
            <div className={"chatbot-form " + (isFormActive ? "active" : "")}>
                <div className="chatbot-header">
                    <div className="chatbot-header_title">
                        <div className="logo">
                            <img src="" alt="" />
                            logo
                        </div>
                        <p>Anton</p>
                    </div>
                    <div className="chatbot-header_actions">
                        <div className="refresh"><i className="bi bi-arrow-clockwise"></i></div>
                        <div className="close"><i className="bi bi-x-lg"></i></div>
                    </div>
                </div>
                <div className="chatbot-body">
                    <div className="chatbot-body_msg-list">
                        {/* Render Message */}
                        {
                            messages.map(msg => {
                                return <div
                                    className={clsx('chatbot-body_card-message', {
                                        'msg-reply': (msg.role == "bot"),
                                        'msg-send': (msg.role == "user")
                                    })}
                                >
                                    <div className="avatar">
                                        <img src="chatbot.jpg" />
                                    </div>
                                    <div className="content">
                                        {
                                            msg.content.map((content, i) => {
                                                return <p className="msg-item chat-animate" style={{ animationDelay: `${i * 1.4}s` }}>{content}</p>
                                            })
                                        }
                                        <div ref={bottomRef} /> 
                                    </div>
                                </div>
                            })
                        }
                    </div>
                  
                </div>

                <div className="chatbot-input">
                    {/* <div className="chatbot-input_suggests">
                        <p className="suggest-item">Tra cứu đơn hàng</p>
                        <p className="suggest-item">Tra sản phẩm</p>
                        <p className="suggest-item">Khiếu nại</p>
                    </div> */}
                    <div className="chatbot-input_area">
                        <input
                            type="text"
                            id="chat-input"
                            placeholder="Enter Messages"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    onChat();
                                }
                            }}
                        />
                        <button id="send-button" onClick={onChat}><i className="bi bi-send"></i></button>
                    </div>
                    <div className="chatbot-input_actions">
                        <button className="emoji-button" ><i className="bi bi-emoji-smile-fill"></i></button>
                        <label className="attachment-button">
                            <input type="file" hidden />
                            <i className="bi bi-paperclip"></i>
                        </label>
                    </div>
                </div>
            </div>
            <div className="chatbot-icon" onClick={onActiveForm}></div>
        </div>
    )
})
