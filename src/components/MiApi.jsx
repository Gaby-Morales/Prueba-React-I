import React, { useState, useEffect } from "react";
import { Row, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";

import List from "./List";
import Searcher from "./Searcher";

dayjs.locale("es");
dayjs.extend(localizedFormat);

const MiApi = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHolidaysData();
  }, []);

  const getHolidaysData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.boostr.cl/feriados/en.json");
      const sortData = response.data.data.sort(sortByDate);
      const finalData = sortData.map((e) => {
        return { ...e, date: dayjs(e.date).format("LL") };
      });
      setData(finalData);
    } catch (error) {
      setError(error.message || "Hubo un error al obtener los feriados legales de Chile");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  };

  const handleSearchHoliday = (value) => {
    setFilteredData(
      data.filter((holiday) => {
        return Object.values(holiday).some((field) =>
          field.toString().toLowerCase().includes(value)
        );
      })
    );
  };

  return (
    <Row>
      <Searcher handleSearchHoliday={handleSearchHoliday} filter={filter} setFilter={setFilter} />
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="danger">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <List data={filter.length ? filteredData : data} />
      )}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
    </Row>
  );
};

export default MiApi;
