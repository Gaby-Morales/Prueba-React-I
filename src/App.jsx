import React from "react";
import Container from "react-bootstrap/Container";

import MiApi from "./components/MiApi";
import Title from "./components/Title";
import flag from "./assets/images/Flag_of_Chile.svg";

import "./App.css";

function App() {
  return (
    <Container>
      <Title
        tag={
          <h1>
            Feriados legales de Chile <img src={flag} alt="Bandera de chile" className="flag" />
          </h1>
        }
      />
      <MiApi />
    </Container>
  );
}

export default App;
