import { ReactElement, useContext, useEffect, useState } from "react";
import "country-flag-icons/react/3x2";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import { DataContext } from "./context/dataContext";
import UseUpdateScores from "./components/hooks/UseUpdateScores";

function pickRandomItems<T>(objectArr: T[], quantity: number, value?: T): T[] {
  const filteredArr = value
    ? objectArr.filter((item) => item !== value)
    : objectArr;
  if (filteredArr.length < quantity) return filteredArr;
  const newObject: T[] = [];
  const indexSelected: number[] = [];
  while (newObject.length < quantity) {
    const randomIndex = Math.floor(Math.random() * filteredArr.length);
    if (!indexSelected.includes(randomIndex)) {
      indexSelected.push(randomIndex);
      newObject.push(filteredArr[randomIndex]);
    }
  }
  return newObject;
}

function flagEmojiToCountryCode(emoji: string): string {
  return [...emoji]
    .map((char) => String.fromCharCode(char.codePointAt(0)! - 0x1f1e6 + 65))
    .join("");
}

function selectRandomQuestion(option: string, country: ICountry): ReactElement {
  const code = flagEmojiToCountryCode(country.flag);
  if (option === "capital") {
    return (
      <p className="question-title">
        {`What country is ${country.capital} the capital?`}
      </p>
    );
  } else {
    return (
      <p className="question-title">
        Which country does this flag
        <span className={`flag-icon flag-icon-${code.toLowerCase()}`} /> belong
        to? ;
      </p>
    );
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function parseCountryToAnswers(options: ICountry[]): IOptions[] {
  const answer = { ...options[0], isSelected: false, isCorrect: true };
  const restOptions = options
    .slice(1)
    .map((country) => ({ ...country, isSelected: false, isCorrect: false }));
  return [answer, ...restOptions];
}

interface IOptions {
  isSelected: boolean;
  isCorrect: boolean;
  name: string;
  capital: string;
  flag: string;
}

interface ICountry {
  name: string;
  capital: string;
  flag: string;
}

interface IQuestion {
  value: ReactElement;
  answer: string;
  options: IOptions[];
  isAnswered: boolean;
  isCorrect: boolean;
}

function App() {
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionSelected, setQuestionSelected] = useState<number>(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const context = useContext(DataContext);
  const { updateScores } = UseUpdateScores();

  function reloadGame() {
    window.location.reload();
  }

  function checkAnswer(answer: string) {
    if (questions[questionSelected - 1].isAnswered) return;
    if (answer === questions[questionSelected - 1].answer) {
      setAnsweredQuestions((prev) => prev + 1);
    }
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionSelected - 1
          ? {
              ...q,
              isAnswered: true,
              options: q.options.map((op) =>
                op.name !== answer ? op : { ...op, isSelected: true }
              ),
            }
          : q
      )
    );
    setQuestionSelected((prev) => (prev >= 10 ? prev : prev + 1));
  }

  async function fetchCountries() {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flag"
      );
      const resData = await response.json();
      setAllCountries(
        resData.map((item: any) => ({
          name: item.name.common,
          flag: item.flag,
          capital: item.capital[0],
        }))
      );
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const possibleOptions = ["flag", "capital"];
    const countries = pickRandomItems(allCountries, 10);
    setQuestions(
      countries.map((country, idx) => {
        const randomIndex = Math.round(Math.random());
        return {
          value: selectRandomQuestion(possibleOptions[randomIndex], country),
          answer: country.name,
          options: shuffleArray(
            parseCountryToAnswers([
              country,
              ...pickRandomItems(allCountries, 3, countries[idx]),
            ])
          ),
          isAnswered: false,
          isCorrect: false,
        };
      })
    );
  }, [allCountries]);

  async function onUpdateScores(correctAnswers: number) {
    const message = await updateScores(correctAnswers);
    console.log(message);
  }

  useEffect(() => {
    if (questions.filter((q) => q.isAnswered).length === 10) {
      setIsGameFinished(true);
      onUpdateScores(answeredQuestions);
    }
  }, [questions]);

  return (
    <div className="app-container">
      {context?.user ? <Profile User={context.user} /> : <Auth />}
      {!isGameFinished ? (
        <>
          <section className="title-container">
            <div className="title">Country Quiz</div>
            <article className="rating">{answeredQuestions}/10 points</article>
          </section>
          <section className="question-container">
            <div className="numbers-container">
              {questions &&
                questions.map((q, i) => (
                  <p
                    className={`number ${
                      i + 1 === questionSelected ? "selected" : ""
                    } ${q.isAnswered ? "selected" : ""}`}
                    key={q.answer}
                    onClick={() => setQuestionSelected(i + 1)}
                  >
                    {i + 1}
                  </p>
                ))}
            </div>
            {questions.length > 0 && questions[questionSelected - 1].value}
            <section className="answers-container">
              <div className="answers">
                {questions.length > 0 &&
                  questions[questionSelected - 1].options.map((a, idx, arr) => (
                    <div
                      className={`answer ${a.isSelected ? "selected" : ""}`}
                      key={a.name}
                      onClick={() => checkAnswer(a.name)}
                    >
                      {a.name}
                      <img
                        className={`${
                          arr.some((e) => e.isSelected) && a.isCorrect
                            ? "d-block"
                            : "d-none"
                        }`}
                        src="https://firebasestorage.googleapis.com/v0/b/upload-image-1409e.appspot.com/o/Check_round_fill.svg?alt=media&token=5c3711f1-2a4b-4d59-9073-843718bddc4a"
                        alt=""
                      />
                      <img
                        className={`${
                          !a.isCorrect && a.isSelected ? "d-block" : "d-none"
                        }`}
                        src="https://firebasestorage.googleapis.com/v0/b/upload-image-1409e.appspot.com/o/Close_round_fill.svg?alt=media&token=5630e813-a879-44f5-8fc9-7bf62ebd7ce8"
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </section>
          </section>
        </>
      ) : (
        <div className="question-container results">
          <div className="icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/upload-image-1409e.appspot.com/o/congrats.png?alt=media&token=7e11bd47-6713-40ee-973a-34eb913b9030"
              alt=""
            />
          </div>
          <h1>Congrats! You completed the quiz.</h1>
          <p>You answer {answeredQuestions}/10 correctly.</p>
          <button onClick={reloadGame} id="btn-play-again">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
function useUpdateScores() {
  throw new Error("Function not implemented.");
}
