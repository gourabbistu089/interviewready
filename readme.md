# InterviewReady 🚀


**The ultimate MERN-stack platform to learn core concepts, practice curated problems, and test your skills with an AI-powered mock interviewer.**

**Live Demo:** [**interviewready-xi.vercel.app**](https://interviewready-xi.vercel.app/)

---

## Stop Juggling, Start Preparing.

Tired of endless browser tabs for DSA sheets, YouTube tutorials, theory notes, and coding platforms? **InterviewReady** is a centralized, feature-rich application designed to bring structure, focus, and efficiency to your technical interview preparation.

After a simple email login, you unlock a personalized ecosystem built to guide you from fundamental concepts to advanced problem-solving.

---

## Core Features

### 🤖 1. AI-Powered Mock Interview
Experience the pressure of a real interview before you're in the hot seat.
* **Realistic Q&A:** Our AI interviewer asks you relevant technical questions based on your chosen topics.
* **Instant Feedback:** Receive detailed feedback on the accuracy and quality of your answers.
* **Performance Score:** Get a comprehensive score based on your performance to pinpoint your strengths and areas for improvement.

### 📊 2. Personalized Dashboard
Your mission control for interview prep. The dashboard provides a clear, real-time overview of your hard work and progress:
* **Track Topics:** See how many core CS concepts you've mastered.
* **Monitor Problems:** Keep count of the DSA & SQL questions you've solved.
* **View Contributions:** Track the number of insightful blogs you've shared with the community.

### 🧠 3. The Learning Hub
Build a rock-solid foundation with our structured learning module. We cover the essential theoretical topics that top companies test for:
* **Core Subjects:** Dive deep into **OOPs**, **Operating Systems**, **DBMS**, and **Computer Networks**.
* **Structured Paths:** Each subject is broken down into granular subtopics for focused learning.
* **Test Your Knowledge:** After completing a subtopic, take an interactive **quiz** to instantly validate your understanding.
* **All-in-One Resources:** Every single subtopic is paired with:
    * ▶️ Curated **Video Lectures** (navigates to YouTube)
    * 📝 Detailed **Notes & Blogs**
    * ✍️ Quick-revision **Handwritten Notes**

### 💻 4. The Modern Practice Sheet
Move beyond static spreadsheets. Our dynamic practice section is designed for active problem-solvers:
* **Curated Problem Sets:** Tackle handpicked questions on **Data Structures & Algorithms (DSA)** and **SQL**.
* **Practice on Premier Platforms:** Each problem links you directly to **LeetCode**, **GeeksforGeeks**, or **HackerRank** to solve in a real coding environment.
* **Comprehensive Support:** Just like the Learning Hub, every topic comes with integrated video lectures, notes, and handwritten notes to help you if you get stuck.

### ✍️ 5. Collaborative Blog Platform
Share your knowledge, learn from your peers.
* **Write & Publish:** Author your own technical blogs to explain concepts, share interview experiences, or document your learning journey.
* **Community-Driven Insights:** Read articles from others in the InterviewReady community to gain diverse perspectives and deepen your understanding.

---

## Tech Stack

This project is built with the robust and scalable MERN stack.

* **Frontend:** **React.js**
* **Backend:** **Node.js** & **Express.js**
* **Database:** **MongoDB**
* **Authentication:** Email-based Login (likely with JWT)

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js (v16 or later)
* npm or Yarn
* A local or cloud-based MongoDB instance.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/gourabbistu089/interviewready.git](https://github.com/gourabbistu089/interviewready.git)
    cd interviewready
    ```

2.  **Configure the Backend:**
    ```sh
    cd server
    npm install
    ```
    Create a `.env` file in the `/server` directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=8000
    # Add any other required keys (e.g., JWT_SECRET)
    ```

3.  **Configure the Frontend:**
    ```sh
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```sh
    cd server
    npm run dev
    ```

2.  **Start the Frontend Client (in a new terminal):**
    ```sh
    cd client
    npm start
    ```
    The application should now be accessible at `http://localhost:5173`.

---

## Roadmap

I'm constantly working to make InterviewReady even better. Here's what's next:

* [ ] **Machine Coding Round Section:** A dedicated module for practicing system design and low-level design problems.
* [ ] **Advanced Filtering:** More powerful search and filter options for problems and blogs.
* [ ] **User Profile Enhancements:** More customization options for user profiles.

See the [open issues](https://github.com/gourabbistu089/interviewready/issues) for a full list of proposed features and known issues.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please fork the repo and create a pull request.

---

## License

Distributed under the MIT License. See the `LICENSE` file for more information.

---

## Contact

Gourab Bistu - [GitHub Profile](https://github.com/gourabbistu089)

Project Link: [https://github.com/gourabbistu089/interviewready](https://github.com/gourabbistu089/interviewready)
