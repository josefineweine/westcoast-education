document.addEventListener("DOMContentLoaded", function() {
    const courseList = document.getElementById("courseList");
    const addCourseForm = document.getElementById("addCourseForm");
    const deleteCourseForm = document.getElementById("deleteCourseForm");

    function displayCourses() {
        courseList.innerHTML = ""; 
        fetch("db.json")
            .then(response => response.json())
            .then(data => {
                data.courses.forEach(course => {
                    const courseItem = document.createElement("div");
                    courseItem.innerHTML = `
                        <p><strong>${course.courseTitle}</strong> (${course.courseCode}) - ${course.desc}</p>
                    `;
                    courseList.appendChild(courseItem);
                });
            });
    }

    displayCourses();

    addCourseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(addCourseForm);
        const newCourse = {};
        formData.forEach((value, key) => {
            newCourse[key] = value;
        });
        fetch("db.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                courses: [newCourse]
            })
        })
        .then(() => {
            displayCourses();
            addCourseForm.reset();
        })
        .catch(error => console.error("Error adding course:", error));
    });

    deleteCourseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const courseId = deleteCourseForm.querySelector("#courseId").value;
        fetch(`db.json`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                courseId: courseId
            })
        })
        .then(() => {
            displayCourses();
            deleteCourseForm.reset();
        })
        .catch(error => console.error("Error deleting course:", error));
    });
});
