import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { generate } from "./utils/generateData";
import getScrollbarWidth from "./utils/getScrollbarWidth";

function ScrollableBlockFluidTable() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(100);
  const [numData, setNumData] = useState(0);
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
    // subtract container width with scrollbar width and border width
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
      const container = containerRef.current;
      const width = container.offsetWidth;
      const calcWidth =
        container.scrollHeight > container.clientHeight // if its' overflowing
          ? width - getScrollbarWidth() // subtract width by scrollbar width
          : width;
      setContainerWidth(calcWidth - 2);
    }
  }, []);

  useEffect(() => {
    getWidth();
    setNumData(15);
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
      <h1>A Scrollable Block-Fluid Table</h1>
      <section className="info">
        The table body is scrollable while table header stay on it's place. But
        the problem with this is we need to measure the scrollbar width so the
        table body doesn't get extra width for scrollbar that makes it
        scrollable in x-axis, since the table body's width is added by scrollbar
        width.
      </section>
      <div {...getTableProps()} className="table-container">
        <div className="table-head">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="header-cell">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          {...getTableBodyProps()}
          ref={containerRef}
          style={{
            maxHeight: "20rem",
            overflowY: "auto"
          }}
          className="table-body"
        >
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

export default ScrollableBlockFluidTable;
