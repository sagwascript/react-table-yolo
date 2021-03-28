import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { generate } from "./utils/generateData";

function BlockFluidTable() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(100);
  const [numData, setNumData] = useState(15);
  const data = useMemo(() => {
    return generate(numData);
  }, [numData]);
  const columns = useMemo(() => {
    const cols = [
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
    ];
    const colWidth = containerWidth / cols.length;
    // distribute the width of container to each column
    return cols.map(col => ({
      ...col,
      width: colWidth < 150 ? 150 : colWidth
    }));
  }, [containerWidth]);
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

  const getWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, []);

  useEffect(() => {
    getWidth();
    window.addEventListener("resize", getWidth, true);
    return () => {
      window.removeEventListener("resize", getWidth, true);
    };
  }, [getWidth]);

  useEffect(() => {
    getWidth();
  }, [getWidth, numData]);

  return (
    <div className="container">
      <label htmlFor="numData">Set num of rows:</label>
      <input
        type="text"
        name="numData"
        value={numData}
        onChange={e => setNumData(+e.target.value)}
      />
      <h1>A BlockFluid Table</h1>
      <section className="info">
        You can make it fluid through measuring container width then divide the
        total width into each column so it will use all the width of the
        container.
      </section>
      <div {...getTableProps()} ref={containerRef} className="table-container">
        <div>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="table-head">
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

export default BlockFluidTable;
