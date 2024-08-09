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

import { Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { APIpunishment } from "@/apis/APIpunishment";

export default function PDFpunishment({ punishmentData }) {
  const [dataPunishment, setDataPunishment] = useState([]);

  useEffect(() => {
    const fetchPunishmentById = async () => {
      try {
        const result = await APIpunishment.getPunishmentById(
          punishmentData.uuid,
        );
        setDataPunishment(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPunishmentById();
  }, [punishmentData]);
  console.log("data punishment cuy", dataPunishment);

  return (
    <>
      <PDFDownloadLink
        document={<Pdf data={dataPunishment} />}
        fileName={`Bonus-pegawai-${dataPunishment?.nama_pegawai}`}
      >
        <Button className="m-3 border-green-500 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
          <span className="text-lg">
            <MdOutlineFileUpload />
          </span>
          PDF
        </Button>
      </PDFDownloadLink>
      <PDFViewer className="m-auto h-[600px] w-[650px]">
        <Pdf data={dataPunishment} />
      </PDFViewer>
    </>
  );
}

const Pdf = ({ data }) => {
  const titlePDF = "SURAT PERINGATAN";
  const tanggalSurat = dayjs(data?.createdAt).format("DD/MM/YYYY");

  const nomorSurat = "X/V/Z" + data?.uuid?.slice(0, 5).toUpperCase();

  return (
    <Document title={titlePDF}>
      <Page size="A4" style={styles.body}>
        <Image style={styles.header} className="w-[100vw]" src={kopSurat} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{titlePDF}</Text>
          <Text style={styles.nomorSurat}>Nomor: {nomorSurat}</Text>
        </View>

        <View style={styles.bodyText}>
          <Text>
            Berdasarkan Peraturan Institusi bahwa setiap karyawan wajib mematuhi
            dan menjalankan peraturan yang telah ditetapkan. Namun, hal tersebut
            tidak dapat dipahami oleh Saudara/i {data?.nama_pegawai} yang mana
            telah melakukan pelanggaran Tingkat Pertama yaitu
            {` "${data?.keterangan_sanksi}"`}
          </Text>
          <Text style={{ marginTop: "20px" }}>
            Maka dengan ini perusahaan memberikan
            <Text> SURAT PERINGATAN SATU (I) </Text>kepada:
          </Text>
          <Text>Nama: {data?.nama_pegawai}</Text>
          <Text>Jabatan: {data?.user?.pegawai?.jabatan}</Text>
        </View>

        <View style={styles.bodyText}>
          <Text>
            Maka dengan ini Institusi memberikan SURAT PERINGATAN SATU (I)
            kepada Saudara {data?.nama_pegawai}.
          </Text>
          <Text>
            Bila Saudara dapat memperbaiki kinerja dalam waktu 6 (enam) bulan
            terhitung dari tanggal {tanggalSurat}, maka Surat Peringatan ini
            akan diabaikan...
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Palembang, {tanggalSurat}</Text>
          <Text style={{ marginTop: "80px" }}>Direktur</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 40,
    fontFamily: "Times-Roman",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  nomorSurat: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 40,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 30,
  },
  signature: {
    fontSize: 12,
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
