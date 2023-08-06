export default function getManifest() {
    return ({
      name: "Edulisting",
        short_name: "Edulisting",
        theme_color: "#fff",
        background_color: "#fff",
        display: "standalone",
        orientation: "portrait",
        prefer_related_applications: true,
        related_applications: [
          {
            platform: "play",
            url: "https://play.google.com/store/apps/details?id=com.example.app1",
            id: "com.example.app1",
          },
        ],
        display_override: ["window-controls-overlay"],
        protocol_handlers: [{ protocol: "mailto", url: "/newEmail?to=%s" }],
        scope: "/",
        start_url: "/?source=app",
        id: "/?source=app",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        description:
          "Edulisting is a go to platform for buying and selling old school books",
        dir: "auto",
        lang: "en",
        shortcuts: [
          {
            name: "Sell",
            url: "https://edulisting.in/sell",
            description: "Sell your books",
            icons: [{ src: "/images/shortcut-icons/ic_shortcut_add_shopping_cart.png", sizes: "192x192" }]
          },
          {
            name: "Chats",
            url: "https://edulisting.in/allchats",
            description: "Click to view chats",
            icons: [{ src: "/images/shortcut-icons/ic_shortcut_chat.png", sizes: "192x192" }]

          },
        ],
        screenshots: [
            {
              "src": "/images/Screenshots/home.png",
              "type": "image/png",
              "sizes": "1242x2688",
              "form_factor": "narrow"
            },
            {
              "src": "/images/Screenshots/chat.png",
              "type": "image/png",
              "sizes": "1242x2688",
              "form_factor": "narrow"
            },
            {
              "src": "/images/Screenshots/profile.png",
              "type": "image/png",
              "sizes": "1242x2688",
              "form_factor": "narrow"
            },
            {
              "src": "/images/Screenshots/user-profile.png",
              "type": "image/png",
              "sizes": "1242x2688",
              "form_factor": "narrow"
            },
            {
              "src": "/images/Screenshots/listing.png",
              "type": "image/png",
              "sizes": "1242x2688",
              "form_factor": "narrow"
            },
          ],
        categories: ["books", "education", "kids", "shopping"],
        mimeTypes: {
            js: "application/javascript",
          },
      })}