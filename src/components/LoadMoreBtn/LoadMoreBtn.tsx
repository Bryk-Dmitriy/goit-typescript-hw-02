import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
};

export default function LoadMoreBtn({
  onClick,
}: LoadMoreBtnProps): React.ReactElement {
  return (
    <button onClick={onClick} className={css.loadMoreBtn}>
      Load more
    </button>
  );
}
