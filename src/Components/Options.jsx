import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "react-hook-form";
const Options = ({ questionId }) => {
  const [options, setOptions] = useState([]);
  // get options
  const getOptions = async () => {
    try {
      const response = await axios.get(
        `https://apis.thebigdataafrica.com/api/v1/questions/get-options-by-question/${questionId}`
      );
      const data = await response.data;
      setOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (questionId) {
      getOptions();
    }
  }, [questionId]);
  //   console.log("options are", options);
  return (
    <div>
      {options?.map((option) => {
        const { _id, name, type } = option;

        const getInputType = () => {
          switch (type) {
            case "Checkbox":
              return "checkbox";
            case "Textfield":
              return "text";
            case "Radio":
              return "radio";
            default:
              return "";
          }
        };
        return (
          <form action="">
            <ul
              className={
                getInputType() === "text"
                  ? "flex flex-col space-y-2"
                  : "flex space-x-2 items-center"
              }
            >
              <input
                className="p-2 border rounded-md outline-none"
                type={getInputType()}
              />
              <li>{name}</li>
            </ul>
          </form>
        );
      })}
    </div>
  );
};

export default Options;
