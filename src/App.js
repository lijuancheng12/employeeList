import styles from "./App.module.scss";
import EmployeeList from "./components/EmployeeList/EmployeeList";

function App() {
  return (
    <div className={styles.app}>
      <EmployeeList />
    </div>
  );
}

export default App;
