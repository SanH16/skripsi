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
import { APImutasi } from "@/apis/APImutasi";

export default function PDFmutasi({ mutasiData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMutasiById = async () => {
      try {
        const result = await APImutasi.getMutasiById(mutasiData.uuid);
        //   console.log("mutasi pdf fetch", result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMutasiById();
  }, [mutasiData]);

  return (
    <>
      <PDFDownloadLink
        document={<Pdf data={data} />}
        fileName={`mutasi-pegawai-${data?.nama_pegawai}`}
      >
        <Button className="m-3 border-green-500 font-semibold text-green-500 hover:bg-green-500 hover:text-white">
          <span className="text-lg">
            <MdOutlineFileUpload />
          </span>
          PDF
        </Button>
      </PDFDownloadLink>
      <PDFViewer className="m-auto h-[600px] w-[650px]">
        <Pdf data={data} />
      </PDFViewer>
    </>
  );
}

const Pdf = ({ data }) => {
  const titlePDF = "Surat Mutasi";

  const tanggalMulai = dayjs(data?.tanggal_mulai).format("DD MMMM YYYY");
  const now_days = dayjs().format("DD MMMM YYYY");

  return (
    <Document title={titlePDF}>
      {}
      <Page size="A4" style={styles.body}>
        <Image style={styles.header} className="w-[100vw]" src={kopSurat} />
        <View>
          <Text style={styles.title}>{titlePDF}</Text>
        </View>
        <View style={styles.text}>
          <Text>Kepada Yth,</Text>
          <Text>{data?.nama_pegawai}</Text>
        </View>
        <View style={styles.text}>
          <Text>Dengan hormat,</Text>
          <Text>
            Yang dengan ini bertindak atas nama PT. Radenmat Putra Tunggal.
            Memutuskan untuk melakukan mutasi terhadap karyawan PT. Radenmat
            Putra Tunggal di bawah ini:
          </Text>
          <Text>Nama: {data?.nama_pegawai}</Text>
          <Text>Jabatan: {data?.user?.pegawai?.jabatan}</Text>
          <Text>Cabang Asal: {data?.cabang_sebelum}</Text>
        </View>
        <View style={styles.text}>
          <Text>
            Tanggal mulai dan lokasi kantor yang baru adalah sebagai berikut:
          </Text>
          <Text>Tanggal Mulai bekerja: {tanggalMulai}</Text>
          <Text>Cabang Tujuan: {data?.cabang_tujuan}</Text>
        </View>
        <View style={styles.text}>
          <Text>
            Proses mutasi ini mulai efektif pada tanggal {tanggalMulai}. Oleh
            karena itu, kepada karyawan yang bersangkutan beserta PT. Radenmat
            Putra Tunggal untuk segera mempersiapkan segala sesuatunya sebelum
            tanggal tersebut.
          </Text>
          <Text>
            Demikian surat mutasi ini dibuat untuk dapat dipergunakan
            sebagaimana mestinya.
          </Text>
        </View>

        <View style={styles.text_end}>
          <Text>Palembang, {now_days}</Text>
          <Text style={{ color: "grey" }}>ttd_materai</Text>
          <Text>Direktur</Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
    rowGap: 5,
    fontFamily: "Times-Roman",
  },
  text_end: {
    margin: 12,
    marginTop: 30,
    fontSize: 12,
    textAlign: "right",
    rowGap: 35,
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
