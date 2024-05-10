import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { SearchValue } from "./SearchBar.types";

const notify = () =>
  toast("This field cannot be empty. Please enter a search query", {
    duration: 4000,
    position: "top-left",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const FORM_INITIAL_VALUES = {
  searchTerm: "",
};
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (values: SearchValue) => {
    if (values.searchTerm !== "") {
      onSubmit(values.searchTerm);
    } else {
      notify();
    }
  };
  return (
    <header>
      <Formik initialValues={FORM_INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form>
          <label>
            <Field
              className={css.formSearch}
              type="text"
              name="searchTerm"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
          <button className={css.formBtn} type="submit">
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
