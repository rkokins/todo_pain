import React, { useState } from "react";
import "./styles.css";

function Form(props) {
  async function getData(e) {
    e.preventDefault();
    const firstNameField = e.target.children[0];
    const lastNameField = e.target.children[1];
    if (
      !(props.prevFirstName === firstNameField.value) &&
      !(PopStateEvent.prevLastName === lastNameField.value)
    ) {
      props.setFirstName(firstNameField.value);
      props.setLastName(lastNameField.value);
      const data = await fetch(props.url);
      const data_json = await data.json();
      props.setApiData(data_json.results[0]);
    }
  }

  return (
    <form onSubmit={getData} className="form">
      <input type="text" id="firstname" placeholder="firstname" />
      <input type="text" id="lastname" placeholder="lastname" />
      <button type="submit">Generate new User</button>
    </form>
  );
}

function Profile({ apiData, firstName, lastName }) {
  const { phone, email, picture } = apiData;
  return (
    <div className="profile-container">
      <img src={picture.medium} />
      <div className="name">
        {firstName} {lastName}
      </div>
      <div>{phone}</div>
      <div>{email}</div>
    </div>
  );
}

export default function App() {
  const apiURL = "https://randomuser.me/api/";
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [apiData, setApiData] = useState();

  return (
    <div className="App">
      <h1>Random Profile Generator</h1>
      <Form
        prevFirstName={firstName}
        prevLastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setApiData={setApiData}
        url={apiURL}
      />
      {firstName && lastName && apiData && (
        <Profile firstName={firstName} lastName={lastName} apiData={apiData} />
      )}
    </div>
  );
}
