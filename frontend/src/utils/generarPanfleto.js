import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts?.default?.pdfMake?.vfs || pdfFonts?.pdfMake?.vfs;


export async function generarPanfletoPDF(convocatoria) {
    const formatearFecha = (f) =>
        new Date(f).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const contenidoAreas = convocatoria.areas.map((area) => {
        const categorias = area.categorias.map((cat) => {
            const cursos = cat.cursos.map((c) => c.Curso).join(", ");
            return {
                text: `• ${cat.nombreCategoria} (Disponible para: ${cursos})`,
                margin: [0, 2],
            };
        });

        return [
            { text: `${area.tituloArea}`, style: "area" },
            { text: 'Categorias:', style: "categoria" },
            ...categorias,
            { text: "", margin: [0, 5] },
        ];
    }).flat();

    const docDefinition = {
        pageMargins: [40, 60, 40, 60],
        content: [
            { text: convocatoria.tituloConvocatoria, style: "header" },

            /*convocatoria.portada
              ? {
                  image: await getBase64ImageFromURL(convocatoria.portada),
                  width: 100,
                  alignment: "right",
                  margin: [0, 10],
                }
              : "",*/

            { text: convocatoria.descripcion, margin: [0, 10] },

            {
                text: `Inscripciones: Desde el ${formatearFecha(
                    convocatoria.fechaInicioInsc
                )} hasta el ${formatearFecha(convocatoria.fechaFinInsc)}`, 
                margin: [0, 5]
            },
            {
                text: `Olimpiadas: Desde el ${formatearFecha(
                    convocatoria.fechaInicioOlimp
                )} hasta el ${formatearFecha(convocatoria.fechaFinOlimp)}`,
                margin: [0, 10]
            },

            { text: "Áreas disponibles", style: "subheader", margin: [0, 10] },
            { text: "Solo puedes inscribirte a 2 areas por convocatoria y solo a 1 categoria por área", margin: [0, 10] },

            ...contenidoAreas,

            {
                text: "¡Participar es crecer!",
                style: "fraseFinal",
                margin: [0, 30, 0, 0],
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                color: "#09052C",
                alignment: "center",
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                color: "#007290",
            },
            area: {
                fontSize: 14,
                bold: true,
                color: "#0099B3",
                margin: [0, 5, 0, 0],
            },
            categoria: {
                fontSize: 12,
                bold: true,
                color: "#007290",
                margin: [0, 5, 0, 0],
            },
            fraseFinal: {
                italics: true,
                alignment: "center",
                color: "#007290",
                fontSize: 12,
            },
        },
        defaultStyle: {
            fontSize: 11,
            color: "#09052C",
        },
    };

    pdfMake.createPdf(docDefinition).download(`Panfleto_${convocatoria.tituloConvocatoria}.pdf`);
}

// Convierte imagen URL a base64
async function getBase64ImageFromURL(url) {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

