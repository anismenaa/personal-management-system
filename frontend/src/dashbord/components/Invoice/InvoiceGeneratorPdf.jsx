import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 40,
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '100%', // Ensure page takes full height
    },
    invoiceContainer: {
        flex: 1, // Makes container grow to fill available space
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // Stacks children vertically
    },
    informationsContainer: {
        marginTop: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        margin: '5px 0'
    },
    table: {
        display: 'table',
        width: "auto",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        textAlign: 'center'
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableColHeader: {
        width: '16.6%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
    },
    tableCol: {
        width: '16.6%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: 5,
        padding: 2,
        fontSize: 10,
        textAlign: 'center'
    },
    total: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto', // Pushes to bottom
    }
});

// Create Document Component
const MyDocument = ({journeesImpaied, total}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.invoiceContainer}>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>MENAA ETS</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Email:</Text> anis.menaa1999@gmail.com</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Phone:</Text> +33 758 47 48 28</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Adresse:</Text> 6 quai de la révolution, Alfortville</Text>
                </View>

                <Text style={styles.subtitle}>Invoice</Text>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Date</Text>
                        <Text style={styles.tableColHeader}>Begin</Text>
                        <Text style={styles.tableColHeader}>End</Text>
                        <Text style={styles.tableColHeader}>NB_hours</Text>
                        <Text style={styles.tableColHeader}>Recette</Text>
                        <Text style={styles.tableColHeader}>Commission</Text>
                        <Text style={styles.tableColHeader}>Total</Text>
                    </View>
                    {journeesImpaied.map((journee) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol}>{new Date(journee.date).toLocaleDateString('fr-FR')}</Text>
                            <Text style={styles.tableCol}>{new Date(journee.begin).getHours()+":"+new Date(journee.begin).getMinutes()}</Text>
                            <Text style={styles.tableCol}>{new Date(journee.end).getHours()+":"+new Date(journee.end).getMinutes()}</Text>
                            <Text style={styles.tableCol}>{journee.nb_hours}</Text>
                            <Text style={styles.tableCol}>{journee.recette}</Text>
                            <Text style={styles.tableCol}>{journee.nb_comissions}</Text>
                            <Text style={styles.tableCol}>{journee.total}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.total}><Text style={{ fontWeight: 'bold' }}>Total due:</Text> {total} euros</Text>
            </View>
        </Page>
    </Document>
);

const InvoiceGeneratorPdf = ({ journeesImpaied, total }) => {
    return (
        <PDFViewer width="100%" height="100%">
            <MyDocument journeesImpaied={journeesImpaied} total={total}/>
        </PDFViewer>
    )
}

export default InvoiceGeneratorPdf;
