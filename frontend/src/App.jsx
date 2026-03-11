import { useState } from "react";
import API from "./api";
import "./index.css";

function App() {

  const [file,setFile] = useState(null);
  const [email,setEmail] = useState("");
  const [status,setStatus] = useState("");
  const [type,setType] = useState("");

  const handleSubmit = async () => {

    if(!file || !email){
      setStatus("Please upload file and enter email");
      setType("error");
      return;
    }

    const formData = new FormData();

    formData.append("file",file);
    formData.append("email",email);

    try{

      setStatus("Generating insights...");
      setType("loading");

      await API.post("/upload",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      setStatus("Summary sent successfully!");
      setType("success");

    }catch(error){

      setStatus("Error generating summary");
      setType("error");

    }

  };

  return (

    <div className="container">

      <h1>Sales Insight Automator</h1>
      <p className="subtitle">
        Upload sales data and receive AI-powered insights instantly
      </p>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <input
        type="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Generate Insights
      </button>

      <p className={`status ${type}`}>
        {status}
      </p>

    </div>
  );
}

export default App;