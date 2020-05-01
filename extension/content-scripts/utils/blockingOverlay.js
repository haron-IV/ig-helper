import getMessageFromPopup from "./getMessageFromPopup.js";

const overlay = () => {
    getMessageFromPopup("addExtensionOverlay", () => {
        addOverlayToPage();
    });

    getMessageFromPopup("removeExtensionOverlay", () => {
        removeOverlayFromPage();
    });
};

const overlayElement = () => {
    const overlay = document.createElement("div");
    overlay.className = "extension-overlay";
    overlay.style = `
    width: 100vw; min-width: 100vw;
    height: 100vh; min-height: 100vh;
    background-color: rgba(0, 0, 0, .6); 
    position: fixed; 
    top: 0; left: 0; 
    z-index: 1; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    font-size: 2.5rem;
    color: rgba(255, 255, 255, .65);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, .55);
    `;
    overlay.setAttribute("id", "extension-overlay");
    overlay.innerHTML = `
        <div style="background-color: rgba(0, 0, 0, .35); padding: 2rem; border-radius: 5px; text-align: center; font-family: Roboto,Helvetica,Arial,sans-serif;">
            <h1> You can't do anything while extension working automatically. </h1>
            <p style="font-size: 2rem; margin: .5rem 0;"> When automations end his work this window will disappear. </p>
            <p style="font-size: 1.5rem;"> Extension blocking your actions on this page for working correctly.</p>
            <p style="font-size: 1.2rem;"> You can open new one instagram page and do your stuff there 
                <a href="#" target="_blabk" style="color: #c7e4ff">instagram.com</a>
            </p>
        </div>
    `;

    return overlay;
};

const addOverlayToPage = () => {
    document.querySelector("html").appendChild(overlayElement());
};

const removeOverlayFromPage = () => {
    const overlay = document.querySelector("#extension-overlay");
    overlay.parentNode.removeChild(overlay);
};

export { overlay, removeOverlayFromPage }