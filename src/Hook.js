import React, { useEffect, useState } from "react";

const Hook = () =>{

    const[age,setAge] = useState(23)
    const handleAge = ()=>setAge(age+1)

    const [height ,setHeight] = useState(window.innerHeight)
    const [width ,setWidth] = useState(window.innerWidth)
    const [text,setText] = useState("a");
    const [count,setCount] = useState(0);
// USEEFFECT
    useEffect(() => { 
        function handeler(){
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize',handeler)
        return function clean(){
            window.removeEventListener('resize',handeler)
        }
    })
    useEffect(()=>{
        document.title =`${text} - ${count}`
    },[count])

//USEREF


    return (
        <div>
            <p>My age is {age} yeras old</p>
            <button onClick={handleAge}>Get Older</button>
            <h1>{height} , {width}</h1>

            <input type="text" 
                onChange={(event)=>{
                    setText(event.target.value)
                }}/>

                <button onClick={()=>{
                    setCount(count+1)
                }}>
                BUTTON
                </button>

                <h1>
                    {text} - {count}
                </h1>
        </div>
    )
}
export default Hook
