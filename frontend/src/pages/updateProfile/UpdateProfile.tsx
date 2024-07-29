import React from "react";
import { Button } from "../../components/button";
import { useUser } from "../../context/userProvider";
import "./updateProfile.scss";
import { usePostData } from "../../hooks";
import { UserType } from "../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import ImageUploading, { ImageListType } from "react-images-uploading";

const UpdateProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { isError, errorMessage, isLoading, postData } = usePostData(
    `/users/${user?.id}`,
    "PUT"
  );

  const [image, setImage] = React.useState<any[]>([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImage(imageList as any);
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const { username, email, password } = Object.fromEntries(formData);
    console.log({ username, email, password });

    const res = await postData({ username, email, password });
    if (res?.status === 200) {
      setUser(res.data.data as UserType);
      navigate("/profile");
    }
  };

  const avatarUploadHandler = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("avatar", image[0].file);
    console.log("image", image[0]);

    console.log("formData", formData);
    const res = await postData(formData);
    if (res?.status === 200) {
      setUser(res.data.data as UserType);
    }
  };

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
            {isError && <div className="error">{errorMessage}</div>}
            <Button disabled={isLoading}>Update informations</Button>
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
