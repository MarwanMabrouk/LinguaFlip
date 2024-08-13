import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null); // is gonnan be true when we start the request
  const { dispatch } = useAuthContext();

  const signup = async (email, password, nativeLanguage, foreignLanguage) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/signup`,
      {
        // i am not sure if the parameter is correct

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nativeLanguage,
          foreignLanguage,
        }), // i am not sure if it goes in brackets
      },
    );

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(JSON.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
