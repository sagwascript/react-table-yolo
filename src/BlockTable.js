import { useState, useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { generate } from "./utils/generateData";

function BlockTable() {
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
  } = useTable(
    {
      data,
      columns
    },
    useBlockLayout
  );
  return (
    <div className="table-container">
      <label htmlFor="numData">Set num of rows:</label>
      <input
        type="text"
        name="numData"
        value={numData}
        onChange={e => setNumData(+e.target.value)}
      />
      <h1>A Block Table</h1>
      <section className="info">
        You can't make every column in this table to automatically adapt with
        container width, it's need to specify the width of each column or it
        will set to 150px.
      </section>
      <div {...getTableProps()} style={{ width: "100%" }}>
        <div className="table-head">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="row">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="header-cell">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="table-body">
          {rows.map(row => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="row">
                {row.cells.map(cell => (
                  <div {...cell.getCellProps()} className="cell">
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlockTable;
