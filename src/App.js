import './App.css';
import { useState } from 'react';
function App() {

  const [calc, setCalc] = useState(
    {
      currentNumber: '0',
      operator: '',
      secondNumber: '',
      a: true,
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


  const resetState = () => {
    setCalc(
      {
        currentNumber: '0',
        operator: '',
        secondNumber: '',
        a: true,
      }
    )
  }

  const handleClick = (e) => {
    const entry = e.target.value;

    if (calc.currentNumber === 'Out Of Range') {
      resetState();
      return;
    }

    if (entry === '.') {
      if(calc.operator){
        setCalc({currentNumber: '0.', operator: '', secondNumber: '', a: true})
      } else if (calc.a) {
        setCalc({...calc,  currentNumber: calc.currentNumber.includes(entry) ? calc.currentNumber : calc.currentNumber + entry})
      } else {
        setCalc({...calc, secondNumber: calc.secondNumber.includes(entry) ? calc.secondNumber : calc.secondNumber + entry })
      }
    }

    if (Number.isInteger(parseInt(entry))) {
      if(calc.operator === ''){
        setCalc({...calc,a:true, currentNumber: calc.currentNumber === '0' ? entry : calc.currentNumber + entry })
      } else {
        setCalc({...calc,a:false, secondNumber: calc.secondNumber + entry })
      } 
    }

    if (OPERATIONS.hasOwnProperty(entry)){
      if (entry === '%'){
        setCalc({...calc,a:true, currentNumber: OPERATIONS[entry](parseFloat(calc.currentNumber)).toString()})
      } else if(entry === '±'){
        setCalc({...calc,a:true, currentNumber: OPERATIONS[entry](parseFloat(calc.currentNumber)).toString()})
      } else {
        if(calc.currentNumber && calc.operator && calc.secondNumber){
          setCalc({...calc, a:true, secondNumber:'',operator: entry, currentNumber: OPERATIONS[calc.operator](parseFloat(calc.currentNumber), parseFloat(calc.secondNumber)).toString()})
        } else {
          setCalc({...calc, a:true, secondNumber:'', operator: entry})
        }
      }
    }
    
    if (entry === '='){
      if(calc.operator){
        setCalc({...calc, a:true, currentNumber: OPERATIONS[calc.operator](parseFloat(calc.currentNumber), parseFloat(calc.secondNumber)).toString()})
      }
    }

    if(entry === 'all-clear'){
      resetState()
    }

    console.log(calc.currentNumber.length)
   
    if (calc.currentNumber.length > 11 || calc.secondNumber.length > 11) {
      setCalc({...calc, currentNumber: 'Out Of Range', a:true})
    }
  }

  return (
    <div className="App">
       <div className="calculator-keys">
         <div className='top-button-wrapper'>
          <div className='top-button top-red'><span className='top-buttons-span'><strong>x</strong></span></div>
          <div className='top-button top-yellow'><span className='top-buttons-span'><strong>-</strong></span></div>
          <div className='top-button top-green'><span className='top-buttons-span'><strong>+</strong></span></div>
        </div>        
          <input type="text" className="calculator-screen key-text" style={calc.currentNumber.length>8?{fontSize:48}:{fontSize:76}} value={calc.a?calc.currentNumber:calc.secondNumber} disabled /> 
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="all-clear">{calc.currentNumber !== '0'?'C':'AC'}</button>
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="±">±</button>
          <button onClick={(e) => handleClick(e)} type="button" className="op-dark key-text" value="%">%</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="/">&divide;</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="7">7</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="8">8</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="9">9</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="*">&times;</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="4">4</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="5">5</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="6">6</button>
          <button onClick={(e) => handleClick(e)} type="button" className="operator key-text" value="-">-</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="1">1</button>
          <button onClick={(e) => handleClick(e)} type="button" className='key-text' value="2">2</button>
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
