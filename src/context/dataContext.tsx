import { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
  fullName: string;
  id: string;
  userEmail: string;
  bestScore: number;
  previousScore: number;
}

interface DataContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("http://localhost:3001/protected", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.message === "Authenticated") {
        console.log(data.user);
        return setUser(data.user);
      }
      setUser(undefined);
      localStorage.removeItem("token");
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
