import React, { useContext, useEffect } from "react";
import Contact from "../contacts/Contact";
import AuthContext from "../../context/auth/authContext";
import ContacttForm from "../contacts/ContacttForm";
import ContactsFilter from "../contacts/ContactsFilter";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContacttForm />
      </div>
      <div>
        <ContactsFilter />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
