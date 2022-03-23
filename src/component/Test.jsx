import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function Test() {
    let navigate = useNavigate();
    const location = useLocation()
    // console.log(location.state)
    let testData = location.state.state
    const tID=JSON.parse(localStorage.getItem('testID'))
    // console.log(tID)
    // console.log(testData._id)
    if(tID!==testData._id)
    {
        localStorage.clear();
    }
    localStorage.setItem("testID", JSON.stringify(testData._id));
    // console.log(testData)
    const prev=testData
    let Qlength = testData.questions.length

    const [index, setIndex] = useState(location.state.indexQ)
    const localArray = JSON.parse(localStorage.getItem("ans"))
    const [ansArray, setAnsArray] = useState(localArray ? localArray : Array(Qlength).fill([false, false, false, false, false]))

    React.useEffect(() => {
        localStorage.setItem("ans", JSON.stringify(ansArray))
    })
    const cuurentQueId=testData.questions[index]._id
    function optionFun() {
        let radio = false
        if (testData.questions[index].type === "Multiple-Response") { radio = true }
        let Array
        Array = testData.questions[index].options.map((opt, index1) => {
            return (<div className="radio" key={index1}>
                <label>

                    <input type={radio ? "checkbox" : 'radio'}
                        name="option"
                        onChange={radio ? handleChange : handleCheck}
                        value="option1" id={index1}
                        checked={ansArray[index][index1]}
                    /> {opt}

                </label>
            </div>)
        })
        return Array;
    }

    function handleChange(event) {
        const array1 = ansArray[index].slice()
        array1[event.target.id] = !array1[event.target.id]
        const array2 = ansArray.slice()
        array2[index] = array1
        setAnsArray(array2)
    }
    function handleCheck(event) {
        const array1 = [false, false, false, false, false]
        array1[event.target.id] = true
        const array2 = ansArray.slice()
        array2[index] = array1
        setAnsArray(array2)
    }

    return (
        <div className="container">
            <div className="row">
                <hr />
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">{testData.name}</div>
                        <hr />
                        <div className="panel-body">
                            <form>
                                <label>{index + 1}. {testData.questions[index].questionText}</label>
                                <div className="radio">
                                    <label>
                                        {optionFun()}
                                    </label>
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className="panel-footer">

                            {(index > 0) && <button
                                onClick={() => { setIndex(index - 1);
                                    navigate(`/test/${testData._id}/${cuurentQueId}` ,{ state: {state: prev,indexQ:index+1 } })
                                 }}
                                className="btn btn-success"
                            >Prev
                            </button>}

                            {(index < Qlength - 1) && <button
                                onClick={() =>{ setIndex(index + 1);
                                    navigate(`/test/${testData._id}/${cuurentQueId}` ,{ state: {state: prev,indexQ:index+1 } })}}
                                className="btn btn-success"
                                style={{marginLeft:'85%'}}
                                >Next
                            </button>}

                            {(index === Qlength - 1) && <button
                                onClick={(() => {navigate("/finish", { state: { state:testData,ansArray } })})}
                                className="pull-right btn btn-danger"
                                style={{marginLeft:'85%'}}
                            >Finish The Test
                            </button>}

                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Test
