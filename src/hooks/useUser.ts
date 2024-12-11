// src/hooks/useUser.ts
// Tra ve thong tin user dang dang nhap bao gom ca nickName, pictureUrl, email, accountId,token
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  nickName?: string;
  pictureUrl?: string;
  email: string;
  accountId: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        setError("No token found!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;
