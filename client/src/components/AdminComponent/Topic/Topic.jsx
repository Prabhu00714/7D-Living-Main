/* eslint-disable no-unused-vars */
import React, { useReducer, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import TopicTools from "./TopicTools";
import AddEditTopicModal from "./AddEditTopicModal";
import TopicList from "./TopicList";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
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
  topicList: [],
  topicModal: false,
  topicAction: "add",
  selectedTopicItem: null,
  topicRefreshFlag: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_topic_list":
      return { ...state, topicList: action.payload };
    case "set_topic_modal":
      return { ...state, topicModal: action.payload };
    case "set_topic_action":
      return { ...state, topicAction: action.payload };
    case "set_selected_topic_item":
      return { ...state, selectedTopicItem: action.payload };
    case "set_topic_refresh_flag":
      return { ...state, topicRefreshFlag: action.payload };
    default:
      return state;
  }
};

const Topic = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const fileInputRef = useRef(null); // Create a ref for questionImage input
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddItem = (data) => {
    if (data === "topic") {
      dispatch({
        type: "set_topic_refresh_flag",
        payload: !state.topicRefreshFlag,
      });
    }
  };

  const containerStyle = {
    marginLeft: isMobile ? 12 : 350,
    transition: "margin 0.5s",
    display: "flex",
    marginTop: 75,
  };

  return (
    <div style={containerStyle}>
      {/* Paper 1 */}
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h6">Result Topic</Typography>
        <DemoPaper square={false} elevation={12}>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <TopicList state={state} dispatch={dispatch} />
          </PerfectScrollbar>
        </DemoPaper>
        <TopicTools
          state={state}
          dispatch={dispatch}
          isMobile={isMobile}
          onAddItem={handleAddItem}
        />
      </Stack>
      <AddEditTopicModal
        state={state}
        dispatch={dispatch}
        onAddItem={handleAddItem}
        isMobile={isMobile}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default Topic;
