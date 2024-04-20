import { Wrapper } from "../assets/wrappers/PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useUser } from "../pages/DashboardLayout";
import { useSearchParams } from "react-router-dom";

interface Props {
  numOfPages: number;
}

const PageBtnContainer = ({ numOfPages }: Props) => {
  const {
    jobs: { PageIndex },
  } = useAllJobsContext();
  const { isDarkTheme } = useUser();
  let [searchParams, setSearchParams] = useSearchParams();

  // const pages = Array.from({ length: numOfPages }, (_, index) => {
  //   return index + 1;
  // });

  const handlePage = (pageNumber: number) => {
    // We receive the pageNumber from buttons
    // We add to the current url the page query param
    // Ex -> http://localhost:5173/dashboard/all-jobs?page=6
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
  };

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${activeClass ? "active" : ""}`}
        onClick={() => handlePage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    let pageButtons: JSX.Element[] = [];

    //* First Button
    pageButtons = [
      ...pageButtons,
      addPageButton({ pageNumber: 1, activeClass: PageIndex === 1 }),
    ];

    //* Dots
    if (PageIndex > 3) {
      pageButtons = [
        ...pageButtons,
        <button key="dots-1" className="btn page-btn dots">
          ...
        </button>,
      ];
    }

    if (PageIndex !== 1 && PageIndex !== 2) {
      pageButtons = [
        ...pageButtons,
        addPageButton({
          pageNumber: PageIndex - 1,
          activeClass: false,
        }),
      ];
    }

    //* Current Page
    if (PageIndex !== 1 && PageIndex !== numOfPages) {
      pageButtons = [
        ...pageButtons,
        addPageButton({ pageNumber: PageIndex, activeClass: true }),
      ];
    }

    if (PageIndex !== numOfPages && PageIndex !== numOfPages - 1) {
      pageButtons = [
        ...pageButtons,
        addPageButton({ pageNumber: PageIndex + 1, activeClass: false }),
      ];
    }

    //* Dots
    if (PageIndex < numOfPages - 2) {
      pageButtons = [
        ...pageButtons,
        <button key="dots-2" className="btn page-btn dots">
          ...
        </button>,
      ];
    }

    //* Last Button
    pageButtons = [
      ...pageButtons,
      addPageButton({
        pageNumber: numOfPages,
        activeClass: PageIndex === numOfPages,
      }),
    ];

    return pageButtons;
  };

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = PageIndex - 1;
          if (prevPage < 1) {
            prevPage = numOfPages;
          }
          handlePage(prevPage);
        }}
      >
        <span>
          <FaAngleDoubleLeft />
        </span>
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = PageIndex + 1;
          if (nextPage > numOfPages) {
            nextPage = 1;
          }
          handlePage(nextPage);
        }}
      >
        <span>
          <FaAngleDoubleRight />
        </span>
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
