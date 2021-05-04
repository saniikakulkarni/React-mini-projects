import React, { useState} from 'react'
import {data} from './data';
function App() {
  const sections=data;
  const [activeId, setActiveId] = useState(1);
  return (
    <>
      <section className="section">
        <div className="title">
          <h2>Sanika Kulkarni</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          <div className="btn-container">
             {sections.map((section) => {
            return (
              <button onClick={() => setActiveId(section.id)}className={`job-btn ${section.id===activeId && "active-btn"}`}>
              {section.title}
              </button>
            )
          })}
          </div>
          <article className="job-info">
            {
              sections.map((section) => {
                return(
                  <div>
                    {(section.id===1 && section.id===activeId) && <Education {...section}/>}
                     {((section.id===2 || section.id===3) && section.id===activeId) && <Items {...section}/>}
                  </div>
                )
              })
            }
          </article>
        </div>
      </section>
    </>
  );
}
const Education = ({id,title,schools}) =>{
    return (
      <>
        <h3>{title}</h3>
        <br/>
        <div>
          {
            schools.map((school)=>{
              return(
              <School {...school}/>
              )
            })
          }
        </div>
      </>
    )
}
const School = ({school,mode,state,marks}) =>{
  return (
      <>
        <h4>{school}</h4>
        <p className="size-font">{mode}</p>
        <p className="size-font">State: {state}</p>
        <p className="size-font">Marks: {marks}</p>
        <hr/>
        <br/>
      </>
  )
}
const Items = ({id,title,items}) =>{
  return (
    <>
    <h4>{title}</h4>
    <ol>
    {
      items.map((item) =>{
          return<li className="size-font">{item}</li>
      })
    }
    </ol>
    </>
  )
}

export default App
