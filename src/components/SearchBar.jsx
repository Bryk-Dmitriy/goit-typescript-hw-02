import css from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import { toast } from 'react-hot-toast';


export default function SearchBar({onSubmit}) {

    const [inputValue, setInputValue] = useState('');

    const handleChange = event => setInputValue(event.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        if (inputValue === "") {
            toast.error('The field must not be empty')
            return;
        }
        onSubmit(inputValue);
        setInputValue('');
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