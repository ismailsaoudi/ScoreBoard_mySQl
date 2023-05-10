import { useState } from "react";
import ReactDOM from 'react-dom';
import "../Home/home.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchRecord from "./searchRecord";




function Home() {

    const openSearchPopup = () => {
        const searchPopup = window.open("", "Search Record", "width=800,height=600");
        searchPopup.document.body.innerHTML = "<div id='search-record'></div>";
        ReactDOM.render(<SearchRecord />, searchPopup.document.getElementById("search-record"));
      };

    
    
    const [date] = useState("");
    const [formData, setFormData] = useState({
        date: "",
        returnPlanned: "",
        returnActual: "",
        dispenserPlanned: "",
        dispenserActual: "",
        upgradePlanned: "",
        upgradeActual: "",
    });
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
                toast.success(`everything is saved!`)

            })
            .catch((error) => {
                console.error("There was an error!", error);
                toast.error("make sure All inputs are Entered !");
            });
    };
    const handleUpdate = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: formData.date,
                returnPlanned: formData.returnPlanned,
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
                toast.success(`Update success !`)

            })
            .catch((error) => {
                console.error("There was an error!", error);
                toast.error(`make sure all fields are filled !`)
            });
       
    }

   
    return (
<div>
        <div>
            <ToastContainer className="Toast"
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                font-size="1rem"
                padding="4px" />
            <div>
                <input
                    className="dateSelection"
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
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
                            <td><input className="Input" type="text" id="returnPlanned" name="returnPlanned" value={formData.returnPlanned} onChange={handleChange} /></td>
                            <td><input className="Input" type="text" id="returnActual" name="returnActual" value={formData.returnActual} onChange={handleChange} /></td>
                            <td>
                                <input className="Input" type="text" id="returnProgress" name="returnProgress" value={((formData.returnActual*100)/formData.returnPlanned).toFixed(0) + "%"} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">Dispenser</td>
                            <td><input className="Input" type="text" id="dispenserPlanned" name="dispenserPlanned" value={formData.dispenserPlanned} onChange={handleChange} /></td>
                            <td><input className="Input" type="text" id="dispenserActual" name="dispenserActual" value={formData.dispenserActual} onChange={handleChange} /></td>
                            <td>
                                <input className="Input" type="text" id="diespenserProgress" name="dispenserProgress" value={((formData.dispenserActual*100)/formData.dispenserPlanned).toFixed(0) + "%"} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">Upgrade</td>
                            <td><input className="Input" type="text" id="upgradePlanned" name="upgradePlanned" value={formData.upgradePlanned} onChange={handleChange} /></td>
                            <td><input className="Input" type="text" id="upgradeActual" name="upgradeActual" value={formData.upgradeActual} onChange={handleChange} /></td>
                            <td><input className="Input" type="text" id="upgradeProgress" name="upgradeProgress" value={((formData.upgradeActual*100)/formData.upgradePlanned).toFixed(0) + "%"} readOnly />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit">
                    <button className="submit" type="submit" onClick={handleChange}>save</button>
                    <button className="submit" type="submit" onClick={handleUpdate}>update</button>
                    <button onClick={openSearchPopup}>Search Record</button>
                </div>
            </form>
        </div>
        

</div>
    )

};
export default Home;