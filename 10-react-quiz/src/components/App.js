import Header from "./Header";
import Main from "./Main";
import { QuizProvider } from "../contexts/QuizContext";
import QuizContent from "./QuizContent";

export default function App() {
  return (
    <div className="app">
      <QuizProvider>
        <Header />
        <Main>
          <QuizContent />
        </Main>
      </QuizProvider>
    </div>
  );
}
