import { useEffect, useState } from 'react';

const BackToTopButton = () => {
  const configObj = {
    buttonD:
      'M8 17.333h5.333v4C13.333 22.806 14.527 24 16 24c1.473 0 2.667-1.194 2.667-2.667v-4H24L16 8l-8 9.333z',
    buttonT:
      'translate(-1088 -172) translate(832 140) translate(32 32) translate(224)',
    shadowSize:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    roundnessSize: '12px',
    buttonDToBottom: '32px',
    buttonDToRight: '32px',
    selectedBackgroundColor: '#e66d0a',
    selectedIconColor: '#1f1919',
    buttonWidth: '40px',
    buttonHeight: '40px',
    svgWidth: '32px',
    svgHeight: '32px',
  };

  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.onscroll = handleScroll;

    return () => {
      window.onscroll = null;
    };
  }, []); // Run the effect only once on mount

  const handleButtonClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <span
      className="softr-back-to-top-button"
      id="softr-back-to-top-button"
      style={{
        width: configObj.buttonWidth,
        height: configObj.buttonHeight,
        marginRight: configObj.buttonDToRight,
        marginBottom: configObj.buttonDToBottom,
        borderRadius: configObj.roundnessSize,
        boxShadow: configObj.shadowSize,
        color: configObj.selectedBackgroundColor,
        backgroundColor: configObj.selectedBackgroundColor,
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        cursor: 'pointer',
        textAlign: 'center',
        border: 'solid 2px currentColor',
        display: showButton ? 'block' : 'none',
      }}
      onClick={handleButtonClick}
    >
      <svg
        className="back-to-top-button-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{
          verticalAlign: 'middle',
          margin: 'auto',
          justifyContent: 'center',
          width: configObj.svgWidth,
          height: configObj.svgHeight,
        }}
      >
        {/* ... (your SVG content) */}
      </svg>
    </span>
  );
};

export default BackToTopButton;
