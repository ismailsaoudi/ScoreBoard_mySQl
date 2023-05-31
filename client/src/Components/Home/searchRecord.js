import React, { useState, useEffect } from "react";


function SearchWindow() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const url = `http://10.93.0.198:5001/api/search?start=${startDate}&end=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleSearch();
      // eslint-disable-next-line
    }}, [startDate, endDate]);

  const calculateTotal = (property) => {
    let total = searchResults.reduce((acc, result) => {
      const value = result[property];
      return Number.isNaN(value) ? acc : acc + value;
    }, 0);
    return total;
  };

  return (
    <div>
      <div className="search-header">
        <h5>Search Record</h5>
      </div>
      <div className="search-body">
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
        <button type="button" className="btn btn-secondary" onClick={handlePrint}>Print</button>
      </div>
      {searchResults.length > 0 && (
        <table className="tableData">
          <thead>
            <tr>
              <th>Machine</th>
              <th>Planned</th>
              <th>Actual</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="title">Return</td>
              <td>{calculateTotal("returnplanned")}</td>
              <td>{calculateTotal("returnActual")}</td>
              <td>{((calculateTotal("returnActual")*100)/calculateTotal("returnplanned")).toFixed(0) + "%"}</td>
            </tr>
            <tr>
              <td className="title">Dispenser</td>
              <td>{calculateTotal("dispenserPlanned")}</td>
              <td>{calculateTotal("dispenserActual")}</td>
              <td>{((calculateTotal("dispenserActual")*100)/calculateTotal("dispenserPlanned")).toFixed(0) + "%"}</td>
            </tr>
            <tr>
              <td className="title">Upgrade</td>
              <td>{calculateTotal("upgradePlanned")}</td>
              <td>{calculateTotal("upgradeActual")}</td>
              <td>{((calculateTotal("upgradeActual")*100)/calculateTotal("upgradePlanned")).toFixed(0) + "%"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchWindow;






