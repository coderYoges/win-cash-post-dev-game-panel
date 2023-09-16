import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { FerrisWheelSpinner } from "react-spinner-overlay";
import { IoCloseCircleSharp } from "react-icons/io5";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { COMMON_LABELS, VALIDATIONS } from "../../config/constants";
import { postRequest } from "../../api/postRequest";
import { setLoginData } from "../../redux/auth";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";

export const StyledButton = styled.button`
  display: flex;
  width: 100%;
  background: ${(props) =>
    props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};
  transition-duration: 0s;
  box-shadow: ${(props) => (props.disabled ? "" : "#0000004d 0px 0px 5px")};
  height: 48px;
  border-radius: 10px;
  color: #fff;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const gameLogo = require("../../assets/images/login-page-logo.png");

const LoginForm = ({ setLoginData }) => {
  const history = useHistory();

  return (
    <div className="row m-0 p-0">
      <div className="col-12 p-0 m-0">
        <ToastContainer limit={1} />
        <Formik
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={true}
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            postRequest(WIN_CASH_ENDPOINTS.LOGIN, {
              userName: values.username,
              password: values.password,
              userPlatform: window.navigator.platform,
              userBrowser: window.navigator.vendor,
              userIPAddress: "",
              userCity: "",
            })
              .then((res) => {
                if (res.isSuccessful === true) {
                  setSubmitting(false);
                  window.localStorage.removeItem("persist:gamePanel");
                  setLoginData(res.data);

                  history.goBack();
                } else {
                  toast.error(res.errorMessage, { autoClose: 2000 });
                }
              })
              .catch((err) => {
                toast.error(err, { autoClose: 2000 });
              })
              .finally(() => {
                resetForm();
              });
          }}
          validationSchema={yup.object().shape({
            username: yup
              .string()
              .length(10)
              .required("Mobile number is required"),
            password: yup
              .string()
              .min(6)
              .max(10)
              .required("Password is required"),
          })}
        >
          {({
            values,
            errors,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            setFieldTouched,
          }) => {
            const onChangeMobile = ({ target }) => {
              setFieldTouched("username", true, true);
              setFieldValue(
                "username",
                target.value.replace(VALIDATIONS.DIGIT, ""),
                true
              );
            };
            const onChangePassword = ({ target }) => {
              setFieldTouched("password", true, true);
              setFieldValue(
                "password",
                target.value.replace(VALIDATIONS.ALPHANUM, ""),
                true
              );
            };
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.loginPopup}>
                  <span
                    className={styles.cross}
                    onClick={() => history.goBack()}
                  >
                    <IoCloseCircleSharp style={{ fontSize: "40px" }} />
                  </span>
                  <img
                    src={gameLogo}
                    style={{
                      width: "80%",
                      marginBottom: "7.5vh",
                      marginTop: "22vh",
                    }}
                    alt=""
                  />
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputStyle}
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={values.username}
                      onChange={onChangeMobile}
                      maxLength={10}
                      inputMode="numeric" 
                    />
                    {errors.username && touched.username && (
                      <p className={styles.error}>{errors.username}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputStyle}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={onChangePassword}
                    />
                    {errors.password && touched.password && (
                      <p className={styles.error}>{errors.password}</p>
                    )}
                  </div>
                  <button
                    className={styles.login}
                    type="submit"
                    disabled={
                      values.username.length !== 10 ||
                      values.password.length < 6
                    }
                  >
                    <FerrisWheelSpinner
                      loading={isSubmitting}
                      size={24}
                      color="#fff"
                      className="rotate-infinite"
                    />
                    {!isSubmitting && COMMON_LABELS.LOGIN}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setLoginData: setLoginData,
};

export default connect(null, mapDispatchToProps)(LoginForm);
