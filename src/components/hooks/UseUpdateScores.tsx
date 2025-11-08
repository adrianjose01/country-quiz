import { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";

const UseUpdateScores = () => {
  const context = useContext(DataContext);
  const token = localStorage.getItem("token") ?? "";

  const updateScores = async (correctAnswers: number) => {
    let toChange = "";
    if (context?.user) {
      const { bestScore } = context.user;
      if (bestScore < correctAnswers) {
        toChange = "both";
      } else {
        toChange = "previousScore";
      }
      try {
        const response = await fetch("http://localhost:3001/updateScore", {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toChange,
            previousScore: correctAnswers,
            bestScore: correctAnswers,
            email: context.user.userEmail,
          }),
        });
        const data = await response.json();
        return data.message;
      } catch (err) {
        alert(err);
      }
    }
  };

  return { updateScores };
};

export default UseUpdateScores;
