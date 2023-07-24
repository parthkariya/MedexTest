import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useOrderContext } from "../context/place_order_context";
import moment from "moment";
import { width } from "@mui/system";
import axios from "axios";
import { accept_header, order_ticket } from "../Utils/constatns";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";

const TicketDetails = ({ ticket_modal, setTicket_modal, mainid }) => {
  const { single_order_details } = useOrderContext();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("aaa", mainid);
  });
  const [file, setFile] = useState();
  const [loading, SetLoading] = useState(false);
  // const [orderno, setOrderno] = useState();
  const [productname, setproductname] = useState();
  const [subject, setSubject] = useState();
  const [description, setDescription] = useState();
  // const [loading, SetLoading] = useState(false);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
      if (acceptedFiles.length === 0) {
        window.location.reload(true);
      }
    },
  });

  const thumbs = files.map((file) => (
    <img
      src={file.preview}
      style={{ width: "100%", height: "100%", maxHeight: "175px" }}
      className="img-fluid"
      alt="file"
    />
  ));

  const TicketApi = async () => {
    SetLoading(true);
    let userid = localStorage.getItem("token");
    console.log("token is", userid);

    const formdata = new FormData();
    formdata.append("order_number", mainid);
    formdata.append("product_name", productname);
    formdata.append("subject", subject);
    formdata.append("problem_description", description);
    await formdata.append("image", files[0]);

    console.log("ticket formdata is", formdata);

    axios
      .post(order_ticket, formdata, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + JSON.parse(userid),
        },
      })
      .then((res) => {
        console.log("ticket data", res.data);
        if (res.data.success == 1) {
          SetLoading(false);
          setTicket_modal(false);
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };
  return (
    <main className={ticket_modal ? "show dialog" : " dialog "}>
      <div className="new_address_section ticket-add-main">
        {single_order_details === {} ||
        single_order_details === undefined ||
        single_order_details === "" ? null : (
          <>
            <div>
              <div className="tic_title">Create Ticket</div>
              <div className="ticket_main">
                {/* <p>Name</p>
        <input className="form-control" type="text" id="name" required /> */}
                <div className="form_style">
                  <div>
                    <label style={{ fontWeight: "500" }}>Product name</label>
                    <input
                      className="form-control"
                      type="Product name"
                      required
                      value={productname}
                      onChange={(e) => setproductname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: "500" }}>Subject</label>
                    <input
                      className="form-control"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: "500" }}>
                      Product description
                    </label>
                    <textarea
                      className="form-control"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mm_img_upload_wrapp">
                    {/* single upload image */}
                    <div className="myprofile_inner_sec2">
                      <h6 style={{ marginBottom: "10px" }}>
                        Upload the Image <br />
                        (200 x 200 pixels)
                      </h6>
                      {files && files.length > 0 ? (
                        <div className="myprofile_inner_sec2_img_upload">
                          {thumbs}
                        </div>
                      ) : (
                        <div
                          style={{ width: "100%" }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <div className="myprofile_inner_sec2_img_upload">
                            <AiOutlineCloudUpload
                              style={{
                                width: "60px",
                                height: "60px",
                                color: "var(--color-orange)",
                                marginBottom: "10px",
                              }}
                            />
                            <h4>.PDF .JPG .PNG</h4>
                            <p>You can also upload file by</p>
                            <input
                              {...getInputProps()}
                              accept="image/jpeg, image/jpg, image/png, image/eps"
                              type="file"
                              name="photos"
                            />
                            <button
                              type="button"
                              className="click_upload_btn"
                              style={{ background: "none", border: "none" }}
                            >
                              clicking here
                            </button>
                            {/* <a href="">clicking here</a> */}
                          </div>
                          <div className="btnn-main">
                            <button
                              className="btn btn-orange"
                              type="button"
                              style={{ marginBottom: "10px" }}
                              onClick={() => {
                                // setFiles([]);
                              }}
                            >
                              Upload File
                            </button>
                          </div>
                        </div>
                      )}
                      {/* <div className="myprofile_upload_img_btn_wrapp"> */}
                      <button
                        className="btn btn-blue"
                        onClick={() => setFiles([])}
                      >
                        Cancel
                      </button>
                      {/* </div> */}
                    </div>
                  </div>
                  <br />
                  <button
                    className="tic_btn"
                    type="submit"
                    onClick={() => TicketApi()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="main_container_close">
              <MdCancel
                onClick={() => setTicket_modal(false)}
                style={{ cursor: "pointer", width: "1rem", height: "1rem" }}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TicketDetails;
