export const Screenshots = ({ screenshot, setCarousel }) => {
  const mapScreenshots = (screenshots) => {
    return screenshots.slice(0, 5).map((screenshot, index) => {
      const screen = screenshot.url.replace("thumb", "screenshot_big");
      return (
        <button
          key={index}
          className="btn btn-trans image-btn"
          onClick={() => setCarousel({ expand: true, index: index })}
        >
          <img alt="null" src={screen}></img>;
        </button>
      );
    });
  };

  const screenshotButton = (screenshot) => {
    return screenshot.url.replace("thumb", "screenshot_big");
  };
  return (
    <div className="grid images-list">
      {mapScreenshots(screenshot)}
      {screenshot[5] ? (
        <button className="btn btn-trans image-btn">
          <img alt="null" src={screenshotButton(screenshot[5])}></img>
        </button>
      ) : (
        <button className="btn btn-trans image-btn">Screenshot</button>
      )}
    </div>
  );
};
