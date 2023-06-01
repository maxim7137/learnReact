import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [isShow, setIsShow] = useState("");

  return (
    <div className="p-2">
      <Alert isShow={isShow} onClose={() => setIsShow("")}>
        <span>Hello World</span>
      </Alert>
      <Button color="dark" onClick={() => setIsShow("show")}>
        Показать
      </Button>
    </div>
  );
}

export default App;
