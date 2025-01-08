import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const List = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["users"], () =>
    axios.get("http://localhost:5000/users").then((res) => res.data)
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/delete/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} ({user.age})
          <button onClick={() => deleteMutation.mutate(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
