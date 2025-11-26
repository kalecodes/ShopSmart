import "./AboutPage.css";
import placeholder from "../assets/placeholder_image.png"

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-top-section">
        <h1 className="about-title">ShopSmart</h1>
        <p className="about-text">
          ShopSmart remembers where you buy your favorite items and builds your lists for you. 
          No more juggling notes or switching apps—just effortless, organized shopping.
        </p>
      </div>
      <div className="about-box-section">
        <div className="section-description">
          <h1 className="section-title">Make Planning Easy</h1>
          <ul>
            <li>Home page feature #1</li>
            <li>Home page feature #2</li>
            <li>Home page feature #3</li>
          </ul>
          <p className="section-paragraph">
            The Home Page greets you with an organized snapshot of your shopping needs. 
            You can quickly view your lists, recently added items, and suggested stores based on your habits. 
            Everything is laid out simply so you can start planning your shopping trip right away.
          </p>
        </div>
        <div className="section-picture">
          <img alt="section-image" src={placeholder}/>
        </div>
      </div>
      <div className="about-box-section">
        <div className="section-picture">
          <img alt="section-image" src={placeholder}/>
        </div>
        <div className="section-description">
          <h1 className="section-title">Make Shopping A Breeze</h1>
          <ul>
            <li>Shop page feature #1</li>
            <li>Shop page feature #2</li>
            <li>Shop page feature #3</li>
          </ul>
          <p className="section-paragraph">
            The Home Page greets you with an organized snapshot of your shopping needs. 
            You can quickly view your lists, recently added items, and suggested stores based on your habits. 
            Everything is laid out simply so you can start planning your shopping trip right away.
          </p>
        </div>
      </div>
    </div>
    
  );
}
