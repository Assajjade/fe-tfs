import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../Axios";
import Header from "../../../image/perahu.jpg";
import account from "../../../image/account.jpeg";
import ReactMarkdown from "react-markdown";
import { Button, Form, Input, Drawer, Modal } from "antd";
import {
  IoHeartOutline,
  IoChatbubbleOutline,
  IoShareOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import ReportModal from "./ReportModal";
import BgSea from '../../../image/bg-sea3.jpg';


const DetailBlog = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState({});
  const [list, setList] = useState([]);
  const [comment, setComment] = useState(false);
  const [report, setReport] = useState(false);
  const [visible, setVisible] = useState(false);
  const [temp, setTemp] = useState(0);
  const [item, setItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pageLink, setPageLink] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    AxiosInstance.get(`blog/${blog_id}`).then((res) => {
      setBlog(res.data);
      console.log(res.data);
    }).catch(error => {
      console.error('Error fetching blog data:', error);
    });

    AxiosInstance.get(`comments/blog/${blog_id}`).then((res) => {
      setList(res.data);
    }).catch(error => {
      console.error('Error fetching comments:', error);
    });

    // Add analytics logging code here if needed

  }, [blog_id]);

  const ShowDrawer = (type) => {
    if (type === "comment") {
      setComment(true);
    } else {
      setReport(true);
    }
    setVisible(true);
  };

  const CloseDrawer = () => {
    setComment(false);
    setReport(false);
    setVisible(false);
  };

  const ReportDrawer = (report) => {
    setVisible(false);
    CloseDrawer();
    setTemp(report);
    setComment(false);
    setReport(true);
    console.log(report);
  };

  const openModal = (item) => {
    setItem(item);
    CloseDrawer();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openShareModal = () => {
    const link = window.location.href; // Get the current page URL
    setPageLink(link);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const submitComment = (values) => {
    const { comment } = values;
    AxiosInstance.post('comments/', {
      user: "yessforall",
      text: comment,
      blog: blog_id
    })
    .then((response) => {
      console.log('Comment submitted successfully:', response.data);
      AxiosInstance.get(`comments/blog/${blog_id}`)
        .then((res) => {
          setList(res.data);
        })
        .catch((error) => {
          console.error('Error fetching updated comments:', error);
        });
    })
    .catch((error) => {
      console.error('Error submitting comment:', error);
    });
  };

  return (
    <div className="md:px-20 lg:px-56 mt-10">
            <img src={BgSea} className="absolute inset-0 w-screen  object-cover z-[-2] top-0 left-0 " alt="Background"></img>
      {blog.author ? (
        <div className="flex items-center mt-5">
          <img src={account} className="rounded-full w-[35px]" alt="Author" />
          <div className="ml-2 flex justify-start flex-col">
            <div className="font-bold flex text-[12px]">{blog.author?.name}</div>
            <div className="text-gray-500 text-[10px]">{blog.created_at}</div>
          </div>
        </div>
      ) : (
        <div>Loading author...</div>
      )}
      <h3 className="text-[23px] font-bold">{blog.title || 'Loading title...'}</h3>
      <img src={Header} className="rounded-2xl mt-5 mb-5 w-full" alt="Header" />
      <div className="my-8 items-center">
        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-between space-x-4 mx-5">
          <div className="space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              <IoHeartOutline />
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => ShowDrawer("comment")}
            >
              <IoChatbubbleOutline />
            </button>
          </div>
          <div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={openShareModal}
            >
              <IoShareOutline />
            </button>
          </div>
        </div>
        <hr className="border-gray-300 mt-4" />
      </div>
      <ReactMarkdown children={blog.content || 'Loading content...'} className="leading-9 bg-blue-200 rounded-lg" />
      <Drawer
        visible={visible}
        onClose={CloseDrawer}
        title={comment ? "Comment" : "Report Response"}
        className="z-25"
      >
        {comment && (
          <>
            {list.map((Item, index) => (
              <div key={index}>
                <hr className="border-gray-300 mt-4" />
                <div className="flex items-center justify-between mt-5 mx-3">
                  <div className="flex">
                    <img
                      src={account}
                      className="rounded-full w-[35px]"
                      alt={`Avatar of ${Item.user.name}`}
                    />
                    <div className="ml-2 flex justify-start flex-col">
                      <div className="font-bold flex text-[12px]">
                        {Item.user?.name || 'Anonymous'}
                      </div>
                      <div>{Item.text}</div>
                    </div>
                  </div>
                  <button
                    className="text-red-600"
                    onClick={() => openModal(Item)}
                  >
                    <IoAlertCircleOutline className="w-full" />
                  </button>
                </div>
              </div>
            ))}
            <Form
              onFinish={submitComment}
              layout="vertical"
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                name="comment"
                label="Your Comment"
                rules={[
                  { required: true, message: "Please input your comment!" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Drawer>

      {showModal && (
        <ReportModal onClose={closeModal} commentzz={item}></ReportModal>
      )}

      <Modal
        title="Share Link"
        visible={showShareModal}
        onCancel={closeShareModal}
        footer={[
          <Button key="copy" onClick={() => navigator.clipboard.writeText(pageLink)}>
            Copy Link
          </Button>,
          <Button key="close" onClick={closeShareModal}>
            Close
          </Button>,
        ]}
      >
        <p>{pageLink}</p>
      </Modal>
    </div>
  );
};

export default DetailBlog;
