import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  getListMovieService,
  addMovieService,
  deleteMovieService,
  updateMovieService,
} from "../../../api/movieService";
import { showLoading, hideLoading } from "../../../redux/loadingSlice";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      dispatch(showLoading());
      const response = await getListMovieService();
      setMovies(response.data.content);
      dispatch(hideLoading());
    } catch (error) {
      console.error("Error fetching movies:", error);
      message.error("Failed to fetch movies");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = () => {
    setEditingMovie(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    form.setFieldsValue({
      tenPhim: movie.tenPhim,
      moTa: movie.moTa,
      ngayKhoiChieu: moment(movie.ngayKhoiChieu),
      danhGia: movie.danhGia,
      dangChieu: movie.dangChieu,
      sapChieu: movie.sapChieu,
      hot: movie.hot,
    });
    setIsModalVisible(true);
  };

  const handleDeleteMovie = async (maPhim) => {
    try {
      dispatch(showLoading());
      await deleteMovieService(maPhim);
      message.success("Movie deleted successfully");
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      message.error("Failed to delete movie");
      dispatch(hideLoading());
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const formData = new FormData();

      // Append all form values to formData
      Object.keys(values).forEach((key) => {
        if (key === "hinhAnh" && values[key]?.fileList?.[0]?.originFileObj) {
          formData.append("File", values[key].fileList[0].originFileObj);
        } else if (key === "ngayKhoiChieu") {
          formData.append(key, values[key].format("DD/MM/YYYY"));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Add required fields
      formData.append("maNhom", "GP01");

      if (editingMovie) {
        formData.append("maPhim", editingMovie.maPhim);
        await updateMovieService(formData);
        message.success("Movie updated successfully");
      } else {
        await addMovieService(formData);
        message.success("Movie added successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchMovies();
    } catch (error) {
      console.error("Error submitting movie:", error);
      message.error("Failed to submit movie");
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Movie ID",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <img src={text} alt="movie" className="w-20 h-20 object-cover" />
      ),
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
      ellipsis: true,
    },
    {
      title: "Rating",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditMovie(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this movie?"
            onConfirm={() => handleDeleteMovie(record.maPhim)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movie Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddMovie}
          className="bg-blue-500"
        >
          Add Movie
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={movies}
        rowKey="maPhim"
        className="shadow-lg rounded-lg"
      />

      <Modal
        title={editingMovie ? "Edit Movie" : "Add Movie"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="tenPhim"
            label="Movie Name"
            rules={[{ required: true, message: "Please input movie name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="moTa"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="ngayKhoiChieu"
            label="Release Date"
            rules={[{ required: true, message: "Please select release date!" }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="danhGia"
            label="Rating"
            rules={[{ required: true, message: "Please input rating!" }]}
          >
            <InputNumber min={0} max={10} className="w-full" />
          </Form.Item>

          <Form.Item
            name="hinhAnh"
            label="Poster"
            rules={[
              { required: !editingMovie, message: "Please upload poster!" },
            ]}
          >
            <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Poster</Button>
            </Upload>
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="dangChieu"
              label="Now Showing"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="sapChieu"
              label="Coming Soon"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item name="hot" label="Hot Movie" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>

          <Form.Item className="text-right">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                {editingMovie ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieManagement;
