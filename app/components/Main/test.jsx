'use client';
<div className="main-container">
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
                 }     
            </div>