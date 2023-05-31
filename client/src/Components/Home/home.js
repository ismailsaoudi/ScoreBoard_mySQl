import { useState,useEffect } from "react";
import "../Home/home.css";


function Home() {
    const [date] = useState("");
    const [formData, setFormData] = useState({
        date: "",
        returnplanned: "",
        returnActual: "",
        dispenserPlanned: "",
        dispenserActual: "",
        upgradePlanned: "",
        upgradeActual: "",
    });
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          date: formattedDate,
        }));
        fetchData(formattedDate);
      }, []);

      const fetchData = (selectedDate) => {
        fetch(`http://10.93.0.198:5001/api/get/${selectedDate}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.length > 0) {
              const {
                returnplanned,
                returnActual,
                dispenserPlanned,
                dispenserActual,
                upgradePlanned,
                upgradeActual,
              } = data[0];
              setFormData((prevFormData) => ({
                ...prevFormData,
                returnplanned,
                returnActual,
                dispenserPlanned,
                dispenserActual,
                upgradePlanned,
                upgradeActual,
              }));
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        };
        fetch("http://10.93.0.198:5001/api/post", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");

                }
                return response.json();
            })
            .then((success) => {
                console.log(success);


            })
            .catch((error) => {
                console.error("There was an error!", error);

            });
    };
    const handleUpdate = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: formData.date,
                returnplanned: formData.returnplanned,
                returnActual: formData.returnActual,
                dispenserPlanned: formData.dispenserPlanned,
                dispenserActual: formData.dispenserActual,
                upgradePlanned: formData.upgradePlanned,
                upgradeActual: formData.upgradeActual,
            }),
        };
        fetch(`http://10.93.0.198:5001/api/update/${date}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((success) => {
                console.log(success);


            })
            .catch((error) => {
                console.error("There was an error!", error);

            });

    }


    return (
        <div>
            <div>
                <div>
                <input
            className="dateSelection"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
                </div>

                <form className="Container" onSubmit={handleSubmit}>

                    <table className="tableData">
                        <thead>
                            <tr >
                                <th>Machine</th>
                                <th>Planned</th>
                                <th>Actual</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td className="title">Return</td>
                                <td><input className="Input" type="text" id="returnPlanned" name="returnPlanned" value={formData.returnplanned} onChange={handleChange} /></td>
                                <td><input className="Input" type="text" id="returnActual" name="returnActual" value={formData.returnActual} onChange={handleChange} /></td>
                                <td>
                                    <input
                                        className="Input"
                                        type="text"
                                        id="returnProgress"
                                        name="returnProgress"
                                        value={
                                            formData.returnplanned && formData.returnActual
                                                ? `${((formData.returnActual * 100) / formData.returnplanned).toFixed(
                                                    0
                                                )}%`
                                                : "0%"
                                        }
                                        readOnly
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td className="title">Dispenser</td>
                                <td><input className="Input" type="text" id="dispenserPlanned" name="dispenserPlanned" value={formData.dispenserPlanned} onChange={handleChange} /></td>
                                <td><input className="Input" type="text" id="dispenserActual" name="dispenserActual" value={formData.dispenserActual} onChange={handleChange} /></td>
                                <td><input 
                                className="Input" 
                                type="text" 
                                id="dispenserProgress" 
                                name="dispenserProgress" 
                                value={
                                    formData.dispenserPlanned && formData.dispenserActual
                                        ? `${((formData.dispenserActual * 100) / formData.dispenserPlanned).toFixed(
                                            0
                                        )}%`
                                        : "0%"
                                }
                                    readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="title">Upgrade</td>
                                <td><input className="Input" type="text" id="upgradePlanned" name="upgradePlanned" value={formData.upgradePlanned} onChange={handleChange} /></td>
                                <td><input className="Input" type="text" id="upgradeActual" name="upgradeActual" value={formData.upgradeActual} onChange={handleChange} /></td>
                                <td><input className="Input" type="text" id="upgradeProgress" name="upgradeProgress" value={
                                    formData.upgradePlanned && formData.upgradeActual
                                        ? `${((formData.upgradeActual * 100) / formData.upgradePlanned).toFixed(
                                            0
                                        )}%`
                                        : "0%"
                                }
                                    readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="submit">
                        <button className="submit" type="submit" onClick={handleChange}>save</button>
                        <button className="submit" type="submit" onClick={handleUpdate}>update</button>
                        
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Home;