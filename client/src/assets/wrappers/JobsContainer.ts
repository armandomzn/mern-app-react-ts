import styled from "styled-components";

export const Wrapper = styled.section<{ $isDarkTheme: boolean }>`
  padding: 2rem 0;

  .not-found {
    padding: 1rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    p {
      margin-bottom: 0;
      font-size: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
    }
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .jobs {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .job {
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
    border-radius: var(--border-radius);
    padding: 0.875rem 1rem;
    min-height: 100%;
    transition: all 0.3s ease-in-out;
    display: grid;
    grid-template-rows: 1fr auto auto;
    align-items: center;
  }

  .job-icon {
    background: ${(props) =>
      props.$isDarkTheme ? `var(--primary-200)` : `var(--primary-500)`};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--grey-50);
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    padding-bottom: 0.5rem;
  }

  .info {
    h5,
    p {
      margin-bottom: 0;
      font-size: 1rem;
      letter-spacing: var(--letter-spacing);
    }
  }

  .content-center {
    padding: 1rem 0 0 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    border-top: 1px solid var(--grey-200);
  }

  @media (min-width: 576px) {
    .content-center {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  svg {
    color: ${(props) =>
      props.$isDarkTheme ? `var(--primary-200)` : `var(--primary-500)`};
  }

  .status {
    border-radius: var(--border-radius);
    text-align: center;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    width: 50%;
    min-height: 100%;
  }

  .status.pending {
    background: #eab308;
    color: #fef9c3;
  }

  .status.interview {
    background: #0ea5e9;
    color: #e0f2fe;
  }

  .status.declined {
    background: #ef4444;
    color: #fee2e2;
  }

  .actions {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .edit-btn,
    .delete-btn {
      text-align: center;
      min-height: 100%;
    }
    .edit-btn {
      background: #075985;
    }
    .delete-btn {
      background: #dc2626;
    }
  }
`;
