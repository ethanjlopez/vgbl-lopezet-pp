export const Rating = ({ categoryList }) => {
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].category === 1) {
      return (
        <div className="box-header">
          <h3 className="mg-bot">ESRB Rating</h3>
          <div className="content-rating">
            <a href="https://www.esrb.org/ratings-guide/">
              <img
                alt="ESRB Rating"
                src={`http://localhost:4000/ESRB_${categoryList[i].rating}.png`}
              ></img>
            </a>
            <p className="content-description">
              {"content_descriptions" in categoryList[i]
                ? categoryList[i].content_descriptions.map(
                    (desc, index) => (index ? ", " : "") + desc.description
                  )
                : null}
            </p>
          </div>
        </div>
      );
    }
  }
};
