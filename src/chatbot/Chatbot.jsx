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
                    <div className="chatbot-body_BotMessage">
                        <div className="logo-Message"><img src="" alt="" />Logo:  </div>
                        <p>Toi co the giup </p>
                        

                    </div>
                    <div className="chatbot-body_UserMessage">Xin Chao</div>

                </div>
                <div className="chatbot-input">
                    <div className="chatbot-input_area">
                        <input type="text" id="chat-input" placeholder="Enter Messages"/>
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
