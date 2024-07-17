import { useEffect, useState } from "react";
import { Progress, Checkbox, Tag, Button, Flex, Space, Image } from "antd";
import { FaListCheck } from "react-icons/fa6";
import anonymousPict from "@/assets/anonymous profile.jpg";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { APIpenugasan } from "@/apis/APIpenugasan";

const UpdateTugas = ({ onClose, refetchPenugasan, updateData }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [statusTugas, setStatusTugas] = useState("");

  useEffect(() => {
    if (updateData) {
      let tasks = [];
      try {
        tasks = JSON.parse(updateData.tasks_list) || [];
      } catch (e) {
        console.error("Failed to parse tasks_list:", e);
      }
      setCheckedList(
        tasks.filter((task) => task.checked).map((task) => task.name),
      );
      setAllTasks(tasks.map((task) => task.name));
      setStatusTugas(updateData.status_tugas || "");
    }
  }, [updateData]);

  const calculateProgress = () => {
    if (allTasks.length === 0) return 0;
    return (checkedList.length / allTasks.length) * 100;
  };

  const handleChange = (list) => {
    setCheckedList(list);
  };

  const handleOk = async () => {
    try {
      const tasks = allTasks.map((task) => ({
        name: task,
        checked: checkedList.includes(task),
      }));
      const updatePayload = {
        tasks_list: tasks, // Ensure tasks_list is not a string
        status_tugas: statusTugas,
      };

      const result = await APIpenugasan.updatePenugasan(
        updateData.uuid,
        updatePayload,
      );
      console.log("Penugasan updated successfully:", result);
      onClose();
      refetchPenugasan(); // Memuat ulang data penugasan setelah berhasil update
    } catch (error) {
      console.error("Error updating penugasan:", error);
    }
  };

  const determineStatus = () => {
    let color = "";
    let text = "";

    if (statusTugas === "completed") {
      color = "text-positive bg-positive-25 w-20";
      text = "Completed";
    } else if (statusTugas === "ongoing") {
      color = "text-link bg-link-25 w-20";
      text = "On Going";
    } else {
      color = "text-gray-500 bg-gray-25 w-20";
      text = "Idle";
    }

    return { color, text };
  };

  const { color, text } = determineStatus();
  // console.log("data tugas ok", completedTasks);

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
          {Array.isArray(statusTugas) &&
            statusTugas.map((item, index) => (
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
                <strong>{item.completed_by}</strong>
                <span className="ps-1">({item.tasks_list})</span>
                <span className="ps-1">
                  {dayjs(item.completed_at)?.format("HH:mm:ss")}
                </span>
              </div>
            ))}
        </div>
        <Tag className={color} type="primary">
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
            {allTasks.map((task) => (
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
