/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import CategoryList from "./Category/CategoryList";
import AddQuestionsList from "./Questions/AddQuestionsList";
import Questions from "./Questions/Questions";
import AddEditQuestionsModal from "./AddEditQuestionsModal";
import QuestionsList from "./Questions/QuestionsList";

const DemoPaper1 = styled(Paper)(({ theme }) => ({
  width: 220,
  height: 340,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  "& > div": {
    maxHeight: "100%",
    overflowY: "auto",
    paddingRight: theme.spacing(1),
  },
}));

const DemoPaper2 = styled(Paper)(({ theme, isMobile }) => ({
  width: isMobile ? 300 : 700, // Set width to 100% on mobile
  height: 340,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  "& > div": {
    maxHeight: "100%",
    overflowY: "auto",
    paddingRight: theme.spacing(1),
  },
}));

const initialState = {
  categoryModal: false,
  categoryAction: "add",
  selectedCategoryGroupItem: null,
  selectedCategoryItem: null,
  selectedSubCategoryItem: null,
  questionModal: false,
  selectedQuestionItem: null,
  modelType: null,
  modelName: null,
  categoryGroupRefreshFlag: false,
  categoryRefreshFlag: false,
  subCategoryRefreshFlag: false,
  questionsRefreshFlag: false,
  questions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_category_modal":
      return { ...state, categoryModal: action.payload };
    case "set_category_action":
      return { ...state, categoryAction: action.payload };
    case "set_selected_categorygroup_item":
      return { ...state, selectedCategoryGroupItem: action.payload };
    case "set_selected_category_item":
      return { ...state, selectedCategoryItem: action.payload };
    case "set_selected_subcategory_item":
      return { ...state, selectedSubCategoryItem: action.payload };
    case "set_question_modal":
      return { ...state, questionModal: action.payload };
    case "set_selected_question_item":
      return { ...state, selectedQuestionItem: action.payload };
    case "set_model_type":
      return { ...state, modelType: action.payload };
    case "set_model_name":
      return { ...state, modelName: action.payload };
    case "set_categorygroup_refresh_flag":
      return { ...state, categoryGroupRefreshFlag: action.payload };
    case "set_category_refresh_flag":
      return { ...state, categoryRefreshFlag: action.payload };
    case "set_subCategory_refresh_flag":
      return { ...state, subCategoryRefreshFlag: action.payload };
    case "set_questions_refresh_flag":
      return { ...state, questionsRefreshFlag: action.payload };
    case "set_questions":
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

const QaEditor = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddItem = (data) => {
    console.log("refresh", data);
    switch (data) {
      case "categoryGroup":
        dispatch({
          type: "set_categorygroup_refresh_flag",
          payload: !state.categoryGroupRefreshFlag,
        });
        break;
      case "category":
        dispatch({
          type: "set_category_refresh_flag",
          payload: !state.categoryRefreshFlag,
        });
        break;
      case "subCategory":
        dispatch({
          type: "set_subCategory_refresh_flag",
          payload: !state.subCategoryRefreshFlag,
        });
        break;
      case "questions":
        dispatch({
          type: "set_questions_refresh_flag",
          payload: !state.questionsRefreshFlag,
        });
        break;
      default:
        throw new Error("Invalid category action");
    }
  };

  const containerStyle = {
    marginLeft: isMobile ? 10 : 230,
    transition: "margin 0.5s",
    display: "flex",
    marginTop: 75,
  };

  return (
    <div style={containerStyle}>
      {/* Paper 1 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Category</Typography>
        <DemoPaper1 square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <CategoryList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper1>
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 2 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Question - Answer</Typography>
        <DemoPaper2 isMobile={isMobile} square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <QuestionsList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper2>
        <Questions
          state={state}
          dispatch={dispatch}
          isMobile={isMobile}
          onAddItem={handleAddItem}
        />
      </Stack>
      {isMobile && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
      <AddEditQuestionsModal
        state={state}
        dispatch={dispatch}
        onAddItem={handleAddItem}
        isMobile={isMobile}
      />
    </div>
  );
};

export default QaEditor;
