import { useEffect, useRef, useState } from "react";

function Password() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const generatePassword = () => {
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let pass = "";

      if (numbers) str = str + "0123456789";
      if (characters) str = str + "!@#$%^&*()";

      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * (str.length + 1));
        pass = pass + str.charAt(index);
      }
      setPassword(pass);
    };
    generatePassword();
  }, [length, numbers, characters]);

  return (
    <div>
      <div className="text-3xl font-sans bg-[#49B6FF] rounded w-1/2 h-20">
        <h1 className="text-center text-[#FF5E5B]">Password Generator</h1>
      </div>
      <div className="border-2 rounded w-1/2 h-80 flex flex-col">
        <div className="flex flex-col">
          <div>
            <label>Generate Password</label>
            <input className="border-2" type="text" value={password} />
            <button ref={inputRef}>Copy</button>
          </div>

          <div>
            <label>
              Length:{length}
              <input
                type="range"
                onChange={(e) => setLength(e.target.value)}
                min={8}
                max={20}
              ></input>
            </label>
            <label>
              Numbers:{" "}
              <input
                type="checkbox"
                onChange={(e) => setNumbers(e.target.checked)}
              ></input>
            </label>
            <label>
              Characters:{" "}
              <input
                type="checkbox"
                onChange={(e) => setCharacters(e.target.checked)}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
