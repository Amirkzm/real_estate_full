import { SearchBar } from "../../components/searchBar";
import CountUp from "react-countup";
import "./homePage.scss";
import { useState } from "react";
import Progressbar from "../../components/multiStepForm/Progressbar";
import { MultiStepForm } from "../../components/multiStepForm";

const Homepage = () => {
  const [showPlus, setShowPlus] = useState<boolean>(false);

  return (
    <div className="homepage">
      <div className="textContainer">
        <div className="wrapper">
          <h1>Find Real State & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus et tempore nemo itaque reiciendis ratione ullam
            sapiente repellat enim dicta obcaecati.
          </p>
          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h1 className="number">
                <CountUp start={0} end={16} duration={1} />
                <div className="plusSign">+</div>
              </h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1 className="number">
                <CountUp start={500} end={180} duration={1.5} />
              </h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1 className="number">
                <CountUp
                  start={500}
                  end={2000}
                  duration={2}
                  onEnd={() => setShowPlus(true)}
                />
                <div className="plusSign">+</div>
              </h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="/bg.png" alt="background_image" />
      </div>
    </div>
  );
};

export default Homepage;
