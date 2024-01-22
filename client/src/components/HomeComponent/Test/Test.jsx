import React, { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import TopBar from "../TopBar";
import CategoryGroup from "./CategoryGroup";
import { Button } from "@mui/material";
import Category from "./Category";
import Questions from "./Questions";
import SubCategory from "./SubCategory";

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
  subCategoryLength: 0,
  questionNumber: 0,
  eachQuestionIds: [],
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNext = () => {
    switch (state.modelType) {
      case "categorygroup":
        dispatch({
          type: "set_model_type",
          payload: "category", // Update modelType to "category"
        });

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
          dispatch({
            type: "set_model_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });
          dispatch({
            type: "set_model_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });

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
          dispatch({
            type: "set_model_type",
            payload: "questions", // Update modelType to "questions"
          });
        }

        if (state.categoryNumber <= state.categoryGroupLength) {
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
          dispatch({
            type: "set_model_type",
            payload: "questions", // Update modelType to "questions"
          });
          dispatch({
            type: "set_common_type",
            payload: "questions", // Update modelType to "questions"
          });
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
        if (state.categoryNumber > state.categoryGroupLength) {
          dispatch({
            type: "set_categorygroup_number",
            payload: state.categoryGroupNumber + 1,
          });
          dispatch({
            type: "set_model_type",
            payload: "categorygroup", // Update modelType to "category"
          });
        } else if (state.subCategoryNumber <= state.subCategoryLength) {
          dispatch({
            type: "set_model_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });
          dispatch({
            type: "set_common_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });
        } else if (state.categoryNumber <= state.categoryGroupLength) {
          dispatch({
            type: "set_model_type",
            payload: "category", // Update modelType to "category"
          });
        }
        dispatch({
          type: "set_question_number",
          payload: state.questionNumber + 1,
        });
        break;
      default:
        throw new Error("Invalid category action");
    }

    if (!state.activePrevious) {
      dispatch({
        type: "set_active_previous",
        payload: true,
      });
    }
  };

  const handlePrevious = () => {
    switch (state.modelType) {
      case "categorygroup":
        if (state.activePrevious) {
          dispatch({
            type: "set_active_previous",
            payload: false,
          });
        }
        break;
      case "category":
        dispatch({
          type: "set_model_type",
          payload: "categorygroup", // Update modelType to "categorygroup"
        });

        if (state.categoryNumber !== 0) {
          dispatch({
            type: "set_category_number",
            payload: state.categoryNumber - 1,
          });
          dispatch({
            type: "set_each_category_ids",
            payload: state.categoryIds[state.categoryNumber],
          });
        }
        break;
      case "subcategory":
        dispatch({
          type: "set_model_type",
          payload: "questions", // Update modelType to "questions"
        });

        if (state.subCategoryNumber < state.categoryLength) {
          dispatch({
            type: "set_subcategory_ids",
            payload: state.subCategoryIds[state.subCategoryNumber],
          });
        }
        break;
      case "questions":
        if (state.commonType === "subcategory") {
          dispatch({
            type: "set_model_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });
          dispatch({
            type: "set_model_type",
            payload: "subcategory", // Update modelType to "subcategory"
          });
        } else {
          if (state.categoryNumber <= state.categoryGroupLength) {
            dispatch({
              type: "set_category_number",
              payload: state.categoryNumber - 3,
            });
            dispatch({
              type: "set_each_category_ids",
              payload: state.categoryIds[state.categoryNumber],
            });
          }

          dispatch({
            type: "set_model_type",
            payload: "category", // Update modelType to "category"
          });
        }
        dispatch({
          type: "set_question_number",
          payload: state.questionNumber - 1,
        });
        break;
      default:
        throw new Error("Invalid category action");
    }
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
        <Button onClick={handleNext} variant="outlined">
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default Test;
