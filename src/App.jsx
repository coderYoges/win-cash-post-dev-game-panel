import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { withRouter } from "react-router-dom";
import { theme } from "./styles/theme";
import { Layout } from "./components/common/Layout";
import { Main } from "./pages/MainSection";
const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Main />
      </Layout>
    </ThemeProvider>
  );
};

export default withRouter(App);
