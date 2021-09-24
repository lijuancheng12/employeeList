import React, { useState, useEffect } from "react";
import axios from "axios";
const EmployeeInfo = ({ employeeId }) => {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://dummy.restapiexample.com/api/v1/employee/${employeeId}`
      );

      setEmployee(result.data.data);
    };
    fetchData();
  });

  return (
    <div>
      <image src={employee.profile_image} alt="Logo" />
      {employee.profile_image}
      <div>{employee.employee_name}</div>
      <div>{employee.employee_salary}</div>
      <div>{employee.employee_age}</div>
    </div>
  );
};

export default EmployeeInfo;
