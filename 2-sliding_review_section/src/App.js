import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople] = useState(data);
  const [activeId, setactiveId] = useState(1);
  useEffect(() => {
    const lastId=4;
    if (activeId<1)
    {
      setactiveId(lastId);
    }
    if (activeId>lastId)
    {
      setactiveId(1);
    }
  },[activeId,people]);

   useEffect(() => {
    let slider = setInterval(() => {
      setactiveId(activeId + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [activeId]);

  return (
    <>
      <section className="section">
        <div className="title">
          <h2><span>/</span>reviews</h2>
        </div>
        <div className="section-center">
          {people.map((person) => {
          const { id, image, name, title, quote } =person;
          let pos='nextSlide';
          if (person.id===activeId)
          {
            pos='activeSlide';
          }
          if (person.id===activeId -1 ||(activeId===1 && person.id===4))
          {
            pos='lastSlide';
          }
          return (
            <article className={pos} key={id}>
              <img src={image} className="person-img"/>
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setactiveId(activeId-1)}>
          <FiChevronLeft/>
        </button>
        <button className="next" onClick={() => setactiveId(activeId+1)}>
          <FiChevronRight/>
        </button>
        </div>
      </section>
    </>
  )
}

export default App;
