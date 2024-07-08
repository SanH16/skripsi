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

import { APIcuti } from "@/apis/APIcuti";

import kopSurat from "@/assets/kop-surat.jpg";

import moment from "moment";
import { Button } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";

export default function PDFcuti({ cutiData }) {
  const [data, setData] = useState([]);

  // const cutiId = "918d3aa5-bf71-48c2-9e7c-bb58f965ccf7";
  useEffect(() => {
    const fetchCutiById = async () => {
      try {
        const result = await APIcuti.getCutiById(cutiData.uuid);
        console.log("cuti pdf fetch", result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCutiById();
  }, [cutiData]);

  return (
    <>
      <PDFDownloadLink
        document={<Pdf data={data} />}
        fileName={`pengajuan-cuti-${data?.user?.name}`}
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
  const titlePDF = "Balasan Surat Permohonan Cuti";

  const startCuti = moment(data?.start_cuti);
  const endCuti = moment(data?.end_cuti);
  const jumlahHari = endCuti.diff(startCuti, "days") + 1;
  const now_days = moment().format("DD MMMM YYYY");

  return (
    <Document title={titlePDF}>
      <Page size="A4" style={styles.body}>
        <Image style={styles.header} className="w-[100vw]" src={kopSurat} />
        <View>
          <Text style={styles.title}>{titlePDF}</Text>
        </View>
        <View style={styles.text}>
          <Text>Kepada Yth,</Text>
          <Text>{data?.user?.name}</Text>
        </View>
        <View style={styles.text}>
          <Text>Dengan hormat,</Text>
          <Text>Yang bertanda tangan dibawah ini, saya:</Text>
          <Text>Nama : direktur</Text>
          <Text>Jabatan : Direktur </Text>
          <Text>Keterangan : {data?.keterangan}</Text>
        </View>
        <View style={styles.text}>
          <Text>Menyetujui permohonan cuti yang diajukan:</Text>
          <Text>Nama : {data?.user?.name}</Text>
          <Text>Jabatan : {data?.user?.pegawai?.jabatan}</Text>
          <Text>Alasan cuti :{data?.alasan_cuti}</Text>
        </View>
        <View style={styles.text}>
          <Text>
            Selama {jumlahHari} hari terhitung mulai tanggal{" "}
            {startCuti.format("DD MMMM YYYY")} s/d tanggal{" "}
            {endCuti.format("DD MMMM YYYY")}.
          </Text>
          <Text>
            Selama menjalankan cuti, dimohon kesediannya untuk selalu siap
            dihubungi apabila terjadi permasalahan di PT Radenmat Putra Tunggal
            terkait dengan pekerjaan saudara/i. Demikian balasan permohonan cuti
            ini disampaikan, untuk dapat dipergunakan sebagaimana mestinya.
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
