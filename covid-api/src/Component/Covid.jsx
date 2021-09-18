import { useState } from "react";
import axios from "axios";
import "./Covid.css"

function Covid() {
    const [text, setText] = useState();
    const [data, setData] = useState([]);
    const [date, setDate] = useState();
    const [month, setMonth] = useState();

    const handleSearch = async () => {
        console.log(text);
        const res = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${text}&date=${date}-${month}-2021`)
            .then((res) => {
                setData(res.data.sessions);
                console.log(res.data.sessions);
                console.log("set", data);
        })
    }
    return (
        <div>
            <div>
                <h1>Covid Vaccine App</h1>
                <input type="Number" value={text} onChange={(e) => {
                    setText(e.target.value);
                }} placeholder="Enter District Id" />
                <br />
              
                <input type="Number" value={date} onChange={(e) => {
                    setDate(e.target.value);
                }} placeholder="Date" className="date"/>
                
                <input type="Number" value={month} onChange={(e) => {
                    setMonth(e.target.value);
                }} placeholder="Month" className="date"/>
                <br />
                
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                {
                    data.map((e) => {
                        return (
                            <div className="dataBox">
                                 <h4>{e.vaccine}</h4>
                                <p>{e.address}</p>
                                {
                                    e.slots.map((el) => {
                                        return (
                                            <p>{el}</p>
                                        )
                                    })
                                  }
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    );
}

export default Covid;