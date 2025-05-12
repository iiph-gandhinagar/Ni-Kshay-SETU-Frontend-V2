import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import React, { useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import Button from '../buttons/primaryButtons';

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = 'json-value-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-value-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-value-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-value-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}
export const LogsView = () => {
  const [view, setView] = useState(0.3);
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const appState = useSelector((state: RootReducerStates) => state.appContext);
  // Function to add syntax highlighting to JSON
  const jsonString = JSON.stringify(appState, null, 2);

  // Wrap the JSON string in an HTML template with some basic styling
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          background-color: #000;
          color: #0f0;
          font-family: 'Courier New', Courier, monospace;
          padding: 20px;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: auto;
        }
        .json-key {
          color: #0ff; /* Cyan */
        }
        .json-value-string {
          color: #ff0; /* Yellow */
        }
        .json-value-number {
          color: #f00; /* Red */
        }
        .json-value-boolean {
          color: #0ff; /* Cyan */
        }
        .json-value-null {
          color: #888; /* Gray */
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #0f0;
          padding: 8px;
          text-align: left;
          color: #0f0;
        }
        th {
          background-color: #111;
        }
        button {
          background-color: #0f0;
          color: #000;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        button:hover {
          background-color: #0ff;
        }
        .toggle-btn {
          cursor: pointer;
          color: #0ff;
          font-weight: bold;
          margin-right: 10px;
        }
        .nested-table {
          margin-left: 20px;
        }
      </style>
    </head>
    <body>
      <button id="toggleButton">Toggle View</button>
      <pre id="jsonView">${syntaxHighlight(jsonString)}</pre>
      <div id="tableView" style="display: none;"></div>

      <script>
        // Function to add syntax highlighting to JSON
        function syntaxHighlight(json) {
          json = json.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>');
          return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
              let cls = 'json-value-number';
              if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                  cls = 'json-key';
                } else {
                  cls = 'json-value-string';
                }
              } else if (/true|false/.test(match)) {
                cls = 'json-value-boolean';
              } else if (/null/.test(match)) {
                cls = 'json-value-null';
              }
              return '<span class="' + cls + '">' + match + '</span>';
            }
          );
        }

        // Function to convert JSON to an expandable table
        function jsonToTable(json, isNested = false) {
          let table = '<table' + (isNested ? ' class="nested-table"' : '') + '><tr><th>Key</th><th>Value</th></tr>';
          for (let key in json) {
            table += '<tr>';
            table += '<td>' + key + '</td>';
            if (typeof json[key] === 'object' && json[key] !== null) {
              table += '<td><span class="toggle-btn">+</span>';
              table += '<div class="nested-content" style="display: none;">';
              table += jsonToTable(json[key], true);
              table += '</div></td>';
            } else {
              table += '<td>' + json[key] + '</td>';
            }
            table += '</tr>';
          }
          table += '</table>';
          return table;
        }

        // Toggle between JSON view and table view
        const toggleButton = document.getElementById('toggleButton');
        const jsonView = document.getElementById('jsonView');
        const tableView = document.getElementById('tableView');

        toggleButton.addEventListener('click', () => {
          if (jsonView.style.display === 'none') {
            jsonView.style.display = 'block';
            tableView.style.display = 'none';
            toggleButton.textContent = 'Show as Table';
          } else {
            jsonView.style.display = 'none';
            tableView.style.display = 'block';
            tableView.innerHTML = jsonToTable(${JSON.stringify(appState)});
            setupToggleListeners();
            toggleButton.textContent = 'Show as JSON';
          }
        });

        // Setup click listeners for expand/collapse functionality
        function setupToggleListeners() {
          document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const content = btn.nextElementSibling;
              if (content.style.display === 'none') {
                content.style.display = 'block';
                btn.textContent = '-';
              } else {
                content.style.display = 'none';
                btn.textContent = '+';
              }
            });
          });
        }
      </script>
    </body>
  </html>
`;
  const viewVar = {
    0.3: 0.5,
    0.5: 0.7,
    0.7: 1,
    1: 2,
    2: 0.3,
  };

  return (
    <View style={{ flex: view, backgroundColor: 'black' }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
      <Button
        title={view + 'x View'}
        onPress={() => setView((prev) => viewVar[prev])}
      />
    </View>
  );
};
