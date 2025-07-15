import React, { useEffect, useRef, useState } from "react";
import TypeMessage from "../TypeMessage/TypeMessage";
import clsx from 'clsx';

const ChatRenderer = React.memo(({ messages = [] }) => {
    const [visibleMessages, setVisibleMessages] = useState({}); // {msgId: indexVisible}
    const firedMapRef = useRef({}); // { msgIndex_contentIndex: true }

    useEffect(() => {
        setVisibleMessages((prev) => {
            const updated = { ...prev };

            messages.forEach((msg, idx) => {
                if (updated[idx] === undefined) {
                    updated[idx] = 0; // Chỉ set nếu chưa có
                }
            });

            return updated;
        });
    }, [messages]);

    const handleNext = (msgIndex) => {
        setVisibleMessages((prev) => {
            const nextIndex = (prev[msgIndex] ?? 0) + 1;
            return {
                ...prev,
                [msgIndex]: nextIndex,
            };
        });
    };

    return (
        <>
            {messages.map((msg, msgIndex) => (
                <div
                    key={msgIndex}
                    className={clsx('chatbot-body_card-message', {
                        'msg-reply': msg.role === "bot",
                        'msg-send': msg.role === "user"
                    })}
                >
                    <div className="avatar">
                        <img src="chatbot.jpg" />
                    </div>
                    <div className="content">
                        {msg.content.slice(0, visibleMessages[msgIndex] + 1).map((content, i) => {
                            const key = `${msgIndex}_${i}`;
                            return (
                                <p key={i} className="msg-item">
                                    <TypeMessage
                                        text={content}
                                        onDone={() => {
                                            // Đảm bảo chỉ gọi handleNext 1 lần cho mỗi dòng
                                            if (
                                                i === visibleMessages[msgIndex] &&
                                                i < msg.content.length - 1 &&
                                                !firedMapRef.current[key]
                                            ) {
                                                firedMapRef.current[key] = true;
                                                setTimeout(() => {
                                                    handleNext(msgIndex);
                                                }, 300); // thêm delay nếu muốn
                                            }
                                        }}
                                    />
                                </p>
                            );
                        })}
                    </div>
                </div>
            ))}
        </>
    );
});

export default ChatRenderer;
