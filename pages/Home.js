import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <h1>
            Learn from Verified Alumni.<br/>
            Prepare Smarter for Placements
          </h1>

          <p>
            Real interview questions, mentorship, and guidance from alumni
            working in top companies.
          </p>

          <button className="hero-btn" onClick={() => navigate("/login")}>
            Join Now
          </button>

        </div>


        {/* RIGHT SIDE CIRCULAR IMAGES */}

        <div className="hero-right">

          <img className="circle c1" src="https://thumbs.dreamstime.com/b/amazon-logo-white-background-montreal-canada-july-printed-paper-98221126.jpg" />
          <img className="circle c2" src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" />
          <img className="circle c3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIxNRkJ5AbAMjNaWdVVczUO9dM-I57nMM3A&s" />
          <img className="circle c4" src="https://i.pinimg.com/736x/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.jpg" />
          <img className="circle c5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png" />

        </div>

      </section>

      {/* STATS */}

      <section className="stats">

        <div className="stat">
          <h2>500+</h2>
          <p>Students Placed</p>
        </div>

        <div className="stat">
          <h2>120+</h2>
          <p>Alumni Mentors</p>
        </div>

        <div className="stat">
          <h2>80+</h2>
          <p>Partner Companies</p>
        </div>

      </section>


      {/* SUCCESS STORIES */}

      <section className="success-stories">

        <h2>Our Successful Alumni</h2>

        <div className="card-container">

          <div className="student-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/063/405/498/small/happy-young-female-student-holding-book-at-transparent-background-png.png" />
            <h3>Riya Sharma</h3>
            <h4>Placed at Google</h4>
            <p>"Practicing real interview questions here helped me crack my dream company."</p>
          </div>

          <div className="student-card">
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTA2L3Jhd3BpeGVsb2ZmaWNlN19hX3Bob3RvX29mX2luZGlhbl9zdHVkZW50X2JveV9zbWlsaW5nX2hvbGRpbmdfYV9kYjk3MjdkMi0zOTQ4LTQ2ZmUtYjM1OS0wNWQxZGQwMjM2YzZfMS5qcGc.jpg" />
            <h3>Arjun Mehta</h3>
            <h4>Placed at Amazon</h4>
            <p>"The alumni guidance gave me the confidence to clear technical interviews."</p>
          </div>

          <div className="student-card">
            <img src="https://as1.ftcdn.net/jpg/16/29/23/86/1000_F_1629238664_tR6VNwQX46P22tmv9Tz2p2lDuLAAVbvU.jpg" />
            <h3>Sneha Kapoor</h3>
            <h4>Placed at Microsoft</h4>
            <p>"Real experiences from seniors helped me understand the interview process."</p>
          </div>

          <div className="student-card">
            <img src="https://static.vecteezy.com/system/resources/previews/051/688/995/non_2x/smiling-young-male-university-student-standing-isolate-on-transparency-background-png.png" />
            <h3>Rahul Verma</h3>
            <h4>Placed at TCS</h4>
            <p>"This platform helped me prepare smarter and stay focused."</p>
          </div>

        </div>

      </section>


      {/* COMPANIES */}

      <section className="companies">
        <h2>Companies Our Alumni Work At</h2>

        <div className="company-slider">
          <div className="slide-track">

            <div className="company-card">
              <img src="https://thumbs.dreamstime.com/b/amazon-logo-white-background-montreal-canada-july-printed-paper-98221126.jpg" alt="Amazon" />
              <p>Amazon</p>
            </div>

            <div className="company-card">
              <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" alt="Google" />
              <p>Google</p>
            </div>

            <div className="company-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png" alt="Microsoft" />
              <p>Microsoft</p>
            </div>

            <div className="company-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xCg02XFwPFNnYxlm1a1WT2q5PpQQ-lr0Kg&s" alt="TCS" />
              <p>TCS</p>
            </div>

            <div className="company-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png" alt="Infosys" />
              <p>Infosys</p>
            </div>

            <div className="company-card">
              <img src="https://i.pinimg.com/736x/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.jpg" alt="Flipkart" />
              <p>Flipkart</p>
            </div>

            <div className="company-card">
              <img src="https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/nvidia-og-image-white-bg-1200x630.jpg" alt="Nvidia" />
              <p>Nvidia</p>
            </div>

            <div className="company-card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Blinkit-yellow-rounded.svg" alt="Blinkit" />
              <p>Blinkit</p>
            </div>

            <div className="company-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnIxNRkJ5AbAMjNaWdVVczUO9dM-I57nMM3A&s" alt="J.P.Morgan" />
              <p>J.P.Morgan</p>
            </div>

            <div className="company-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDHp1ZE4PZ5AqLnBOrPwIJjd2g72f3ZVr5dw&s" alt="TATA" />
              <p>TATA</p>
            </div>

          </div>
        </div>
      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-section">
            <h3>Career Connect</h3>
            <p>Connecting students with alumni to prepare smarter for placements.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/questions">Question Bank</a></li>
              <li><a href="/alumni">Alumni</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: careerconnect@email.com</p>
            <p>University Placement Support Platform</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Career Connect. All rights reserved.</p>
        </div>

      </footer>

    </div>
  );
}

export default Home;