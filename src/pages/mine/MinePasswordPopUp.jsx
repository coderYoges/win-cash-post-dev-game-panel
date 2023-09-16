import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { VALIDATIONS } from "../../config/constants";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { postRequest } from "../../api";
import { setPassword } from "../../redux/auth";

const BalaceModal = styled.div`
  background: #fff;
  color: #262626;
  width: 320px;
  padding: 0;
  text-align: justify;
  box-shadow: 0 0 10px #898989;
  border-radius: 6px;
  top: 30%;
  position: absolute;
  transition: 0.2s;
  z-index: 1099;
  left: calc(50% - 160px);
`;

const BalanceHeaderContainer = styled.div`
  background: rgb(28, 59, 106);
  padding: 15px 10px;
  font-size: 18px;
  font-weigth: 700;
  border-radius: 6px 6px 0 0;
  color: #fff;
`;

const StyledRow = styled.div``;

const StyledLabel = styled.div`
  font-size: 14px;
  font-weigth: 600;
  padding-left: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #e4e7ea;
  padding: 10px;
  border-radius: 5px;
  color: #5c6873;
  font-size: 12px;
  font-weigth: 400;
`;

const StyledButton = styled.button`
  background-color: #2e4b5e;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  width: 100px;
`;

const StyledError = styled.div`
  font-size: 12px;
  font-weigth: 400;
  padding-left: 4px;
  color: red;
  height: 24px;
`;

const MinePasswordPopUp = ({ closeModal, setPassword, password, userName }) => {
  return (
    <BalaceModal>
      <BalanceHeaderContainer className="d-flex justify-content-between">
        <div className="fw-500 fs-md">Change Password</div>
        <div onClick={closeModal} className="cursor-pointer" type="button">
          <span className="fw-600 fs-xxl">x</span>
        </div>
      </BalanceHeaderContainer>
      <Formik
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={yup.object().shape({
          oldPassword: yup
            .string()
            .min(6, "* Old Password must be atleast 6 characters")
            .max(14)
            .required("* Old Password is required"),
          newPassword: yup
            .string()
            .min(6, "* New Password must be atleast 6 characters")
            .max(14)
            .required("* New Password is required"),

          confirmPassword: yup
            .string()
            .required("* Confirm password is required")
            .oneOf(
              [yup.ref("newPassword"), null],
              "* New Passwords must match"
            ),
        })}
        onSubmit={async (values, { resetForm }) => {
          closeModal();
          resetForm();
          if (values.oldPassword === values.newPassword) {
            toast.error("Old Password and New Password must be different", {
              autoClose: 2000,
            });
          } else {
            try {
              const result = await postRequest(
                WIN_CASH_ENDPOINTS.UPDATE_PASSWORD,
                {
                  userName: userName,
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                  userPlatform: window.navigator.platform,
                  userBrowser: window.navigator.vendor,
                  userIPAddress: "",
                  userCity: "",
                }
              );
              if (result.isSuccessful) {
                setPassword(values.newPassword);
                toast.success("Password updated successfully", {
                  autoClose: 2000,
                });
              } else {
                toast.error(result.errorMessage, { autoClose: 2000 });
              }
            } catch (e) {
              toast.error(e, { autoClose: 2000 });
            }
          }
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          handleReset,
        }) => {
          const onOldPasswordChange = (e) => {
            setFieldValue(
              "oldPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onNewPasswordChange = (e) => {
            setFieldValue(
              "newPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          const onConfirmPasswordChange = (e) => {
            setFieldValue(
              "confirmPassword",
              e.target.value.replace(VALIDATIONS.ALPHANUM, "")
            );
          };
          return (
            <form onSubmit={handleSubmit}>
              <div className="p-3 fs-md">
                <StyledRow>
                  <StyledLabel className="mt-2">Old password:</StyledLabel>
                  <div className="mt-1">
                    <StyledInput
                      type="text"
                      maxLength={14}
                      minLength={6}
                      name="oldPassword"
                      onChange={onOldPasswordChange}
                      value={values.oldPassword}
                    />
                  </div>
                  {errors.oldPassword && touched.oldPassword && (
                    <StyledError className="mt-1">
                      {errors.oldPassword}
                    </StyledError>
                  )}
                </StyledRow>
                <StyledRow>
                  <StyledLabel className="mt-2">New password:</StyledLabel>
                  <div className="mt-1">
                    <StyledInput
                      type="text"
                      maxLength={14}
                      minLength={6}
                      name="newPassword"
                      onChange={onNewPasswordChange}
                      value={values.newPassword}
                    />
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <StyledError className="mt-1">
                      {errors.newPassword}
                    </StyledError>
                  )}
                </StyledRow>
                <StyledRow>
                  <StyledLabel className="mt-2">Confirm password:</StyledLabel>
                  <div className="mt-1">
                    <StyledInput
                      type="text"
                      maxLength={14}
                      minLength={6}
                      name="confirmPassword"
                      onChange={onConfirmPasswordChange}
                      value={values.confirmPassword}
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <StyledError className="mt-1">
                      {errors.confirmPassword}
                    </StyledError>
                  )}
                </StyledRow>
                <StyledRow className="mt-4 d-flex justify-content-end gap-3">
                  <StyledButton type="button" onClick={handleReset}>
                    Clear
                  </StyledButton>
                  <StyledButton type="submit">Confirm</StyledButton>
                </StyledRow>
              </div>
            </form>
          );
        }}
      </Formik>
    </BalaceModal>
  );
};

const mapStateToProps = (state) => ({
  password: state.auth.password,
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  setPassword: setPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(MinePasswordPopUp);
