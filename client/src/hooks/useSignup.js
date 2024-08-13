import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, nativeLanguage, foreignLanguage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5050/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nativeLanguage,
          foreignLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const json = await response.json();
      console.log(json);

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
