import React, { useState, useEffect } from "react";
import EnhancedTable from "../components/Table";
import axios from "axios";
import { LIST_USER_URL } from "../constant/Constants";

const ListUsers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      (async () => {
            const result = await axios(LIST_USER_URL);
            setData(result.data.data);
      })();
    }, []);

    return (
        <div className="users">
            <EnhancedTable tableData={data}/>
        </div>
    )
};

export default ListUsers;