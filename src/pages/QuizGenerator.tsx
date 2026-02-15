import { useReducer } from "react";
import { FaTrash } from "react-icons/fa";

export default function QuizGenerator() {
  const [quizState, quizDispatch] = useReducer(quizReducer, {
    title: "",
    description: "",
    pointsToPass: 0,
    questions: [],
  });

  const [questionState, questionDispatch] = useReducer(questionReducer, {
    question: "",
    options: [],
    correctOption: 0,
  });

  return (
    <div className="flex flex-col gap-2 justify-center items-center pb-20">
      <div className="text-2xl font-bold">Quiz Generator</div>
      <div className="w-1/2 mt-5">
        <h2 className="text-xl">Title: </h2>
        <input
          type="text"
          placeholder="Enter quiz title"
          className="input w-full mt-2"
          onChange={(e) => {
            quizDispatch({ type: "setTitle", title: e.target.value });
          }}
        />

        <h2 className="text-xl mt-5">Description: </h2>
        <textarea
          placeholder="Enter quiz description"
          className="textarea w-full mt-2"
          onChange={(e) => {
            quizDispatch({
              type: "setDescription",
              description: e.target.value,
            });
          }}
        />

        <h2 className="text-xl mt-5">Points to Pass: </h2>
        <input
          type="number"
          placeholder="Enter points to pass"
          className="input w-full mt-2"
          onChange={(e) => {
            quizDispatch({
              type: "setPointsToPass",
              pointsToPass: parseInt(e.target.value),
            });
          }}
        />

        <h2 className="text-xl mt-5">Add Question</h2>
        <h3 className="mt-2">Question</h3>
        <input
          type="text"
          placeholder="Enter question"
          className="input w-full mt-2"
          onChange={(e) => {
            questionDispatch({ type: "setQuestion", question: e.target.value });
          }}
        />

        {questionState.options.map((option: any, index: any) => {
          return (
            <div className="flex mt-2">
              <input
                key={"option" + index}
                type="text"
                placeholder={`Option ${index + 1}`}
                className="input w-full mr-3"
                value={option}
                onChange={(e) => {
                  questionDispatch({
                    type: "setOption",
                    index,
                    option: e.target.value,
                  });
                }}
              />
              <FaTrash
                className="my-auto cursor-pointer"
                onClick={() => {
                  questionDispatch({ type: "removeOption", index });
                }}
              />
            </div>
          );
        })}

        <button
          className="btn mt-5"
          onClick={() => {
            questionDispatch({ type: "addOption" });
          }}
        >
          Add option
        </button>

        <h3 className="mt-2">Correct Option</h3>
        <input
          type="number"
          placeholder="Enter correct option number (starting from 0)"
          className="input w-full mt-2"
          onChange={(e) => {
            questionDispatch({
              type: "setCorrectOption",
              correctOption: parseInt(e.target.value),
            });
          }}
        />

        <button
          className="btn mt-5"
          onClick={() => {
            quizDispatch({ type: "addQuestion", question: questionState });
          }}
        >
          Add question
        </button>

        <h2 className="text-xl mt-5">Questions:</h2>
        {quizState.questions.map((question: any, index: any) => {
          return (
            <div key={index} className="border border-[#eee] p-4 w-full mt-6">
              <div className="font-bold">{question.question}</div>
              <div className="flex flex-col gap-2 mt-2">
                {question.options.map((option: any, optionIndex: any) => {
                  return (
                    <div
                      key={optionIndex}
                      className={`p-2 ${
                        optionIndex === question.correctOption
                          ? "bg-green-200"
                          : "bg-gray-200"
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
              <FaTrash
                className="mt-5 cursor-pointer ml-auto"
                onClick={() => {
                  quizDispatch({ type: "removeQuestion", index });
                }}
              />
            </div>
          );
        })}

        <button
          className="btn btn-primary mt-10"
          onClick={() => {
            generateQuiz(quizState);
          }}
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}

function quizReducer(state: any, action: any) {
  if (action.type === "setTitle") {
    return {
      ...state,
      title: action.title,
    };
  } else if (action.type === "setDescription") {
    return {
      ...state,
      description: action.description,
    };
  } else if (action.type === "setPointsToPass") {
    return {
      ...state,
      pointsToPass: action.pointsToPass,
    };
  } else if (action.type === "addQuestion") {
    if (action.question.options.length === 0) {
      return state;
    }
    if (
      action.question.correctOption < 0 ||
      action.question.correctOption >= action.question.options.length
    ) {
      return state;
    }
    return {
      ...state,
      questions: [...state.questions, action.question],
    };
  } else if (action.type === "removeQuestion") {
    const newQuestions = [...state.questions];
    newQuestions.splice(action.index, 1);
    return {
      ...state,
      questions: newQuestions,
    };
  }
  return state;
}

function questionReducer(state: any, action: any) {
  if (action.type === "setQuestion") {
    return {
      ...state,
      question: action.question,
    };
  }
  if (action.type === "addOption") {
    return {
      ...state,
      options: [...state.options, ""],
    };
  }
  if (action.type === "setOption") {
    const newOptions = [...state.options];
    newOptions[action.index] = action.option;
    return {
      ...state,
      options: newOptions,
    };
  }
  if (action.type === "removeOption") {
    const newOptions = [...state.options];
    newOptions.splice(action.index, 1);
    return {
      ...state,
      options: newOptions,
    };
  } else if (action.type === "setCorrectOption") {
    return {
      ...state,
      correctOption: action.correctOption - 1,
    };
  }
  return state;
}

//generate as json file and download it
function generateQuiz(quizState: any) {
  const quiz = {
    title: quizState.title,
    description: quizState.description,
    pointsToPass: quizState.pointsToPass,
    questions: quizState.questions.map((question: any, index: any) => {
      return {
        id: index,
        question: question.question,
        options: question.options,
        answer: question.correctOption,
      };
    }),
  };
  const blob = new Blob([JSON.stringify(quiz)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${quizState.title}.json`;
  a.click();
}
