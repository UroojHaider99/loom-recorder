import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import React, { useState, useEffect } from "react"; // Import the React object

const PUBLIC_APP_ID = "61ef0acd-39fa-4252-afba-7c70841ad32b";
const BUTTON_ID = "loom-record-sdk-button";

const LoomRecorderComponent = () => {
  const [videoHTML, setVideoHTML] = useState("");

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      const button = document.getElementById(BUTTON_ID);

      if (!button) {
        return;
      }

      const { configureButton } = await setup({
        publicAppId: PUBLIC_APP_ID,
      });

      const sdkButton = configureButton({ element: button });

      sdkButton.on("insert-click", async (video) => {
        const { html } = await oembed(video.sharedUrl, { width: 400 });
        setVideoHTML(html);
      });
    }

    setupLoom();
  }, []);

  return (
    <>
      <button id={BUTTON_ID}>Record</button>
      <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
    </>
  );
};

export default LoomRecorderComponent;
