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
import { APIreward } from "@/apis/APIreward";

export default function PDFreward({ rewardData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRewardById = async () => {
      try {
        const result = await APIreward.getRewardById(rewardData.uuid);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRewardById();
  }, [rewardData]);

  return (
    <>
      <PDFDownloadLink
        document={<Pdf data={data} />}
        fileName={`Bonus-pegawai-${data?.nama_pegawai}`}
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
  const titlePDF = "Bonus Reward";

  const tanggalKeluar = dayjs(data?.tanggal_keluar).format("DD MMMM YYYY");
  const now_days = dayjs().format("DD MMMM YYYY");

  return (
    <Document title={titlePDF}>
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
            Sehubungan dengan keputusan yang diambil oleh PT. Radenmat Putra
            Tunggal, kami dengan berat hati menyampaikan bahwa hubungan kerja
            dengan karyawan yang disebutkan di bawah ini akan berakhir:
          </Text>
          <Text>Nama: {data?.nama_pegawai}</Text>
          <Text>Alasan: {data?.alasan_phk}</Text>
        </View>
        <View style={styles.text}>
          <Text>Tanggal efektif berakhirnya hubungan kerja adalah:</Text>
          <Text>Tanggal Berhenti Bekerja: {tanggalKeluar}</Text>
        </View>
        <View style={styles.text}>
          <Text>
            Keputusan ini akan berlaku efektif mulai tanggal {tanggalKeluar}.
            Kami mengharapkan agar pihak terkait dapat mempersiapkan segala
            sesuatunya menjelang tanggal tersebut.
          </Text>
          <Text>
            Kami berharap yang terbaik untuk Anda di masa depan dan terima kasih
            atas kontribusi Anda selama ini di PT. Radenmat Putra Tunggal.
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
