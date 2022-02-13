const Test = () => {
  return (
    <>
      <div className="video">
        <iframe src="https://iframe.mediadelivery.net/embed/25776/0ce1884b-8df9-4668-8021-bcf98b860116?autoplay=true" loading="lazy" style={{ border: 0, position: 'absolute', top: 0, height: 100 + '%', width: 100 + '%', }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true">
        </iframe>
        <style jsx>
          {
            `
            .video{
              position: relative,
              padding-top: 56.25%;
            }
          `
          }
        </style>
      </div>
    </>
  );
};


export default Test;