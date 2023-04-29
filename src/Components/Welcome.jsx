import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Survey from "./Survey";
const Welcome = () => {
  const userId = localStorage.getItem("userId");
  console.log("userId is ", userId);
  // initialize react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const [survey, setSurvey] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isSurveyFormOpen, setIsSurveyFormOpen] = useState(false);
  // Get surveys
  const getSurvey = async () => {
    try {
      const response = await axios.get(
        "https://apis.thebigdataafrica.com/api/v1/surveys/637fd0232dbe39e8ca6d7b6d"
      );
      const data = await response.data;
      setSurvey(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSurvey();
  }, []);
  //   console.log(survey);
  //   handle surveyee submit
  const onSubmit = async (data) => {
    const { firstname, lastname, email, phone } = data;
    // console.log("Name is", name);
    setButtonLoading(true);
    // create surveyee
    const body = {
      name: `${firstname} ${lastname}`,
      email,
      phone,
    };
    try {
      const response = await axios.post(
        "https://apis.thebigdataafrica.com/api/v1/surveyee/create",
        body
      );
      const data = response.data;
      if (data) {
        setButtonLoading(false);
        localStorage.setItem("userId", data.surveyee._id);
        toast.success("User details succesfully submitted");
      }
      console.log("Response data is", data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setButtonLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full  bg-ourGreen  py-20    w-full">
      <div className="w-mobile md:w-pc mx-auto rounded-md p-5 space-y-10 bg-white  ">
        <div>
          <h2 className="text-4xl font-bold text-ourOrange">{survey?.title}</h2>
          <p className="text-black">{survey?.description}</p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              userId == null
                ? "bg-gray-50 text-black p-2   rounded-md space-y-4"
                : "hidden"
            }
          >
            <p className="font-bold text-lg">
              Kindly fill the form below to proceed.{" "}
            </p>
            <div>
              <p>Firstname</p>
              <input
                type="text"
                placeholder="John"
                className="p-2 border w-full rounded outline-none"
                {...register("firstname", {
                  required: "Firstname is required!",
                })}
              />
              <p className="text-red">{errors?.firstname?.message}</p>
            </div>
            <div>
              <p>Lastname</p>
              <input
                type="text"
                placeholder="Doe"
                className="p-2 border w-full rounded outline-none"
                {...register("lastname", {
                  required: "Lastname is required!",
                })}
              />
              <p className="text-red">{errors?.lastname?.message}</p>
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="p-2 border w-full rounded outline-none"
                {...register("email", {
                  required: "Email is required!",
                })}
              />
              <p className="text-red">{errors?.email?.message}</p>
            </div>
            <div>
              <p>Phone</p>
              <input
                type="numbers"
                placeholder="07 12 345***"
                className="p-2 border w-full rounded outline-none"
              />
            </div>
            <div>
              <button
                disabled={buttonLoading ? true : false}
                className={`px-10 py-3  bg-ourOrange text-gray-100 rounded-full ${
                  buttonLoading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center space-x-4">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"></div>
                    <div>Please wait</div>
                  </div>
                ) : (
                  <div className="">Submit</div>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className={userId == null ? "hidden" : "space-y-3"}>
          <h2 className="">You can now start the servey</h2>

          <button
            onClick={() => {
              setIsSurveyFormOpen(true);
            }}
            className="bg-ourOrange px-5 py-3 rounded-full text-white text-lg"
          >
            Start survey
          </button>
        </div>
      </div>
      <div
        className={` flex justify-center items-center transform  transition ease-in-out duration-300 fixed  bg-[#80808091] h-screen top-0 w-full ${
          isSurveyFormOpen ? "-translate-y-0" : "-translate-y-[1000px]"
        } `}
      >
        <p
          onClick={() => {
            setIsSurveyFormOpen(false);
          }}
          className="absolute top-12 right-10 w-12 h-12 bg-gray-200 text-black text-lg cursor-pointer flex justify-center items-center rounded-full"
        >
          X
        </p>
        <Survey surveyId={survey?._id} />
      </div>
    </div>
  );
};

export default Welcome;
