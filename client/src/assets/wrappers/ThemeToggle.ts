import { styled } from "styled-components";

export const Wrapper = styled.button`
  background: transparent;
  border: transparent;
  width: 1.5rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    transition: color 0.3s ease-in-out;
  }
  .toggle-icon {
    color: var(--white);
    font-size: 2rem;
  }
  svg:hover {
    color: var(--primary-200);
  }
`;
