import "./AboutPage.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";

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
        <div className="section-picture">
          <img alt="section-image" src={img2}/>
        </div>
        <div className="section-description">
          <h1 className="section-title">Make Planning Easy</h1>
          <ul>
            <li>Search for an Item</li>
            <li>View Items from Various Shops</li>
            <li>Add Items to Your Cart</li>
          </ul>
          <p className="section-paragraph">
            The Home Page greets you with an organized snapshot of your shopping needs. 
            You can quickly view your lists, recently added items, and suggested stores based on your habits. 
            Everything is laid out simply so you can start planning your shopping trip right away.
          </p>
        </div>
      </div>
      <div className="about-box-section">
        <div className="section-picture">
          <img alt="section-image" src={img1}/>
        </div>
        <div className="section-description">
          <h1 className="section-title">Make Shopping A Breeze</h1>
          <ul>
            <li>Create Your Shopping Checklist</li>
            <li>Organize Your Trip</li>
            <li>Check Off Items</li>
          </ul>
          <p className="section-paragraph">
            The shopping page will allow the user to create a "shopping trip". If there is no active trip, the user will be 
            able to select a specific store's items, all items, or unassigned items. Once a trip is created, the user will have 
            access to a checklist(s) of items based on their previous selection. User's can check off items as they shop. When done, 
            users can complete their trip, to remove items from their associated list.
          </p>
        </div>
      </div>
    </div>
    
  );
}
