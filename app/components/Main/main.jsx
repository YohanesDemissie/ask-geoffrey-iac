'use client'
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/CreateContext";
import {RequestLimitReached} from '../ErrorPage/ErrorPage.jsx';

const Main = () => {
    // const [showModal, setShowModal] = useState(false);

    // const handleClose = () => {
    //     setShowModal(false);
    //     window.location.reload()
    // }
    const PromptResponse = () => {
        if(status === 429){
            return(
                <RequestLimitReached />
            )
        }
        if(!showResult){
            return(
                <>
                     <div className="greet">
                    <p><span>Greetings, Inquirist.</span></p>
                    <p>How may I be of assistance?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                 </>
            );
        } else {
            return(
               <div className="result">
                {/* <RequestLimitReached isOpen={showModal}  /> */}
                        <div className="result-title">
                            <img src={assets.will_fresh_prince} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            { loading ? 
                                <div className="loader">
                                    <hr /> 
                                    <hr />
                                    <hr />
                                </div>
                             : 
                                <div>
                                    <img src={assets.geoffrey_icon} alt="" />
                                    {/* ACTUAL API CALL RENDERING */}
                                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>     
                                    {/* END ACTUAL API CALL RENDERING */}

                                    {/* TESTING RESULT DATA W/O API CALLS */}
                                    {/* <p>{resultData}</p>  */}
                                    {/* END TESTING  */}
                                </div>
                            }       
                        </div>
                    </div>
            )
        }

    }
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, status} = useContext(Context);
    console.log(status);
    //    useEffect(() => {
    //     if(status == 429){
    //         setShowModal(true)
    //     }
    // }, [status])
    return (
        <div className="main">
                                        {/* <RequestLimitReached isOpen={showModal} onClose={handleClose} /> */}

            <div className="nav">
                <p>Ask Geoffrey</p>
                <img src={assets.geoffrey_icon} alt="" />
            </div>
            {/* <PromptResponse /> */}
                {!showResult ?
                <>
                     <div className="greet">
                    <p><span>Greetings, Inquirist.</span></p>
                    <p>How may I be of assistance?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                 </>
            :
               <div className="result">
                        <div className="result-title">
                            <img src={assets.will_fresh_prince} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            { loading ? 
                                <div className="loader"  role="progressbar">
                                    <hr /> 
                                    <hr />
                                    <hr />
                                </div>
                             : 
                             <div>
                                    {/* <RequestLimitReached isOpen={showModal} onClose={handleClose} /> */}
                                    <img src={assets.geoffrey_icon} alt="" />
                                    {/* ACTUAL API CALL RENDERING */}
                                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>     
                                    {/* END ACTUAL API CALL RENDERING */}

                                    {/* TESTING RESULT DATA W/O API CALLS */}
                                    {/* <p>{resultData}</p>  */}
                                    {/* END TESTING  */}
                                </div>
                            }       
                        </div>
                    </div>
        }
            {/* END TEEST  */}
             <div className="main-bottom">
                    <div className="search-box">
                        <form onSubmit={(e)=>{e.preventDefault(); onSent()}} style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>

                            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here..." />
                            {/* <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}> */}
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ? 
                                    <button className="submit-prompt" type="submit"><img onClick={()=>onSent()} src={assets.send_icon} alt="send button" /></button>
                                    : null}
                            {/* </div> */}
                        </form>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inacurate info, including about people, so double-check it's responses. Your privacy and Gemini Apps.
                    </p>
                </div>
        </div>
    )
}

export default Main;