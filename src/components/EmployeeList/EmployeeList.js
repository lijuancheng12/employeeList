import React, { useState, useEffect } from "react";
import styles from "./EmployeeList.module.scss";
import axios from "axios";
import image1 from "../../assets/elephant.png";
import image2 from "../../assets/bee.png";
import image3 from "../../assets/kitty.png";
import image4 from "../../assets/sloth.png";
import image5 from "../../assets/toad.png";
import image6 from "../../assets/beaver.png";
import EmployeeInfo from "../EmployeeInfo/EmployeeInfo";

const images = [image1, image2, image3, image4, image5, image6];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState(-1);
  const [placeHolderImages, setPlaceHolderImages] = useState([]);

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    return images[randomNumber];
  };

  const errorMessage = (
    <div className={styles.errorMessage}>
      Oops! something went wrong when fetching the data. This happens sometimes,
      please try to refresh the page
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      setShowErrorMessage(false);
      try {
        const result = await axios(
          "http://dummy.restapiexample.com/api/v1/employees"
        );
        setEmployees(result.data.data);
        setPlaceHolderImages(result.data.data.map(() => getRandomImage()));
      } catch (err) {
        setShowErrorMessage(true);
      }
    };
    fetchData();
  }, []);

  return showErrorMessage ? (
    errorMessage
  ) : (
    <div className={styles.container}>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee, index) => (
          <li key={employee.id}>
            <div className={styles.userLists}>
              <img
                src={employee.profile_image || placeHolderImages[index]}
                alt="Logo"
                className={styles.imageStyle}
              />

              {employee.employee_name}
              <button onClick={() => setEmployeeId(employee.id)}>
                Mer info
              </button>
            </div>
          </li>
        ))}
      </ul>
      {employeeId > -1 && (
        <EmployeeInfo
          employeeId={employeeId}
          closeMe={() => setEmployeeId(-1)}
          placeHolderImage={
            placeHolderImages[employees.findIndex((e) => e.id === employeeId)]
          }
        />
      )}
    </div>
  );
};

export default EmployeeList;
