import React, { useState } from "react"

export const TestUseState = () => {
    const [count, setCount] = useState(0);
    let testCount = 2;
    let subCount = () => {
        // setCount(count+1);
        testCount += 1;
        console.log(testCount);
    }
    console.log("render page");
    return (
        <div>
            <h1>State: {testCount}</h1>
            <button onClick={subCount}>Count</button>
        </div>
    )
}

export class TestCountClass extends React.Component {
    
}