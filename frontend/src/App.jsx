import React, { useRef, useState } from "react";

function App() {
  const [iframeSrc, setIframeSrc] = useState("/api/");
  const iframe = useRef(null);

  return (
    <div className="root">
      <h1>Infinite PDF Theorem</h1>
      
      <i>
        <p>
          The <a href="https://en.wikipedia.org/wiki/Infinite_monkey_theorem">infinite monkey theorem</a> states that a monkey hitting keys at random on a
          typewriter keyboard for an infinite amount of time will almost surely type any
          given text, such as the complete works of William Shakespeare. In fact, the
          monkey would almost surely type every possible finite text an infinite number
          of times. However, the probability that monkeys filling the entire observable
          universe would type a single complete work, such as Shakespeare's Hamlet, is
          so tiny that the chance of it occurring during a period of time hundreds of
          thousands of orders of magnitude longer than the age of the universe is
          extremely low (but technically not zero). The theorem can be generalized to
          state that any sequence of events which has a non-zero probability of
          happening, at least as long as it hasn't occurred, will almost certainly
          eventually occur. 
        </p>
      </i>

      <hr />

      <iframe ref={iframe} src={iframeSrc} />
    </div>
  )
}

export default App;
