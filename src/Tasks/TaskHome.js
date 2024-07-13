import { React, useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  ModalBody,
  Row,
  Table,
} from "react-bootstrap";
import { addTask, deleteTask, getAllTask, updateTask } from "../API/api";

export default function TaskHome() {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowClickData, setRowClickData] = useState([]);
  const [show, setShow] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [viewDeleteDialog, setViewDeleteDialog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const handleClose = () => setShow(false); //update Modal Dialog
  const handleCloseTask = () => setAddTaskModal(false); //Add Modal Dialog

  const status = {
    Todo: "Todo",
    OnProgress: "OnProgress",
    Completed: "Completed",
  };
  useEffect(() => {
    fetchTask();
  }, []);
  const fetchTask = async () => {
    try {
      const response = await getAllTask();
      setTaskData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleUpdateStatus = async (value) => {
    const model = {
      taskId: rowClickData.taskId,
      Status: value,
    };
    try {
      const response = await updateTask(model);
      if (response) {
        fetchTask();
        handleClose();
        // alert("Task Updated Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleAddTask = async () => {
    const model = {
      taskName: title,
      Description: description,
      Status: "Todo",
      DueDate: dueDate,
      CreatedBy: "Admin",
    };
    const hasEmptyOrNullValues = Object.entries(model).some(([key, value]) => {
      return value === null || value === undefined || value === "";
    });
    if (hasEmptyOrNullValues) {
      alert("please enter the fields");
      return;
    }
    try {
      const response = await addTask(model);
      if (response) {
        fetchTask();
        handleCloseTask();
        // alert("Task Added Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleDeleteTask = async () => {
    const model = {
      taskId: rowClickData.taskId,
    };
    try {
      const response = await deleteTask(model);
      if (response) {
          fetchTask();
          setViewDeleteDialog(false);
        //   alert("Task Deleted Successfully");
      }
    } catch (error) {
      setViewDeleteDialog(false);
      alert(error);
    }
  };
  const deleteDialog = () => {
    setViewDeleteDialog(true);
  };
  const onRowClick = (data, event) => {
      var columnclicked = event.target.textContent.trim();
      console.log(columnclicked)
    if (columnclicked !== "Delete") {
      setRowClickData(data);
      setShow(true);
    } else {
      setRowClickData(data);
      deleteDialog();
    }
  };
  return (
    <div className="taskContainer m-3">
      <div>
        <h2 className="text-center taskhead">Task List</h2>
        <Button
          style={{ float: "right" }}
          variant="primary"
          onClick={() => setAddTaskModal(true)}
        >
          Add Task
        </Button>
      </div>
      <Modal
        show={viewDeleteDialog}
        onHide={() => setViewDeleteDialog(false)}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{rowClickData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are You sure you want to delete ?
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleDeleteTask}>
              Yes
            </Button>

            <Button
              style={{ marginLeft: "10px" }}
              variant="success"
              onClick={() => setViewDeleteDialog(false)}
            >
              {" "}
              No
            </Button>
          </div>
        </Modal.Body>
       
      </Modal>
      {/* ---------------------uPDATE---------------- */}
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{rowClickData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Please Do Update The Status
          <div className="d-flex">
            <Button
              variant="primary"
              onClick={() => handleUpdateStatus("OnProgress")}
            >
              On Progrees
            </Button>

            <Button
              style={{ marginLeft: "auto" }}
              variant="success"
              onClick={() => handleUpdateStatus("Completed")}
            >
              {" "}
              Completed
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -------------Add Task Model------------------- */}
      <Modal show={addTaskModal} onHide={handleCloseTask} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{rowClickData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      value={"Todo"}
                      readOnly
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Col>
                    <Form.Control
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddTask}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseTask}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((task) => (
            <tr
              className="taskrow"
              key={task.taskId}
              onClick={(e) => onRowClick(task, e)}
            >
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <Button variant="Link">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
