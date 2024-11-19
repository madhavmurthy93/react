import { useQuiz } from "../contexts/QuizContext";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

function QuizContent() {
  const { status } = useQuiz();
  return (
    <>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
        </>
      )}
      {status === "finished" && <FinishScreen />}
    </>
  );
}

export default QuizContent;
