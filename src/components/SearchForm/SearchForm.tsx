import './SearchForm.css';

interface Props {
  searchVal: string;
  setSearchVal: (value: string) => void;
}

function SearchForm({ searchVal, setSearchVal }: Props) {
  const handleSearchValChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchVal(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        value={searchVal}
        onChange={handleSearchValChange}
        placeholder="Type to search for keywords..."
      />
    </form>
  );
}

export default SearchForm;
