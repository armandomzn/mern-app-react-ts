import { styled } from "styled-components";

export const Wrapper = styled.button<{ $visible?: boolean }>`
  background: transparent;
  border: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: clamp(0.875rem, 5vw, 1.4rem);
    transition: color 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
  }

  .toggle-icon {
    color: var(--white);
  }

  svg:hover {
    color: var(--primary-200);
  }

  @media (max-width: 315px) {
    display: ${(props) => (props.$visible ? "flex" : "none")};
  }
`;
