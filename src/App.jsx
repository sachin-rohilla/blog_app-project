import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const useToggle = () => {
    const [isToggle, setIsToggle] = useState(false);

    const handleToggle = () => {
      setIsToggle(!isToggle);
    };
    return { isToggle, handleToggle };
  };
  const { isToggle, handleToggle } = useToggle();

  return (
    <div>
      <button onClick={handleToggle}>Click Me!</button>

      {isToggle ? <h1>Toggle</h1> : null}
    </div>
  );
}

export default App;
