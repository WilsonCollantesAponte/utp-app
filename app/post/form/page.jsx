"use client";

import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function NewPost() {
  const [refresh, setRefresh] = useState(0);
  const [currentImage, setCurrentImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropD, setDropD] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [postScope, setPostScope] = useState({
    architecture: false,
    industrialEngineering: false,
    systemsEngineering: false,
    civilEngineering: false,
    all: false,
  });

  function handleImage(e) {
    setLoading(true);
    for (const iterator of e.target.files) {
      const readImage = new FileReader();
      readImage.readAsDataURL(iterator);
      readImage.onload = (e) => {
        currentImage.push(e.target.result);
        setCurrentImage(currentImage);
      };
    }
    setRefresh(refresh + 1);
    setTimeout(() => {
      setRefresh(refresh + 1.81);
      setLoading(false);
    }, 891);
  }

  function handleData(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handlePostScope(e) {
    const { name } = e.target;
    if (name !== "all") {
      setPostScope({ ...postScope, [name]: !postScope[name] });
    } else {
      if (postScope.all) {
        setPostScope({
          architecture: false,
          industrialEngineering: false,
          systemsEngineering: false,
          civilEngineering: false,
          all: false,
        });
      } else {
        setPostScope({
          architecture: true,
          industrialEngineering: true,
          systemsEngineering: true,
          civilEngineering: true,
          all: true,
        });
      }
    }
  }

  function handleSend() {
    setLoading(true);
    fetch("/post/form/api", {
      method: "POST",
      body: JSON.stringify({ image: currentImage, data, postScope }),
    })
      .then(() => setLoading(false))
      .catch(() => {
        console.log("not submit");
        setLoading(false);
      });
  }
  console.log(data);
  useEffect(() => {}, [refresh]);

  return (
    <div className=" bg-gray-400">
      <div className="mx-auto  px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {/* <div className="mx-auto  max-w-2xl bg-white rounded-md p-11"> */}
        <div className="mx-auto  max-w-2xl bg-red-600 rounded-md p-11">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Post
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Complete the fields
            </p>
            <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8">
              <div className="col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleData}
                    maxLength={45}
                    type="text"
                    name="title"
                    value={data.title}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className=" col-span-6">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className=" mt-2">
                  <textarea
                    name="description"
                    value={data.description}
                    onChange={handleData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mt-6 text-sm leading-6 text-gray-600">
                Visible para
              </p>
              <div>
                <label htmlFor="">architecture</label>
                <div>
                  <input
                    type="checkbox"
                    name="architecture"
                    onClick={handlePostScope}
                    checked={postScope.architecture}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">industrialEngineering</label>
                <div>
                  <input
                    type="checkbox"
                    name="industrialEngineering"
                    onClick={handlePostScope}
                    checked={postScope.industrialEngineering}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">systemsEngineering</label>
                <div>
                  <input
                    type="checkbox"
                    name="systemsEngineering"
                    onClick={handlePostScope}
                    checked={postScope.systemsEngineering}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">civilEngineering</label>
                <div>
                  <input
                    type="checkbox"
                    name="civilEngineering"
                    onClick={handlePostScope}
                    checked={postScope.civilEngineering}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">All</label>
                <div>
                  <input
                    type="checkbox"
                    name="all"
                    onChange={handlePostScope}
                  />
                </div>
              </div>
            </div>

            <div className=" p-0.5 bg-white rounded mt-1 leading-6">
              <input
                className={
                  !dropD
                    ? "w-full text-white"
                    : " bg-white w-full border-dashed opacity-70 border-4   rounded "
                }
                onClick={() => setCurrentImage([])}
                type="file"
                name=""
                accept="image/*"
                multiple
                onChange={handleImage}
                onDragEnter={() => setDropD(true)}
                onDragLeave={() => setDropD(false)}
              />
            </div>
          </div>

          {loading ? (
            <MoonLoader size={85} />
          ) : (
            <div>
              <div>
                {currentImage.map((aImage, index) => (
                  <img key={index} src={aImage} alt="none-img-:/" />
                ))}
              </div>
              {loading ? (
                <div className=" w-fit mx-auto my-8">
                  <MoonLoader size={78} />
                </div>
              ) : (
                <div className="bg-indigo-600 py-2 px-3 w-fit mx-auto text-8xl font-mono text-white mt-3 rounded-md hover:bg-indigo-400">
                  <button onClick={handleSend}>Save</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
