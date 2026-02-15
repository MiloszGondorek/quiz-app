import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Tworzymy style (podobne do CSS, ale ograniczone)
const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#ffffff" },
  section: { margin: 10, padding: 10, textAlign: "center" },
  title: { fontSize: 24, marginBottom: 20, color: "#0ea5e9" }, // sky-500
  text: { fontSize: 14, marginBottom: 10 },
});

const Certificate = ({
  name,
  score,
  totalPoints,
  quizzName,
}: {
  name: string;
  score: number;
  totalPoints: number;
  quizzName: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.title}>{quizzName}</Text>
        <Text style={styles.text}>Congratulations, {name}!</Text>
        <Text style={styles.text}>
          Your score is: {score}/{totalPoints} (
          {((score / totalPoints) * 100).toFixed(2)}%)
        </Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

export default Certificate;
