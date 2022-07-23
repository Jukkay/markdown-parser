import { jsPDF } from "jspdf";

// PDF export
export const exportToPDF = (source: HTMLElement, width: number, height: number ) => {
    if (!source)
        return
    
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
       })
    doc.html(source, {
        callback: (doc) => {
            doc.save()
        },
        width: width,
    })
}