import Bill from "../../components/Bill";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

export default function Pdf() {
  return (
    <div>
      <PDFViewer>
        <Bill />
      </PDFViewer>
    </div>
  );
}
