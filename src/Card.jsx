import React, { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function Card() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          "https://randomuser.me/api/?page=1&results=1&seed=abc"
        );
        const data = res.data.results[0];
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-gray-600 font-semibold">Loading...</p>
      ) : (
        <div className="p-5 flex flex-row rounded-lg shadow-lg bg-white">
          <div className="rounded-lg overflow-hidden">
            <img
              className="rounded-lg "
              src={user.picture.large}
              alt="profile-pic"
            />
          </div>
          <div className="ml-4">
            <div>
              <p className="text-xl font-semibold">
                {user.name.first} {user.name.last}
              </p>
              <p className="text-gray-600 capitalize">
                {user.gender}
                <span className="text-gray-600 ml-2">
                  {formatDate(user.dob.date)}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 ">{user.email}</p>
              <p className="text-gray-600">{user.cell}</p>
            </div>
            <p className="text-gray-600 italic">
              {user.location.state}, <span>{user.location.country}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
