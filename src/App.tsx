import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable, Column } from "./components/DataTable";

// User type for the table
interface User {
  name: string;
  age: number;
  address: string;
}

function App() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const data: User[] = [
    { name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
    { name: "Jim Green", age: 45, address: "London No. 1 Lake Park" },
    { name: "Joe Black", age: 28, address: "Sidney No. 1 Lake Park" },
  ];

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
    { key: "address", title: "Address", dataIndex: "address" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Front-End Assignment 
        </h1>

        {/* Form Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">
            InputField 
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="Your full name"
              variant="outlined"
              size="md"
            />

            <InputField
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage="Password is too weak"
              invalid
              variant="outlined"
              size="md"
            />

            <InputField
              label="Disabled Input"
              placeholder="Can't type here"
              disabled
              variant="filled"
            />

            <InputField
              label="Loading Input"
              placeholder="Fetching..."
              loading
              variant="ghost"
            />

            <InputField
              label="Clearable Input"
              placeholder="Type something..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              clearable
              variant="outlined"
            />
          </div>
        </section>

        {/* DataTable Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">
            DataTable
          </h2>

          <DataTable
            data={data}
            columns={columns}
            selectable="multiple"
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
