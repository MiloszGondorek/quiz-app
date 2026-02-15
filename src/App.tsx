import { Routes, Route, Link } from "react-router-dom";

import Menu from "./pages/Menu";
import Quiz from "./pages/Quiz";
import Scoring from "./pages/Scoring";
import QuizGenerator from "./pages/QuizGenerator";

function App() {
  return (
    <>
      <header>
        <nav className="bg-base-300 text-base-content p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">
              Quiz App
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="hover:underline">
                Menu
              </Link>
              <Link to="/scoring" className="hover:underline">
                Scoring
              </Link>
              <Link to="/quiz-generator" className="hover:underline">
                Make Quiz
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/scoring" element={<Scoring />} />
          <Route path="/quiz-generator" element={<QuizGenerator />} />
          {/* Strona 404 */}
          <Route
            path="*"
            element={<div className="p-10">404 - Nie znaleziono strony</div>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
