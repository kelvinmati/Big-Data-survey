import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import Options from "./Options";

const Survey = ({ surveyId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  //  total steps
  useEffect(() => {
    if (questions) {
      setTotalSteps(questions?.length - 1);
    }
  }, [questions]);
  // console.log("totalSteps are", totalSteps);
  // get questions
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        `https://apis.thebigdataafrica.com/api/v1/surveys/get-questions-by-survey/${surveyId}`
      );
      const data = response.data;
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestions();
  }, [surveyId]);

  // handle  next question
  const handleNextQuestion = () => {
    // if (currentStep < totalSteps && !isSurveyComplete) {
    //   setCurrentStep((prevStep) => prevStep + 1);
    //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // }
    setCurrentStep((prevStep) => prevStep + 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  //   handle previous question
  const handlePrevQuestion = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  // Render the current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white p-2 rounded-md md:w-1/2  w-mobile space-y-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div>
        <h2 className="text-lg">{currentQuestion?.name}</h2>
      </div>
      <Options questionId={currentQuestion?._id} />
      <div className="flex justify-end space-x-5 border-t pt-2">
        <button
          onClick={handlePrevQuestion}
          disabled={currentStep === 0 ? true : false}
          className={`flex space-x-2 items-center px-3 py-2 rounded-md bg-gray-200  text-black ${
            currentStep === 0 && "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Back</span>
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentStep === totalSteps ? true : false}
          className={`flex items-center space-x-2 px-6 py-2 rounded-md bg-green-700 text-white ${
            currentStep === totalSteps && "opacity-30 cursor-not-allowed"
          }`}
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Survey;
