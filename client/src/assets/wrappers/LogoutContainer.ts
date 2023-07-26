import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .logout-btn svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 3rem;
    width: 100%;
    visibility: hidden;
  }

  .dropdown-btn {
    width: 100%;
    padding: 0.5rem;
  }

  .show-dropdown {
    visibility: visible;
  }
`;
