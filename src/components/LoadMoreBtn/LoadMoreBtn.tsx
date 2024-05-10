import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn = ({ onLoadMore }: LoadMoreBtnProps) => {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
