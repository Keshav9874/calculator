import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(null);

  // Handle number and decimal input
  const handleNumberClick = (number) => {
    const currentNumber = input.split(' ').pop();
    if (number === '.' && currentNumber.includes('.')) return;
    setInput(input + number);
  };

  // Handle operations input (+, -, *, /, %, √, ^)
  const handleOperationClick = (operation) => {
    setInput(input + ' ' + operation + ' ');
  };

  // Evaluate the expression and show the result
  const calculateResult = () => {
    try {
      const evaluatedResult = eval(input.replace(/√/g, 'Math.sqrt').replace(/%/g, '/100').replace(/\^/g, '**'));
      if (isNaN(evaluatedResult)) {
        throw new Error("Invalid calculation");
      }
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  // Clear the input and result
  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  // Memory functions
  const handleMemorySave = () => {
    setMemory(result);
  };

  const handleMemoryRecall = () => {
    if (memory) {
      setInput(input + memory);
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key) || key === '.') {
        handleNumberClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperationClick(key);
      } else if (key === 'Enter') {
        calculateResult();
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        clearInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || '0'}</div>
        <div className="result">{result !== null ? `= ${result}` : ''}</div>
      </div>
      <div className="buttons">
        {/* Number buttons */}
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperationClick('+')}>+</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperationClick('-')}>-</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperationClick('*')}>*</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleOperationClick('/')}>/</button>
        <button onClick={() => handleOperationClick('%')}>%</button>
        <button onClick={() => handleOperationClick('√')}>√</button>
        <button onClick={() => handleOperationClick('^')}>^</button>
        <button onClick={() => handleNumberClick('.')}>.</button>

        {/* Memory buttons */}
        <button onClick={handleMemorySave}>M+</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>

        {/* Clear and Calculate buttons */}
        <button onClick={clearInput}>C</button>
        <button onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default App;
