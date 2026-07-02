'use client'
import React, { useContext } from "react";
import "./sidebar.css";
import {assets} from '../../assets/assets'
import { useState } from "react";
import { Context } from "../../context/CreateContext";

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);
    // const loadPrompt = async (prompt) => {
    //     setRecentPrompt(prompt)
    //     await onSent(prompt)
    //     console.log(prompt)
    // }
    const loadPrompt = async (promptObj) => {
    const promptText = promptObj.text || promptObj; // safe fallback
    setRecentPrompt(promptText);
    await onSent(promptText);
};


    return (
        <div className="sidebar">
            <div className="top">
                <img className="menu" onClick={() => setExtended(prev=>!prev)} src={assets.menu_icon} alt="" />
                <div className="new-chat" onClick={() => newChat()}>
                    <img src={assets.plus_icon} alt="" />    
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? 
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return(
                                <div onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.text}</p>
                                    <p>{item.text.slice(18)}</p>
                                    {/* <p>TEST</p> */}
                                </div>
                            )
                        })}
                        <div className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>What is the capital of France?</p>
                        </div>
                    </div>
                : null}
                
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;