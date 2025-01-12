import { FC } from "react";
import Header from "../Header/Header";
import Actions from "./Actions";
import Comedy from "./Comedy";
import Historical from "./Historical";
import Documentary from "./Documentary";

const Catalog: FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col px-5 gap-12">
        <Actions />
        <Comedy />
        <Historical />
        <Documentary />
      </div>
    </>
  );
};
export default Catalog;
