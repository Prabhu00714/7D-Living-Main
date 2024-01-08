import { Box } from '@mui/material';
import React, { useState, useRef  } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const initialCategory = {
    category: '',
    questions: [
      {
        questionid: 1,
        questiontext: '',
        answers: [
          { answer: '', results: [{ result: '', value: '' }] },
        ],
        image: '',
      },
    ],
  };

  const [categories, setCategories] = useState([initialCategory]);
  const fileInputRef = useRef(null); // Create a ref for file input


  const addQuestion = (cIndex) => {
    const updatedCategories = [...categories];
    const newQuestionId = updatedCategories[cIndex].questions.length + 1;
    updatedCategories[cIndex].questions.push({
      questionid: newQuestionId,
      questiontext: '',
      answers: [
        { answer: '', results: [{ result: '', value: '' }] },
      ],
      image: '',
    });
    setCategories(updatedCategories);
  };

  const deleteQuestion = (cIndex, qIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions.splice(qIndex, 1);
    setCategories(updatedCategories);
  };

  const updateCategory = (cIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex][field] = value;
    setCategories(updatedCategories);
  };

  const updateQuestion = (cIndex, qIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex][field] = value;
    setCategories(updatedCategories);
  };

  const addAnswer = (cIndex, qIndex) => {
    const updatedCategories = [...categories];
    const newAnswerId = updatedCategories[cIndex].questions[qIndex].answers.length + 1;
    updatedCategories[cIndex].questions[qIndex].answers.push({
      answer: '', results: [{ result: '', value: '' }],
    });
    setCategories(updatedCategories);
  };

  const deleteAnswer = (cIndex, qIndex, aIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers.splice(aIndex, 1);
    setCategories(updatedCategories);
  };

  const updateAnswer = (cIndex, qIndex, aIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex][field] = value;
    setCategories(updatedCategories);
  };

  const addResult = (cIndex, qIndex, aIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results.push({
      result: '', value: '',
    });
    setCategories(updatedCategories);
  };

  const updateResult = (cIndex, qIndex, aIndex, rIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results[rIndex][field] = value;
    setCategories(updatedCategories);
  };

  const deleteResult = (cIndex, qIndex, aIndex, rIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[cIndex].questions[qIndex].answers[aIndex].results.splice(rIndex, 1);
    setCategories(updatedCategories);
  };

  const handleImageUpload = (cIndex, qIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedCategories = [...categories];
        updatedCategories[cIndex].questions[qIndex].image = reader.result;
        setCategories(updatedCategories);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCategories([initialCategory]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateJson = () => {
    const jsonData = categories.map((category) => ({
      category: category.category,
      questions: category.questions.map((question) => ({
        questionid: question.questionid,
        questiontext: question.questiontext,
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          results: answer.results,
        })),
        image: question.image,
      })),
    }));
    console.log(JSON.stringify(jsonData, null, 2));
    resetForm();
  };

  return (
    <div style={{ position: 'absolute', top: 100 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 'auto' }}>
      {categories.map((category, cIndex) => (
        <div key={cIndex}>
          <label>Category:</label>
          <input
            type="text"
            value={category.category}
            onChange={(e) => updateCategory(cIndex, 'category', e.target.value)}
          />

          <button onClick={() => addQuestion(cIndex)}>Add Question</button>

          {category.questions.map((question, qIndex) => (
            <div key={qIndex}>
              <label>Question ID:</label>
              <input
                type="number"
                value={question.questionid}
                onChange={(e) => updateQuestion(cIndex, qIndex, 'questionid', e.target.value)}
              />

              <label>Question Text:</label>
              <input
                type="text"
                value={question.questiontext}
                onChange={(e) => updateQuestion(cIndex, qIndex, 'questiontext', e.target.value)}
              />

              <button onClick={() => deleteQuestion(cIndex, qIndex)}>Delete Question</button>

              <label>Image:</label>
              <input
                ref={fileInputRef} // Set the ref for file input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(cIndex, qIndex, e)}
              />

              <button onClick={() => addAnswer(cIndex, qIndex)}>Add Answer</button>

              {question.answers.map((answer, aIndex) => (
                <div key={aIndex}>
                  <label>Answer:</label>
                  <input
                    type="text"
                    value={answer.answer}
                    onChange={(e) => updateAnswer(cIndex, qIndex, aIndex, 'answer', e.target.value)}
                  />

                  <button onClick={() => deleteAnswer(cIndex, qIndex, aIndex)}>Delete Answer</button>

                  <button onClick={() => addResult(cIndex, qIndex, aIndex)}>Add Result</button>

                  {answer.results.map((result, rIndex) => (
                    <div key={rIndex}>
                      <label>Result:</label>
                      <input
                        type="text"
                        value={result.result}
                        onChange={(e) => updateResult(cIndex, qIndex, aIndex, rIndex, 'result', e.target.value)}
                      />

                      <label>Value:</label>
                      <input
                        type="text"
                        value={result.value}
                        onChange={(e) => updateResult(cIndex, qIndex, aIndex, rIndex, 'value', e.target.value)}
                      />

                      <button onClick={() => deleteResult(cIndex, qIndex, aIndex, rIndex)}>Delete Result</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

        </div>
      ))}

        <button onClick={generateJson}>Generate JSON</button>
        </Box>
    </div>
  );
};

export default QuestionForm;
