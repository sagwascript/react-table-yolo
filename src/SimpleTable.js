import { useState, useMemo } from "react";
import { useTable } from "react-table";
import { generate } from "./utils/generateData";

function SimpleTable() {
  const [numData, setNumData] = useState(10);
  const data = useMemo(() => {
    return generate(numData);
  }, [numData]);
  const columns = useMemo(
    () => [
      {
        Header: "Firstname",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "ZIP Code",
        accessor: "zip"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Country",
        accessor: "country"
      }
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    data,
    columns
  });
  return (
    <div className="table-container">
      <label htmlFor="numData">Set num of rows:</label>
      <input
        type="text"
        name="numData"
        value={numData}
        onChange={e => setNumData(+e.target.value)}
      />
      <h1>A Simple Table</h1>
      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTable;
