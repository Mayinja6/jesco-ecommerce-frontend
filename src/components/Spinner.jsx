const Spinner = () => {
  return (
    <div className="loaderContainer backdrop-blur-lg">
      <div className="loaderSpinner"></div>
      <style>{`    
        .loaderContainer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 101000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loaderSpinner {
          width: 64px;
          height: 64px;
          border: 8px solid;
          border-color: #fb5d5d transparent #ebebeb transparent;
          border-radius: 50%;
          animation: loaderSpin 1.2s linear infinite;
        }

        @keyframes loaderSpin {
          0% {
            transform: rotate(0deg);
          }
          0% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
