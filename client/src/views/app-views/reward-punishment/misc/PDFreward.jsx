import dayjs from "dayjs";
import "dayjs/locale/id";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import kopSurat from "@/assets/kop-surat.jpg";
import { thousandSeparator } from "@/utils/ThousandSeparator";

import { Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { APIreward } from "@/apis/APIreward";

export default function PDFreward({ rewardData }) {
  const [dataReward, setDataReward] = useState([]);

  useEffect(() => {
    const fetchRewardById = async () => {
      try {
        const result = await APIreward.getRewardById(rewardData.uuid);
        setDataReward(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRewardById();
  }, [rewardData]);
  console.log("data reward cuy", dataReward);

  return (
    <>
      <PDFDownloadLink
        document={<Pdf data={dataReward} />}
        fileName={`Bonus-pegawai-${dataReward?.nama_pegawai}`}
      >
        <Button className="m-3 border-green-500 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
          <span className="text-lg">
            <MdOutlineFileUpload />
          </span>
          PDF
        </Button>
      </PDFDownloadLink>
      <PDFViewer className="m-auto h-[600px] w-[650px]">
        <Pdf data={dataReward} />
      </PDFViewer>
    </>
  );
}

const Pdf = ({ data }) => {
  const titlePDF = "Bonus Reward";
  const tanggalSlip = dayjs(data?.createdAt).format("DD/MM/YYYY");

  const gajiPegawai = data?.user?.pegawai?.gaji_pegawai;

  return (
    <Document title={titlePDF}>
      <Page size="A4" style={styles.body}>
        <Image style={styles.header} className="w-[100vw]" src={kopSurat} />
        <View>
          <Text style={styles.title}>{titlePDF}</Text>
          <Text style={styles.text}>Tanggal: {tanggalSlip}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text>Nama: {data?.nama_pegawai}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>NO</Text>
            <Text style={styles.tableHeader}>KETERANGAN</Text>
            <Text style={styles.tableHeader}>JUMLAH</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>GAJI POKOK</Text>
            <Text style={styles.tableCell}>
              {thousandSeparator(gajiPegawai)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>2</Text>
            <Text style={styles.tableCell}>BONUS</Text>
            <Text style={styles.tableCell}>
              {thousandSeparator(data?.bonus_reward)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3</Text>
            <Text style={styles.tableCell}>PENGURANGAN</Text>
            <Text style={styles.tableCell}>Rp {data?.pengurangan || 0}</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text>Total Diterima</Text>
          <Text>{thousandSeparator(data?.total_pendapatan)}</Text>
        </View>

        <View style={styles.signature}>
          <Text>Palembang, {tanggalSlip}</Text>
          <Text style={{ marginTop: "100px" }}>Direktur</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
  },
  signature: {
    textAlign: "right",
    marginTop: 20,
  },
});

Font.register({
  family: "Times-Roman",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/times/v9/OsY8l9lfIc4fKllP7epze5GR.woff2",
    },
  ],
});
