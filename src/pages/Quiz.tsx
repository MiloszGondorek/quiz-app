import { useParams } from "react-router-dom";
import { useReducer, useState } from "react";
import quizData from "../data/quizzes.json";

import { PDFDownloadLink } from "@react-pdf/renderer";
import Certificate from "../certificateGenerator/certificateGenerator";

export default function Quiz() {
  const { quizId } = useParams();
  let currentQuiz: any;
  if (quizId === undefined) {
    currentQuiz = localStorage.getItem("quizzes");
    if (currentQuiz) {
      currentQuiz = JSON.parse(currentQuiz);
    }
  } else {
    currentQuiz = quizData[quizId as keyof typeof quizData];
  }
  const [questionState, questionDispatch] = useReducer(questionReducer, {
    questionId: 0,
    points: 0,
  });
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-2xl font-bold">{currentQuiz.title}</div>

      {questionState.questionId < currentQuiz.questions.length ? (
        <>
          <p>{currentQuiz.questions[questionState.questionId].question}</p>
          <div className="flex flex-col gap-3 w-1/2 mt-5">
            {currentQuiz.questions[questionState.questionId].options.map(
              (option: any, index: any) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      questionDispatch({ type: "answer", option: index });
                    }}
                    className="p-4 btn btn-outline"
                  >
                    {option}
                  </button>
                );
              },
            )}

            <button
              onClick={() => {
                questionDispatch({ type: "skip" });
              }}
              className="p-4 btn btn-neutral btn-outline mt-5"
            >
              Skip Question
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl font-semibold">
            Quiz Completed! Your score: {questionState.points} /{" "}
            {currentQuiz.questions.length}
          </div>
          {questionState.points >= currentQuiz.pointsToPass ? (
            <>
              <div className="text-green-500">Quiz Passed!</div>
              <input
                id="userName"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full max-w-xs mt-3"
              />
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  const input = document.getElementById(
                    "userName",
                  ) as HTMLInputElement;
                  if (input) {
                    setName(input.value);
                  }
                }}
              >
                Generate Certificate
              </button>
              {name && (
                <PDFDownloadLink
                  document={
                    <Certificate
                      name={name}
                      quizzName={currentQuiz.title}
                      score={questionState.points}
                      totalPoints={currentQuiz.questions.length}
                    />
                  }
                  fileName={`${currentQuiz.title}_Certificate.pdf`}
                >
                  {({ loading }) => (
                    <button className="btn btn-primary">
                      {loading ? "Generowanie..." : "Pobierz Certyfikat PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                questionDispatch({ type: "reset" });
              }}
              className="p-4 btn btn-primary mt-5"
            >
              Retake Quiz
            </button>
          )}
        </>
      )}
    </div>
  );

  function questionReducer(state: any, action: any) {
    if (action.type == "skip") {
      return {
        questionId: state.questionId + 1,
        points: state.points,
      };
    } else if (action.type == "answer") {
      if (action.option === currentQuiz.questions[state.questionId].answer) {
        return {
          questionId: state.questionId + 1,
          points: state.points + 1,
        };
      } else {
        return {
          questionId: state.questionId + 1,
          points: state.points - 1,
        };
      }
    } else {
      return {
        questionId: 0,
        points: 0,
      };
    }
  }
}
