import styled from "styled-components";

export const Wrapper = styled.main<{ $isDarkTheme: boolean }>`
  max-width: var(--max-width);
  margin: 0 auto;
  width: 95%;

  section {
    padding: 2rem 0;

    .email-container {
      background: #cce2cc;
      border-radius: var(--border-radius);
      padding: 2rem;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      place-items: center;
      box-shadow: var(--shadow-2);
    }

    .email-container svg {
      max-width: 20rem;
      max-height: 20rem;
      background: none;
    }

    .email-image {
      background: none;
    }

    .email-container p {
      color: #012c00;
      margin-bottom: 0.5rem;
      letter-spacing: 0.5px;
    }

    .email-container p:last-of-type {
      margin-bottom: 1rem;
    }

    .message {
      font-size: clamp(1rem, 5vw, 2rem);
      letter-spacing: var(--letter-spacing);
      color: ${(props) =>
        props.$isDarkTheme ? "var(--primary-100)" : "var(--primary-800)"};
      font-weight: 700;
    }
  }
`;
