import "./about.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="left">
        <section className="hero">
          <div className="container">
            <h1>About Us</h1>
            <p>Welcome to our Real Estate Agency</p>
          </div>
        </section>
        <section className="mission">
          <div className="container">
            <h2>Our Mission</h2>
            <p>
              We aim to provide the best real estate services, helping our
              clients to buy, sell, and rent properties with ease and
              confidence.
            </p>
          </div>
        </section>
        <section className="team">
          <div className="container">
            <h2>Meet Our Team</h2>
            <div className="team-members">
              <div className="team-member ceo">
                <img src="/ceo-profile.png" alt="Team Member Name" />
                <h3>John Doe</h3>
                <p>CEO</p>
              </div>
              <div className="team-member">
                <img src="/agent-profile.png" alt="Team Member Name" />
                <h3>Jane Smith</h3>
                <p>Real Estate Agent</p>
              </div>
            </div>
          </div>
        </section>
        <section className="contact">
          <div className="container">
            <h2>Contact Us</h2>
            <p>Get in touch with us for any queries or support.</p>
            <p>Email: info@realestateagency.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </section>
      </div>
      <div className="right">
        <img src="/about.jpg" alt="Real Estate Agency" />
      </div>
    </div>
  );
};

export default About;
