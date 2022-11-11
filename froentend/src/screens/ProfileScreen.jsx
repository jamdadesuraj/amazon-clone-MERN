import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../redux/actions/userAction";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { getMyOrderList } from "../redux/actions/orderAction";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const ordersList = useSelector((state) => state.ordersList);
  const { loading: loadingOrders, orders, error: errorOrders } = ordersList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrderList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //  dispatch
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">profile updated</Message>}
      {loading && <Loader />}
      {message && <Message>{message}</Message>}
      <Row>
        <Col md={3}>
          <h2>update user profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>my orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <Table striped responsive bordered hover className="teble-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>PAID</td>
                  <td>DELIVRED</td>
                  <td>TOTAL</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fa fas-time"></i>
                      )}
                    </td>
                    <td>
                      {order.isDeliverd ? (
                        order.deliverAt.substring(0, 10)
                      ) : (
                        <i className="fa fas-time"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
