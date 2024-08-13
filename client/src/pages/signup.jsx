import React, { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [foreignLanguage, setForeignLanguage] = useState("");
  const { signup, error, isLoading } = useSignup();

  const [isOpenNative, setIsOpenNative] = useState(false);
  const [isOpenForeign, setIsOpenForeign] = useState(false);
  const [optionsNative, setOptionsNative] = useState([]);
  const [optionsForeign, setOptionsForeign] = useState([]);
  const [filteredOptionsNative, setFilteredOptionsNative] = useState([]);
  const [filteredOptionsForeign, setFilteredOptionsForeign] = useState([]);

  useEffect(() => {
    fetch("/nativeLanguages.txt")
      .then((response) => response.text())
      .then((text) => {
        const optionsArray = text.split("\n").map((option) => option.trim());
        setOptionsNative(optionsArray);
        setFilteredOptionsNative(optionsArray);
      });
    fetch("/foreignLanguages.txt")
      .then((response) => response.text())
      .then((text) => {
        const optionsArray = text.split("\n").map((option) => option.trim());
        setOptionsForeign(optionsArray);
        setFilteredOptionsForeign(optionsArray);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, nativeLanguage, foreignLanguage);
  };

  const handleNativeChange = (event) => {
    const value = event.target.value;
    setNativeLanguage(value);
    setFilteredOptionsNative(
      optionsNative.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpenNative(true);
  };

  const handleForeignChange = (event) => {
    const value = event.target.value;
    setForeignLanguage(value);
    setFilteredOptionsForeign(
      optionsForeign.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpenForeign(true);
  };

  const handleOptionClickNative = (option) => {
    setNativeLanguage(option);
    setIsOpenNative(false);
  };

  const handleOptionClickForeign = (option) => {
    setForeignLanguage(option);
    setIsOpenForeign(false);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="centered-container">
        <AccountCircleSharpIcon className="item" sx={{ fontSize: 55 }} />
        <Typography className="item" variant="h5">
          <strong>Create your account!</strong>
        </Typography>
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="dropdown">
        <label>Native Language:</label>
        <input
          type="text"
          value={nativeLanguage}
          onChange={handleNativeChange}
          onFocus={() => setIsOpenNative(true)}
          onBlur={() => setTimeout(() => setIsOpenNative(false), 100)}
        />

        {isOpenNative && (
          <div className="dropdown-menu">
            {filteredOptionsNative.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onMouseDown={() => handleOptionClickNative(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Foreign Language:</label>
        <input
          type="text"
          value={foreignLanguage}
          onChange={handleForeignChange}
          onFocus={() => setIsOpenForeign(true)}
          onBlur={() => setTimeout(() => setIsOpenForeign(false), 100)}
        />
        {isOpenForeign && (
          <div className="dropdown-menu">
            {filteredOptionsForeign.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onMouseDown={() => handleOptionClickForeign(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        sx={{ backgroundColor: "primary.dark", color: "#fff" }}
        type="submit"
        variant="contained"
        disabled={isLoading}
      >
        Signup
      </Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
