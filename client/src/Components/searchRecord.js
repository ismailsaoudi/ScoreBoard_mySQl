import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Chart from "chart.js/auto";
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";

function SearchRecord() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const chartRef = useRef(null);

  const handleSearch = async () => {
    const url = `http://10.93.0.198:5001/api/search?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data);
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotal = (property) => {
    let total = searchResults.reduce((acc, result) => {
      const value = result[property];
      return Number.isNaN(value) ? acc : acc + value;
    }, 0);
    return total;
  };

  useEffect(() => {
    let chartInstance = null; // Store the chart instance
    
    const createChart = () => {
      if (searchResults.length > 0) {
        const ctx = chartRef.current.getContext("2d");
        const sortedResults = [...searchResults].sort((a, b) => new Date(a.date) - new Date(b.date));
        const chartLabels = sortedResults.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
          });
        });

        const returnPlannedData = searchResults.map((item) => item.returnPlanned);
        const returnActualData = searchResults.map((item) => item.returnActual);
        const dispenserPlannedData = searchResults.map((item) => item.dispenserPlanned);
        const dispenserActualData = searchResults.map((item) => item.dispenserActual);
        const upgradePlannedData = searchResults.map((item) => item.upgradePlanned);
        const upgradeActualData = searchResults.map((item) => item.upgradeActual);

        if (chartInstance) {
          chartInstance.destroy(); // Destroy the previous chart if it exists
        }
       
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartLabels,
            datasets: [
              {
                label: "Return Planned",
                data: returnPlannedData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgb(255, 99, 132)",
                borderWidth: 1,
              },
              {
                label: "Return Actual",
                data: returnActualData,
                borderColor: "rgb(255, 159, 64)",
                backgroundColor: "rgb(255, 159, 64)",
                borderWidth: 1,
              },
              {
                label: "dispenser Planned",
                data: dispenserPlannedData,
                borderColor: "rgb(200, 240, 2)",
                backgroundColor: "rgb(200, 240, 2)",
                borderWidth: 1,
              },
              {
                label: "dispenser Actual",
                data: dispenserActualData,
                borderColor: "rgb(200, 192, 50)",
                backgroundColor: "rgb(200, 192, 50)",
                borderWidth: 1,
              },
              {
                label: "upgrade Planned",
                data: upgradePlannedData,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgb(54, 162, 235)",
                borderWidth: 1,
              },
              {
                label: "upgrade Actual",
                data: upgradeActualData,
                borderColor: "rgb(153, 102, 255)",
                backgroundColor: "rgb(153, 102, 255)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
              }
            },
            scales:{
              y:{
                min:0,
                max:10
              },
              x:{
               
              }
            }
          },
        });
      }
    };

    

    

    createChart(); // Initial creation of the chart

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart when the component unmounts
      }
    };
  }, [searchResults]);

  return (
    <div>
      <div className="search-header">
        <h1>Search Record</h1>
      </div>
      <div className="search-body">
        <div className="search-body">
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date:
            </label>
            <DatePicker id="startDate" selected={startDate} onChange={setStartDate} />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date:
            </label>
            <DatePicker id="endDate" selected={endDate} onChange={setEndDate} />
          </div>
        </div>
        <div>
          <button type="button" className="search" onClick={handleSearch}>
            Search
          </button>
          <button type="button" className="Print" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <table className="table2Data">
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
              <td>{calculateTotal("returnPlanned")}</td>
              <td>{calculateTotal("returnActual")}</td>
              <td>
                {((calculateTotal("returnActual") * 100) / calculateTotal("returnPlanned")).toFixed(0) + "%"}
              </td>
            </tr>
            <tr>
              <td className="title">Dispenser</td>
              <td>{calculateTotal("dispenserPlanned")}</td>
              <td>{calculateTotal("dispenserActual")}</td>
              <td>
                {((calculateTotal("dispenserActual") * 100) / calculateTotal("dispenserPlanned")).toFixed(0) + "%"}
              </td>
            </tr>
            <tr>
              <td className="title">Upgrade</td>
              <td>{calculateTotal("upgradePlanned")}</td>
              <td>{calculateTotal("upgradeActual")}</td>
              <td>
                {((calculateTotal("upgradeActual") * 100) / calculateTotal("upgradePlanned")).toFixed(0) + "%"}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="chart-container">
        <canvas ref={chartRef} width="800" height="400"></canvas>
      </div>
    </div>
  );
}

export default SearchRecord;
