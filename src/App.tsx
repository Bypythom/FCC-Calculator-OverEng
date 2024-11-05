import { useState } from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*x/+\-]/.test(symbol);
  };

  const sanitizeInput = (input: string) => {
    // Replace multiple consecutive operators with the last operator in the sequence
    return input.replace(/([*/+\-])\s*([*/+\-]+)/g, '$2');
  };

  const buttonPress = (symbol: string) => {
    console.log(symbol);
    
    if (symbol !== "=" && answer !== "" && expression === "") {
      setExpression(symbol);
      setAnswer("");  // Reset answer to allow new calculation
    } else if (symbol === "clear") {
      setAnswer("0");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      // Sanitize the expression before adding a new operator
      const sanitizedExpression = sanitizeInput(expression);
      setExpression(sanitizedExpression + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      const lastChar = expression.charAt(expression.length -1);
      const lastNumber = expression.split(/[+-/*]/g).pop();
      if (lastChar === "0" || lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[+\-/*]/g).pop();
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    let trimmedExpression = et.trim();
    
    // Sanitize the expression before evaluation
    trimmedExpression = sanitizeInput(trimmedExpression);
    
    // Prevent evaluation if the last character is still an operator after sanitization
    if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) return;
    
    console.log("Expression before eval", trimmedExpression);

    try {
      // It's safer to use a math parser library instead of eval in production
      const result = eval(trimmedExpression);
      console.log("Result after eval:", result);
      setAnswer(result.toString());
      setExpression(result.toString());
    } catch (error) {
      console.error("Calculation error:", error);
      setAnswer("Error");
    }
  };

  return (
    <>
      <div className='container'>
        <h1>Calculator JS</h1>
        <div id="display">
          <div id="expression" style={{ textAlign: 'right' }}>{expression}</div>
        </div>
        <div id="answer">{answer}</div>
        
        <div id="calculator">
          <button id="clear" onClick={() => buttonPress("clear")} className="light-gray">C</button>
          <button onClick={() => buttonPress("negative")} className="light-gray">+/-</button>
          <button onClick={() => buttonPress("percentage")} className="light-gray">%</button>
          <button id="divide" onClick={() => buttonPress("/")} className="light-gray">/</button>

          <button id="seven" onClick={() => buttonPress("7")} className="dark-gray">7</button>
          <button id="eight" onClick={() => buttonPress("8")} className="dark-gray">8</button>
          <button id="nine" onClick={() => buttonPress("9")} className="dark-gray">9</button>
          <button id="multiply" onClick={() => buttonPress("*")} className="light-gray">*</button>

          <button id="four" onClick={() => buttonPress("4")} className="dark-gray">4</button>
          <button id="five" onClick={() => buttonPress("5")} className="dark-gray">5</button>
          <button id="six" onClick={() => buttonPress("6")} className="dark-gray">6</button>
          <button id="subtract" onClick={() => buttonPress("-")} className="light-gray">-</button>

          <button id="one" onClick={() => buttonPress("1")} className="dark-gray">1</button>
          <button id="two" onClick={() => buttonPress("2")} className="dark-gray">2</button>
          <button id="three" onClick={() => buttonPress("3")} className="dark-gray">3</button>
          <button id="add" onClick={() => buttonPress("+")} className="light-gray">+</button>

          <button id="zero" onClick={() => buttonPress("0")} className="dark-gray">0</button>
          <button id="decimal" onClick={() => buttonPress(".")} className="light-gray">.</button>
          <button id='equals' onClick={() => buttonPress("=")} className="orange">=</button>
        </div>

      </div>
    </>
  )  
}

export default App;
