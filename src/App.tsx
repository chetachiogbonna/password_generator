import { CheckCheckIcon, Copy } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'

const MIN_NUMBER = 8
const MAX_NUMBER = 32

function App() {
  const [passwordLength, setPasswordLength] = useState(MIN_NUMBER)
  const [password, setPassword] = useState("")
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specials, setSpecials] = useState(false)

  const [isLoading, setTransition] = useTransition()

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const upperCaseLetters = letters.toLocaleUpperCase()
    const lowerCaseLetters = letters.toLocaleLowerCase()
    const numbers = "#123456789"
    const specialCharacters = "~`:;/'?><.,*&^%$@!(){}-_|"

    let password = "";

    if (uppercase) {
      password += upperCaseLetters;
    }

    if (lowercase) {
      password += lowerCaseLetters;
    }

    if (number) {
      password += numbers;
    }

    if (specials) {
      password += specialCharacters
    }

    const randomised = password.split("").sort(() => 0.5 - Math.random()).splice(0, passwordLength).join("")
    setPassword(randomised)
  }

  useEffect(() => {
    generatePassword() 
  }, [uppercase, lowercase, number, specials])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(e.target.valueAsNumber)
    generatePassword()
  }

  const handleCopy = () => {
    setTransition(async () => {
      await new Promise(res => setTimeout(res, 1000))
      await navigator.clipboard.writeText(password)
    })
  }

  return (
    <main className="min-h-screen flex flex-col gap-3 justify-center items-center bg-[#eee]">
      <h1 className="text-2xl text-green-500 font-semibold">Password Generator</h1>

      <section className="w-max">
        <div className="flex flex-col gap-6 shadow px-12 sm:px-20 py-10">
          <div className="flex gap-2">
            <input 
              type="number"
              value={passwordLength}
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              className="border pl-1.5"
              onChange={handleChange}
            />

            <input
              type="range" 
              value={passwordLength}
              min={MIN_NUMBER}
              max={MAX_NUMBER}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-6">
            <div>
              <div className="flex gap-2">
                <input 
                  type="checkbox"
                  checked={uppercase}
                  id="uppercase"
                  onChange={(e) => setUppercase(e.target.checked)}
                />
                <label htmlFor="uppercase">Uppercase</label>
              </div>
              <div className="flex gap-2">
                <input 
                  type="checkbox"
                  checked={lowercase}
                  id="lowercase"
                  onChange={(e) => setLowercase(e.target.checked)}
                />
                <label htmlFor="lowercase">Lowercase</label>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <input 
                  type="checkbox"
                  checked={number}
                  id="number"
                  onChange={(e) => setNumber(e.target.checked)}
                />
                <label htmlFor="number">Number</label>
              </div>
              <div className="flex gap-2">
                <input 
                  type="checkbox"
                  checked={specials}
                  id="specials"
                  onChange={(e) => setSpecials(e.target.checked)}
                />
                <label htmlFor="specials">Specials</label>
              </div>
            </div>
          </div>
        </div>

        {password && (
          <div className="w-full flex justify-between items-center gap-3 p-1 shadow">
            <div>{password}</div>
            {isLoading
              ? <CheckCheckIcon size={18} />
              : (
                <Copy
                  size={18} 
                  className="ml-0.5 mt-0.5 cursor-pointer" 
                  onClick={handleCopy}
                />
              )
            }
          </div>
        )}
      </section>
    </main>
  )
}
export default App