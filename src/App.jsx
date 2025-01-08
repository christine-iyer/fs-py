import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import ErrorBoundary from "./ErrorBoundary";
import Form from "./components/Form";
import List from "./components/List";

const App = () => (
     <QueryClientProvider client={queryClient}>
       <ErrorBoundary>
         <div>
           <h1>CRUD App</h1>
           <Form />
           <List />
         </div>
       </ErrorBoundary>
     </QueryClientProvider>
   );

export default App;
