import { LineWave } from "react-loader-spinner";
import { loader } from "./loader.module.css";
export default function Loader() {
  return (
    <div className={loader}>
      <LineWave
        visible={true}
        height="120"
        width="120"
        color="#FF6200"
        ariaLabel="line-wave-loading"
      />
    </div>
  );
}
