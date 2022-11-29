import './SearchForm.css';
import edamam from '../../img/edamam-logo.svg';

export default function SearchForm({ search, setSearch, setQuery }) {

  function handleChange(evt) {
    setSearch(evt.target.value);
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    setQuery(search);
    setSearch(search);
  }

  return (
    <div>
      <div className='SearchForm'>
        <form className="search-form" autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter dish name' name="query" value={search} onChange={handleChange} required />
          <button type="submit">SEARCH</button>
        </form>
        <img src={edamam} alt="" className='edamam' />
      </div>
    </div>
  );
}