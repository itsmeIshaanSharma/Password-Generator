import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*!-_+~`{}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full min-h-screen md:min-h-0 flex items-center justify-center p-2">
      <div className="w-full max-w-sm mx-auto shadow-lg rounded-lg px-3 py-3 text-orange-500 bg-gray-900">
        <h1 className="text-white text-center py-1 font-bold text-lg mb-2">
          Password Generator
        </h1>
        
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 shadow rounded-lg overflow-hidden bg-gray-700 p-2">
            <input
              type="text"
              value={password}
              className="outline-none bg-white text-black w-full py-1 px-2 rounded-md text-sm"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap hover:bg-blue-500 transition"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
            <label className="text-white whitespace-nowrap text-xs">
              Length: {length}
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer flex-grow h-4"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
              <label htmlFor="numberInput" className="text-white text-xs">
                Numbers
              </label>
              <input
                type="checkbox"
                checked={numAllowed}
                id="numberInput"
                onChange={() => setNumAllowed((prev) => !prev)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
              <label htmlFor="characterInput" className="text-white text-xs">
                Characters
              </label>
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;