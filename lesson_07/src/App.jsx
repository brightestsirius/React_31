import React from "react";

import { ThemeProvider } from "styled-components";
import { styledComponentsTheme } from "./styles/styledComponentsTheme.js";

import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import muiTheme from "./styles/muiTheme.js";

import ButtonCSSModule from "./components/ButtonCSSModule/ButtonCSSModule.jsx";
import StyledButton from "./components/StyledButton/StyledButton.jsx";
import TailwindHeroSection from "./components/TailwindHeroSection/TailwindHeroSection.jsx";
import MuiExample from "./components/MuiExample/MuiExample.jsx";

import "./styles/app.sass";

export default function App() {
  return (
    <>
      <div className="app-container">
        <section className="app-section">
          <h2 className="app-section__heading app-section__heading--css-modules">
            1. CSS Modules (with SASS)
          </h2>
          <div className="app-buttons-wrapper">
            <ButtonCSSModule
              onClick={() => alert("CSS Module Default Button!")}
            >
              Default CSS Module Button
            </ButtonCSSModule>
            <ButtonCSSModule
              variant="primary"
              onClick={() => alert("CSS Module Primary Button!")}
            >
              Primary CSS Module Button
            </ButtonCSSModule>
          </div>
        </section>

        <ThemeProvider theme={styledComponentsTheme}>
          <section className="app-section">
            <h2 className="app-section__heading app-section__heading--styled-components">
              4. Styled-Components
            </h2>
            <div className="app-buttons-wrapper">
              <StyledButton
                onClick={() => alert("Styled-Components Default Button!")}
              >
                Default Styled Button
              </StyledButton>
              <StyledButton
                $primary
                onClick={() => alert("Styled-Components Primary Button!")}
              >
                Primary Styled Button
              </StyledButton>
            </div>
          </section>
        </ThemeProvider>

        <section className="app-section">
          <h2 className="app-section__heading app-section__heading--tailwind">
            2. Tailwind CSS (v4)
          </h2>
          <TailwindHeroSection />
        </section>

        <ThemeProviderMUI theme={muiTheme}>
          <section className="app-section">
            <h2 className="app-section__heading app-section__heading--mui">
              3. Material-UI (MUI)
            </h2>
            <MuiExample />
          </section>
        </ThemeProviderMUI>
      </div>
    </>
  );
}