import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const EditUserPage = () => {
  const url = "http://localhost:8081/user/editUser";
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setValues] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
  });

  const favoriteUrl = "http://localhost:8081/userFav/userFavorite";
  useEffect(() => {
    fetchStations();
    setValues({ userId: getUserInfo().id });
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch(
        "https://api-v3.mbta.com/stops?filter[route_type]=1"
      );
      const data = await response.json();
      setStations(
        data.data.map((station) => ({
          id: station.id,
          name: station.attributes.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching stations:", error);
      // Handle error
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...form, [input.id]: input.value });
    if (!!errors[input]) {
      setErrors({
        ...errors,
        [input]: null,
      });
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const { data: res } = await axios.post(url, form);
        const { accessToken } = res;
        localStorage.setItem("accessToken", accessToken);
        setSuccessMessage("successful!");
        setErrors({});
        navigate("/privateuserprofile");
      } catch (error) {
        if (
          error.response &&
          error.response.status != 409 &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          window.alert(error.response.data.message);
        }
        if (error.response && error.response.status === 409) {
          setErrors({ name: "Username is taken, pick another" });
        }
      }
    }
  };

  const handleFavoriteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(favoriteUrl, {
        user: form.userId,
        stationId: selectedStation,
      });
      setSuccessMessage("Favorite station updated successfully!");
      // Clear errors after successful update
      setErrors({});
    } catch (error) {
      console.error("Error updating favorite station:", error);
      if (error.response && error.response.status === 409) {
        setErrors({ station: "Station update failed, please try again" });
      }
    }
  };

  const findFormErrors = () => {
    const { username, email, password } = form;
    const newErrors = {};
    if (!username || username === "") newErrors.name = "Input a valid username";
    else if (username.length < 6)
      newErrors.name = "Username must be at least 6 characters";
    if (!email || email === "") newErrors.email = "Input a valid email address";
    if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Input a valid email address";
    if (!password || password === "")
      newErrors.password = "Input a valid password";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleCancel = () => {
    navigate("/privateuserprofile");
  };

  return (
    <div>
      <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Title>Edit User Information</Card.Title>
        <Card.Body>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <Form onSubmit={handleUserSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                id="username"
                value={form.username}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new email address"
                id="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new password"
                id="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update User Info
            </Button>
          </Form>

          <hr />

          <Form onSubmit={handleFavoriteSubmit}>
            <Form.Group className="mb-3" controlId="formFavorite">
              <Form.Label>Select a Favorite Station</Form.Label>
              <Form.Select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                isInvalid={!!errors.station}
              >
                <option value="">Select a Favorite Station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.station}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Favorite Station
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditUserPage;
