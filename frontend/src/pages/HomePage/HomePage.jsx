import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <h2 data-aos="fade-up">Custom smart assistants</h2>
              <blockquote data-aos="fade-up" data-aos-delay="100">
                <p>Embrace virtual assistant technologies to enhance user experience and eliminate repetitive tasks, letting your team focus on what truly matters.</p>
              </blockquote>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <Link to="/login" className="btn-get-started">Get Started</Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
