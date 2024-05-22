import styles from "./Calendar.module.css";
const Calendar = () => {
  return (
    <div className={styles.calendar}>
      <input type="datetime-local"></input>
    </div>
  );
};

export default Calendar;
