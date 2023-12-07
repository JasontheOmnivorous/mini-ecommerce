import { TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { ChangeEvent } from "react";

interface Props {
  setFilteredProducts: (val: Product[]) => void;
  products: Product[];
}

const SearchBar = ({ setFilteredProducts, products }: Props) => {
  const handleSearch = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchQuery = evt.target.value.toLowerCase(); // change everything user typed for case insensitivity
    // search the data titles that include search query
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered); // update the state with filtered data
  };

  return (
    <TextField
      onChange={handleSearch}
      sx={{ m: 2, width: 300 }}
      placeholder="Search porducts..."
    />
  );
};

export default SearchBar;
