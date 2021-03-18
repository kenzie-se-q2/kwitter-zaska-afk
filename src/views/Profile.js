// import { render } from "@testing-library/react";
import React from "react";
import {useState, useEffect} from 'react';
import Menu from "../components/Menu";


const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img for="photo-upload" src={src}/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/> 
  </label>


const Name =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="name">
      name:
    </label>
    <input 
      id="name" 
      type="text" 
      onChange={onChange} 
      maxlength="25" 
      value={value} 
      placeholder="Alexa" 
      required/>
  </div>

  
const Status =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="status">
      status:
    </label>
    <input 
      id="status" 
      type="text" 
      onChange={onChange} 
      maxLength="35" 
      value={value} 
      placeholder="It's a nice day!" 
      required/>
  </div>


const Profile =({
  onSubmit,
  src,
  name,
  status,
})=>
  <div className="card">
    <form onSubmit={onSubmit}>
    <Menu />
      <label className="custom-file-upload fas">
        <div className="img-wrap" >
          <img width="200px" for="photo-upload" src={src}/>
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">Edit Profile </button>
    </form>
  </div>
     
      
const Edit =({
  onSubmit,
  children,
})=>
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Kwitter Profile Page</h1>
        {children}
      <button type="submit" className="save">Save </button>
    </form>
  </div>

function ProfilePage(props) {

  //This is are the states that will take in the information of the user 
  const [user, setUser] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isActive, setIsActive] = useState("profile")

  //this is an example/place holder for now 
  //ideally we will run this with props.user etc from props that is passed into the component
  //
  useEffect(() => {
    setUser("Rosie")
    setImageUrl("https://s3.amazonaws.com/cdn.edmundsroses.com/images/popup/24081.jpg")
    setUserStatus("Have a Nice Day")
  },[])

  //handles the image upload 
  function photoUpload(event){
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImageUrl(
      reader.result
    );
    }
    reader.readAsDataURL(file);
  }

  //handles the edit of user's name 
  function editName(event){
    const name = event.target.value;
    setUser(name);
  }
  
  //handles the edit of user status
  function editStatus(event) {
    const status = event.target.value;
    setUserStatus(status);
  }
  
  //handles the submit 
  function handleSubmit(event){
    let activeP = event.target.active === 'edit' ? 'profile' : 'edit';
    setIsActive(activeP)
  }

  //here is where the component's created above will be run passing in the 
  //states that we pull from props in useEffect funtion in this component
  return (
    <>
      <div className="profilebody">
        
          {(isActive === 'edit')?(
          <Edit onSubmit={(event)=>handleSubmit(event)}>
            <ImgUpload onChange={(event)=>photoUpload(event)} src={imageUrl}/>
            <Name onChange={(event)=>editName(event)} value={user}/> 
             <Status onChange={(event)=>editStatus(event)} value={userStatus}/>
          </Edit> 
          ):
          (<Profile 
            onSubmit={(event)=>handleSubmit(event)} 
            src={imageUrl} 
            name={user} 
            status={userStatus}
            /> )
          }
      </div>    
   </>
  )
        }     


export default ProfilePage; 