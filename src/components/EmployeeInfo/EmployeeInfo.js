import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeInfo.module.scss";

const EmployeeInfo = ({ employeeId, closeMe, placeHolderImage }) => {
  const [employee, setEmployee] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const closeButton = () => {
    closeMe();
  };

  useEffect(() => {
    const fetchData = async () => {
      setShowErrorMessage(false);
      setIsLoading(true);
      try {
        const result = await axios(
          `http://dummy.restapiexample.com/api/v1/employee/${employeeId}`
        );
        setEmployee(result.data.data);
        setIsLoading(false);
      } catch (err) {
        setShowErrorMessage(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [employeeId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <div className={styles.btn}>
          <div className={styles.closeBtn} onClick={closeButton}>
            <span className={styles.left}>
              <span class={styles.circleLeft}></span>
              <span class={styles.circleRight}></span>
            </span>
            <span className={styles.right}>
              <span className={styles.circleLeft}></span>
              <span className={styles.circleRight}></span>
            </span>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loading}>Loading ...</div>
        ) : showErrorMessage ? (
          <div className={styles.errorMessage}>
            Oops! something went wrong when fetching the data. This happens
            sometimes, please try to close the popup and open it again!
          </div>
        ) : (
          <div className={styles.employeeInfo}>
            <div className={styles.employeeName}>{employee.employee_name}</div>
            <div>
              <img
                src={employee.profile_image || placeHolderImage}
                alt="Logo"
                className={styles.profileImage}
              />
            </div>
            <div>
              <div className={styles.text}>
                Salary:
                <span className={styles.textR}>{employee.employee_salary}</span>
              </div>
              <div className={styles.text}>
                Age :
                <sapn className={styles.textR}>{employee.employee_age}</sapn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInfo;
