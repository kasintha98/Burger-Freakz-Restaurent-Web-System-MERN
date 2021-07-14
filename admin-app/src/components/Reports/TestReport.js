import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function TestReport() {
  return (
    <div>
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "304dbb8a-452e-4425-b74e-bb3487a5b17f",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=304dbb8a-452e-4425-b74e-bb3487a5b17f&groupId=6766f4ca-b07a-4089-9f20-12d26ee3cd19&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODRjMzFjYTAtYWMzYi00ZWFlLWFkMTEtNTE5ZDgwMjMzZTZmLyIsImlhdCI6MTYyNjI2OTkxOSwibmJmIjoxNjI2MjY5OTE5LCJleHAiOjE2MjYyNzM4MTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFtNWQvSUpWQTYxbjIxWWlvMEhVbU1wTE1NdUUwR3JUazV4bHhOejVKTlFLOW5WdUxqbFlZakZ2NXFPRy9xWWFaIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImlwYWRkciI6IjEwMy4yNDcuNTEuMTI5IiwibmFtZSI6IktBU0lOVEhBIEtBTEhBUkEiLCJvaWQiOiJhNjA4ZmMwNC1lMGZiLTQwYjYtOGIwZC1hMzcyYjRhYzVlNGEiLCJwdWlkIjoiMTAwMzIwMDEwOUQ4NEFGNyIsInJoIjoiMC5BUVFBb0J6RGhEdXNyazZ0RVZHZGdDTS1idzhCSElkaFhyRlBnNnlZWVFwLWtSQUVBTEEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiWVB6UjlpcFN2YmxtNU5wTF94NVpFMGlfb0ZOSVVnWFM2bTJ1eWVqMzNYZyIsInRpZCI6Ijg0YzMxY2EwLWFjM2ItNGVhZS1hZDExLTUxOWQ4MDIzM2U2ZiIsInVuaXF1ZV9uYW1lIjoiS0FTSU5USEEuS0FMSEFSQUBzdHVkZW50YW1iYXNzYWRvcnMuY29tIiwidXBuIjoiS0FTSU5USEEuS0FMSEFSQUBzdHVkZW50YW1iYXNzYWRvcnMuY29tIiwidXRpIjoiT2JxLUp6UF9nMGUxUFJFSW1neW1BZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.jWyPOBHMjXFOBoFuEzZYkMFbJyGgLRQ7pzuhAc9YT7HWcT9PY9fWuwWasrGYV82qhgwNl1Mrf11CoQbslZHG5aHYzgxkkH24xaWYO3NPsJ_WOyYkzNNNF_arXzEqARzMwtnNkfjYPCUpTrKzb2AtJ9GPvfE1BSNizPIbjnjUh7mqwFEsYXvAMWjL_luNMWaverua5mC2T3bPJN9i07EGZEdTYH5_eFw5BVDOJRnujfcpwTZumU_FVN28Fku5gpsuqrk9YLGbZz0bHRjZ3yaY4zX3oTNfmqu6nhbkrO-eL0dCsWqoDo01Gxw83g9WDkNT8lJlwSkFAfHYfvYMrzWG6Q",
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true,
              },
            },
            //background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"Embed-container"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  );
}
