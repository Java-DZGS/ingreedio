import { Select } from '@chakra-ui/react';
import React from 'react';

type FiltersSortingProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function FiltersSorting({ handleChange }: FiltersSortingProps): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="input-label" htmlFor="sorting-select">
      <div className="input-label-text">Sorting options</div>
      <Select
        bg="white"
        borderColor="#567a5b"
        borderWidth="2px"
        borderRadius="25px"
        color="black"
        fontSize="18px"
        onChange={handleChange}
        id="sorting-select"
      >
        <option value="none">None</option>
        <option value="a-rating">By rating (ascending)</option>
        <option value="d-rating">By rating (descending)</option>
        <option value="a-opinions-count">By opinion count (ascending)</option>
        <option value="d-opinions-count">By opinion count (descending)</option>
      </Select>
    </label>
  );
}

export default FiltersSorting;
