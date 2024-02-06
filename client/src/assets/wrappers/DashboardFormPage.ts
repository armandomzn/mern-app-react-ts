import styled from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme: boolean }>`
  margin: 0 auto;
  padding: 2rem;
  background: var(--background-secondary-color);
  box-shadow: var(--shadow-3);
  border-radius: var(--border-radius);
  transition: all 0.3s ease-in-out;

  h3 {
    color: ${(props) =>
      props.$isDarkTheme ? `var(--text-color)` : "var(--primary-500)"};
    letter-spacing: 1px;
    font-size: clamp(0.875rem, 5vw, 2rem);
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    text-transform: capitalize;
    letter-spacing: 1px;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .form-input,
  .form-select {
    width: 100%;
    height: 2rem;
    padding: 0rem 0.5rem;
    font-size: 0.875rem;
    border: 1px solid
      ${(props) =>
        props.$isDarkTheme ? "var(--text-color)" : "var(--grey-300)"};
    border-radius: var(--border-radius);
    background: ${(props) =>
      props.$isDarkTheme
        ? "var(--background-secondary-color)"
        : "var(--grey-100)"};
    color: var(--text-color);
    transition: all 0.3s ease-in-out;
  }

  .form-btn {
    width: 100%;
    padding: 0.65rem 0.5rem;
  }

  @media (min-width: 576px) {
    .form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .form-btn {
      grid-column: 1 / span 1;
    }
  }
`;
