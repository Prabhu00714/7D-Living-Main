/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../TopBar";
import CategoryGroup from "./CategoryGroup";
import { Button } from "@mui/material";
import Category from "./Category";
import Questions from "./Questions";
import SubCategory from "./SubCategory";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const initialState = {
  next: 0,
  previous: 0,
  modelType: "categorygroup",
  commonType: "subcategory",
  categoryGroupNumber: 1,
  categoryNumber: 0,
  categoryIds: [],
  eachCategoryIds: [],
  subCategoryNumber: 0,
  subCategoryIds: [],
  eachSubCategoryIds: [],
  questionIds: [],
  categoryGroupLength: 0,
  categoryLength: 0,
  subCategoryLength: 0,
  questionNumber: 0,
  eachQuestionIds: [],
  lastQuestion: false,
  activePrevious: false,
  activeFinish: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_next":
      return { ...state, next: action.payload };
    case "set_previous":
      return { ...state, previous: action.payload };
    case "set_model_type":
      return { ...state, modelType: action.payload };
    case "set_common_type":
      return { ...state, commonType: action.payload };
    case "set_categorygroup_number":
      return { ...state, categoryGroupNumber: action.payload };
    case "set_category_number":
      return { ...state, categoryNumber: action.payload };
    case "set_category_ids":
      return { ...state, categoryIds: action.payload };
    case "set_each_category_ids":
      return { ...state, eachCategoryIds: action.payload };
    case "set_subcategory_number":
      return { ...state, subCategoryNumber: action.payload };
    case "set_subcategory_ids":
      return { ...state, subCategoryIds: action.payload };
    case "set_each_subcategory_ids":
      return { ...state, eachSubCategoryIds: action.payload };
    case "set_question_ids":
      return { ...state, questionIds: action.payload };
    case "set_each_question_ids":
      return { ...state, eachQuestionIds: action.payload };
    case "set_categorygroup_length":
      return { ...state, categoryGroupLength: action.payload };
    case "set_last_question":
      return { ...state, lastQuestion: action.payload };
    case "set_category_length":
      return { ...state, categoryLength: action.payload };
    case "set_subcategory_length":
      return { ...state, subCategoryLength: action.payload };
    case "set_question_number":
      return { ...state, questionNumber: action.payload };
    case "set_active_previous":
      return { ...state, activePrevious: action.payload };
    case "set_active_finish":
      return { ...state, activeFinish: action.payload };
    default:
      return state;
  }
};

const Test = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categoryGroupsLength, setCategoryGroupsLength] = useState(null);

  useEffect(() => {
    const fetchCategoryGroupsLength = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/get/categorygroup/length"
        );
        const categoryGroupLength = response.data.length;

        // Update state after fetching length
        setCategoryGroupsLength(categoryGroupLength);
      } catch (error) {
        console.error("Error fetching categoryGroups length:", error);
      }
    };

    fetchCategoryGroupsLength(); // Call the function when the component mounts
  }, []);

  const handleNext = () => {
    switch (state.modelType) {
      case "categorygroup":
        // Update modelType to "category"
        dispatch({ type: "set_model_type", payload: "category" });

        if (state.categoryNumber === 0) {
          dispatch({
            type: "set_category_number",
            payload: state.categoryNumber + 1,
          });
          dispatch({
            type: "set_each_category_ids",
            payload: state.categoryIds[state.categoryNumber],
          });
        }
        break;
      case "category":
        if (state.commonType === "subcategory") {
          // Update modelType to "subcategory"
          dispatch({ type: "set_model_type", payload: "subcategory" });

          if (state.subCategoryNumber === 0) {
            dispatch({
              type: "set_subcategory_number",
              payload: state.subCategoryNumber + 1,
            });
            dispatch({
              type: "set_each_subcategory_ids",
              payload: state.subCategoryIds[state.subCategoryNumber],
            });
          }
        } else {
          // Update modelType to "questions"
          dispatch({ type: "set_model_type", payload: "questions" });
        }

        if (state.categoryNumber <= state.categoryLength) {
          dispatch({
            type: "set_category_number",
            payload: state.categoryNumber + 1,
          });
          dispatch({
            type: "set_each_category_ids",
            payload: state.categoryIds[state.categoryNumber],
          });
        }
        break;
      case "subcategory":
        if (state.commonType === "subcategory") {
          // Update modelType to "questions"
          dispatch({ type: "set_model_type", payload: "questions" });
          dispatch({ type: "set_common_type", payload: "questions" });
        }

        if (state.subCategoryNumber <= state.subCategoryLength) {
          dispatch({
            type: "set_subcategory_number",
            payload: state.subCategoryNumber + 1,
          });
          dispatch({
            type: "set_each_subcategory_ids",
            payload: state.subCategoryIds[state.subCategoryNumber],
          });
        }
        break;
      case "questions":
        if (
          state.subCategoryNumber &&
          state.subCategoryNumber <= state.subCategoryLength
        ) {
          // Update modelType to "subcategory"
          dispatch({ type: "set_model_type", payload: "subcategory" });
          dispatch({ type: "set_common_type", payload: "subcategory" });
        } else if (
          state.categoryNumber &&
          state.categoryNumber <= state.categoryLength
        ) {
          // Update modelType to "category"
          dispatch({ type: "set_model_type", payload: "category" });
        } else if (
          state.categoryGroupNumber &&
          state.categoryGroupNumber < categoryGroupsLength
        ) {
          dispatch({
            type: "set_category_number",
            payload: 0,
          });
          dispatch({
            type: "set_subcategory_number",
            payload: 0,
          });
          dispatch({
            type: "set_categorygroup_number",
            payload: state.categoryGroupNumber + 1,
          });
          // Update modelType to "categorygroup"
          dispatch({ type: "set_model_type", payload: "categorygroup" });
        } else {
          toast.info("This is the last one!");
          // Set last question to true
          dispatch({ type: "set_last_question", payload: true });
        }
        break;
      default:
        throw new Error("Invalid category action");
    }

    if (!state.activePrevious) {
      dispatch({ type: "set_active_previous", payload: true });
    }
  };

  useEffect(() => {
    if (state.lastQuestion) {
      dispatch({
        type: "set_active_finish",
        payload: true,
      });
    }
  }, [state.lastQuestion]);

  const handlePrevious = () => {
    switch (state.modelType) {
      case "categorygroup":
        // categorygroup
        break;
      case "category":
        // category
        break;
      case "subcategory":
        // subcategory
        break;
      case "questions":
        // questions
        break;
      default:
        throw new Error("Invalid category action");
    }
  };

  const HandleFinish = () => {
    navigate("/user");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <TopBar />
      {state.modelType === "categorygroup" && (
        <CategoryGroup state={state} dispatch={dispatch} />
      )}
      {state.modelType === "category" && (
        <Category state={state} dispatch={dispatch} />
      )}
      {state.modelType === "subcategory" &&
        state.commonType === "subcategory" && (
          <SubCategory state={state} dispatch={dispatch} />
        )}
      {state.modelType === "questions" && state.commonType === "questions" && (
        <Questions state={state} dispatch={dispatch} />
      )}
      {/* <div
        style={{
          position: "absolute",
          top: "85%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={!state.activePrevious}
        >
          Back
        </Button>
      </div> */}
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "80%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Button
          onClick={!state.activeFinish ? handleNext : HandleFinish}
          variant="outlined"
        >
          {state.activeFinish ? "Finish" : "Next"}
        </Button>
      </div>
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default Test;
