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

const initialState = {
  categoryModal: false,
  categoryAction: "add",
  selectedCategoryGroupItem: null,
  selectedCategoryItem: null,
  selectedSubCategoryItem: null,
  questionModal: false,
  selectedQuestionItem: null,
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
    default:
      return state;
  }
};

const Categories = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [state, dispatch] = useReducer(reducer, initialState);

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
          <CategoryGroupList state={state} dispatch={dispatch} />
        </DemoPaper>
        <CategoryGroup state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 2 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Category</Typography>
        <DemoPaper square={false} elevation={12}>
          <CategoryList state={state} dispatch={dispatch} />
        </DemoPaper>
        <Category state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 3 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Sub Category</Typography>
        <DemoPaper square={false} elevation={12}>
          <SubCategoryList state={state} dispatch={dispatch} />
        </DemoPaper>
        <SubCategory state={state} dispatch={dispatch} />
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 4 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Questions</Typography>
        <DemoPaper square={false} elevation={12}>
          <QuestionsList state={state} dispatch={dispatch} />
        </DemoPaper>
        <Questions state={state} dispatch={dispatch} />
      </Stack>
      <AddEditCategoryModal state={state} dispatch={dispatch} />
      <AddQuestionsModal state={state} dispatch={dispatch} />
    </div>
  );
};

export default Categories;
