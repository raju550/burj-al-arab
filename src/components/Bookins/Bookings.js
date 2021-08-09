import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loginInUser, setLoginInUser] = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/booking?email=" + loginInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  return (
    <div>
      <h1>Total book: {bookings.length}</h1>
      {bookings.map((book) => (
        <li key={book._id}>
          {book.name} email: {book.email} from: {book.checkIn} to:{" "}
          {book.checkOut}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
