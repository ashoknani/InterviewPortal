import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

function Finish() {
    const location=useLocation()
    const navigate = useNavigate()
    // console.log(location.state)
    var ans = location.state.ansArray
    var testData= location.state.state  
    console.log(testData)
    // console.log("data retrieve : ", ans);
    let optLength=location.state.ansArray.length
    let correct=0
    let wrong=0
    let arr1=[]
    let arr2=[]

    for (let i=0; i<ans.length; i++)
    {
        let re1 = []
        for (let j=0; j<ans[i].length; j++)
        {
            if (ans[i][j]===true)
            {
                re1.push(j)
                
            }
        }
        arr1.push(re1)
        if(testData.questions[i].correctOptionIndex.length>1)
        {
            arr2=[...arr2, testData.questions[i].correctOptionIndex]
        }
        else
        {
            arr2=[...arr2, [testData.questions[i].correctOptionIndex]]
        }
        console.log(arr1)
        console.log(arr2)
    }
    for(let i=0; i<ans.length; i++)
    {
        if(JSON.stringify(arr1[i])===JSON.stringify(arr2[i]))
        {
            correct = correct + 1
        }
        else
        {
            wrong = wrong + 1;
        }
    }

    return (
        localStorage.clear(),
        <div className="container">
        <div className="row">
            <hr/>
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">AngularJS Test - Result</div>
                        <hr/>
                    <div className="panel-body">
                        <center>
                            <h2 className="">Total no of Questions: {optLength}</h2>
                            <h3 className="text-success">Correct Answers: {correct}</h3>
                            <h4 className="text-danger">Wrong Answers: {wrong}</h4>
                        </center>
                        <button className="btn btn-success"
                                onClick={(()=>navigate("/"))}
                                style={{marginLeft:'85%'}}
                            >Back To Home
                         </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Finish
