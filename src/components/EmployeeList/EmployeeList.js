import React, { useState, useEffect } from "react";
import styles from "./EmployeeList.module.scss";
import axios from "axios";
import image1 from "../../assets/elephant.png";
import image2 from "../../assets/bee.png";
import image3 from "../../assets/kitty.png";
import image4 from "../../assets/sloth.png";
import image5 from "../../assets/toad.png";
import image6 from "../../assets/beaver.png";

const images = [image1, image2, image3, image4, image5, image6];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://dummy.restapiexample.com/api/v1/employees"
      );

      setEmployees(result.data.data);
    };
    fetchData();
  }, []);

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    return images[randomNumber];
  };

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          <img
            src={employee.profile_image || getRandomImage()}
            alt="Logo"
            className={styles.imageStyle}
          />

          {employee.employee_name}
          <button>Mer info</button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
