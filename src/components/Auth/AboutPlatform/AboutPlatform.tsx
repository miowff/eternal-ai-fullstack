import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./AboutPlatform.css";
export const AboutPlatform = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="about-platform-inner gradient-border">
          <h1 className="about-platform-title avenir-bold">
            About the platform
          </h1>
          <p className="about-platform-text base-text">
            All of the characters here are not real. Everything you see and hear
            is entirely generated by Artificial Intelligence machines. The
            opinions and beliefs expressed do not represent anyone. They are
            hallucinations of a bunch of 1s and 0s inside of a magic computer.{" "}
          </p>
          <p className="about-platform-text base-text">
            The creators of this platform have the best intentions with this
            project, and deeply admire each and every character on the site. You
            might even say they are our Heroes. In fact, you can say that.
          </p>
          <div className="about-platform-agree">
            <div className="checkbox-container">
              <input
                className="about-platform-checkbox"
                type="checkbox"
                id="ch1"
              ></input>
              <label className="checkbox-label" htmlFor={"ch1"}></label>
            </div>
            <p className="about-check-text base-text">
              I have read the above statement
            </p>
          </div>
          <button className="about-platform-button gradient-button">
            continue
          </button>
        </div>
      </div>
    </>
  );
};
