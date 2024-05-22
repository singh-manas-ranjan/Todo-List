import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import styles from "./ZoomController.module.css";

interface Props {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}
const ZoomController = ({ handleZoomIn, handleZoomOut }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.btnContainer} onClick={handleZoomOut}>
        <CiCircleMinus size={40} />
      </span>
      <span className={styles.btnContainer} onClick={handleZoomIn}>
        <CiCirclePlus size={40} />
      </span>
    </div>
  );
};

export default ZoomController;
