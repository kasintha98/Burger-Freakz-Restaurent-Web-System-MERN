import React from "react";

export default function InventoryReport() {
  return (
    <div>
      <iframe
        width={1140}
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=edbfade7-900b-488f-bab5-6fcb51847f71&autoAuth=true&ctid=84c31ca0-ac3b-4eae-ad11-519d80233e6f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        frameBorder={0}
        allowFullScreen="true"
        title="inventoryRpt"
      />
    </div>
  );
}
