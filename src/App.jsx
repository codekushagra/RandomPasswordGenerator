import { useState , useCallback, useEffect, useRef} from 'react'
import './App.css';


function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");
  const pagereload = () => {
    window.location.reload();

  };

  //useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()"

    for(let i=0 ; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed , charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //sirf select krne k liye yeh kiya hai hamne
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <h1 className='text-white text-center bg-red-500 h-10 align-middle py-1 font-medium text-xl'>Password Generator Project by Kushagra Chaturvedi</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder='password' readOnly ref={passwordRef} />

          <button onClick={copyPasswordToClipboard}  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >copy</button>
          <button onClick={pagereload} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Regenerate</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={12} value={length} className='cursor-pointer'   
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={(e) => {setNumberAllowed((prev) => !prev);}} />    
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={(e) => {setCharAllowed((prev) => !prev);}} />    
            <label htmlFor='numberInput'>Characters</label>
          </div>

        </div>
        </div>

    </>
  )
}

export default App


/* 1. variables declare kiye
2. passwordgenerator ka method likhenge jisme humne string if else case p bna di>>>> fir ek loop le liya math random to generate random password
3. optimise krke usecallback kiya - callback function ko memorise krta hai jitna ho ske
4. hamne password dene k bajaye setpassword kyu diya - taaki woh infitie loop mai na jae optimise k chakkar mai
5. use effect k baare mai sikha jo ki jb page reload hota toh pehle call ho jayega
6. copy to clipboard window.naviugator.window se hua but ui ko acha feel krane k liye humne reference hook liya useref jo reference deta ahi koi bhyi element hai uska.
7. reference pass krke ab dono aapas mnai relate kr payenge
8. useeffect k andar humne ek function likhi jo ki password generator ka call kr
9. set selection rules and current selection sirf ui k liye use kiya hai humne
*/