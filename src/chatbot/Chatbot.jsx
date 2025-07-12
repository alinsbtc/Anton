import { useState } from "react"
import "./Chatbot.scss"
export const Chatbot = () => {
    const [isFormActive, setIsFormActive] = useState(false)
    const onActiveForm = () => {
        setIsFormActive(!isFormActive)
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
                        <div className="refresh"><i class="bi bi-arrow-clockwise"></i></div>
                        <div className="close"><i class="bi bi-x-lg"></i></div>
                    </div>
                </div>
                <div className="chatbot-body">
                    <div className="chatbot-body_msg-list">
                        {/* Render Message */}
                        <div className="chatbot-body_card-message msg-reply">
                            <div className="avatar">
                                <img src="chatbot.jpg" />
                            </div>
                            <div className="content">
                                <p className="msg-item">Chào bạn mình là Anton, mình có thể giúp bạn tra cứu đơn hàng hoặc thông tin về sản phẩm. </p>
                                <p className="msg-item">Đừng ngại ngần chia sẻ cho mình biết nhé !</p>
                            </div>
                        </div>
                        <div className="chatbot-body_card-message msg-send">
                            <div className="content">
                                <p className="msg-item">DCM bạn !</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chatbot-input">
                    <div className="chatbot-input_suggests">
                        <p className="suggest-item">Tra cứu đơn hàng</p>
                        <p className="suggest-item">Tra sản phẩm</p>
                        <p className="suggest-item">Khiếu nại</p>
                    </div>
                    <div className="chatbot-input_area">
                        <input type="text" id="chat-input" placeholder="Enter Messages" />
                        <button id="send-button"><i class="bi bi-send"></i></button>
                    </div>
                    <div className="chatbot-input_actions">
                        <button className="emoji-button" ><i class="bi bi-emoji-smile-fill"></i></button>
                        <label class="attachment-button">
                            <input type="file" onchange="handleAttachment(this)" hidden />
                            <i class="bi bi-paperclip"></i>
                        </label>
                    </div>
                </div>
            </div>
            <div className="chatbot-icon" onClick={onActiveForm}></div>
        </div>
    )
}
