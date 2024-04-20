import styled from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme: boolean }>`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  .prev-btn,
  .next-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background: ${(props) =>
      props.$isDarkTheme ? `var(--primary-200)` : `var(--primary-500)`};
    transition: 0.3s all ease-in-out;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        color: ${(props) =>
          props.$isDarkTheme ? `var(--primary-100)` : `var(--primary-100)`};
        transition: 0.3s all ease-in-out;
      }
    }
    &:hover {
      background: ${(props) =>
        props.$isDarkTheme ? `var(--primary-500)` : `var(--primary-100)`};
      color: ${(props) =>
        props.$isDarkTheme ? `var(--primary-100)` : `var(--primary-500)`};
      svg {
        color: ${(props) =>
          props.$isDarkTheme ? `var(--primary-100)` : `var(--primary-500)`};
      }
    }
  }

  .btn {
    height: 2.5rem;
    width: 6.25rem;
  }

  .page-btn {
    width: clamp(2rem, 5vw, 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:not(:first-of-type):not(:last-of-type) {
      border-radius: 0;
    }
    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .active {
    font-weight: bold;
    background: ${(props) =>
      props.$isDarkTheme ? `var(--primary-200)` : `var(--primary-100)`};
    color: ${(props) =>
      props.$isDarkTheme ? `var(--primary-500)` : `var(--primary-800)`};
  }

  .btn-container {
    display: flex;
    flex-wrap: wrap;
  }

  .dots {
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
  }

  @media (max-width: 510px) {
    justify-content: center;
    border: 2px solid red;
    .prev-btn,
    .next-btn {
      width: 100%;
    }
  }

  @media (max-width: 280px) {
    .dots {
      display: none;
    }
  }
`;
