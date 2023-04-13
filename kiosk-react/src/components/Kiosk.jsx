import React, { useEffect, useState } from "react";
import Button from "./Button";
import Welcome from "./Welcome";
import Thankyou from "./Thankyou";

const Rating = ({
  question,
  handleRatingClick,
  currentValue,
  setCurrentValue,
}) => {
  const options = Array.from({ length: question.max }, (_, i) => i + 1);
  const selectedClasses =
    "bg-blue-700 text-white hover:bg-gray-50 hover:text-gray-900";
  const normalClasses =
    "hover:bg-blue-700 hover:text-white bg-gray-50 text-gray-900";

  return (
    <div className="flex flex-wrap justify-center my-10">
      {options.map((item, index) => {
        return (
          <div key={index} className="mx-2.5 my-2">
            <button
              className={`${
                item === currentValue ? selectedClasses : normalClasses
              } 'text-sm rounded-full text-center px-4 py-2 font-bold`}
              onClick={() => {
                setCurrentValue(item);
                handleRatingClick(item);
              }}
            >
              {item}
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Input = ({ question, handleInputChange, currentValue }) => {
  const value = currentValue;
  return (
    <div className="my-10">
      <div className="">
        <input
          type={question.type}
          maxLength={question.max}
          id={question.id}
          className="block mx-auto w-[75%] bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          autoFocus={true}
          onChange={handleInputChange}
          value={currentValue}
        />
      </div>
    </div>
  );
};

export default function Kiosk({ kiosk }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [currentValue, setCurrentValue] = useState("");
  const [status, setStatus] = useState("START");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (kiosk?.id) {
      const newQuestions = kiosk?.options?.map((o) => {
        return { ...o, answer: "" };
      });
      setQuestions(newQuestions);
      setCurrentQuestion(newQuestions[0]);
      setCurrentStep(0);
    }
  }, [kiosk]);

  useEffect(() => {}, [currentValue]);

  const handleNextStep = () => {
    setCurrentQuestion(questions[currentStep + 1]);
    setCurrentStep(currentStep + 1);
    setCurrentValue(
      questions[currentStep + 1]?.answer
        ? questions[currentStep + 1].answer
        : ""
    );
  };

  const handlePrevStep = () => {
    setCurrentQuestion(questions[currentStep - 1]);
    setCurrentStep(currentStep - 1);
    setCurrentValue(
      questions[currentStep - 1]?.answer
        ? questions[currentStep - 1].answer
        : ""
    );
  };

  const handleInputChange = (e) => {
    setQuestions(
      questions.map((q) =>
        q.id !== currentQuestion.id ? q : { ...q, answer: e.target.value }
      )
    );
    setCurrentValue(e.target.value);
    if (!flag) {
      setFlag(true);
    }
  };

  const handleRatingClick = (item) => {
    setQuestions(
      questions.map((q) =>
        q.id !== currentQuestion.id ? q : { ...q, answer: item }
      )
    );
    if (!flag) {
      setFlag(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmSubmit = confirm(
      "Are you sure you want to submit the survey?"
    );
    if (!confirmSubmit) {
      return;
    }
    console.log(questions);
    setStatus("COMPLETED");
    setTimeout(() => {
      setStatus("START");
    }, 5000);
  };

  if (status === "START") {
    return <Welcome setStatus={setStatus} />;
  }

  if (status === "COMPLETED") {
    return <Thankyou />;
  }

  return (
    <div className="flex flex-col m-auto h-[80%] w-[80%] md:h-[70%] md:w-[70%] lg:min-h-[60%] lg:w-[60%]">
      <div className="text-center p-3 my-3">
        <p className="text-3xl ">{kiosk.name}</p>
      </div>
      <div className="flex flex-row-reverse">
        <div className="m-2 px-4 py-2 text-md">
          {currentStep + 1} / {questions?.length}
        </div>
      </div>
      <div className="grow text-center p-4">
        <p className="text-xl my-3">{currentQuestion.question}</p>
        {currentQuestion.type === "rating" ? (
          <Rating
            question={currentQuestion}
            handleRatingClick={handleRatingClick}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
          />
        ) : currentQuestion.type === "text" ? (
          <Input
            question={currentQuestion}
            handleInputChange={handleInputChange}
            currentValue={currentValue}
          />
        ) : null}
      </div>

      <div className="flex justify-between my-2">
        <div className="text-center px-4 py-2 m-2">
          <Button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            type="button"
          >
            Prev
          </Button>
        </div>
        {flag && (
          <div className="text-center px-4 py-2 m-2">
            <Button type="submit" onClick={handleSubmit}>
              Complete
            </Button>
          </div>
        )}
        <div className="text-center px-4 py-2 m-2">
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={questions?.length - 1 === currentStep}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
