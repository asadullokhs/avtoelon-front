// src/pages/Profile/Profile.js
import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useInfoContext } from "../../context/Context";
import { getOne, updateUser } from "../../api/userRequests";
import userImage from "../../images/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const { exit, currentUser, setCurrentUser } = useInfoContext();

  useEffect(() => {
    const fetchUser = async () => {
      let res = await getOne(currentUser._id);
      setUser(res.data.user[0]);
      setCars(res.data?.user[0]?.cars);
    };

    fetchUser();
  }, [currentUser]);

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     toast.loading("Please wait...")
    const formDate = new FormData(e.target);
    const res = await updateUser(currentUser._id,formDate)
    
    setCurrentUser(res?.data?.user);
    localStorage.setItem("profile", JSON.stringify(res?.data.user));
    toast.dismiss();
    toast.success(res.data.message)
    e.target.reset()
   } catch (error) {
    toast.dismiss();
    toast.error(error)
    console.log(error);
   }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div
            className="d-flex justify-content-center"
            style={{ gap: "150px" }}
          >
            <Loading />
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="profile-page">
      <div className="container flex-dad">
        <div className="sidebar">
          <img
            src={user.avatar ? user.avatar.url : userImage}
            alt={`${user.firstname} ${user.lastname}`}
            className="profile-image"
          />
          <h2 className="profile-name">
            {user.firstname} {user.lastname}
          </h2>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
          <p className="profile-date">Joined on {formattedDate}</p>
          <div className="d-flex" style={{justifyContent:"center"}}>
          <button className="logout-button" onClick={exit}>
            Logout
          </button>
          <button className="exit-button mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
          </button>
          </div>
        </div>
        <div className="main-content">
         <div className="d-flex justify-content-between px-3">
         <h2 className="section-title">User's Cars</h2>
         <Link to={'/add'} className="section-title" style={{textDecoration:"none"}}>+</Link>
         </div>
          <div className="cars-list">
            {cars.length > 0 ? (
              cars.map((car) => (
                <div key={car._id} className="car-item_set">
                  <img src={car?.image?.url} alt={car.title} className="car-image_set" />
                  <div className="car-details">
                    <h3 className="car-title">{car.title}</h3>
                    <p className="car-price">{car.price} $</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="def-text">You don't have cars</p>
            )}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit {user?.firstname}'s info
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="update">
                  <input type="text" defaultValue={user.firstname} className="form-control my-3" name="firstname" />
                  <input type="text" defaultValue={user.lastname} className="form-control my-3" name="lastname" />
                  <input type="email" defaultValue={user.email} className="form-control my-3" name="email" />
                  <input type="file" className="form-control my-3" name="avatar" />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <input type="submit"  data-bs-dismiss="modal" form="update" className="btn btn-primary" value={'Save changes'}/>             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
