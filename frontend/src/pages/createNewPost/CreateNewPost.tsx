import { useState } from "react";
import MultiStepForm from "../../components/multiStepForm/MultiStepForm";
import { BasicInfo, DetailsInfo, LocationInfo } from "./formsSteps";
import { LatLngExpression } from "leaflet";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useToastifyResponse } from "../../hooks";
import "react-quill/dist/quill.snow.css";
import "./createNewPost.scss";
import { useNavigate } from "react-router-dom";

const CreateNewPost: React.FC = () => {
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngExpression | null>(null);
  const navigate = useNavigate();

  const [image, setImage] = useState<any[]>([]);
  const maxNumber = 4;

  const toastifyResponse = useToastifyResponse({ endpoint: "/posts" });

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    console.log();
    setImage(imageList as any);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    const formInputs = new FormData(e.target);
    const inputs = Object.fromEntries(formInputs);

    const dataToSend = {
      title: inputs.title,
      price: parseInt(String(inputs.price)),
      address: inputs.address,
      city: inputs.city,
      bedroom: parseInt(inputs.bedroom as string),
      bathroom: parseInt(String(inputs.bathroom)),
      type: inputs.type,
      property: inputs.property,
      latitude: String(
        (selectedLocation as LatLngExpression & { lat: number; lng: number })
          ?.lat
      ),
      longitude: String(
        (selectedLocation as LatLngExpression & { lat: number; lng: number })
          ?.lng
      ),
      postDetails: {
        description: description,
        utilities: inputs.utilities,
        pet: inputs.pet,
        income: inputs.income,
        size: parseInt(String(inputs.size)),
        school: parseInt(String(inputs.school)),
        bus: parseInt(String(inputs.bus)),
        restaurant: parseInt(String(inputs.restaurant)),
      },
    };

    formData.append("data", JSON.stringify(dataToSend));

    image.forEach((img, index) => {
      formData.append("images", img.file);
    });

    toastifyResponse({
      data: formData,
    });
  };

  return (
    <div className="createNewPost">
      <div className="left">
        <MultiStepForm activeStep={0} onSubmit={handleSubmit}>
          <MultiStepForm.Step title="Basic Info">
            <BasicInfo value={description} setValue={setDescription} />
          </MultiStepForm.Step>
          <MultiStepForm.Step title="Location Info">
            <LocationInfo onSelectLocation={setSelectedLocation} />
          </MultiStepForm.Step>
          <MultiStepForm.Step title="Other Details">
            <DetailsInfo />
          </MultiStepForm.Step>
        </MultiStepForm>
      </div>
      <div className="right">
        <h2>Upload Images</h2>
        <div className="App">
          <ImageUploading
            value={image}
            onChange={onChange}
            maxNumber={maxNumber}
            multiple
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
                <div className="uploadedImageWrapper">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button
                          onClick={() => onImageRemove(index)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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

export default CreateNewPost;
