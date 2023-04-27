const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = Math.round(
    (currentStep / totalSteps) * 100
  ); /**round off to the nearest interger */

  return (
    <div>
      <p>Question ({`${currentStep} of ${totalSteps}`})</p>
      <div className="w-full  bg-gray-200 rounded-full">
        <div
          className="h-4 bg-orange-400 rounded-full "
          style={{ width: `${progress}%` }}
          //   className={`h-4 bg-blue-500 rounded-full w-[${progress}%]`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
