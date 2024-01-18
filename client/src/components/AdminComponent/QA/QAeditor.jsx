import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

// Styled component for Paper 1
const DemoPaper1 = styled(Paper)(({ theme }) => ({
  width: 220,
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

// Styled component for Paper 2
const DemoPaper2 = styled(Paper)(({ theme }) => ({
  width: 700,
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

const QAeditor = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

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
            {/* <CategoryGroupList state={state} dispatch={dispatch} /> */}
          </PerfectScrollbar>
        </DemoPaper1>
        {/* <CategoryGroup state={state} dispatch={dispatch} /> */}
      </Stack>
      &nbsp;&nbsp;&nbsp;
      {/* Paper 2 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Question - Answer</Typography>
        <DemoPaper2 square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            {/* <CategoryList state={state} dispatch={dispatch} /> */}
          </PerfectScrollbar>
        </DemoPaper2>
        {/* <Category state={state} dispatch={dispatch} /> */}
      </Stack>
      {/* <AddEditCategoryModal
        state={state}
        dispatch={dispatch}
        onAddItem={handleAddItem}
      />
      <AddQuestionsModal state={state} dispatch={dispatch} /> */}
    </div>
  );
};

export default QAeditor;
