import { useState } from "react";
import { Modal, Button, Progress, Checkbox, Tag } from "antd";
import { FaListCheck } from "react-icons/fa6";

import dayjs from "dayjs";
import "dayjs/locale/id";

const AddTugas = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [checkedList, setCheckedList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const taskList = [
    "Menjahit 20 Pakaian",
    "Memotong 10 Pakaian",
    "Packing",
    "Other",
  ];

  const calculateProgress = () => {
    return (checkedList.length / taskList.length) * 100;
  };

  const handleChange = (list) => {
    setCheckedList(list);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newTask = {
      completed_by: "User",
      tasks_list: checkedList.join(", "),
      date: new Date().toLocaleString(), // Menambahkan waktu penyelesaian tugas secara dinamis
    };
    setCompletedTasks([...completedTasks, newTask]); // Simpan tugas yg diselesaikan
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  console.log("data task", checkedList);
  console.log("data completed", completedTasks);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Penugasan"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={600}
        className="p-4"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Daily Task</h1>
          </div>
          <div className="pb-2 pt-4">
            <h6 className="text-md font-semibold">Description</h6>
            <p className="text-sm font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto, suscipit?
            </p>
          </div>
          <div className="pb-1">
            <p className="text-sm font-normal text-gray-500">Completed by: </p>
            {completedTasks.map((item, index) => (
              <p key={index} className="text-sm font-normal text-gray-500">
                <span className="pe-1">{index}</span>
                <strong>{item.completed_by}</strong>
                <span className="ps-1">({item.tasks_list})</span>
                <span className="ps-1">
                  {dayjs(item.date).format("HH:mm:ss")}
                </span>
              </p>
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
              {taskList.map((task) => (
                <Checkbox key={task} value={task}>
                  {task}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </Modal>
    </div>
  );
};

export default AddTugas;
