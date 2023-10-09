import styles from "./Sandbox.module.scss";
import classname from "classnames/bind";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchURL } from "@modules/root/webservice/WebserviceUtils";
import { WEBSERVICE_METHOD } from "@modules/root/webservice/WebserviceTypes";

const cx = classname.bind({...styles});
const Sandbox: FC = () => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const handleFetchOnClick = () => {
    // const data =  fetchURL("reqres.in/api/users");
    // const data =  fetchURL("reqres.in/api/users", undefined, undefined,undefined, "/23");\
    const request = {
      name: "user1",
    }
    fetchURL("reqres.in/api/users", request, WEBSERVICE_METHOD.POST);
  }

  const handleSagaTest = () => {
    return;
  }
  const renderComponent = () => {
        return( 
        <>
          Sandbox
          <button onClick={() => handleFetchOnClick()}> Click here for fetch</button>
          <button onClick={() => handleSagaTest()}> Click here for Saga Testing</button>
        </>
        );
  }

  return renderComponent();
}

export default Sandbox;