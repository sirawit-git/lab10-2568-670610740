import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState, useEffect } from "react";
export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);

  useEffect(() => {
    const savedAmount = localStorage.getItem("genAmount");
    if (savedAmount) {
      setGenAmount(Number(savedAmount));
    }
  }, []);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const rawUsers = resp.data.results;
    const cleanedUsers = rawUsers.map((u: any) => cleanUser(u));
    setUsers(cleanedUsers);

  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => {
            const value = Number(event.target.value);
            setGenAmount(value);
            localStorage.setItem("genAmount", value.toString());
          }}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      
      {users.length > 0 && !isLoading && users.map((user) => (
        <UserCard key={user.email} {...user} />
      ))}
    </div>
  );
}
