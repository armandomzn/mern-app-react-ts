import styled from "styled-components";

export const Wrapper = styled.article<{
  $backgroundColor: string;
  $color: string;
}>`
  box-shadow: var(--shadow-1);
  background: ${(props) => props.$backgroundColor};
  border-radius: var(--border-radius);
  padding: 1rem 2rem;
  border-bottom: 0.5rem solid ${(props) => props.$color};
  display: grid;
  gap: 1rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    color: ${(props) => props.$color};
    .icon {
      justify-self: end;
      font-size: 2rem;
      svg {
        display: flex;
      }
    }

    .count {
      font-size: 3rem;
      font-weight: bold;
    }
  }

  h3 {
    color: var(--white);
    letter-spacing: 1px;
    font-size: clamp(1rem, 5vw, 1.875rem);
    margin-bottom: 0;
  }
`;
