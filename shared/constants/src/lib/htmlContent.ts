export const generateHTML = (content: string) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <style>
      @font-face {
        font-family: "Maison-Light", sans-serif !important;
        src: url("file:///android_asset/fonts/Maison-Light.otf")
          format("opentype");
        font-weight: 400;
      }

      @font-face {
        font-family: "Maison-Regular", sans-serif !important;
        src: url("file:///android_asset/fonts/Maison-Regular.otf")
          format("opentype");
        font-weight: 500;
      }

      @font-face {
        font-family: "Maison-Medium", sans-serif !important;
        src: url("file:///android_asset/fonts/Maison-Medium.otf")
          format("opentype");
        font-weight: 600;
      }

      @font-face {
        font-family: "Maison-Demi", sans-serif !important;
        src: url("file:///android_asset/fonts/Maison-Demi.otf")
          format("opentype");
        font-weight: 700;
      }

      @font-face {
        font-family: "Maison-Bold", sans-serif !important;
        src: url("file:///android_asset/fonts/Maison-Bold.otf")
          format("opentype");
        font-weight: 800;
      }

      /* Body Styling */

      body {
        background-color: #f4f6f8 !important;
        background: #f4f6f8 !important;
      }

      container {
        color: #000000 !important;
        line-height: 1.8;
        margin: 0px !important;
        padding: 0px !important;
        font-size: 1em;
        position: relative;
        background-color: #f4f6f8 !important;
        background: #f4f6f8 !important;
        align-items: center;
      }

      body,
      p,
      span,
      div,
      a,
      li,
      td,
      th,
      blockquote,
      em {
        font-family: "Maison-Medium", sans-serif !important;
      }

      strong {
        font-family: "Maison-Bold" , sans-serif !important;
        font-weight: bold  !important;
      }

      /* Typography Styling */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.4;
        margin: 0 0 20px 0;
      }

      h1 {
        font-size: 2.5em;
        font-weight: 800;
        font-family: "Maison-Bold" , sans-serif !important;
      }

      h2 {
        font-size: 2em;
        font-weight: 700;
        font-family: "Maison-Demi" , sans-serif !important;
      }

      h3 {
        font-size: 1.75em;
        font-weight: 700;
        font-family: "Maison-Demi" , sans-serif !important;
      }

      h4 {
        font-size: 1.55em;
        font-weight: 700;
        font-family: "Maison-Demi" , sans-serif !important;
      }

      h5 {
        font-size: 1.3em;
        font-weight: 400;
        font-family: "Maison-Regular" , sans-serif !important;
      }

      h6 {
        font-size: 1.05em;
        font-weight: 400;
        font-family: "Maison-Regular" , sans-serif !important;
      }

      p,
      iframe {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      iframe,
      video {
        width: 100%;
        max-width: 100%;
        height: calc(550px * 9 / 16);
        /* Maintain 16:9 aspect ratio */
        max-height: 100%;
        background-color: #000000 !important;
      }

      /* Paragraph and Span */

      p,
      span {
        font-size: 1em;
        margin: 0 0 20px 0;
        color: #000000 !important;
      }

      /* Links */
      a {
        text-decoration: none;
        transition: color 0.3s ease-in-out;
      }

      a:hover {
        color: #000000;
      }

      /* Lists */
      ul,
      ol {
        margin: 5px 0;
        padding-left: 20px;
      }

      ul li,
      ol li {
        font-size: 1em;
        line-height: 1.6;
        margin-bottom: 10px;
      }

      ul li::before {
        font-size: 1.6em;
        /* Increased font size for larger bullet points */
        position: absolute;
        /* Keep the bullet properly aligned */
        left: 0;
        /* Align bullets to the left */
        top: 0.1em;
        /* Adjust vertical positioning */
      }

      /* Ordered Lists */
      table ul li,
      table ol li {
        border-left: none;
        box-shadow: none;
        padding: none;
        margin: none;
        background: none;
        border-radius: none;
      }

      ol li {
        border-left: 4px solid #363535;
        padding: 10px 15px;
        margin: 10px 0;
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      /* Blockquote */
      blockquote {
        margin: 20px 0;
        padding: 20px 25px;
        background-color: #fcf3cf;
        border-left: 6px solid #363535;
        border-radius: 6px;
        font-size: 1.1em;
      }

      /* Tables */
      table {
        border-collapse: collapse;
        margin: 0px !important;
        margin-left: -45px !important;
        margin-top: -15px !important;
        padding: 0px !important;
        font-size: 1.1em;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      table td {
        text-align: left;
        margin: 0px !important;
        padding: 20px;
        border: 1px solid #000000;
      }

      table th {
        margin: 0px !important;
        font-weight: bold;
        padding: 20px !important;
        border: 1px solid #000000;
      }

      table tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      #loader.hidden {
        display: none;
      }
    </style>

    </head>

    <body>
        <div class="container">${content}</div>
    </body>

     <script>
     function sendHeight() {
         const container = document.querySelector('.container');
         if (container) {
             window.ReactNativeWebView.postMessage(container.scrollHeight);
         }
     }

     window.addEventListener("load", sendHeight);
     window.addEventListener("resize", sendHeight);

     // Replace iframes with videos
     function replaceIframes() {
         const iframes = document.querySelectorAll("iframe");
         iframes.forEach(iframe => {
             const src = iframe.getAttribute("src");
             if (src && (src.endsWith(".mp4") || src.endsWith(".m4v"))) {
                 const video = document.createElement("video");
                 video.setAttribute("controls", "true");
                 video.setAttribute("style", iframe.getAttribute("style") || "width:100%; height:500px;");
                 video.setAttribute("src", src);
                 iframe.replaceWith(video);
             }
         });
     }

 document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            const height = document.querySelector('.container')?.clientHeight || 0;
            window.ReactNativeWebView.postMessage(height.toString());
        }, 200);
    });

 </script>
