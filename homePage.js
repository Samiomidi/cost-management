import React, { useState, useEffect, Fragment } from "react";
import classes from "./homePage.module.css";
import SearchBar from "./search-result/searchBar";
import Tab from "./customHooks/Tabs/tabs";
import Modal from "./ui/Modal";

function HomePage(props) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installationAccepted, setInstallationAccepted] = useState(false);
  const [installationDinied, setInstallationDinied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("dfdsfdfsdfsdfsdfsdf");
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);
  const btnInstallHandler = (e) => {
    setInstallationAccepted(false);
    setInstallationDinied(false);
    if (deferredPrompt) {
      e.target.style.opacity = "0";
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setShowModal(true);
          setInstallationAccepted(true);
        } else {
          setShowModal(true);
          setInstallationDinied(true);
        }
        setDeferredPrompt(null);
      });
    }
    return;
  };
  const installCard = (
    <div className={classes["install-card"]}>
      <button
        className={`${classes["add-button"]}`}
        onClick={btnInstallHandler}
      >
        Add to home screen
      </button>
    </div>
  );

  const tab1 = (
    <article className={classes.article}>
      <p className="card">
        Search any places around the world in your native languages
      </p>
    </article>
  );

  const tab2 = (
    <article className={classes.article}>
      <p className="card">
        This application use a free API and have built for educational perposes.
      </p>
    </article>
  );

  const tab3 = (
    <article className={classes.article}>
      <p className="card">
        Results for Current conditions, Daily and 3-Hourly forecast for next 5
        days
      </p>
    </article>
  );

  return (
    <Fragment>
      {deferredPrompt && installCard}
      {installationAccepted && (
        <Modal
          showModal={showModal}
          style={{ backgroundImage: `url(/modalBackgrounds/confetti-32.gif)` }}
        >
          <strong className={classes["animate-charcter"]}>
            Congratulations
          </strong>
          <span>
            The program has been successfully added to your home page.
          </span>
        </Modal>
      )}
      {installationDinied && (
        <Modal showModal={showModal}>
          You can always install this web application by clicking on the{" "}
          <strong>"Add to home screen"</strong> button. This button will always
          be accessible by refreshing the main page
        </Modal>
      )}
      <div className={classes.main}>
        <div
          className={classes["hero-section"]}
          style={{
            backgroundImage: `url(/homePageBackgrounds/bg-${props.imageNum}.jpg)`,
          }}
        >
          <div className={classes.searchbar}>
            <SearchBar placeholder={"Search locations"} />
          </div>
        </div>

        <div className={classes.content}>
          <Tab
            tabs={[
              { "Usage Areas": tab1 },
              { "About Application": tab2 },
              { Specifications: tab3 },
            ]}
            activeDefault={null}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
