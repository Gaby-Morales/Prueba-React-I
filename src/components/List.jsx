import React from "react";
import { Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsCheck2, BsXLg } from "react-icons/bs";

const List = ({ data }) => {
  return (
    <Table striped bordered hover responsive="md">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Festividad</th>
          <th>Tipo</th>
          <th>Es irrenunciable?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((holiday, index) => (
          <tr key={index}>
            <td>{holiday.date}</td>
            <td>{holiday.title}</td>
            <td>{holiday.type}</td>
            <td>
              {holiday.inalienable ? (
                <IconContext.Provider value={{ color: "green" }}>
                  <div>
                    <BsCheck2 />
                  </div>
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: "red" }}>
                  <div>
                    <BsXLg />
                  </div>
                </IconContext.Provider>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
