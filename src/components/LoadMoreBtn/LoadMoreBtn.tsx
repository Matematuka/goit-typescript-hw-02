import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
