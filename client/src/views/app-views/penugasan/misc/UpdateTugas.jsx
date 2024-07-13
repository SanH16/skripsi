import { useEffect, useState } from "react";
import { Progress, Checkbox, Tag, Button, Flex, Space, Image } from "antd";
import { FaListCheck } from "react-icons/fa6";
import anonymousPict from "@/assets/anonymous profile.jpg";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { useQuery } from "@tanstack/react-query";
import { APIpenugasan } from "@/apis/APIpenugasan";

const UpdateTugas = ({ onClose, refetchPenugasan, updateData }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (updateData) {
      // Set data awal dari penugasan yang diupdate
      setCheckedList(updateData.tasks_list?.split(", ") || []);
      setCompletedTasks(updateData.completedTasks || []);
    }
  }, [updateData, refetchPenugasan]);

  const { data } = useQuery({
    queryKey: ["penugasanData"],
    queryFn: async () => {
      const result = await APIpenugasan.getAllPenugasan();
      return result;
    },
  });
  const dataPenugasan = data || [];
  console.log("kiw kiw", dataPenugasan);

  const taskListing = [
    "Menjahit 20 Pakaian",
    "Memotong 10 Pakaian",
    "Packing",
    "Other",
  ];

  const calculateProgress = () => {
    return (checkedList.length / taskListing.length) * 100;
  };

  const handleChange = (list) => {
    setCheckedList(list);
  };

  const handleOk = () => {
    const newTask = {
      completed_by: dataPenugasan[0]?.user?.pegawai?.photo,
      tasks_list: checkedList.join(", "),
      completed_at: new Date().toLocaleString(), // Menambahkan waktu penyelesaian tugas secara dinamis
    };
    setCompletedTasks([...completedTasks, newTask]); // Simpan tugas yg diselesaikan
    onClose();
  };

  const determineStatus = () => {
    const progress = calculateProgress();
    if (progress === 100) {
      return {
        status: "completed",
        color: "text-positive bg-positive-25 w-20",
        text: "Completed",
      };
    } else if (progress > 0) {
      return {
        status: "ongoing",
        color: "text-link bg-link-25 w-20",
        text: "On Going",
      };
    } else {
      return {
        status: "idle",
        color: "text-gray-500 bg-gray-25 w-20",
        text: "Idle",
      };
    }
  };

  const { status, color, text } = determineStatus();
  console.log("data tugas ok", completedTasks);

  return (
    <div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">{updateData.judul}</h1>
        </div>
        <div className="pb-2 pt-4">
          <h6 className="text-md font-semibold">Description</h6>
          <p className="text-sm font-normal">{updateData.keterangan_tugas}</p>
        </div>
        <div className="pb-1">
          <p className="text-sm font-medium text-gray-600">Completed by:</p>
          {completedTasks.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-sm font-normal text-gray-500"
            >
              <span className="pe-1">{index + 1}.</span>

              <Image
                src={`http://localhost:5000/images/${item.completed_by}`}
                preview={false}
                fallback={anonymousPict}
                className="m-2 flex h-8 w-8 rounded-full"
              />
              <strong>{dataPenugasan[index]?.user?.name}</strong>
              <span className="ps-1">({item.tasks_list})</span>
              <span className="ps-1">
                {dayjs(item.completed_at).format("HH:mm:ss")}
              </span>
            </div>
          ))}
        </div>
        <Tag className={color} key={status} type="primary">
          <span className="flex items-center justify-center font-medium">
            {text}
          </span>
        </Tag>
        <div className="flex items-center justify-center">
          <FaListCheck className="me-2 text-lg text-gray-500" />
          <Progress
            percent={calculateProgress()}
            status="active"
            strokeColor="#37c997"
          />
        </div>
        <Checkbox.Group
          style={{ width: "100%" }}
          value={checkedList}
          onChange={handleChange}
        >
          <div className="grid grid-cols-1 gap-2">
            {taskListing.map((task) => (
              <Checkbox key={task} value={task}>
                {task}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      </div>

      <section className="my-3">
        <Flex justify="end" align="center">
          <div className="flex justify-end">
            <Space size="middle">
              <Button
                id="submit-button"
                htmlType="submit"
                onClick={handleOk}
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Ok
              </Button>
            </Space>
          </div>
        </Flex>
      </section>
    </div>
  );
};

export default UpdateTugas;
