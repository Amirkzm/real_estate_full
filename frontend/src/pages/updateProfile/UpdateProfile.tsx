import React from "react";
import { Button } from "../../components/button";
import { useUser } from "../../context/userProvider";
import "./updateProfile.scss";
import { useToastifyResponse } from "../../hooks";
import { useNavigate } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { prepareUserObj } from "../../lib/utils";

const UpdateProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const toastifyResponse = useToastifyResponse({
    endpoint: `/users/${user?.id}`,
    reqMethod: "PUT",
    onSuccess: (res) => {
      setUser(prepareUserObj(res?.data.data));
      navigate("/profile");
      return "Profile updated successfully!";
    },
  });

  const [image, setImage] = React.useState<any[]>([]);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType) => {
    setImage(imageList as any);
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const { username, email, password } = Object.fromEntries(formData);
    console.log({ username, email, password });

    toastifyResponse({ data: { username, email, password } });
  };

  const avatarUploadHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("avatar", image[0].file);

    toastifyResponse({ data: formData });
  };

  console.log(user);

  return (
    <div className="profileUpdate">
      <div className="left">
        <div className="formContainer">
          <h1>Update Profile</h1>
          <form onSubmit={formSubmitHandler}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={user?.username}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user?.email}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="false"
            />
            <Button>Update informations</Button>
          </form>
        </div>
      </div>
      <div className="right">
        <img
          src={user?.avatar ? user.avatar : "/no-profile.png"}
          className="largeProfileImage"
        />
        <div className="App">
          <ImageUploading
            value={image}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="uploadImageWrapper">
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button
                        onClick={avatarUploadHandler}
                        className="submit-btn"
                        type="button"
                      >
                        submit
                      </button>
                      <button
                        onClick={() => onImageRemove(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="uploadImageButton"
                >
                  <img
                    src="/upload.png"
                    alt="upload-image"
                    className="uploadImageIcon"
                  />
                </button>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
