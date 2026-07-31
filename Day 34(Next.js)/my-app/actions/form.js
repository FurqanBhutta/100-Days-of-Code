"use server"

export const submitAction = async(formData)=>{
     const data = {
    name: formData.get("name"),
    address: formData.get("address"),
  };
    const a = await fetch("http://localhost:3000/api/add", {method: "POST", headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    const res = await a.json();
    console.log(res)
  }