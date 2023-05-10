import React, { useState } from "react";
import "./search.css"
function SearchRecord() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const url = `http://10.93.0.198:5001/api/search?start=${startDate}&end=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="searchModalLabel">Search Record</h5>
            
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
          {searchResults.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Return Planned</th>
                  <th>Return Actual</th>
                  <th>Dispenser Planned</th>
                  <th>Dispenser Actual</th>
                  <th>Upgrade Planned</th>
                  <th>Upgrade Actual</th>
                  <th>Return Progress</th>
                  <th>Dispenser Progress</th>
                  <th>Upgrade Progress</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.date.substring(0, 10)}</td>
                    <td>{result.returnplanned}</td>
                    <td>{result.returnActual}</td>
                    <td>{result.dispenserPlanned}</td>
                    <td>{result.dispenserActual}</td>
                    <td>{result.upgradePlanned}</td>
                    <td>{result.upgradeActual}</td>
                    <td>{result.returnProgress}</td>
                    <td>{result.dispenserProgress}</td>
                    <td>{result.upgradeProgress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchRecord;
