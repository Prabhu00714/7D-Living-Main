import React, { useReducer } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddCategoriesModal from "./Categories/Category Group/AddCategoriesModal";
import CategoryGroup from "./Categories/Category Group/CategoryGroup";
import Category from "./Categories/Category/category";
import CategoryGroupList from "./Categories/Category Group/CategoryGroupList";
import CategoryList from "./Categories/Category/CategoryList";

const initialState = {
  categoriesModal: false,
  action: "add",
  selectedItem: null,
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
    case "categories_modal_open":
      return { ...state, categoriesModal: action.payload };
    case "categories_modal_close":
      return { ...state, categoriesModal: action.payload };
    case "set_selected_item":
      return { ...state, selectedItem: action.payload };
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
      <AddCategoriesModal state={state} dispatch={dispatch} />
    </div>
  );
};

export default Categories;
