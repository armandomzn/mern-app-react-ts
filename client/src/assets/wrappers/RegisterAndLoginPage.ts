import { styled } from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme?: boolean }>`
  min-height: 100vh;
  display: grid;
  align-items: center;
  padding: 4rem 0;
  background: ${(props) =>
    props.$isDarkTheme ? `var(--background-color)` : `var(--primary-100)`};
  .form {
    max-width: 25rem;
    width: 95%;
    margin: 0 auto;
    padding: 2rem;
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
    border-radius: var(--border-radius);
    border-top: 5px solid
      ${(props) =>
        props.$isDarkTheme ? "var(--primary-300)" : "var(--primary-500)"};
  }
  .form-row {
    margin-bottom: 1rem;
  }

  .form-row:last-of-type {
    margin-bottom: 2rem;
  }

  h1,
  h4 {
    text-align: center;
  }
  h1 {
    font-size: clamp(1rem, 5vw, 2rem);
    letter-spacing: var(--letter-spacing);
    color: ${(props) =>
      props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-500)"};
    font-weight: 700;
  }
  h4 {
    font-size: clamp(0.875rem, 5vw, 1.3rem);
    letter-spacing: 1px;
    color: ${(props) =>
      props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-500)"};
    font-family: var(--bodyFont);
  }
  .form-label {
    display: block;
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: 0.875rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }
  .form-input {
    padding: 0.375rem 0.75rem;
    width: 100%;
    border: 1px solid var(--text-color);
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    font-family: var(--headingFont);
    letter-spacing: var(--letter-spacing);
    height: 2rem;
    color: var(--text-color);
  }
  .btn-block {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
  .member {
    text-transform: capitalize;
    text-align: center;
    letter-spacing: 1px;
    color: var(--text-color);
    a {
      color: ${(props) =>
        props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-500)"};
      font-weight: 700;
    }
  }
`;
