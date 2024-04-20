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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 478px) {
    .avatar {
      display: none;
    }
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
    border-radius: var(--border-radius);
    border-bottom: 0.5px solid var(--white);
    background: var(--primary-500);
    svg {
      font-size: clamp(0.5rem, 5vw, 0.875rem);
      width: 1rem;
      height: 1rem;
    }
    &:first-of-type {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-of-type {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom: 0;
    }
    &:only-child {
      border-radius: var(--border-radius);
    }
  }

  .show-dropdown {
    visibility: visible;
  }
`;
