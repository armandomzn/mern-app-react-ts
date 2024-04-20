import styled from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme: boolean }>`
  margin: 0 auto;
  padding: 2rem;
  background: var(--background-secondary-color);
  box-shadow: var(--shadow-3);
  border-radius: var(--border-radius);
  transition: all 0.3s ease-in-out;

  h3 {
    transition: color 0.3s ease-in-out;
    color: ${(props) =>
      props.$isDarkTheme ? `var(--text-color)` : "var(--primary-500)"};
    letter-spacing: 1px;
    font-size: clamp(0.875rem, 5vw, 2rem);
  }

  .form-row {
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 0;
    }
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
    margin-top: 1.2rem;
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

  .avatar-container {
    width: 100%;
    margin: 1rem 0;
  }

  .flex-container {
    display: grid;
    width: 50%;
    grid-template-columns: 1fr;
  }

  .search-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    .search-btn {
      align-self: end;
      text-align: center;
      height: 2rem;
      text-overflow: ellipsis;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${(props) =>
        props.$isDarkTheme ? `var(--primary-200)` : `var(--primary-500)`};
      font-size: clamp(0.5rem, 5vw, 0.875rem);
    }
  }
`;
