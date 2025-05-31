import { jsPDF } from "jspdf";
import autotable from "jspdf-autotable";

const usePdfGenerator = () => {
    const generatePdf = ({ title, columns, data, filename}) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(title, 14, 15);

        autotable(doc, {
            startY: 25,
            head: [columns],
            body: data
        });

        doc.save(filename || "document.pdf");
    };

    return { generatePdf };
};

export default usePdfGenerator;
