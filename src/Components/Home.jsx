import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const Home = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [surveyDetails, setSurveyDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //   show survey form
  const showSurveyForm = (survey) => {
    setSurveyDetails(true);
    // console.log(survey);
    setDescription(survey.description);
    setSurveyTitle(survey.title);
    setQuestions(survey.questions);
    setTotalSteps(survey.questions.length - 1);
  };
  // console.log("totalSteps are", totalSteps);
  // console.log("questions are", questions);

  //   handle next question
  const handleNextQuestion = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  //   handle prvious question
  const handlePrevQuestion = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  // Move to next question

  // Render the current question
  const currentQuestion = questions[currentQuestionIndex];
  console.log("currentQuestion is", currentQuestion);
  // currentStep === totalSteps;
  let questionElement = (
    <form className="py-4">
      <p>{currentQuestion?.name}</p>
      {currentQuestion?.options?.map((option, index) => {
        console.log("option is", option);
        return (
          <div key={index} className=" space-x-3">
            <input type="radio" />
            <label>{option}</label>
          </div>
        );
      })}
    </form>
  );
  // if (currentQuestion?.options) {
  //   questionElement = (
  //     <form className="py-4">
  //       <p>{currentQuestion?.name}</p>
  //       {currentQuestion?.options?.map((option, index) => {
  //         console.log("option is", option);
  //         return (
  //           <div key={index} className=" space-x-3">
  //             <input type="radio" />
  //             <label>{option}</label>
  //           </div>
  //         );
  //       })}
  //     </form>
  //   );
  // } else {
  //   questionElement = (
  //     <form>
  //       <p>{currentQuestion?.name}</p>
  //       <input type="checkbox" />
  //     </form>
  //   );
  // }

  return (
    <div className="h-screen   bg-ourGreen   text-white  w-full">
      <div className="w-mobile md:w-pc mx-auto py-20 space-y-5">
        <div>
          <h2 className="text-4xl font-bold">Pick your favourite survey</h2>
          <p>Click on the survey below to proceed</p>
        </div>
        <ul>
          {surveys?.map((survey, index) => {
            const { title, description, questions } = survey;
            return (
              <li
                key={index}
                // className="flex items-center space-x-2 border-b py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
                className=" border-b py-2 flex justify-between items-center"
              >
                <p className="flex  space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6  text-[#f09975]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                  <span>{title}</span>
                </p>
                <p
                  onClick={() => showSurveyForm(survey)}
                  className="px-2 bg-[#f09975] hover:bg-[#f09a75e1] cursor-pointer text-gray-100 rounded-full"
                >
                  start survey
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={
          surveyDetails
            ? "  transform -translate-y-[0px] transition ease-in-out duration-300 fixed  bg-[#80808091] h-screen top-0 w-full flex justify-center items-center"
            : "  transform -translate-y-[1000px] transition ease-in-out duration-300 fixed  bg-[#80808091] h-screen top-0 w-full flex justify-center items-center"
        }
      >
        {/* <div className=""> */}
        <div className="bg-white text-black md:w-[50%]  w-mobile space-y-5 p-3 rounded-md  ">
          <div className="flex justify-between border-b py-3">
            <div>
              <h2 className="text-lg font-bold">
                {" "}
                <span className="text-gray-400 ">Title:</span> {surveyTitle}
              </h2>
              <h2>
                {" "}
                <span className="text-gray-400">Description:</span>{" "}
                {description}
              </h2>
            </div>
            <p
              onClick={() => setSurveyDetails(false)}
              className="w-9 h-9  cursor-pointer hover:bg-red-400 hover:text-white flex justify-center items-center rounded-full bg-gray-100 "
            >
              X
            </p>
          </div>
          <ProgressBar
            // isSurveyComplete={isSurveyComplete}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
          <div>
            <div>
              {/* <p> {currentQuestion?.name}</p> */}
              <p> {questionElement}</p>
            </div>

            <div className="flex justify-end space-x-5 border-t pt-2">
              <button
                onClick={handlePrevQuestion}
                disabled={currentStep === 0 ? true : false}
                // className="flex space-x-2 items-center px-3 py-2 rounded-md bg-gray-200  text-black"
                className={
                  currentStep === 0
                    ? "flex items-center space-x-2 px-6 py-2 rounded-md bg-gray-200 opacity-20 text-black cursor-not-allowed"
                    : "flex items-center space-x-2 px-6 py-2 rounded-md bg-gray-200  text-black"
                }
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
                // className=" flex items-center space-x-2 px-6 py-2 rounded-md bg-green-700 text-white"
                className={
                  currentStep === totalSteps
                    ? "flex items-center space-x-2 px-6 py-2 rounded-md bg-green-700 opacity-60 text-black cursor-not-allowed"
                    : "flex items-center space-x-2 px-6 py-2 rounded-md bg-green-700  text-white"
                }
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
        </div>
      </div>
    </div>
  );
};

export default Home;

// const surveys = [1, 2, 3, 4, 5];

const surveys = [
  {
    title: "Satisfaction survey",
    description: "This survey is to determine the level of satisfaction",
    questions: [
      {
        name: "Please rate your overall satisfaction about the service provided",
        options: [
          "Not satisfied",
          "Quite satisfied",
          "Satisfied",
          "Completely satisfied",
        ],
      },
      {
        name: "How did you hear about how company",
        options: ["Facebook", "A friend", "Newspaper", "Twitter"],
      },
      {
        name: "Would you refer somebody to our company",
        options: ["No", "Maybe", "100% sure"],
      },
      {
        name: "What did you dislike about our company",
        options: ["Nothing", "choose not to answer"],
      },
    ],
  },
  {
    title: "Election survey(president)",
    description:
      "This survey is meant who determine who your preferred candidate is",
    questions: [
      {
        name: "Who is your preffered president",
        options: ["Ruto", "Wajackoya", "Raila", "choose not to answer"],
      },
      {
        name: "Why did you choose Wajackoya",
        options: [
          "I just love him",
          "I reasonate with him",
          "choose not to answer",
        ],
      },
      {
        name: "What do you expect him to acheive",
        options: ["Lower cost of living", "Legalize bhang"],
      },
      {
        name: "What is your age",
        options: ["0-18", "18-35", "35-60", "Above 60"],
      },
      {
        name: "Do you smoke bhang",
        options: ["No", "Definately", "Very much", "choose not to answer"],
      },
      {
        name: "Are you planning to  smoke bhang",
        options: ["Not sure", "No", "Yes", "choose not to answer"],
      },
    ],
  },
];
