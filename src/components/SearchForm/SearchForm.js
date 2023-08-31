import './SearchForm.css';

function SearchForm() {
  return (
    <section>
      <form className='search-form'>
        <div className='search-form__container'>
          <input
            className="search-form__input"
            type="text"
            id="search-input"
            name="search"
            placeholder="Фильм"
            minLength="2"
            maxLength="50"
            required
          />
          <button className="search-form__submit" type="submit">Найти</button>
        </div>
        <label className='search-form__checkbox-container'>
          <input
            className='search-form__input'
            type="checkbox"
            id="short-film"
            name="short-film"
          />
          <span className='search-form__checkmark' />
          Короткометражки
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
