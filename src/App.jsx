import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [stack, setStack] = useState([]);
  const [num, setNum] = useState("0");
  const numbers = [
    "√",
    "÷",
    "CE",
    "⌦",
    7,
    8,
    9,
    "x",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    "+/-",
    0,
    ".",
    "=",
  ];

  const calculateResult = () => {
    try {
      const newStack = [...stack, parseFloat(num)];
      let result = newStack[0];

      for (let i = 1; i < newStack.length; i += 2) {
        const operator = newStack[i];
        const operand = newStack[i + 1];

        if (operator === "+") {
          result += operand;
        } else if (operator === "-") {
          result -= operand;
        } else if (operator === "x") {
          result *= operand;
        } else if (operator === "÷") {
          if (operand !== 0) {
            result /= operand;
          } else {
            setNum("Error");
            setStack([]);
            return;
          }
        }
      }

      setStack([]);
      setNum(result.toString());
    } catch (error) {
      console.log(error);
      setStack([]);
      setNum("Error");
    }
  };

  const handleButtonClick = (item) => {
    const clearInput = () => {
      setNum("");
    };

    const handleNonNumeric = () => {
      if (item === "CE") {
        clearInput();
        setStack([]);
      } else if (item === "⌦") {
        if (num === "Error" || isNaN(parseFloat(num))) {
          clearInput();
        } else {
          setNum(num.slice(0, -1));
        }
      } else if (item === "=") {
        calculateResult();
      } else if (item === "√") {
        try {
          const sqrtResult = Math.sqrt(parseFloat(num));
          setNum(sqrtResult.toString());
        } catch (error) {
          console.log(error);
          setStack([]);
          setNum("Error");
        }
      } else if (item === "+/-") {
        try {
          const result = num[0] === "-" ? Math.abs(+num) : "-" + num;
          setNum(result);
        } catch (error) {
          console.log(error);
          setStack([]);
          setNum("Error");
        }
      } else if (item === ".") {
        if (num.indexOf(".") === -1) {
          setNum(num + ".");
        }
      } else if (typeof item === "string") {
        if (stack.length > 0 && typeof stack[stack.length - 1] === "string") {
          const updatedStack = [...stack];
          updatedStack[updatedStack.length - 1] = item;
          setStack(updatedStack);
        } else {
          setStack([...stack, parseFloat(num), item]);
          clearInput();
        }
      }
    };

    const handleNumeric = () => {
      if (num === "0") {
        setNum(item.toString());
      } else {
        setNum(num + item.toString());
      }
    };

    if (typeof item === "number") {
      handleNumeric();
    } else {
      handleNonNumeric();
    }
  };

  return (
    <>
      <div className="container mx-auto w-96 shadow-sm mt-52">
        <div className="grid grid-cols-4 gap-1 bg-black rounded-sm p-1 relative">
          <div
            className={`col-span-4 h-8  flex items-center justify-end  px-1 text-sm text-slate-400`}
          >
            {`${stack[0] ? stack[0] : ""} ${stack[1] ? stack[1] : ""}`}
          </div>
          <div className={`col-span-4 h-8 flex items-center justify-end text-white px-1 pb-2`}>
            {num}
          </div>
          {numbers.map((item, idx) => (
            <Button
              key={idx}
              value={item}
              onClick={() => handleButtonClick(item)}
              className={
                typeof item === "number" ? "" : item === "=" ? "!bg-sky-600" : "!bg-zinc-800"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
