import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setOpen((o) => !o)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#fff" backgroundColor="#7950f2" onClick={handlePrevious}>
              <span>👈🏽</span> Previous
            </Button>
            <Button textColor="#fff" backgroundColor="#7950f2" onClick={handleNext}>
              Next <span>👉🏽</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <p class="message">
      <h3>Step {step}</h3>
      {children}
    </p>
  );
}

function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <button style={{ color: textColor, backgroundColor: backgroundColor }} onClick={onClick}>
      {children}
    </button>
  );
}
