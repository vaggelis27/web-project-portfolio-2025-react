
function CardExample() {
  return (
    <div className="section__container portfolio__container">
      <h2 className="section__header">~ PORTFOLIO ~</h2>
      <div className="portfolio__grid">
        <div className="portfolio__card">
          <img src="assets/portfolio-1.jpg" alt="portfolio" />
          <div className="portfolio__content">
            <button className="btn">VIEW PPORTFOLIO</button>
          </div>
        </div>
        <div className="portfolio__card">
          <img src="assets/portfolio-2.jpg" alt="portfolio" />
          <div className="portfolio__content">
            <button className="btn">VIEW PPORTFOLIO</button>
          </div>
        </div>
        <div className="portfolio__card">
          <img src="assets/portfolio-3.jpg" alt="portfolio" />
          <div className="portfolio__content">
            <button className="btn">VIEW PPORTFOLIO</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardExample;
