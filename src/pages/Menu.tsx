import quizData from "../data/quizzes.json";

export default function Menu() {
  const quizzes = Object.values(quizData);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      {quizzes.map((quiz, index) => {
        return (
          <a
            key={index}
            className="p-4 mb-4 bg-base-200 rounded-box block"
            href={`/quiz/${quiz.id}`}
          >
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p>{quiz.description}</p>
          </a>
        );
      })}
      <input
        className="p-4 mb-4 bg-base-200 rounded-box block w-full cursor-pointer"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            readFile(e.target.files[0]);
          }
        }}
      ></input>
    </>
  );
}

function readFile(file: any) {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target?.result;
      if (typeof text === "string") {
        const json = JSON.parse(text);
        localStorage.setItem("quizzes", JSON.stringify(json));
        window.location.href = "/quiz";
      } else {
        alert("Nie można odczytać pliku");
      }
    } catch (error) {
      alert("Nieprawidłowy format pliku");
    }
  };
  reader.readAsText(file);
}
