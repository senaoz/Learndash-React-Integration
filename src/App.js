import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

function App() {
  var username = process.env.REACT_APP_USERNAME;
  var password = process.env.REACT_APP_PASS;
  var baseURL = process.env.REACT_APP_URL;
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString("base64");

  const [courses, setCourses] = useState([]);
  const [userProgress, setProgress] = useState([]);
  const [filter, setFilter] = useState("");

  const filtered = courses.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(filter.toLocaleLowerCase())
    );
  });

  function userCourseProgress(id) {
    const session_url = `${baseURL}/ldlms/v2/users/${id}/course-progress/`;

    var config = {
      method: "get",
      url: session_url,
      headers: { Authorization: "Basic " + encodedToken },
    };

    useEffect(() => {
      const fetchCourseProgress = async () => {
        await axios(config)
          .then(function (response) {
            setProgress(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchCourseProgress();
    }, []);
  }

  function Courses() {
    const session_url = `${baseURL}/ldlms/v2/courses`;

    var config = {
      method: "get",
      url: session_url,
      headers: { Authorization: "Basic " + encodedToken },
    };

    useEffect(() => {
      const fetchCourses = async () => {
        await axios(config)
          .then(function (response) {
            setCourses(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchCourses();
    }, []);
  }

  userCourseProgress(1);
  Courses();

  function CourseName(courseID) {
    for (let i = 0; i < courses.length; i++) {
      if (courseID === courses[i].id) {
        return courses[i].title.rendered;
      }
    }
  }

  return (
    <div className="xl:w-1/2 xl:ml-9">
      <h2>Kullanici Ilerleme</h2>
      {userProgress.map((progress, index) => (
        <tr key={index + 1}>
          <th>{index + 1}</th>
          <td>{CourseName(progress.course)}</td>
          <td>{progress.course}</td>
          <td>{progress.steps_completed}</td>
          <td>{progress.steps_total}</td>
          <td>{progress.date_completed}</td>
          <td>{progress.date_started}</td>
        </tr>
      ))}

      <h2>Aktif Kurslar</h2>
      <p>{courses.length === 0 ? "Yükleniyor, lütfen bekleyiniz.." : null}</p>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Ara.."
        className="input input-bordered input-sm w-full"
      />
      <section className="overflow-x-auto">
        <table className="table table-compact">
          <thead>
            <tr key="0">
              <th></th>
              <th>ID</th>
              <th>Kurs Adı</th>
              <th>Deadline</th>
              <th>Zamanında Tamamlayan Kullanıcı Sayısı</th>
              <th>Tamamlanmamış Kullanıcı Sayısı</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course, index) => (
              <tr key={index + 1}>
                <th>{index + 1}</th>
                <td>{course.id}</td>
                <td>{course.title.rendered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
