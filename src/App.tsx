import { useEffect, useRef, useState } from 'react'
import data from './cities-name-list.json'

export function App() {
  const [enteredPlace, setEnteredPlace] = useState('')
  const [places, setPlaces] = useState<string[]>([])
  const usedPlaces = useRef(new Set<string>())
  const inputRef = useRef<HTMLInputElement>(null)
  const [currPlayer, setCurrPlayer] = useState(
    Math.floor(Math.random() * 2) + 1
  )
  const [nextLetter, setNextLetter] = useState('S')

  useEffect(() => {
    if (enteredPlace === '') {
      setPlaces([])
      return
    }
    const matchingPlaces = data
      .filter((place) =>
        place.toLowerCase().startsWith(enteredPlace.toLowerCase())
      )
      .filter((place) => !usedPlaces.current.has(place))
    setPlaces(matchingPlaces)
  }, [enteredPlace])

  return (
    <div
      className={`h-screen flex justify-center items-center flex-col relative ${
        currPlayer === 1 ? 'bg-lime-200' : 'bg-amber-200'
      }`}
    >
      <div className="absolute top-0 right-0 p-4 text-xl font-bold text-gray-800">
        <p>Player: {currPlayer === 1 ? 'Mummy' : 'Inna'}</p>
        <p>Next letter: {nextLetter} </p>
      </div>
      <h1 className="text-6xl font-bold text-slate-900 mt-32">Play Atlas ✈️</h1>
      <input
        type="text"
        className="w-4/5 h-16 border-2 border-gray-600 rounded-full px-10 text-2xl outline-none mt-10"
        placeholder="Enter name of a place"
        ref={inputRef}
        value={enteredPlace}
        onChange={(e) => setEnteredPlace(e.target.value)}
      />
      <div className="w-4/5 flex justify-evenly gap-5 h-1/2">
        <div className="w-4/5 bg-green-300 h-4/5 my-10 border-2 border-slate-400 overflow-y-auto">
          {places.length === 0 ? (
            <p className="text-2xl text-gray-600 text-center pt-5">
              Matching places will show up here
            </p>
          ) : null}
          <div className="grid grid-cols-3 gap-4 p-4">
            {places.map((place, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 cursor-pointer"
                onClick={() => {
                  usedPlaces.current.add(place)
                  setEnteredPlace('')
                  inputRef.current?.focus()
                  setCurrPlayer((prev) => (prev === 1 ? 2 : 1))
                  setNextLetter(place[place.length - 1].toUpperCase())
                }}
              >
                <p className="text-xl">{place}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/5 bg-red-300 h-4/5 my-10 border-2 border-slate-400 overflow-y-auto p-4 gap-4 flex flex-col overflow-y-auto">
          {[...usedPlaces.current].map((place, index) => (
            <div key={index} className="bg-gray-200 p-4 cursor-pointer">
              <p className="text-xl">{place}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
