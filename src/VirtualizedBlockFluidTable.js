import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList as List } from "react-window";
import { generate } from "./utils/generateData";
import getScrollbarWidth from "./utils/getScrollbarWidth";

function VirtualizedBlockFluidTable() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(100);
  const [numData, setNumData] = useState(1000);
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

  const Row = ({ index, style }) => {
    const row = rows[index];
    prepareRow(row);
    return (
      <div {...row.getRowProps()} style={style} className="row">
        {row.cells.map(cell => (
          <div {...cell.getCellProps()} className="cell">
            {cell.render("Cell")}
          </div>
        ))}
      </div>
    );
  };

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
      <h1>A Virtualized Block-Fluid Table</h1>
      <section className="info">
        The table body is scrollable while table header stay on it's place.
        Virtualized row to make it fast on large number of rows.
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
        <List
          {...getTableBodyProps()}
          innerRef={containerRef}
          height={400}
          width="100%"
          itemCount={rows.length}
          itemSize={29}
          className="table-body"
        >
          {Row}
        </List>
      </div>
    </div>
  );
}

export default VirtualizedBlockFluidTable;
