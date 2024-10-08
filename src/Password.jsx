import { useEffect, useRef, useState } from "react";

function Password() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const generatePassword = () => {
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let pass = "";
      let numbers = "0123456789";
      let characters = "!@#$%^&*()";

      if (isNumber) str = str + "0123456789";
      if (isCharacter) str = str + "!@#$%^&*()";

      //Ensure at least one number and one special character is required
      if (isNumber)
        pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
      if (isCharacter)
        pass += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );

      //Fill the rest of the password
      for (let i = pass.length; i < length; i++) {
        let index = Math.floor(Math.random() * str.length);
        pass = pass + str.charAt(index);
      }

      //Shuffle the password to avoid predictable patterns
      pass = pass
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");

      setPassword(pass);
    };
    generatePassword();
  }, [length, isNumber, isCharacter]);

  const handleCopy = () => {
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value);
  };

  return (
    <div
      style={{ fontFamily: "Georgia, serif" }}
      className="h-screen w-screen justify-center items-center flex flex-col gap-4"
    >
      <div className="text-3xl font-sans bg-[#fe675c] bg-opacity-[0.9] rounded-3xl w-1/2 h-20 p-4 border-indigo-500">
        <h1 className="text-center text-slate-200">PASSWORD GENERATOR</h1>
      </div>
      <div className="border-2 rounded-3xl w-1/2 h-60 flex flex-col p-4 bg-slate-200 bg-opacity-[0.8] border-red-300 shadow-2xl justify-center items-center">
        <div className="flex flex-col gap-8 font-serif ">
          <div className="space-x-4">
            <label>Generated Password :</label>
            <input
              className="border-2 rounded-lg p-1 border-red-300 "
              type="text"
              value={password}
              ref={inputRef}
              readOnly
            />
            <button
              className="border-2 rounded-3xl w-[55px] p-1 border-red-300 hover:bg-blue-500 bg-[#fe675c] text-slate-200"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>

          <div className="flex gap-4">
            <label className="">
              Length: {length}{" "}
              <input
                type="range"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={8}
                max={20}
              ></input>
            </label>
            <label>
              Numbers:{" "}
              <input
                type="checkbox"
                onChange={(e) => setIsNumber(e.target.checked)}
              ></input>
            </label>
            <label>
              Characters:{" "}
              <input
                type="checkbox"
                onChange={(e) => setIsCharacter(e.target.checked)}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
