const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = Math.round(
    (currentStep / totalSteps) * 100
  ); /**round off to the nearest interger */

  return (
    <div>
      <p>Question {`${currentStep} / ${totalSteps}`}</p>
      <div className="w-full  bg-gray-200 rounded-full">
        <div
          className="h-4 bg-orange-400 rounded-full "
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
