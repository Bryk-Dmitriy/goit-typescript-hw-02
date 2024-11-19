import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { toast } from "react-hot-toast";

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

export default function SearchBar({
  onSubmit,
}: SearchBarProps): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputValue === "") {
      toast.error("The field must not be empty");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header className={css.SearchBarContainer}>
      <form className={css.InputWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
          className={css.SearchBarInput}
        />
        <button type="submit" className={css.iconButton}>
          <CiSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
}
