import './App.css';
import { useState } from 'react';
function App() {

  const [calc, setCalc] = useState(
    {
      currentNumber: '0',
      operator: '',
      secondNumber: '',
      trackerFirst: true,
    }
  )

  const OPERATIONS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b, 
    '/': (a, b) => a / b, 
    '%': (a) => a / 100,
    '±': (a) => a * (-1),
  };

  const handleClick = (e) => {
    const entry = e.target.value;
    if (Number.isInteger(parseInt(entry)) || entry === '.') {
      if(calc.operator == ''){
        setCalc({...calc,trackerFirst:true, currentNumber: calc.currentNumber === '0' ? entry : calc.currentNumber + entry })
      } else {
        setCalc({...calc,trackerFirst: false, secondNumber: calc.secondNumber + entry })
      } 
    }

    if (OPERATIONS.hasOwnProperty(entry)){
      if (entry === '%'){
        setCalc({...calc,trackerFirst:true,  currentNumber: OPERATIONS[entry](parseFloat(calc.currentNumber)).toString()})
      } else if(entry === '±'){
        setCalc({...calc,trackerFirst:true,  currentNumber: OPERATIONS[entry](parseFloat(calc.currentNumber)).toString()})
      } else {
        setCalc({...calc,trackerFirst:true, operator: entry})
      }
    }
    
    if (entry === '='){
      setCalc({...calc,trackerFirst:true,  currentNumber: OPERATIONS[calc.operator](parseFloat(calc.currentNumber), parseFloat(calc.secondNumber)).toString()})
    }

    if(entry === 'all-clear'){
      setCalc({
        currentNumber: '0',
        operator: '',
        secondNumber: '',
        trackerFirst:true,
      })
    }
  }

  return (
    <div className="App">
       <div className="calculator-keys">
         <div className='top-button-wrapper'>
          <div className='top-button top-red'><span>x</span></div>
          <div className='top-button top-yellow'><span>-</span></div>
          <div className='top-button top-green'><span>+</span></div>
        </div>
          <input type="text" className="calculator-screen key-text" value={calc.trackerFirst?calc.currentNumber:calc.secondNumber} disabled /> 
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="all-clear">{calc.currentNumber !== '0'?'C':'AC'}</button>
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="±">±</button>
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="%">%</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="/">&divide;</button>
          <button onClick={(e) => handleClick(e)} type="button"className='key-text' value="7">7</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text'value="8">8</button>
          <button onClick={(e) => handleClick(e)} type="button"className='key-text' value="9">9</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="*">&times;</button>
          <button onClick={(e) => handleClick(e)} type="button"className='key-text' value="4">4</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text'value="5">5</button>
          <button onClick={(e) => handleClick(e)} type="button"className='key-text' value="6">6</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="-">-</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="1">1</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text'value="2">2</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="3">3</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="+">+</button>
          <button onClick={(e) => handleClick(e)} type="button" className='button-0 key-text' value="0">0</button>
          <button onClick={(e) => handleClick(e)} type="button" className="decimal key-text" value=".">.</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text operator-eq" value="=">=</button>
       </div>
    </div>
  );
}

export default App;
