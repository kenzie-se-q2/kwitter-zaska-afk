import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";



//fetch request for user data from the api

//should fetch user picture
//should fetch user's username
//should show the message text


function UserCard() {
    return (
      <div className="UserCard">
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar_url} />
            <Card.Body>
              <Card.Title>{props.user.username}</Card.Title>
              <Card.Text>
                <div>{user.name}</div>
                
              </Card.Text>
              <Button onClick={toggleButton}>Show User</Button>
            </Card.Body>
          </Card>
      </div>
    )
  }
  
  export default UserCard