</html>
`;
};
export const contentHTML = (
  url: string,
  type: 'videos' | 'pdfs' | 'ppt' | 'document'
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Media Viewer</title>
      <style>
           body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            position: relative;
            height: 100vh;
            overflow: hidden;
        }
        .content {
            width: 100%;
            height: 100%;
            overflow: auto;
        }
            /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #ffffff;
            border: 1px solid #dfe6e9;
        }

        th, td {
            padding: 12px;
            border: 1px solid #dfe6e9;
            text-align: left;
        }

        th {
            background-color: #74b9ff;
            color: #ffffff;
            text-transform: uppercase;
        }

        tr:nth-child(even) {
            background-color: #dfe6e9;
        }

        tr:hover {
            background-color: #b2bec3;
        }

        /* Buttons */
        button {
            background-color: #00cec9;
            color: #ffffff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 1em;
            cursor: pointer;
            transition: background-color 0.3s, box-shadow 0.3s;
        }

          iframe, video {
              width: 100%;
              height: 100%;
              border: none;
          }
          .loader-container {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #fff; /* Optional: background for better visibility */
              z-index: 1000;
          }
          .loader {
              border: 8px solid #f3f3f3;
              border-top: 8px solid #3498db;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 1s linear infinite;
          }
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
          .download-icon {
              position: fixed;
              top: 20px;
              right: 20px;
              background-color: #00000090;
              color: white;
              border: none;
              border-radius: 50%;
              padding: 15px;
              cursor: pointer;
              font-size: 20px;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
          }
          .download-icon:before {
              font-size: 24px;
          }
      </style>
  </head>
  <body>

  <div class="loader-container" id="loader">
      <div class="loader"></div>
  </div>
  <div class="content" id="media-content"></div>
  <a class="download-icon" href="${url}" download="${url.split('/').pop()}">
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.51172 14.4858V17.4858C3.51172 19.1427 4.85486 20.4858 6.51172 20.4858H18.5117C20.1686 20.4858 21.5117 19.1427 21.5117 17.4858V14.4858" stroke="white" stroke-width="2"/>
<path d="M12.5117 16.4858L12.5117 15.4858C12.5117 13.829 13.8549 12.4858 15.5117 12.4858L16.5117 12.4858" stroke="white" stroke-width="2"/>
<path d="M12.5117 16.4858L12.5117 15.4858C12.5117 13.829 11.1686 12.4858 9.51172 12.4858L8.51172 12.4858" stroke="white" stroke-width="2"/>
<path d="M12.5117 2.48584L12.5117 14.4858" stroke="white" stroke-width="2"/>
</svg>
</a>

  <script>
      const url = "${url}";
      const contentType = "${type}";

      function renderContent() {
          let viewer;

          if (contentType === 'videos') {
              viewer = \`<video controls onloadeddata="hideLoader()">
                         <source src="\${url}" type="video/mp4">
                        <source src="\${url}" type="video/x-m4v">
                        </video>\`;
          } else if (contentType === 'pdfs') {
              viewer = \`<iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=${url}" onload="hideLoader()" type="application/pdf"></iframe>\`;
          } else if (contentType === 'ppt') {
              viewer = \`<iframe src="https://view.officeapps.live.com/op/view.aspx?src=\${encodeURIComponent(url)}" onload="hideLoader()" type="application/vnd.ms-powerpoint"></iframe>\`;
          } else if (contentType === 'document') {
              viewer = \`<iframe src="https://docs.google.com/gview?url=\${encodeURIComponent(url)}&embedded=true" onload="hideLoader()" type="application/document"></iframe>\`;
          } else {
              viewer = '<p>Unsupported content type.</p>';
              hideLoader();
          }
          document.getElementById('media-content').innerHTML = viewer;
          document.getElementById('media-content').style.display = 'block';
      }

      function hideLoader() {
          document.getElementById('loader').style.display = 'none';
      }

      renderContent();
  </script>

  </body>
  </html>
  `;
