import styled from "styled-components";

export const Wrapper = styled.main<{ $isDarkTheme?: boolean }>`
  min-height: 100vh;
  background: ${(props) =>
    props.$isDarkTheme ? `var(--background-color)` : `var(--primary-100)`};

  .landing-navbar {
    width: 95%;
    margin: 0 auto;
    max-width: var(--max-width);
    height: 5rem;
  }

  .section-center {
    max-width: var(--max-width);
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 5rem);
  }

  .form {
    width: 100%;
    max-width: 34rem;
    min-height: 15rem;
    background: var(--background-secondary-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-content: center;
    padding: 2rem 2.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-3);
    border-top: 5px solid
      ${(props) =>
        props.$isDarkTheme ? "var(--primary-300)" : "var(--primary-500)"};

    h3,
    label {
      color: ${(props) =>
        props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-500)"};
    }

    h3 {
      text-align: center;
      font-size: clamp(0.875rem, 5vw, 1.5rem);
      letter-spacing: 1px;
    }

    .form-label {
      display: block;
      text-transform: capitalize;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      border: transparent;
      border-radius: var(--border-radius);
      padding: 0.375rem 0.75rem;
      border: 1px solid var(--grey-200);
      margin-bottom: 1rem;
    }

    .btn {
      margin-bottom: 1rem;
    }

    .reset-btn {
      margin-bottom: 0;
    }

    p {
      text-align: center;
      letter-spacing: 1px;
      color: var(--text-color);
      font-size: clamp(0.5rem, 5vw, 1rem);
      a {
        color: ${(props) =>
          props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-500)"};
        font-weight: 700;
      }
    }
  }
`;
