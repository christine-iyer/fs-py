import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData) => axios.post("http://localhost:5000/create", newData),
    {
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    }
  );

  const handleSubmit = (e) => {
     e.preventDefault();
     if (!name || !age) {
       alert("Name and Age are required");
       return;
     }
     mutation.mutate({ name, age });
     setName("");
     setAge("");
   };
   

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
