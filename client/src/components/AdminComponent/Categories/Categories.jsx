import React, { useReducer } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CategoryGroup from "./Category Group/CategoryGroup";
import Category from "./Category/Category";
import CategoryGroupList from "./Category Group/CategoryGroupList";
import CategoryList from "./Category/CategoryList";
import AddEditCategoryModal from "./AddEditCategoryModal";
import SubCategoryList from "./SubCategory/SubCategoryList";
import SubCategory from "./SubCategory/SubCategory";
import QuestionsList from "./Questions/QuestionsList";
import Questions from "./Questions/Questions";
import AddQuestionsModal from "./AddQuestionsModal";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

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

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 210,
  height: 300,
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

const Categories = () => {
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
        <Typography variant="h6">Category Group</Typography>
        <DemoPaper square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <CategoryGroupList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper>
        <CategoryGroup state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 2 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Category</Typography>
        <DemoPaper square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <CategoryList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper>
        <Category state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 3 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Sub Category</Typography>
        <DemoPaper square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <SubCategoryList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper>
        <SubCategory state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 4 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Questions</Typography>
        <DemoPaper square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <QuestionsList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper>
        <Questions state={state} dispatch={dispatch} />
      </Stack>
      <AddEditCategoryModal
        state={state}
        dispatch={dispatch}
        onAddItem={handleAddItem}
      />
      <AddQuestionsModal state={state} dispatch={dispatch} />
    </div>
  );
};

export default Categories;
