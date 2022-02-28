import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Homepage() {
    let navigate = useNavigate()
    const [posts, setPosts] = useState();
    useEffect(() => {
        axios
            .get("http://interviewapi.stgbuild.com/getQuizData")
            .then((response) => {
                setPosts(response.data.tests);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    if(posts)
    {
        localStorage.setItem('test', JSON.stringify(posts));
    }

    function renderTest() {
        let array
        array = posts.map((prev, index) =>
            <tbody key={index}>
                <tr>
                    <td style={{padding:'15px'}}>{prev.name}</td>
                    <td style={{padding:'15px',textIndent:"30px"}}>{prev.questions.length}</td>
                    <td style={{padding:'15px'}}><button className="btn btn-success" onClick={() => {
                        navigate(`/${prev._id}/${prev.questions[0]._id}`, { state: {state: prev,
                            indexQ:0 } }) }}>Start Test</button></td>
                </tr>
            </tbody>
        )
        return array
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <hr />
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{padding:'15px'}}>Test</th>
                                    <th style={{padding:'15px'}}>No of Questions</th>
                                    <th style={{padding:'15px'}}>Select Test</th>
                                </tr>
                            </thead>
                            {posts && renderTest()}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Homepage;