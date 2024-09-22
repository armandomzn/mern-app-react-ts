import styled from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme: boolean }>`
  text-align: center;
  color: ${(props) =>
    props.$isDarkTheme ? `var(--primary-100)` : `var(--primary-500)`};
`;
