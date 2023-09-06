import './SearchForm.css';
import { useContext, useEffect, useState } from 'react';
import { SearchFormContext } from '../../contexts/SearchFormContext';

function SearchForm({ handleSearchRequest, handleShortFilmCheckbox }) {
  const searchForm = useContext(SearchFormContext);
  const [searchValue, setSearchValue] = useState('');
  const [shortFilmValue, setShortFilmValue] = useState(false);

  const handleSearchValueChange = (evt) => {
    setSearchValue(evt.target.value);
  }

  const handleShortFilmChange = (evt) => {
    setShortFilmValue(evt.target.checked);
    handleShortFilmCheckbox(evt.target.checked);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearchRequest(searchValue, shortFilmValue);
  }

  useEffect(() => {
    if (searchForm) {
      setSearchValue(searchForm.request);
      setShortFilmValue(searchForm.short);
    }
  }, [searchForm]);

  return (
    <section>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='search-form__container'>
          <input
            className="search-form__input"
            type="text"
            value={searchValue || ''}
            onChange={handleSearchValueChange}
            id="search-input"
            name="search"
            placeholder="Фильм"
            minLength="1"
            maxLength="50"

          />
          <button className="search-form__submit" type="submit">Найти</button>
        </div>
        <label className='search-form__checkbox-container'>
          <input
            className='search-form__input'
            type="checkbox"
            checked={shortFilmValue}
            onChange={handleShortFilmChange}
            id="short-film"
            name="short"
          />
          <span className='search-form__checkmark' />
          Короткометражки
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
