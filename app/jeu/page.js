"use client";
import { useState } from "react";
import ArtistGameCard from "@/components/ArtistGameCard";
import { apiRequest } from "../../api/api";

export default function Jeu() {
  const [startGame, setStartGame] = useState(false);

  const [artists, setArtists] = useState();

  const [comingElement, setComingElement] = useState([]);

  const [selectedElement, setSelectedElement] = useState({});

  const [step, setStep] = useState("");

  const [note, setNote] = useState(1);

  const displayArtist = async () => {
    // Start game
    setNote(1);
    setComingElement({});
    setSelectedElement({});
    setStep("");
    setStartGame(true);

    // GET Artists for game
    const getArtists = await apiRequest("get", "/artists?game=true");
    setArtists(getArtists.data);

    // Select 2 random artists
    let firstRandom = Math.floor(
      Math.random() * (getArtists.data.length - 0) + 0
    );
    let secondRandom = Math.floor(
      Math.random() * (getArtists.data.length - 0) + 0
    );

    while (firstRandom === secondRandom) {
      secondRandom = Math.floor(
        Math.random() * (getArtists.data.length - 0) + 0
      );
    }

    // Set coming artist display
    const randomArtists = [
      getArtists.data[firstRandom],
      getArtists.data[secondRandom],
    ];

    // Les deux artistes à afficher
    setComingElement(randomArtists);
  };

  const displayResult = (elementSelected) => {
    const getElements = [...artists];

    setSelectedElement(elementSelected);

    let getDisplayArtists = [...comingElement];
    const findElementSelectedIndex = getDisplayArtists.findIndex(
      (x) => x.name === elementSelected.name
    );
    const otherElement =
      findElementSelectedIndex === 0
        ? getDisplayArtists[1]
        : getDisplayArtists[0];

    if (elementSelected.auditeurs > otherElement.auditeurs) {
      const newElements = getElements.filter((e) => e !== otherElement);
      setArtists(newElements);
      setStep("win");
      // setResult("win");
    } else {
      // setResult("lose");
      setStep("lose");
      // restartGame()
    }
  };

  // //   const restartGame = () => {
  // displayArtist();
  // //   }

  const nextArtist = () => {
    // Reset data
    setStep("");
    setSelectedElement({});

    const getElements = [...artists];
    let firstRandom = getElements.findIndex((e) => e === selectedElement);

    let secondRandom = Math.floor(Math.random() * (getElements.length - 0) + 0);

    while (firstRandom === secondRandom) {
      secondRandom = Math.floor(Math.random() * (getElements.length - 0) + 0);
    }

    const randomArtists = [artists[firstRandom], artists[secondRandom]];

    // Les deux artistes à afficher
    setComingElement(randomArtists);

    //
    setNote((prevState) => prevState + 1);
  };

  return (
    <div className="px-10 sm:px-24 py-10">
      <h1 className="mt-8 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-black">
        Qui a le plus
        <span className="mx-1 px-2 text-white bg-blue-500 rounded">{`d'auditeurs`}</span>
        mensuels ?
      </h1>

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        En se basant sur le nombre {`d'auditeurs`} mensuel de spotify.
      </p>

      <div className="w-full mt-10">
        {!startGame ? (
          <div className="w-fit mx-auto">
            <button
              onClick={displayArtist}
              className="w-fit mx-auto my-10 bg-blue-500 hover:bg-blue-800 p-4 text-white font-extrabold rounded-lg"
            >
              Commencer le jeu
            </button>
          </div>
        ) : (
          <div className="my-10">&nbsp;</div>
        )}

        {note === 10 && artists.length === 1 && step === "win" && (
          <div className="mb-10 bg-green-100 rounded-md p-3 flex">
            <div className="text-green-700">
              <div className="font-bold text-xl">Félicitation !</div>
              <div>
                {" "}
                <p>
                  On dirait que tu as un doctorat en rap ! Tes connaissances en
                  matière de rap sont vraiment impressionnantes.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "lose" && (
          <div className="mb-10 bg-red-100 rounded-md p-3 flex">
            <div className="text-red-700">
              <div className="font-bold text-xl">Perdu !</div>
              <div>
                {" "}
                <p>Retente ta chance ! </p>
              </div>
            </div>
          </div>
        )}

        {comingElement.length > 0 && (
          <div className="grid md:grid-cols-3">
            {/* {comingElement[0].name} {step && comingElement[0].auditeurs}{" "} */}
            <div
              className={`cursor-pointer w-full ${
                (step === "win" || step === "lose") && "pointer-events-none"
              } w-full`}
              onClick={() => displayResult(comingElement[0])}
            >
              <ArtistGameCard
                name={comingElement[0].name}
                auditeurs={step !== "" && comingElement[0].auditeurs}
                otherAudtieurs={comingElement[1].auditeurs}
                img={comingElement[0].img}
                selectedElement={selectedElement}
              />
            </div>
            <div className="py-20 md:my-0 relative grid grid-cols-1 place-items-center">
              <div className="text-xl font-bold">
                <span className="text-blue-500">{note}</span> / 10
              </div>
              <div className="text-[#374151] font-extrabold text-3xl">VS</div>
              <div className="absolute bottom-6 md:bottom-10">
                {step === "win" && note < 10 && (
                  <button
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={nextArtist}
                  >
                    next
                  </button>
                )}
                {(step === "lose" || note === 10) && (
                  <button
                    onClick={displayArtist}
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    // onClick={nextArtist}
                  >
                    Restart game
                  </button>
                )}
              </div>
            </div>

            <div
              className={`cursor-pointer ${
                (step === "win" || step === "lose") && "pointer-events-none"
              } `}
              onClick={() => displayResult(comingElement[1])}
            >
              <ArtistGameCard
                name={comingElement[1].name}
                auditeurs={step !== "" && comingElement[1].auditeurs}
                otherAudtieurs={comingElement[0].auditeurs}
                img={comingElement[1].img}
                selectedElement={selectedElement}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
