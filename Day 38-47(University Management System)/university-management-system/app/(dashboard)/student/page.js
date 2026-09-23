"use client";

import { useState, useEffect } from "react";

const Page = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("/api/dashboard/student");
                const result = await response.json();
                console.log(result.data);
                setData(result.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        getData();
    }, []);
    return (
        <div>
            <h1>Student Dashboard</h1>

            <div>
                {/* <h2>Welcome, {data?.student.name}</h2>
                <p>Reg Number: {data?.student.registrationNumber}</p> */}
            </div>
        </div>
    )
}

export default Page
