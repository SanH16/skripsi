import forumIcon from "@/assets/react.svg";
import appointmentIcon from "@/assets/react.svg";
import artikelIcon from "@/assets/react.svg";

export const DataHeroSection = {
  title: "Radenmat",
  subs: "Partner Terpercaya untuk Kualitas Seragam Anda",
  description:
    "Dengan akses mudah, informasi terpercaya, dan konsultasi yang nyaman, kami hadir untuk membantu Anda dalam memberikan kualitas seragam terbaik.",
};

export const DataAboutSection = {
  title: "Tentang Radenmat",
  description:
    "ReproHealth berkomitmen untuk memberikan akses mudah, informasi terpercaya, dan layanan yang nyaman kepada penggunanya. Dengan fitur forum diskusi, janji temu dengan dokter, dan artikel kesehatan reproduksi, ReproHealth membantu mengatasi setiap permasalahan reproduksi dan meningkatkan pemahaman tentang kesehatan reproduksi. Kami adalah mitra kesehatan reproduksi yang setia, siap mendukung pengguna dalam perjalanan mereka menuju kesehatan reproduksi yang optimal.",
};

export const DataServiceSection = {
  title: "Pelayanan Kesehatan Untukmu",
  content: [
    {
      id: 1,
      title: "Forum",
      textContent:
        "Membantu Anda dalam mencari isu-isu kesehatan reproduksi dan menanyakan masalah kesehatan reproduksi secara anonim.",
      icon: `${forumIcon}`,
      class: "w-11",
    },
    {
      id: 2,
      title: "Janji Temu",
      textContent:
        "Membantu Anda mengatur janji temu untuk konsultasi langsung dengan dokter kesehatan reproduksi melalui aplikasi.",
      icon: `${appointmentIcon}`,
      class: "w-9",
    },
    {
      id: 3,
      title: "Artikel",
      textContent:
        " Membantu Anda meningkatkan pemahaman Anda tentang topik-topik penting dalam kesehatan reproduksi, melalui artikel dari sumber yang akurat.",
      icon: `${artikelIcon}`,
      class: "w-10",
    },
  ],
};

export const DataBenefitLists = {
  title: "Mengapa Harus Kami?",
  content: [
    {
      id: 1,
      textContent:
        "Atur janji temu langsung dengan dokter kesehatan reproduksi melalui aplikasi.",
    },
    {
      id: 2,
      textContent:
        "Bertanya langsung kepada dokter dan dapatkan jawaban dari para ahli melalui forum diskusi.",
    },
    {
      id: 3,
      textContent:
        "Bagikan kebaikan kesehatan reproduksi dengan satu akun untuk 5 anggota keluarga.",
    },
    {
      id: 4,
      textContent:
        "200+ artikel tentang kesehatan reproduksi dari sumber yang akurat.",
    },
    {
      id: 5,
      textContent: "100+ mitra kesehatan yang terpercaya",
    },
    {
      id: 6,
      textContent:
        "Keamanan data dan privasi Anda untuk pengalaman yang aman dan nyaman.",
    },
  ],
};

export const DataCtaDoctor = {
  title: "Ingin bergabung sebagai dokter?",
  subs: "Kesempatan bergabung dengan Tim ReproHealth",
};
