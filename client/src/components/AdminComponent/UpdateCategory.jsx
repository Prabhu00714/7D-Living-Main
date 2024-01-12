import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";

const UpdateCategory = ({ categoryId }) => {
  const fileInputRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const containerStyle = {
    marginLeft: isMobile ? 0 : 400,
    transition: "margin 0.5s",
    position: "absolute",
    top: 80,
  };

  const [category, setCategory] = useState({
    _id: "",
    category: "",
    questions: [
      {
        questionid: "",
        questionnumber: 1,
        questiontext: "",
        answers: [
          {
            answerid: "",
            answer: "",
            results: [{ result: "", value: "" }],
          },
        ],
        image: "",
      },
    ],
  });

  useEffect(() => {
    if (categoryId) {
      axios
        .get(
          `http://localhost:3001/api/qna/get/each/category/qna/${categoryId}`
        )
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    }
  }, [categoryId]);

  const handleChange = (field, value, qIndex, aIndex, rIndex) => {
    setCategory((prevCategory) => {
      if (
        qIndex === undefined &&
        aIndex === undefined &&
        rIndex === undefined
      ) {
        return { ...prevCategory, [field]: value };
      } else if (aIndex === undefined && rIndex === undefined) {
        const updatedQuestions = [...prevCategory.questions];
        updatedQuestions[qIndex][field] = value;
        return { ...prevCategory, questions: updatedQuestions };
      } else if (rIndex === undefined) {
        const updatedQuestions = [...prevCategory.questions];
        updatedQuestions[qIndex].answers[aIndex][field] = value;
        return { ...prevCategory, questions: updatedQuestions };
      } else {
        const updatedQuestions = [...prevCategory.questions];
        updatedQuestions[qIndex].answers[aIndex].results[rIndex][field] = value;
        return { ...prevCategory, questions: updatedQuestions };
      }
    });
  };

  const handleAddQuestion = () => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      questions: [
        ...prevCategory.questions,
        {
          questionid: "",
          questionnumber: prevCategory.questions.length + 1,
          questiontext: "",
          answers: [
            {
              answerid: "",
              answer: "",
              results: [{ result: "", value: "" }],
            },
          ],
          image: "",
        },
      ],
    }));
  };

  const handleDeleteQuestion = (qIndex) => {
    setCategory((prevCategory) => {
      const updatedQuestions = [...prevCategory.questions];
      updatedQuestions.splice(qIndex, 1);
      return {
        ...prevCategory,
        questions: updatedQuestions.map((question, index) => ({
          ...question,
          questionnumber: index + 1,
        })),
      };
    });
  };

  const handleAddAnswer = (qIndex) => {
    setCategory((prevCategory) => {
      const updatedQuestions = [...prevCategory.questions];
      updatedQuestions[qIndex].answers.push({
        answerid: "",
        answer: "",
        results: [{ result: "", value: "" }],
      });
      return { ...prevCategory, questions: updatedQuestions };
    });
  };

  const handleDeleteAnswer = (qIndex, aIndex) => {
    setCategory((prevCategory) => {
      const updatedQuestions = [...prevCategory.questions];
      updatedQuestions[qIndex].answers.splice(aIndex, 1);
      return { ...prevCategory, questions: updatedQuestions };
    });
  };

  const handleAddResult = (qIndex, aIndex) => {
    setCategory((prevCategory) => {
      const updatedQuestions = [...prevCategory.questions];
      updatedQuestions[qIndex].answers[aIndex].results.push({
        result: "",
        value: "",
      });
      return { ...prevCategory, questions: updatedQuestions };
    });
  };

  const handleDeleteResult = (qIndex, aIndex, rIndex) => {
    setCategory((prevCategory) => {
      const updatedQuestions = [...prevCategory.questions];
      updatedQuestions[qIndex].answers[aIndex].results.splice(rIndex, 1);
      return { ...prevCategory, questions: updatedQuestions };
    });
  };

  const handleImageUpload = (qIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory((prevCategory) => {
          const updatedQuestions = [...prevCategory.questions];
          updatedQuestions[qIndex].image = reader.result;
          return { ...prevCategory, questions: updatedQuestions };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const isInvalidData = category.questions.some(
        (question) =>
          !question.questiontext.trim() ||
          !question.answers.every(
            (answer) =>
              !!answer.answer.trim() &&
              answer.results.every(
                (result) => !!result.result.trim() && !!result.value.trim()
              )
          )
      );

      if (isInvalidData) {
        toast.error("Please fill in all fields.");
        return;
      }

      const jsonData = {
        categoryId: category._id,
        category: category.category,
        questions: category.questions.map((question) => ({
          questionid: question._id,
          questionnumber: question.questionnumber,
          questiontext: question.questiontext,
          answers: question.answers.map((answer) => ({
            answerid: answer._id,
            answer: answer.answer,
            results: answer.results,
          })),
          image: question.image,
        })),
      };
      console.log("json data", jsonData);

      await axios.post(
        "http://localhost:3001/api/qna/update/each/category/qna",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Data updated successfully!");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      toast.error("Failed to update data!");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/qna/delete/category/qna/${categoryId}`
      );
      toast.success("Category deleted successfully!");
      // Optionally, you can redirect to another page or perform other actions after deletion.
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category!");
    }
  };

  return (
    <div style={containerStyle}>
      <Box>
        {/* Category Input */}
        <Typography variant="h6">Category:</Typography>
        <TextField
          type="text"
          value={category.category}
          onChange={(e) => handleChange("category", e.target.value)}
          size="small"
          fullWidth
          margin="dense"
        />

        {/* Question Section */}
        {category.questions.map((question, qIndex) => (
          <div key={qIndex}>
            {/* Question ID Input */}
            <Typography variant="subtitle1">Question ID:</Typography>
            <TextField
              type="number"
              value={question.questionnumber}
              onChange={(e) =>
                handleChange("questionnumber", e.target.value, qIndex)
              }
              size="small"
              fullWidth
              margin="dense"
            />

            {/* Question Text Input */}
            <Typography variant="subtitle1">Question Text:</Typography>
            <TextField
              type="text"
              value={question.questiontext}
              onChange={(e) =>
                handleChange("questiontext", e.target.value, qIndex)
              }
              size="small"
              fullWidth
              margin="dense"
            />

            {/* Delete Question Button */}
            <Button
              variant="outlined"
              onClick={() => handleDeleteQuestion(qIndex)}
              sx={{ mt: 1, mb: 2 }}
            >
              Delete Question
            </Button>

            {/* Image Upload Input */}
            <Typography variant="subtitle1">Image:</Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(qIndex, e)}
            />

            {/* Add Answer Button */}
            <Button
              variant="outlined"
              onClick={() => handleAddAnswer(qIndex)}
              sx={{ mt: 1, mb: 2 }}
            >
              Add Answer
            </Button>

            {/* Answer Section */}
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex}>
                {/* Answer Input */}
                <Typography variant="subtitle1">Answer:</Typography>
                <TextField
                  type="text"
                  value={answer.answer}
                  onChange={(e) =>
                    handleChange("answer", e.target.value, qIndex, aIndex)
                  }
                  size="small"
                  fullWidth
                  margin="dense"
                />

                {/* Delete Answer Button */}
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteAnswer(qIndex, aIndex)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Delete Answer
                </Button>

                {/* Add Result Button */}
                <Button
                  variant="outlined"
                  onClick={() => handleAddResult(qIndex, aIndex)}
                  sx={{ mt: 1, mb: 2, ml: 2 }}
                >
                  Add Result
                </Button>

                {/* Result Section */}
                {answer.results.map((result, rIndex) => (
                  <div key={rIndex}>
                    {/* Result Input */}
                    <Typography variant="subtitle1">Result:</Typography>
                    <TextField
                      type="text"
                      value={result.result}
                      onChange={(e) =>
                        handleChange(
                          "result",
                          e.target.value,
                          qIndex,
                          aIndex,
                          rIndex
                        )
                      }
                      size="small"
                      fullWidth
                      margin="dense"
                    />

                    {/* Value Input */}
                    <Typography variant="subtitle1">Value:</Typography>
                    <TextField
                      type="text"
                      value={result.value}
                      onChange={(e) =>
                        handleChange(
                          "value",
                          e.target.value,
                          qIndex,
                          aIndex,
                          rIndex
                        )
                      }
                      size="small"
                      fullWidth
                      margin="dense"
                    />

                    {/* Delete Result Button */}
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteResult(qIndex, aIndex, rIndex)}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Delete Result
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <Box>
          {/* Add Question Button */}
          <Button
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ mt: 1, mb: 2, display: "block" }}
          >
            Add Question
          </Button>

          {/* Delete Category Button */}
          <Button
            variant="outlined"
            onClick={handleDeleteCategory}
            sx={{ mt: 1, mb: 2, display: "block" }}
          >
            Delete Category
          </Button>

          {/* Update Button */}
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            sx={{ mt: 1, mb: 2 }}
          >
            Update
          </Button>
        </Box>

        <ToastContainer
          position={isMobile ? "bottom-center" : "top-right"}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </div>
  );
};

export default UpdateCategory;
