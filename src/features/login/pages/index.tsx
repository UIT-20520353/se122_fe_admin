import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import authApi from "../../../api/authApi";
import { useAppDispatch } from "../../../app/hooks";
import bg from "../../../assets/images/loginBG.png";
import { SubmitButton } from "../../../components/commons";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../../consts/app";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { updateUserId } from "../../../redux/globalSlice";
import { setLocalStorage } from "../../../utils/localStorage";

interface InputFieldProps {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required!"),
  email: yup
    .string()
    .email("Please enter a correctly formatted email address")
    .required("Email is required!"),
});

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError("Login Error");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFieldProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onSubmit = async (value: InputFieldProps) => {
    setIsLoading(true);
    const { ok, body, error } = await authApi.login({
      email: value.email,
      password: value.password,
    });
    setIsLoading(false);

    if (ok && body) {
      setLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, body.accessToken);
      dispatch(updateUserId(body.id));
      navigate("/");
      return;
    }

    handleResponseError(error);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2 className="welcome">Welcome!</h2>
        <div className="title">
          <h2>Sign in to</h2>
          <span>Ielts Tinder Admin ?</span>
        </div>
        <div className="primary-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required!",
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="primary-input">
          <label htmlFor="password">Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            id="password"
            autoComplete="off"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required!",
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          {isShowPassword ? (
            <FaEye
              onClick={handleShowPasswordClick}
              className="primary-input__icon"
            />
          ) : (
            <FaEyeSlash
              onClick={handleShowPasswordClick}
              className="primary-input__icon"
            />
          )}
        </div>
        <SubmitButton isLoading={isLoading} />
      </form>
      <img src={bg} alt="background" />
    </div>
  );
};

export default Login;
