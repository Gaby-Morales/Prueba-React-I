import React from "react";
import Form from "react-bootstrap/Form";

const Searcher = ({ handleSearchHoliday, filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
    handleSearchHoliday(e.target.value);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group controlId="filter">
        <Form.Control
          type="text"
          value={filter}
          placeholder="Busca un feriado..."
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default Searcher;
